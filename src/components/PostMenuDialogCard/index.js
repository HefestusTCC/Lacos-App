
import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Pressable
} from 'react-native';
import * as SecureStore from 'expo-secure-store';
const PostMenuDialog = ({ post }) => {
  const [isVisible, setIsVisible] = useState(false);
  const jsonString = SecureStore.getItem("user");
  const storedUser = JSON.parse(jsonString);
  const [userData, setUserData] = useState({
    id: storedUser.id,
    name: storedUser.name,
    username: storedUser.username,
    profilePictureUrl: storedUser.profilePictureURL,
    backgroundPictureUrl: storedUser.backgroundPictureURL,
    bio: storedUser.bio,
    school: storedUser.school,
    course: storedUser.course
  });

  const options = post.author.id == userData.id ? ['Editar', 'Excluir', 'Denunciar'] : ['Denunciar'];
  const handleOptionPress = (option) => {
    Alert.alert(`Você selecionou: ${option}`);
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
          {options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.optionButton}
              onPress={() => handleOptionPress(option)}
            >
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          ))}
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
  },
  optionButton: {
    paddingVertical: 10,
  },
  optionText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007bff',
  },
  optionsButton: {
    marginLeft: 'auto',
  },
  moreOptions: {
    fontSize: 20,
  },
});

export default PostMenuDialog;
