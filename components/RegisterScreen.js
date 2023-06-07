import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, Button, ScrollView, Modal, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [grade, setGrade] = useState('Choisissez votre grade');
  const [establishment, setEstablishment] = useState('');
  const [speciality, setSpeciality] = useState('Choisissez une spécialité');
  const [currentCity, setCurrentCity] = useState('Choisissez une ville');
  const [desiredCity, setDesiredCity] = useState('Choisissez une villes désirées');
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const handleRegister = async () => {
    if (
      name === '' ||
      firstName === '' ||
      phone === '' ||
      email === '' ||
      password === '' ||
      grade === 'Choisissez votre grade' ||
      establishment === '' ||
      speciality === 'Choisissez une spécialité' ||
      currentCity === 'Choisissez une ville' ||
      desiredCity === 'Choisissez une villes désirées'
    ) {
      setError('Merci de remplir tous les champs.');
      setShowModal(true);
      return; // Stop registration if any fields are missing
    }

    try {
      const response = await fetch('https://tiny-worm-nightgown.cyclic.app/professeurs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          firstName,
          phone,
          email,
          password,
          grade,
          establishment,
          speciality,
          currentCity,
          desiredCity,
        }),
      });

      if (response.ok) {
        // Registration successful
        setError('Inscription réussi!');
        setShowModal(true);
        // Additional logic or redirect can be added here
      } else {
        // Registration failed
        const errorData = await response.json();
        setError(errorData.message);
        console.log(errorData.message)
        setShowModal(true);
      }
    } catch (error) {
      // Network or server error
      setError('Une erreur est produite lors de inscription, veuillez réessayer');
      setShowModal(true);
    }
  };


  const handleLogin = async () => {
    if (email === '' || password === '') {
      setError('Veuillez saisir votre email et votre mot de passe.');
      setShowModal(true);
      return; // Stop login if any field is missing
    }

    try {
      const response = await fetch('https://tiny-worm-nightgown.cyclic.app/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (response.ok) {
        // Login successful
        setError('Connexion réussie!');
        setShowModal(true);
        // Additional logic or redirect can be added here
      } else {
        // Login failed
        const errorData = await response.json();
        setError(errorData.message);
        setShowModal(true);
      }
    } catch (error) {
      // Network or server error
      setError('Une erreur est produite lors de la connexion. Veuillez réessayer.');
      setShowModal(true);
    }
  };


  const handleLoginButton = () => {
    setShowLoginModal(true);
  };

  const handleForgotPassword = () => {
    setShowLoginModal(false);
    setShowModal(true);
    setError('Un email de réinitialisation de mot de passe a été envoyé à votre adresse email.');
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setError('');
  };

  const handleCloseLoginModal = () => {
    setShowLoginModal(false);
    setLoginEmail('');
    setLoginPassword('');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Inscription</Text>
      <View style={styles.fieldContainer}>
        <Text style={styles.fieldLabel}>Nom:</Text>
        <TextInput
          style={styles.input}
          placeholder="Entrez votre nom"
          value={name}
          onChangeText={setName}
          required={true}
        />
      </View>
      <View style={styles.fieldContainer}>
        <Text style={styles.fieldLabel}>Prénom:</Text>
        <TextInput
          style={styles.input}
          placeholder="Entrez votre prénom"
          value={firstName}
          onChangeText={setFirstName}
          required={true}
        />
      </View>
      <View style={styles.fieldContainer}>
        <Text style={styles.fieldLabel}>Téléphone:</Text>
        <TextInput
          style={styles.input}
          placeholder="Entrez votre numéro de téléphone"
          value={phone}
          onChangeText={setPhone}
          required={true}
        />
      </View>
      <View style={styles.fieldContainer}>
        <Text style={styles.fieldLabel}>Email:</Text>
        <TextInput
          style={styles.input}
          placeholder="Entrez votre adresse email"
          value={email}
          onChangeText={setEmail}
          required={true}
        />
      </View>
      <View style={styles.fieldContainer}>
        <Text style={styles.fieldLabel}>Mot de passe:</Text>
        <TextInput
          style={styles.input}
          placeholder="Entrez votre mot de passe"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
          required={true}
        />
      </View>
      <View style={styles.fieldContainer}>
        <Text style={styles.fieldLabel}>Etablissement (abréviation: FST, FS, EST, ENSA ...):</Text>
        <TextInput
          style={styles.input}
          placeholder="Entrez votre établissement"
          value={establishment}
          onChangeText={setEstablishment}
          required={true}
        />
      </View>
      <View style={styles.fieldContainer}>
        <Text style={styles.fieldLabel}>Grade:</Text>
        <Picker
          style={styles.input}
          selectedValue={grade}
          onValueChange={(itemValue) => setGrade(itemValue)}
          required={true}
        >
          <Picker.Item label="Choisissez votre grade" value="" />
          <Picker.Item label="ESP" value="ESP" />
          <Picker.Item label="pH" value="pH" />
          <Picker.Item label="PA" value="PA" />
          <Picker.Item label="Ingénieur" value="Ingénieur" />
          <Picker.Item label="Administrateur" value="Administrateur" />
          <Picker.Item label="Technicien" value="Technicien" />
          <Picker.Item label="PESQ" value="PESQ" />
        </Picker>
      </View>
      <View style={styles.fieldContainer}>
        <Text style={styles.fieldLabel}>Spécialité:</Text>
        <Picker
          style={styles.input}
          selectedValue={speciality}
          onValueChange={(itemValue) => setSpeciality(itemValue)}
          required={true}
        >
          <Picker.Item label="Choisissez une spécialité" value="" />
          <Picker.Item label="Amazighe" value="Amazighe" />
          <Picker.Item label="Anglais" value="Anglais" />
          <Picker.Item label="Anthropologie" value="Anthropologie" />
          <Picker.Item label="Archéologie" value="Archéologie" />
          <Picker.Item label="Arts visuels" value="Arts visuels" />
          <Picker.Item label="Bibliothéconomie et sciences de l'information" value="Bibliothéconomie et sciences de l'information" />
          <Picker.Item label="Biochimie" value="Biochimie" />
          <Picker.Item label="Biologie" value="Biologie" />
          <Picker.Item label="Biologie et biotechnologie agroalimentaire" value="Biologie et biotechnologie agroalimentaire" />
          <Picker.Item label="Chimie" value="Chimie" />
          <Picker.Item label="Chimie Physique" value="Chimie Physique" />
          <Picker.Item label="Chimie minérale" value="Chimie minérale" />
          <Picker.Item label="Criminologie" value="Criminologie" />
          <Picker.Item label="Design graphique" value="Design graphique" />
          <Picker.Item label="Design industriel" value="Design industriel" />
          <Picker.Item label="Didactique des SVT" value="Didactique des SVT" />
          <Picker.Item label="Droit" value="Droit" />
          <Picker.Item label="Droit français" value="Droit français" />
          <Picker.Item label="Droit privé" value="Droit privé" />
          <Picker.Item label="Droit publique" value="Droit publique" />
          <Picker.Item label="Espagnol" value="Espagnol" />
          <Picker.Item label="Finance" value="Finance" />
          <Picker.Item label="Gestion des affaires internationales" value="Gestion des affaires internationales" />
          <Picker.Item label="Génie Chimique" value="Génie Chimique" />
          <Picker.Item label="Génie Civil" value="Génie Civil" />
          <Picker.Item label="Génie Mécanique" value="Génie Mécanique" />
          <Picker.Item label="Génie de procédés" value="Génie de procédés" />
          <Picker.Item label="Génie industriel et maintenance" value="Génie industriel et maintenance" />
          <Picker.Item label="Génie Électrique" value="Génie Électrique" />
          <Picker.Item label="Géographie" value="Géographie" />
          <Picker.Item label="Géologie" value="Géologie" />
          <Picker.Item label="Géomatique et Hydrologie" value="Géomatique et Hydrologie" />
          <Picker.Item label="Géophysique" value="Géophysique" />
          <Picker.Item label="Histoire" value="Histoire" />
          <Picker.Item label="Informatique" value="Informatique" />
          <Picker.Item label="Ingénierie aérospatiale" value="Ingénierie aérospatiale" />
          <Picker.Item label="Journalisme" value="Journalisme" />
          <Picker.Item label="Langues et Littératures" value="Langues et Littératures" />
          <Picker.Item label="Linguistique arabe" value="Linguistique arabe" />
          <Picker.Item label="Logistique" value="Logistique" />
          <Picker.Item label="Mathématiques" value="Mathématiques" />
          <Picker.Item label="Musique" value="Musique" />
          <Picker.Item label="Médecine" value="Médecine" />
          <Picker.Item label="Patrimoine" value="Patrimoine" />
          <Picker.Item label="Philosophie" value="Philosophie" />
          <Picker.Item label="Physiologie animale" value="Physiologie animale" />
          <Picker.Item label="Physiologie végétale" value="Physiologie végétale " />
          <Picker.Item label="Physique" value="Physique" />
          <Picker.Item label="Physique médicale" value="Physique médicale" />
          <Picker.Item label="Psychologie" value="Psychologie" />
          <Picker.Item label="Relations publiques" value="Relations publiques" />
          <Picker.Item label="Science de Gestion" value="Science de Gestion" />
          <Picker.Item label="Science de la nutrition" value="Science de la nutrition" />
          <Picker.Item label="Sciences Politiques" value="Sciences Politiques" />
          <Picker.Item label="Sciences de l'environnement" value="Sciences de l'environnement" />
          <Picker.Item label="Sciences de la communication" value="Sciences de la communication" />
          <Picker.Item label="Sciences Économiques" value="Sciences Économiques" />
          <Picker.Item label="Sociologie" value="Sociologie" />
          <Picker.Item label="Statistiques et probabilités" value="Statistiques et probabilités" />
          <Picker.Item label="Théâtre" value="Théâtre" />
          <Picker.Item label="Traduction et interprétation" value="Traduction et interprétation" />
          <Picker.Item label="Travail social" value="Travail social" />
          <Picker.Item label="Télécommunication" value="Télécommunication" />
          <Picker.Item label="biotechnologie agroalimentaire" value="biotechnologie agroalimentaire" />
          <Picker.Item label="Éducation" value="Éducation" />
          <Picker.Item label="Électronique, Instrumentation et Énergétique" value="Électronique, Instrumentation et Énergétique" />
          <Picker.Item label="Électronique, électrotechnique et automatique" value="Électronique, électrotechnique et automatique" />
          <Picker.Item label="Études autochtones" value="Études autochtones" />
          <Picker.Item label="Études de développement" value="Études de développement" />
          <Picker.Item label="Études de genre" value="Études de genre" />
          <Picker.Item label="Études religieuses" value="Études religieuses" />

        </Picker>
      </View>
      <View style={styles.fieldContainer}>
        <Text style={styles.fieldLabel}>Ville Actuelle:</Text>
        <Picker
          style={styles.input}
          selectedValue={currentCity}
          onValueChange={(itemValue) => setCurrentCity(itemValue)}
          required={true}
        >
          <Picker.Item label="Choisissez une ville" value="" />
          <Picker.Item label="Agadir" value="Agadir" />
          <Picker.Item label="Al Hoceima" value="Al Hoceima" />
          <Picker.Item label="Assilah" value="Assilah" />
          <Picker.Item label="Azemmour" value="Azemmour" />
          <Picker.Item label="Azrou" value="Azrou" />
          <Picker.Item label="Beni Mellal" value="Beni Mellal" />
          <Picker.Item label="Benslimane" value="Benslimane" />
          <Picker.Item label="Berkane" value="Berkane" />
          <Picker.Item label="Berrechid" value="Berrechid" />
          <Picker.Item label="Boujdour" value="Boujdour" />
          <Picker.Item label="Boulemane" value="Boulemane" />
          <Picker.Item label="Casablanca" value="Casablanca" />
          <Picker.Item label="Chefchaouen" value="Chefchaouen" />
          <Picker.Item label="Dakhla" value="Dakhla" />
          <Picker.Item label="El Hajeb" value="El Hajeb" />
          <Picker.Item label="El Jadida" value="El Jadida" />
          <Picker.Item label="El Kelaa des Sraghna" value="El Kelaa des Sraghna" />
          <Picker.Item label="Errachidia" value="Errachidia" />
          <Picker.Item label="Es-Semara" value="Es-Semara" />
          <Picker.Item label="Essaouira" value="Essaouira" />
          <Picker.Item label="Figuig" value="Figuig" />
          <Picker.Item label="Fès" value="Fès" />
          <Picker.Item label="Guelmim" value="Guelmim" />
          <Picker.Item label="Ifrane" value="Ifrane" />
          <Picker.Item label="Khemisset" value="Khemisset" />
          <Picker.Item label="Khenifra" value="Khenifra" />
          <Picker.Item label="Khouribga" value="Khouribga" />
          <Picker.Item label="Kénitra" value="Kénitra" />
          <Picker.Item label="Larache" value="Larache" />
          <Picker.Item label="Laâyoune" value="Laâyoune" />
          <Picker.Item label="Marrakech" value="Marrakech" />
          <Picker.Item label="Meknès" value="Meknès" />
          <Picker.Item label="Mohammédia" value="Mohammédia" />
          <Picker.Item label="Nador" value="Nador" />
          <Picker.Item label="Ouarzazate" value="Ouarzazate" />
          <Picker.Item label="Ouazzane" value="Ouazzane" />
          <Picker.Item label="Oujda" value="Oujda" />
          <Picker.Item label="Rabat" value="Rabat" />
          <Picker.Item label="Safi" value="Safi" />
          <Picker.Item label="Salé" value="Salé" />
          <Picker.Item label="Sefrou" value="Sefrou" />
          <Picker.Item label="Settat" value="Settat" />
          <Picker.Item label="Sidi Bennour" value="Sidi Bennour" />
          <Picker.Item label="Sidi Kacem" value="Sidi Kacem" />
          <Picker.Item label="Tan-Tan" value="Tan-Tan" />
          <Picker.Item label="Tanger" value="Tanger" />
          <Picker.Item label="Taourirt" value="Taourirt" />
          <Picker.Item label="Taroudant" value="Taroudant" />
          <Picker.Item label="Taza" value="Taza" />
          <Picker.Item label="Tiznit" value="Tiznit" />
          <Picker.Item label="Témara" value="Témara" />
          <Picker.Item label="Tétouan" value="Tétouan" />
        </Picker>
      </View>
      <View style={styles.fieldContainer}>
        <Text style={styles.fieldLabel}>Villes Désirées:</Text>
        <Picker
          style={styles.input}
          selectedValue={desiredCity}
          onValueChange={(itemValue) => setDesiredCity(itemValue)}
          required={true}
        >
          <Picker.Item label="Choisissez une villes désirées" value="" />
          <Picker.Item label="Agadir" value="Agadir" />
          <Picker.Item label="Al Hoceima" value="Al Hoceima" />
          <Picker.Item label="Assilah" value="Assilah" />
          <Picker.Item label="Azemmour" value="Azemmour" />
          <Picker.Item label="Azrou" value="Azrou" />
          <Picker.Item label="Beni Mellal" value="Beni Mellal" />
          <Picker.Item label="Benslimane" value="Benslimane" />
          <Picker.Item label="Berkane" value="Berkane" />
          <Picker.Item label="Berrechid" value="Berrechid" />
          <Picker.Item label="Boujdour" value="Boujdour" />
          <Picker.Item label="Boulemane" value="Boulemane" />
          <Picker.Item label="Casablanca" value="Casablanca" />
          <Picker.Item label="Chefchaouen" value="Chefchaouen" />
          <Picker.Item label="Dakhla" value="Dakhla" />
          <Picker.Item label="El Hajeb" value="El Hajeb" />
          <Picker.Item label="El Jadida" value="El Jadida" />
          <Picker.Item label="El Kelaa des Sraghna" value="El Kelaa des Sraghna" />
          <Picker.Item label="Errachidia" value="Errachidia" />
          <Picker.Item label="Es-Semara" value="Es-Semara" />
          <Picker.Item label="Essaouira" value="Essaouira" />
          <Picker.Item label="Figuig" value="Figuig" />
          <Picker.Item label="Fès" value="Fès" />
          <Picker.Item label="Guelmim" value="Guelmim" />
          <Picker.Item label="Ifrane" value="Ifrane" />
          <Picker.Item label="Khemisset" value="Khemisset" />
          <Picker.Item label="Khenifra" value="Khenifra" />
          <Picker.Item label="Khouribga" value="Khouribga" />
          <Picker.Item label="Kénitra" value="Kénitra" />
          <Picker.Item label="Larache" value="Larache" />
          <Picker.Item label="Laâyoune" value="Laâyoune" />
          <Picker.Item label="Marrakech" value="Marrakech" />
          <Picker.Item label="Meknès" value="Meknès" />
          <Picker.Item label="Mohammédia" value="Mohammédia" />
          <Picker.Item label="Nador" value="Nador" />
          <Picker.Item label="Ouarzazate" value="Ouarzazate" />
          <Picker.Item label="Ouazzane" value="Ouazzane" />
          <Picker.Item label="Oujda" value="Oujda" />
          <Picker.Item label="Rabat" value="Rabat" />
          <Picker.Item label="Safi" value="Safi" />
          <Picker.Item label="Salé" value="Salé" />
          <Picker.Item label="Sefrou" value="Sefrou" />
          <Picker.Item label="Settat" value="Settat" />
          <Picker.Item label="Sidi Bennour" value="Sidi Bennour" />
          <Picker.Item label="Sidi Kacem" value="Sidi Kacem" />
          <Picker.Item label="Tan-Tan" value="Tan-Tan" />
          <Picker.Item label="Tanger" value="Tanger" />
          <Picker.Item label="Taourirt" value="Taourirt" />
          <Picker.Item label="Taroudant" value="Taroudant" />
          <Picker.Item label="Taza" value="Taza" />
          <Picker.Item label="Tiznit" value="Tiznit" />
          <Picker.Item label="Témara" value="Témara" />
          <Picker.Item label="Tétouan" value="Tétouan" />
        </Picker>
      </View>
      <TouchableOpacity style={styles.loginButton} onPress={handleRegister}>
        <Text style={styles.loginButtonText}>Envoyer</Text>
      </TouchableOpacity>
      {/* Login Button */}
      <TouchableOpacity style={styles.loginButton} onPress={handleLoginButton}>
        <Text style={styles.loginButtonText}>Connexion</Text>
      </TouchableOpacity>
      {/* Login Modal */}
      <Modal visible={showLoginModal} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Authentification</Text>
            <TextInput
              style={styles.input}
              placeholder="Adresse email"
              value={loginEmail}
              onChangeText={setLoginEmail}
            />
            <TextInput
              style={styles.input}
              placeholder="Mot de passe"
              value={loginPassword}
              onChangeText={setLoginPassword}
              secureTextEntry={true}
            />
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text style={styles.loginButtonText}>Connexion</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.forgotPasswordButton} onPress={handleForgotPassword}>
              <Text style={styles.forgotPasswordButtonText}>Mot de passe oublié?</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} onPress={handleCloseLoginModal}>
              <Text style={styles.closeButtonText}>Fermer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Error Modal */}
      <Modal visible={showModal} animationType="fade" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {error === 'Un email de réinitialisation de mot de passe a été envoyé à votre adresse email.' ? (
              <>
                <Text style={styles.modalTitle}>Mot de passe oublié</Text>
                <Text>Entrez l'e-mail pour récupérer le mot de passe:</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Adresse email"
                  value={email}
                  required={true}
                  onChangeText={setEmail}
                />
                <TouchableOpacity style={styles.sendButton} onPress={handleCloseModal}>
                  <Text style={styles.sendButtonText}>Envoyer</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Text style={styles.modalErrorText}>{error}</Text>
                <TouchableOpacity style={styles.closeButton} onPress={handleCloseModal}>
                  <Text style={styles.closeButtonText}>Fermer</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>


    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  fieldContainer: {
    marginBottom: 10,
  },
  fieldLabel: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalErrorText: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
    color: 'red',
  },
  sendButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  closeButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  loginButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  forgotPasswordButton: {
    marginTop: 10,
  },
  forgotPasswordButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default RegisterScreen;
