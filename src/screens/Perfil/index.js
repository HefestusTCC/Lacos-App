import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, Pressable, StyleSheet, Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';
const ProfileScreen = ({ navigation }) => {
  const storedUser = JSON.parse(SecureStore.getItem("user"));
  const [user] = useState({
    profilePictureUrl: 'https://static.vecteezy.com/system/resources/thumbnails/005/129/844/small_2x/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg',
    photoFundo: 'https://cdn.leroymerlin.com.br/products/revestimento_para_piscina_brilhante_azul_laguna_15x15cm_86951711_0001_600x600.jpg',
    editar: 'https://cdn-icons-png.flaticon.com/512/1159/1159970.png',
    name: storedUser.name,
    username: storedUser.userName,
    email: storedUser.email,
    course: storedUser.course,
    textPublication: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sapien eros, placerat ut aliquet eget, condimentum a dolor. Cras sed tempus lectus. Duis et massa at magna lobortis sollicitudin. Donec felis orci, elementum sit amet tristique vel, accumsan placerat enim. Sed maximus enim et tellus scelerisque, vitae porta est rhoncus.',
  });

  const handleEdit = () => {
    Alert.alert("Edit Profile", "Aqui você pode implementar a funcionalidade de edição de perfil.");
  };

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
        source={{ uri: user.profilePictureUrl }}
        style={styles.profileImage}
      />

      <Text style={styles.name}>{user.name}</Text>
      <Text style={styles.curso}>{user.course}</Text>

      <View style={styles.editButtonContainer}>
        <Pressable onPress={() => navigation.navigate('Editar')}>
          <Image
            source={{ uri: user.editar }}
            style={styles.editar}
          />
        </Pressable>
      </View>

      <Text style={styles.Publication}>PUBLICAÇÕES</Text>

      {[...Array(5)].map((_, index) => (
        <View key={index} style={styles.card}>
          <Image source={{ uri: user.photoURL }} style={styles.profileImagPublic} />
          <Text style={styles.namePublic}>{user.displayName}</Text>
          <Text style={styles.username}>{user.username}</Text>
          <Text style={styles.textPublication}>{user.textPublication}</Text>
        </View>
      ))}
      
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: "#fff",
  },
  profileImagPublic: {
    position: 'absolute',
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 20,
    backgroundColor: 'black',
  },
  voltar: {  
    position: "absolute",
    top: 16,
    left: 16,
    width: 35,
    height: 35,
  },
  namePublic: {
    left: 80,
    fontSize: 20,
    fontWeight: 'bold',
  },
  username: {
    left: 80,
  },
  textPublication: {
    left: 80,
    top: 15,
    width: '60%',
  },
  card: {
    padding: 20,
    marginTop: 20,
    width: '90%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: '#f9f9f9',
    position: 'relative',
  },
  profileImage: {
    position: 'absolute',
    top: 160,
    left: 20,
    width: 140,
    height: 140,
    borderRadius: 70,
    marginBottom: 20,
    backgroundColor: 'black',
  },
  editar: {
    width: 40,
    height: 40,
  },
  editButtonContainer: {
    position: 'absolute',
    top: 10,
    right: 30,
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
  name: {
    position: 'absolute',
    top: 210,
    left: 180,
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
  },
  curso: {
    position: 'absolute',
    top: 250,
    left: 180,
    fontSize: 17,
    color: 'gray',
  },
  Publication: {
    fontSize: 25,
    fontWeight: 'medium',
    color: 'black',
    marginTop: 310,
  },
});

export default ProfileScreen;
