import React, { useState } from "react";
import { View, Text, TextInput, Image, StyleSheet, Pressable, Alert, ScrollView, Button, Dimensions } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as SecureStore from 'expo-secure-store';
import * as ImagePicker from 'expo-image-picker';
import api from '../../config/api.js';
const { width, height } = Dimensions.get('window');

const EditScreen = ({ navigation }) => {
  const jsonString = SecureStore.getItem("user");
  const storedUser = JSON.parse(jsonString);
  const etecs = {
    "Etec da Zona Leste (Cidade A. E. Carvalho)": {
      cursos: ["Nenhuma", "Administração", "Contabilidade", "Desenvolvimento de Sistemas", "Logística", "Serviços Jurídicos"]
    },
    "Etec de Cidade Tiradentes (Cidade Tiradentes)": {
      cursos: ["Nenhuma", "Administração", "Farmácia", "Nutrição e Dietética", "Química", "Segurança do Trabalho", "Desenvolvimento de Sistemas"]
    },
    "Etec de Guarulhos": {
      cursos: ["Nenhuma", "Administração", "Desenvolvimento de Sistemas"]
    },
    "Etec de Guaianazes (Guaianazes)": {
      cursos: ["Nenhuma", "Administração", "Desenvolvimento de Sistemas", "Edificações", "Eletrônica", "Eletrotécnica", "Nutrição e Dietética",]
    },
    "Etec de Itaquera (Cohab 2)": {
      cursos: ["Nenhuma", "Administração", "Contabilidade", "Desenvolvimento de Sistemas", "Informática"]
    },
    "Etec de Suzano": {
      cursos: ["Nenhuma", "Administração", "Comércio Exterior", "Contabilidade", "Enfermagem", "Eventos", "Química", "Secretariado"]
    },
    "Etec de Tiquatira (Penha)": {
      cursos: ["Nenhuma", "Administração", "Design Gráfico", "Modelagem do Vestuário", "Química"]
    },
    "Etec Itaquera II (Itaquera)": {
      cursos: ["Nenhuma", "Administração", "Desenho de Construção Civil", "Design de Interiores", "Edificações", "Transações Imobiliárias"]
    },
    "Etec Prof. Aprígio Gonzaga (Penha)": {
      cursos: ["Nenhuma", "Administração", "Agenciamento de Viagem", "Comércio Exterior", "Eletromecânica", "Eletrônica", "Guia de Turismo", "Secretariado", "Segurança do Trabalho", "Turismo Receptivo"]
    },
    "Etec São Mateus (São Mateus)": {
      cursos: ["Nenhuma", "Administração", "Eletrônica", "Nutrição e Dietética", "Segurança do Trabalho"]
    }
  };
  const [userData, setUserData] = useState({
    name: storedUser.name,
    profilePictureUrl: storedUser.profilePictureURL,
    backgroundPictureUrl: storedUser.backgroundPictureURL,
    bio: storedUser.bio,
    school: storedUser.school,
    course: storedUser.course
  });
  const [cursos, setCursos] = useState(etecs[storedUser.school]?.cursos || []);
  const [imageUri, setImageUri] = useState(null); // URI local da imagem
  const handleInputChange = (field, value) => {
    setUserData(prevState => ({
      ...prevState,
      [field]: value
    }));
  };

  const handleEtecChange = (etec) => {
    handleInputChange('school', etec);
    setCursos(etecs[etec]?.cursos || []);
    handleInputChange('course', '');
  };

  const allInputsOk = () => {
    if (!userData.name || !userData.profilePictureUrl || !userData.backgroundPictureUrl || !userData.school || userData.school == "Nenhuma" || userData.course == "Nenhuma" || !userData.course) {
      Alert.alert("Por favor, preencha todos os campos.");
      return false;
    }
    return true;
  }

  const updateProfile = async () => {
    if (!allInputsOk()){
      return;
    } else{
      try {
        const response = await api.put('/users/profile/me', userData);
        if (response.status === 200) {
          SecureStore.setItem("user", JSON.stringify(response.data));
          Alert.alert("Usuário editado com sucesso!");
          navigation.navigate('Perfil');
        }
      } catch (error) {
        Alert.alert("Erro: " + error.message);
      }
    }
  }
  

  async function pickImage() {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert("Permissão para acessar a galeria é necessária!");
      return;
    }
  
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 0.8,
    });
  
    if (!result.canceled) {
      setImageUri(result.assets[0].uri); 
      let imageUrl = await uploadImageToCloudinary(result.assets[0].uri);
      setUserData({...userData,
        'profilePictureUrl': imageUrl
      })
    }
  }

  async function uploadImageToCloudinary(imageUri) {
    const cloudName = "dl85nlwfe";
    const uploadPreset = "lacosapp";
    
    const formData = new FormData();
    formData.append("file", {
      uri: imageUri,
      type: "image/jpeg",
      name: "profile_image.jpg",
    });
    formData.append("upload_preset", uploadPreset);
  
    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      console.log(data)
      return data.secure_url; // Retorna a URL da imagem carregada
    } catch (error) {
      console.log(error)
      console.error("Erro ao fazer upload da imagem:", error.response);
      return null;
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
        <Pressable onPress={() => pickImage()}>
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

        <View>
          {/* Picker de Escolas */}
          <Text style={styles.label}>Escola:</Text>
          <View style={styles.inputPicker}>
            <Picker
              selectedValue={userData.school}
              onValueChange={(itemValue) => handleEtecChange(itemValue)}
            >
              <Picker.Item label="Nenhuma" value="Nenhuma" />
              {Object.keys(etecs).map((etec) => (
                <Picker.Item key={etec} label={etec} value={etec} style={styles.pickerItem} />
              ))}
            </Picker>
          </View>

          {/* Picker de Cursos */}
          {userData.school !== "Nenhuma" ? (
            <>
              <Text style={styles.label}>Curso:</Text>
              <View style={styles.inputPicker}>
                <Picker
                  selectedValue={userData.course}
                  onValueChange={(itemValue) => handleInputChange("course", itemValue)}
                >
                  {cursos.map((curso, index) => (
                    <Picker.Item key={index} label={curso} value={curso} style={styles.pickerItem} />
                  ))}
                </Picker>
              </View>
            </>
          ) : (
            null
          )}
        </View>
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
    backgroundColor: "#FFFFFF",
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

export default EditScreen;