import React, { useState, useCallback } from 'react';
import { View, Text, Image, ScrollView, Pressable, StyleSheet, Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { useFocusEffect } from '@react-navigation/native';

const ProfileScreen = ({ navigation }) => {
  const [user, setUser] = useState({
    profilePictureURL:'https://as2.ftcdn.net/v2/jpg/03/49/49/79/1000_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg',
    suggestion1ImageURL:'https://i1.sndcdn.com/artworks-000476135742-9j32r5-t500x500.jpg',
    suggestion2ImageURL:'https://img.assinaja.com/upl/lojas/mundosinfinitos/imagens/foto-one-piece.png',
    suggestion3ImageURL:'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQJeZIThDjAfoSa4tzLwHDrx-xzp1Ye6Dd8AFhLoJqUzfRZS7da',
    PublicacaoImagemURL:'https://s5.static.brasilescola.uol.com.br/be/2022/10/meme-joelma.jpg',
    photoFundo: 'https://cdn.leroymerlin.com.br/products/revestimento_para_piscina_brilhante_azul_laguna_15x15cm_86951711_0001_600x600.jpg',
    editar: 'https://cdn-icons-png.flaticon.com/512/1159/1159970.png',
    textPublication: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sapien eros, placerat ut aliquet eget, condimentum a dolor.',
  });

  const loadUserData = async () => {
    try {
      const jsonString = await SecureStore.getItemAsync('user');
      if (jsonString) {
        const storedUser = JSON.parse(jsonString);
        setUser((prevUser) => ({
          ...prevUser,
          profilePictureURL: storedUser.profilePictureURL,
          name: storedUser.name,
          course: storedUser.course,
          username: storedUser.username,
        }));
      }
    } catch (error) {
      Alert.alert('Erro ao carregar dados: ' + error.message);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadUserData();
    }, [navigation])
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Pressable onPress={() => navigation.navigate('Login')}>
        <Image
          source={require("../../../assets/voltar.png")}
          style={styles.voltar}
        />
      </Pressable>
      <Image
        source={{ uri: user.photoFundo }}
        style={styles.profileFundo}
      />
      <Image
        source={{ uri: user.profilePictureURL }}
        style={styles.profileImage}
      />
<View style={styles.infoContainer}>
      <Text style={styles.name}>Maria Andrade
      <Text style={styles.pronouns}> ela/dela</Text></Text>
      <Text style={styles.title}>Desenvolvimento de Sistemas</Text>
      <Text style={styles.ct}>CT📚</Text>
      <Text style={styles.quote}>Love 💖 and Peace ✌️</Text>
      </View>
      <View style={styles.editButtonContainer}>
        <Pressable onPress={() => navigation.navigate('Editar')}>
          <Image
            source={{ uri: user.editar }}
            style={styles.editar}
          />
        </Pressable>
      </View>

      {/* Publicação */}
      <Text style={styles.Publication}>PUBLICAÇÕES</Text>

      <View style={styles.newPublication}>
        <View style={styles.header}>
          <Image
            source={{ uri: user.profilePictureURL   }}
            style={styles.userImage}
          />
          <View>
            <Text style={styles.userName}>Maria Eduarda</Text>
            <Text style={styles.userHandle}>@adardao</Text>
          </View>
          <Pressable onPress={() => Alert.alert('Opções')}>
            <Text style={styles.moreOptions}>...</Text>
          </Pressable>
        </View>
        <Text style={styles.publicationText}>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Text>
      </View>
      

      {/* Sugestões*/}
      <Text style={styles.suggestionsTitle}>Sugestões</Text>
      <View style={styles.suggestionsContainer}>
        <View style={styles.suggestionItem}>
          <Image
            source={{ uri: user.suggestion1ImageURL  }}
            style={styles.suggestionImage}
          />
          <Text>@enzoZL</Text>
          <Pressable style={styles.followButton} onPress={() => Alert.alert('Seguir')}>
            <Text style={styles.followButtonText}>Seguir</Text>
          </Pressable>
        </View>
        <View style={styles.suggestionItem}>
          <Image
            source={{ uri: user.suggestion2ImageURL  }}
            style={styles.suggestionImage}
          />
          <Text>@anthonyJR</Text>
          <Pressable style={styles.followButton} onPress={() => Alert.alert('Seguir')}>
            <Text style={styles.followButtonText}>Seguir</Text>
          </Pressable>
        </View>
        <View style={styles.suggestionItem}>
          <Image
            source={{ uri: user.suggestion3ImageURL  }}
            style={styles.suggestionImage}
          />
          <Text>@belleGirl</Text>
          <Pressable style={styles.followButton} onPress={() => Alert.alert('Seguir')}>
            <Text style={styles.followButtonText}>Seguir</Text>
          </Pressable>
        </View>
      </View>

      {/* Publicação */}
      <View style={styles.newPublication}>
        <View style={styles.header}>
          <Image
            source={{ uri: user.profilePictureURL   }}
            style={styles.userImage}
          />
          <View>
            <Text style={styles.userName}>Maria Eduarda</Text>
            <Text style={styles.userHandle}>@adardao</Text>
          </View>
          <Pressable onPress={() => Alert.alert('Opções')}>
            <Text style={styles.moreOptions}>...</Text>
          </Pressable>
        </View>
        <Text style={styles.publicationText}>Sextou com s de churrasco</Text>
        <Image
          source={{ uri: user.PublicacaoImagemURL  }}
          style={styles.publicationImage}
        />
      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: "#fff",
  },
  voltar: {
    position: "absolute",
    top: 6,
    right: 16, 
    width: 35,
    height: 35,
  },
  profileFundo: {
    position: 'absolute',
    top: 5,
    left: 5,
    width: '97%',
    height: 200,
    borderRadius: 30,
    marginBottom: 20,
  },
  profileImage: {
    position: 'absolute',
    top: 160,
    left: 20,
    width: 120,
    height: 120,
    borderRadius: 100,
    borderWidth: 5,
    borderColor: '#fff',
  }, 
  infoContainer: {
    alignItems: 'flex-end',  
    justifyContent: 'flex-start', 
    width: '100%', 
    paddingRight: 25, 
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 200,
  },
  title: {
    fontSize: 18,
    color: 'gray',
    marginBottom: 5,
  },
  pronouns: {
    fontSize: 16,
    marginBottom: 5,
  },
  ct: {
    fontSize: 16,
    marginBottom: 5,
    color: '#4CAF50',
  },
  quote: {
    fontSize: 14,
    fontStyle: 'italic',
    marginBottom: 10,
  },
  editButtonContainer: {
    position: 'absolute',
    top: 160,
    right: 20,
  },
  editar: {
    width: 40,
    height: 40,
  },
  Publication: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  card: {
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 10,
    width: '90%',
    marginBottom: 20,
  },
  namePublic: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  username: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 10,
  },
  textPublication: {
    fontSize: 14,
  },
  suggestionsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  suggestionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
  },
  suggestionItem: {
    alignItems: 'center',
  },
  suggestionImage: {
    width: 90,
    height: 90,
    borderRadius: 50,
  },
  followButton: {
    marginTop: 5,
    backgroundColor: '#FF6E15',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  followButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  newPublication: {
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 10,
    width: '90%',
    marginTop: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  userHandle: {
    fontSize: 14,
    color: 'gray',
  },
  moreOptions: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'flex-end',
  },
  publicationText: {
    fontSize: 16,
    marginVertical: 10,
  },
  publicationImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
});

export default ProfileScreen;
