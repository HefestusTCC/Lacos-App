import React, { useState } from "react";
import { View, Text, TextInput, Image, StyleSheet, Pressable, Alert, ScrollView, Button } from 'react-native';


const Adicionar_Comunidade = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <Pressable onPress={() => navigation.navigate('ListaComunidades')}>{}
        <Image
          source={require("../../../assets/voltar.png")}
          style={styles.voltar}
        />
      </Pressable>

      <Text style={styles.header}>Adicionar Comunidade</Text>

      <View style={styles.profileContainer}>
        <Image
          source={{ }} //futura imagem de perfil comunidade
          style={styles.profileImage}
        />
        <Pressable onPress={() => Alert.alert("Alterar foto")}>
          <Text style={styles.changePhotoText}>foto da comunidade</Text>
        </Pressable>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Nome da comunidade:</Text>
        <TextInput
          style={styles.input}
          //value={}
          onChangeText={(text) => handleInputChange('name', text)}

        />

        <Text style={styles.label}>Url da foto da comunidade:</Text>
        <TextInput
          style={styles.input}
          //value={}
          onChangeText={(text) => handleInputChange('profilePictureUrl', text)}
        />

        <Text style={styles.label}>Url da foto de fundo:</Text>
        <TextInput
          style={styles.input}
          //value={}
          onChangeText={(text) => handleInputChange('backgroundPictureUrl', text)}
        />

        <Text style={styles.label}>Descrição: </Text>
        <TextInput
          style={styles.input_descricao}
          //value={}
          multiline={true}
          onChangeText={(text) => handleInputChange('', text)}
          
        />
        
        <View style={styles.buttonContainer}>
          <Pressable style={styles.saveButton} onPress={"#"}>
            <Text style={styles.saveButtonText}>Salvar</Text>
          </Pressable>
          <Pressable style={styles.cancelButton} onPress={() => navigation.navigate('Perfil')}>
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  voltar: {
    marginTop: 50,
    marginLeft: 10,
    width: 22,
    height: 22,
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
  input_descricao: {
    fontSize: 18,
    marginBottom: 2,
    color: "#000",
    height: 100,
    borderWidth: 1,  
    padding: 10,  
    textAlignVertical: "top", 
    borderRadius: 8,
    borderColor:"#FF6E15"
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
  inputPicker: {
    borderColor: "#FF6E15",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 12,
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

export default Adicionar_Comunidade;