import React, { useState } from "react";
import { View, Text, TextInput, Image, StyleSheet, Pressable, Alert, ScrollView, Button } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import api from '../../config/api.js';

const EditScreen = ({ navigation }) => {
  const jsonString = SecureStore.getItem("user");
  const storedUser = JSON.parse(jsonString);
  const [userData, setUserData] = useState({
    name: storedUser.name,
    profilePictureUrl: storedUser.profilePictureURL,
    bio: storedUser.bio,
    school: storedUser.school,
    course: storedUser.course
  });
  
  const handleInputChange = (field, value) => {
    setUserData(prevState => ({
      ...prevState,
      [field]: value
    }));
  };

  const updateProfile = async () => {
    try {
      const response = await api.put('/users/profile', userData);
      if (response.status === 200) {
        SecureStore.setItem("user", JSON.stringify(response.data));
        Alert.alert("Usuário editado com sucesso!");
        navigation.navigate('Perfil');
      }
    } catch (error) {
      Alert.alert("Erro: " + error.message);
    }
  }

  return (
    <ScrollView style={styles.container}>
      <Pressable onPress={() => navigation.navigate('Perfil')}>
        <Image
          source={require("../../../assets/voltar.png")}
          style={styles.voltar}
        />
      </Pressable>

      <Text style={styles.header}>Editar Perfil</Text>

      <View style={styles.profileContainer}>
        <Image
          source={{ uri: userData.profilePictureUrl }}
          style={styles.profileImage}
        />
        <Pressable onPress={() => Alert.alert("Alterar foto")}>
          <Text style={styles.changePhotoText}>Alterar foto de perfil</Text>
        </Pressable>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Nome:</Text>
        <TextInput
          style={styles.input}
          value={userData.name}
          onChangeText={(text) => handleInputChange('name', text)}
          placeholderTextColor="#FF6E15"
        />

        <Text style={styles.label}>Url da foto de perfil:</Text>
        <TextInput
          style={styles.input}
          value={userData.profilePictureUrl}
          onChangeText={(text) => handleInputChange('profilePictureUrl', text)}
          placeholderTextColor="#FF6E15"
        />

        <Text style={styles.label}>Biografia:</Text>
        <TextInput
          style={styles.input}
          value={userData.bio}
          onChangeText={(text) => handleInputChange('bio', text)}
          placeholderTextColor="#FF6E15"
        />

        <Text style={styles.label}>Escola:</Text>
        <TextInput
          style={styles.input}
          value={userData.school}
          onChangeText={(text) => handleInputChange('school', text)}
          placeholderTextColor="#FF6E15"
        />

        <Text style={styles.label}>Curso:</Text>
        <TextInput
          style={styles.input}
          value={userData.course}
          onChangeText={(text) => handleInputChange('course', text)}
          placeholderTextColor="#FF6E15"
        />

        <View style={styles.buttonContainer}>
          <Pressable style={styles.saveButton} onPress={updateProfile}>
            <Text style={styles.saveButtonText}>Salvar</Text>
          </Pressable>
          <Pressable style={styles.cancelButton} onPress={() => navigation.navigate('Perfil')}>
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF5E1",
  },
  voltar: {
    marginTop: 10,
    marginLeft: 10,
    width: 30,
    height: 30,
  },
  header: {
    fontSize: 24,
    textAlign: 'center',
    marginTop: 20,
    color: "#FF6E15",
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: '#FF6E15',
    borderWidth: 2,
  },
  changePhotoText: {
    color: '#FF6E15',
    marginTop: 10,
  },
  card: {
    padding: 20,
    marginTop: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    color: "#FF6E15",
  },
  input: {
    borderColor: "#FF6E15",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 12,
    padding: 10,
    fontSize: 16,
    color: "#000",
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  saveButton: {
    backgroundColor: "#FF6E15",
    padding: 10,
    borderRadius: 8,
  },
  saveButtonText: {
    color: "#FFF",
    fontSize: 18,
  },
  cancelButton: {
    backgroundColor: "#FF0000",
    padding: 10,
    borderRadius: 8,
  },
  cancelButtonText: {
    color: "#FFF",
    fontSize: 18,
  },
});

export default EditScreen;