import React, { useState, useEffect } from 'react';
import { View, Text, Image, Button, StyleSheet, Alert } from 'react-native';

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: user.photoURL || 'https://via.placeholder.com/150' }}
        style={styles.profileImage}
      />
      <Text style={styles.name}>{user.displayName || 'User Name'}</Text>
      <Text style={styles.description}>
        {user.email || 'This is a brief description of the user.'}
      </Text>
      <Button title="Edit Profile" onPress={handleEdit} color={styles.button.color} />
      <Button title="Delete Account" color={styles.deleteButton.color} onPress={handleDeleteAccount} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#F8C291', 
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#F76C6C', 
  },
  description: {
    fontSize: 16,
    color: '#F5A623', 
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    color: '#F5A623', 
  },
  deleteButton: {
    color: '#F76C6C', 
  },
});

export default ProfileScreen;