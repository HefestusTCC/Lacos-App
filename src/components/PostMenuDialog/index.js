
import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Pressable,
  Dimensions
} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
const { width, height } = Dimensions.get('window');
const PostMenuDialog = ({ post, navigation }) => {
  const [isVisible, setIsVisible] = useState(false);
  const jsonString = SecureStore.getItem("user");
  const storedUser = JSON.parse(jsonString);
  const userData = {
    id: storedUser.id,
    name: storedUser.name,
    username: storedUser.username,
    profilePictureUrl: storedUser.profilePictureURL,
    backgroundPictureUrl: storedUser.backgroundPictureURL,
    bio: storedUser.bio,
    school: storedUser.school,
    course: storedUser.course
  };

  const options = post.author.id == userData.id ? ['Editar', 'Excluir', 'Denunciar'] : ['Denunciar'];
  const handleOptionPress = (option) => {
    switch(option){
      case "Editar":
        navigation.navigate('EditarPost', {post: post})
        break;
    }
    onClose();
  };

  const onClose = () => {
    setIsVisible(!isVisible);
  }

  const openMenu = () => {
    setIsVisible(true);
  }

  return (

    <>
      <Pressable onPress={openMenu} style={styles.optionsButton}>
        <Text style={styles.moreOptions}>...</Text>
      </Pressable>
      <Modal
        transparent={true}
        visible={isVisible}
        animationType="fade"
        onRequestClose={onClose}
      >
        <TouchableOpacity style={styles.overlay} onPress={onClose} />
        <View style={styles.modalContent}>
          {
            options.map((option, index) => {
              if (option == "Editar") {
                return (
                  <TouchableOpacity
                    key={index}
                    style={styles.optionButton}
                    onPress={() => handleOptionPress(option)}
                  >
                    <MaterialIcons name="edit" size={24} color="black" />
                    <Text style={styles.optionText}>{option}</Text>
                  </TouchableOpacity>
                )
              }
              if (option == "Excluir") {
                return (
                  <TouchableOpacity
                    key={index}
                    style={styles.optionButton}
                    onPress={() => handleOptionPress(option)}
                  >
                    <MaterialIcons name="delete" size={24} color="red" />
                    <Text style={styles.optionText}>{option}</Text>
                  </TouchableOpacity>
                )
              }
              if (option == "Denunciar") {
                return (
                  <TouchableOpacity
                    key={index}
                    style={styles.optionButton}
                    onPress={() => handleOptionPress(option)}
                  >
                    <FontAwesome name="flag" size={24} color="orange" />
                    <Text style={styles.optionText}>{option}</Text>
                  </TouchableOpacity>
                )
              }
            }
            )
          }
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    display: 'flex',
    flexDirection: 'column',
  },
  optionButton: {
    paddingVertical: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%'
  },
  optionText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    marginLeft: 15
  },
  optionsButton: {
    marginLeft: 'auto',
  },
  moreOptions: {
    fontSize: 20,
  },
  
});

export default PostMenuDialog;
