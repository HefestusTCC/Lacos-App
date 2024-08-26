import React, { useState } from "react";
import { View, Text, TextInput, Image, StyleSheet, Pressable, Alert } from 'react-native';

const EditScreen = ({ navigation }) => {

  const updateProfile = () => {

  }

  const handleEditPress = () => {
    Alert.alert("Editar Perfil", "Você clicou no botão de editar!");
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={() => navigation.navigate('Perfil')}>
        <Image
          source={require("../../../assets/voltar.png")}
          style={styles.voltar}
        />
      </Pressable>

      <Text style={styles.Publication}>Seu Perfil:</Text>
      <Image
        source={{ uri: user.photoFundo }}
        style={styles.profileFundo}
      />
      <Image
        source={{ uri: user.photoURL }}
        style={styles.profileImage}
      />

      <Image 
        source={require("../../../assets/logo.png")}
        style={styles.divImage}
      />

      <Pressable style={styles.photoEdit} onPress={() => navigation.navigate('Editar')}>
        <Image
          source={{ uri: user.photoEdit }}
        />
      </Pressable>

      <View style={styles.card}>
        <Text style={styles.titles}>Nome:</Text>
        <TextInput
          style={styles.input}
          placeholderTextColor="#000"
        />
        <Text style={styles.titles}>Curso:</Text>
        <TextInput
          style={styles.input}
          placeholderTextColor="#000"
        />
        <Text style={styles.titles}>Descrição:</Text>
        <TextInput
          style={styles.inputDes}
          placeholderTextColor="#000"
        />
        <View style={styles.containerButton}>       
       
        <Pressable onPress={updateProfile} style={styles.ancora}><Text>Enviar</Text></Pressable>
      
      
      </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
    position: "absolute",
    top: 16,
    left: 16,
    width: 35,
    height: 35,
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
    height: 40,
    borderColor: '#000',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
    fontSize:15,
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
