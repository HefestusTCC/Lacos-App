import React, { useState, useCallback, startTransition } from 'react';
import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity, ScrollView, Pressable, Alert, Modal, Dimensions, FlatList } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { useFocusEffect } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import api from '../../config/api';
const { width, height } = Dimensions.get('window');
import BottomMenu from '../../components/BottomMenu';
import PostCard from '../../components/PostCard';

const ProfileScreen = ({ navigation }) => {

  const [user, setUser] = useState({
  });
  const [profile, setProfile] = useState('');
  const securedUser = SecureStore.getItem('user');
  var userId = JSON.parse(securedUser).id;

  const loadUserData = async () => {
    try {
      const jsonString = await SecureStore.getItemAsync('user');
      if (jsonString) {
        const storedUser = JSON.parse(jsonString);
        setUser((prevUser) => ({
          ...prevUser,
          id: storedUser.id,
          profilePictureURL: storedUser.profilePictureURL,
          name: storedUser.name,
          course: storedUser.course,
          username: storedUser.username,
          school: storedUser.school,
          course: storedUser.course,
          backgroundPicture: storedUser.backgroundPictureURL,
          bio: storedUser.bio
        }));
      }
    } catch (error) {
      Alert.alert('Erro ao carregar dados: ' + error.message);
    }
  };
  const [posts, setPosts] = useState([]);
  const handleDeletePost = (postId) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
  };

  const getProfileData = async () => {
    try {
      const response = await api.get(`/users/${userId}`);
      if (response.status == 200) {
        return response.data.data;
      }
    } catch (error) {
      Alert.alert("Erro ao carregar o perfil");
    }
  }

  useFocusEffect(
    useCallback(() => {
      const profileData = async () => {
        let data = await getProfileData();
        setProfile(data);
        if (data.posts) {
          setPosts(data.posts); // Defina os posts aqui apenas quando estiverem disponíveis
        }
      }
      loadUserData();
      profileData();
    }, [navigation])
  );

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>

        <Pressable onPress={() => navigation.navigate('Timeline')}>
          <Image
            source={require("../../../assets/voltar.png")}
            style={styles.voltar}
          />
        </Pressable>
        <Image
          source={{ uri: user.backgroundPicture }}
          style={styles.profileFundo}
        />
        <Image
          source={{ uri: user.profilePictureURL }}
          style={styles.profileImage}
        />
        <Pressable style={styles.editarPerfil} onPress={() => navigation.navigate('Editar')}>
          <Text style={styles.editarPerfilTexto}>Editar Perfil</Text>
        </Pressable>
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.username}>@{user.username}</Text>
          <Text style={styles.quote}>{user.bio}</Text>
          <Text style={styles.title}>{user.course}</Text>
          <Text style={styles.ct}>{user.school}</Text>
          <View style={styles.seguindoContainer}>
            <Text style={styles.seguindoNumeros}><Text style={styles.numero}>{profile.followingCount}</Text> Seguindo</Text>
            <Text style={styles.seguindoNumeros}><Text style={styles.numero}>{profile.followersCount}</Text> Seguidores</Text>
          </View>
        </View>


        {/* Publicação */}
        <Text style={styles.Publication}>PUBLICAÇÕES</Text>
        <View>
          {
            posts.size == 0 ? <Text>O usuário não possui posts.</Text> :
              <FlatList
                data={posts}
                renderItem={(item) => <PostCard post={item.item} navigation={navigation} handleDeletePost={handleDeletePost}></PostCard>}
                keyExtractor={item => item.id.toString()}
                style={styles.posts}
              />
          }
        </View>

      </ScrollView>
      <BottomMenu></BottomMenu>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: "white",
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
    marginTop: height * 0.1,
    width: '100%',
    paddingLeft: 25,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 200,
  },
  title: {
    fontSize: 18,
    color: 'gray',
    width: 200,
    marginBottom: 8,
  },
  pronouns: {
    fontSize: 16,
    marginBottom: 5,
  },
  ct: {
    fontSize: 16,
    marginBottom: 5,
    color: 'black',
  },
  quote: {
    fontSize: 14,
    fontStyle: 'italic',
    marginBottom: 10,
  },
  editButtonContainer: {

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
    width: width * 0.8,
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
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },

  newButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: height * 0.02,
  },

  profileInfo: {
    flex: 1,
  },

  posts: {
    marginBottom: 40,
    width: width - 15
  },
  seguindoContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  seguindoNumeros: {
    fontSize: 15
  },
  numero: {
    fontSize: 15,
    fontWeight: 'bold'
  },
  editarPerfil: {
    minWidth: 100,
    position: 'absolute',
    top: 220,
    right: 25,
    borderRadius: 100,
    padding: 10,
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: 'orange'
  },
  editarPerfilTexto: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  }
});

export default ProfileScreen;
