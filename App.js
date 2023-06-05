import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './components/HomeScreen';
import AboutUsScreen from './components/AboutUsScreen';
import { Ionicons } from '@expo/vector-icons';
import RegisterScreen from './components/RegisterScreen';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Accueil') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'A propos') {
              iconName = focused ? 'information-circle' : 'information-circle-outline';
            } else if (route.name === 'Inscription') {
              iconName = focused ? 'person' : 'person-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'blue',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: {
            display: 'flex',
          },
        })}
      >
        <Tab.Screen name="Accueil" component={HomeScreen} />
        <Tab.Screen name="A propos" component={AboutUsScreen} />
        <Tab.Screen name="Inscription" component={RegisterScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
