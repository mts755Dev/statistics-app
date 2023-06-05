import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { Card } from 'react-native-elements';
import { PieChart } from 'react-native-chart-kit';

const API_URL = 'https://troubled-red-garb.cyclic.app/professeurs';

const HomeScreen = () => {
  const [data, setData] = useState([]);
  const [cityData, setCityData] = useState([]);
  const [gradeData, setGradeData] = useState([]);
  const [totalTeachers, setTotalTeachers] = useState(0);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(API_URL);
      const jsonData = await response.json();
      processData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const processData = (jsonData) => {
    const specialtiesCount = {};
    const citiesCount = {};
    const gradesCount = {};

    jsonData.forEach((teacher) => {
      const specialty = teacher.specialite;
      const city = teacher.villeDesiree;
      const grade = teacher.grade;

      specialtiesCount[specialty] = (specialtiesCount[specialty] || 0) + 1;
      citiesCount[city] = (citiesCount[city] || 0) + 1;
      gradesCount[grade] = (gradesCount[grade] || 0) + 1;
    });

    const sortedSpecialtyData = Object.entries(specialtiesCount).sort(
      (a, b) => b[1] - a[1]
    );
    const sortedCityData = Object.entries(citiesCount).sort(
      (a, b) => b[1] - a[1]
    );
    const sortedGradeData = Object.entries(gradesCount).sort(
      (a, b) => b[1] - a[1]
    );

    const top15SpecialtiesData = sortedSpecialtyData.slice(0, 15);
    const top15CitiesData = sortedCityData.slice(0, 15);
    const top15GradesData = sortedGradeData.slice(0, 15);

    const specialtyChartData = top15SpecialtiesData.map(([specialty, count]) => ({
      name: specialty,
      count,
      color: getRandomColor(),
      legendFontColor: '#7F7F7F',
      legendFontSize: 12,
    }));

    const cityChartData = top15CitiesData.map(([city, count]) => ({
      name: city,
      count,
      color: getRandomColor(),
      legendFontColor: '#7F7F7F',
      legendFontSize: 12,
    }));

    const gradeChartData = top15GradesData.map(([grade, count]) => ({
      name: grade,
      count,
      color: getRandomColor(),
      legendFontColor: '#7F7F7F',
      legendFontSize: 12,
    }));

    setData(specialtyChartData);
    setCityData(cityChartData);
    setGradeData(gradeChartData);
    setTotalTeachers(jsonData.length);
  };

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Statistiques</Text>
      <View style={styles.chartsContainer}>
        <Card containerStyle={styles.cardContainer}>
          <Card.Title>Nombre de profs inscrits: {totalTeachers}</Card.Title>
        </Card>
        <Card containerStyle={styles.cardContainer}>
          <Card.Title>Nombre de profs par spécialité</Card.Title>
          <View style={styles.chartContainer}>
            <PieChart
              data={data}
              width={320}
              height={200}
              chartConfig={{
                backgroundColor: '#ffffff',
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              }}
              accessor="count"
            />
          </View>
        </Card>
        <Card containerStyle={styles.cardContainer}>
          <Card.Title>Villes les plus demandées</Card.Title>
          <View style={styles.chartContainer}>
            <PieChart
              data={cityData}
              width={320}
              height={200}
              chartConfig={{
                backgroundColor: '#ffffff',
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              }}
              accessor="count"
            />
          </View>
        </Card>
        <Card containerStyle={styles.cardContainer}>
          <Card.Title>Nombre de profs par grade</Card.Title>
          <View style={styles.chartContainer}>
            <PieChart
              data={gradeData}
              width={320}
              height={200}
              chartConfig={{
                backgroundColor: '#ffffff',
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              }}
              accessor="count"
            />
          </View>
        </Card>
        <Card containerStyle={styles.cardContainer}>
          <Card.Title>Villes les plus demandées (Top 15)</Card.Title>
          <View style={styles.listContainer}>
            <View style={styles.listHeader}>
              <Text style={styles.listHeaderText}>Spécialité</Text>
              <Text style={styles.listHeaderText}>Nombre</Text>
            </View>
            {data.map((item) => (
              <View style={styles.listItem} key={item.name}>
                <Text>{item.name}</Text>
                <Text>{item.count}</Text>
              </View>
            ))}
          </View>
        </Card>
        <Card containerStyle={styles.cardContainer}>
          <Card.Title>Villes les plus demandées (Top 15)</Card.Title>
          <View style={styles.listContainer}>
            <View style={styles.listHeader}>
              <Text style={styles.listHeaderText}>Ville</Text>
              <Text style={styles.listHeaderText}>Nombre</Text>
            </View>
            {cityData.map((item) => (
              <View style={styles.listItem} key={item.name}>
                <Text>{item.name}</Text>
                <Text>{item.count}</Text>
              </View>
            ))}
          </View>
        </Card>
        <Card containerStyle={styles.cardContainer}>
          <Card.Title>Nombre de profs par grade</Card.Title>
          <View style={styles.listContainer}>
            <View style={styles.listHeader}>
              <Text style={styles.listHeaderText}>Grade</Text>
              <Text style={styles.listHeaderText}>Nombre</Text>
            </View>
            {gradeData.map((item) => (
              <View style={styles.listItem} key={item.name}>
                <Text>{item.name}</Text>
                <Text>{item.count}</Text>
              </View>
            ))}
          </View>
        </Card>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 20,
    paddingBottom: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  chartsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContainer: {
    width: 350,
    alignItems: 'center',
  },
  chartContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  listContainer: {
    marginTop: 10,
    paddingHorizontal: 10,
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  listHeaderText: {
    fontWeight: 'bold',
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
});

export default HomeScreen;
