import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  Dimensions,
  ScrollView
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import api from '../../config/api.js';
const { width, height } = Dimensions.get('window');

const Comunidades = () => {


  const navigation = useNavigation(); // Hook para navegação
  const [name, setName] = useState('');
  const [fotoUrl, setFotoUrl] = useState('');
  const [fundoUrl, setFundoUrl] = useState('');
  const [description, setDescription] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const createCommunity = async () => {
    if (!name || !description) {
      Alert.alert("O nome e a descrição da comunidade não podem ficar vazios!");
      return;
    }
    const communityData = {
      name: name,
      communityImageUrl: fotoUrl ? fotoUrl : null,
      bannerUrl: fundoUrl ? fundoUrl : null,
      description: description,
      categories: ['Tecnologia']
    }
    try {
      let response = await api.post('/community', communityData);
      if (response.status == 201) {
        Alert.alert("Sua comunidade será aprovada por um administrador!");
        navigation.goBack();
      }

    } catch (error) {
      console.log(error)
      Alert.alert("Erro ao criar a comunidade", error.response.data.message)
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
      setFotoUrl(imageUrl)
      console.log(fotoUrl)
    }
  }
  async function pickBackgroundImage() {
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
      setFundoUrl(imageUrl);
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
      return data.secure_url; // Retorna a URL da imagem carregada
    } catch (error) {
      console.log(error)
      console.error("Erro ao fazer upload da imagem:", error.response);
      return null;
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Criar Comunidade</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollView}>
        <TouchableOpacity onPress={pickBackgroundImage} style={styles.imageBackground}>
          {fundoUrl ? (
            <Image source={{ uri: fundoUrl }} style={styles.image} />
          ) : (
            <Text style={styles.imagePlaceholder}>Carregar Imagem</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={pickImage} style={styles.communityImage}>
          {fotoUrl ? (
            <Image source={{ uri: fotoUrl }} style={styles.communityImage} />
          ) : (
            <Text style={styles.imagePlaceholder}>Carregar Imagem</Text>
          )}
        </TouchableOpacity>

        <View style={styles.mainContent}>
          <Text style={styles.label}>Nome:</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite o nome da comunidade"
            value={name}
            onChangeText={setName}
          />

          <Text style={styles.label}>Descrição:</Text>
          <TextInput
            style={[styles.input, styles.descricaoInput]}
            placeholder="Digite a descrição da comunidade"
            value={description}
            onChangeText={setDescription}
            multiline
          />

          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
            <TouchableOpacity style={styles.submitButton} onPress={createCommunity}>
              <Text style={styles.submitButtonText}>Criar Comunidade</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
              <Text style={styles.submitButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  mainContent: {
    marginTop: height * 0.1
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 50,
    textAlign: 'center'
  },
  backButton: {
    fontSize: 24,
  },
  settingsButton: {
    fontSize: 24,
  },
  scrollView: {
    flexGrow: 1,
  },
  imageBackground: {
    width: width - 40,
    height: 150,
    backgroundColor: '#d3d3d3',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  communityImage: {
    width: width * 0.3,
    height: width * 0.3,
    backgroundColor: '#d3d3d3',
    borderRadius: 90,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 90,
    marginLeft: 20,
    position: 'absolute',
    borderWidth: 1,
    borderColor: 'white'
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  imagePlaceholder: {
    color: '#888',
    fontSize: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  descricaoInput: {
    height: 80,
    textAlignVertical: 'top',
  },
  submitButton: {
    width: '40%',
    backgroundColor: '#f58523',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    width: '40%',
    backgroundColor: 'red',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    bottom: 0,
    backgroundColor: '#f0f0f0',
    padding: 10,
  },
  navItem: {
    fontSize: 14,
  },
  backButton: {
    padding: 10,
    backgroundColor: '#F4A460',
    alignItems: 'center',
    marginBottom: 20,
    borderRadius: 5,
  },
  backButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },

});

export default Comunidades;