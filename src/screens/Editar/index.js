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

      <Text style={styles.Publication}>Seu Perfil:</Text>
      <Image
        source={{ uri: 'https://cdn.leroymerlin.com.br/products/revestimento_para_piscina_brilhante_azul_laguna_15x15cm_86951711_0001_600x600.jpg' }}
        style={styles.profileFundo}
      />

      <Image
        source={{ uri: storedUser.profilePictureURL }}
        style={styles.profileImage}
      />

      <Image
        source={require("../../../assets/logo.png")}
        style={styles.divImage}
      />

      <View style={styles.card}>
        <Text style={styles.titles}>Nome:</Text>
        <TextInput
          style={styles.input}
          placeholder=""
          value={userData.name}
          onChangeText={(text) => handleInputChange('name', text)}
          placeholderTextColor="#000"
        />
        <Text style={styles.titles}>Url da foto de perfil:</Text>
        <TextInput
          style={styles.input}
          placeholder=""
          value={userData.profilePictureUrl}
          onChangeText={(text) => handleInputChange('profilePictureUrl', text)}
          placeholderTextColor="#000"
        />
        <Text style={styles.titles}>Biografia:</Text>
        <TextInput
          style={styles.input}
          placeholder=""
          value={userData.bio}
          onChangeText={(text) => handleInputChange('bio', text)}
          placeholderTextColor="#000"
        />
        <Text style={styles.titles}>Escola:</Text>
        <TextInput
          style={styles.input}
          placeholder=""
          value={userData.school}
          onChangeText={(text) => handleInputChange('school', text)}
          placeholderTextColor="#000"
        />
        <Text style={styles.titles}>Curso:</Text>
        <TextInput
          style={styles.input}
          placeholder=""
          value={userData.course}
          onChangeText={(text) => handleInputChange('course', text)}
          placeholderTextColor="#000"
        />

        <View style={styles.buttonContainer}>
          <Button title="Atualizar" onPress={updateProfile} color="#89e88f" />
          <Button title="Cancelar" onPress={() => navigation.navigate('Perfil')} color="#FF0000" />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 16,
  },
  profileFundo: {
    position: 'absolute',
    top: 150,
    left: 5,
    width: '97%',
    height: 200,
    borderRadius: 30,
    marginBottom: 20,
  },
  titles: {
    fontSize: 20,
  },
  photoEdit: {
    position: 'absolute',
    top: 350,
    left: 130,
    width: 50,
    height: 40,
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: 'gray',
  },
  voltar: {
    width: "80%",
    borderRadius: 10,
    marginTop: 10,
  },
  profileImage: {
    position: 'absolute',
    top: 280,
    left: 20,
    width: 140,
    height: 140,
    borderRadius: 70,
    marginBottom: 20,
    backgroundColor: 'black',
  },
  card: {
    padding: 20,
    marginTop: 400,
    width: '90%',
    height: 'auto',
    position: 'relative',
  },
  divImage: {
    position: "absolute",
    top: 16,
    right: 16,
    width: 60,
    height: 60,
  },
  Publication: {
    position: 'absolute',
    top: 110,
    left: 16,
    fontSize: 20,
  },
  input: {
    width: "80%",
    height: 40,
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 12,
    paddingHorizontal: 8,
    color: "#000",
  },
  inputDes: {
    height: 80,
    borderColor: '#000',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
  },
});

export default EditScreen;
