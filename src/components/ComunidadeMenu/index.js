import React, { useCallback, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Dimensions, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '../../config/api';
const BottomMenuComunidade = ({ idComunidade }) => {
  const navigation = useNavigation();
  const [notificationCount, setNotificationCount] = useState('');

  const getNotificationCount = async () => {
    try {
      const response = await api.get('/notifications/count');
      const data = response.data.data;
      setNotificationCount(data);
    } catch (error) {
      console.log(error);
    }
  }

  useFocusEffect(
    useCallback(() => {
      getNotificationCount(); // Chama a função para carregar as comunidades
    }, [notificationCount])
  );

  return (
    <View style={styles.container}>
      {/* Botão Home */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Timeline')}>
        <Icon name="home" size={28} color="#333" />
      </TouchableOpacity>

      {/* Botão Comunidades */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ListaComunidades')}>
        <Icon name="groups" size={28} color="#333" />
      </TouchableOpacity>

      {/* Botão Criar Post */}
      <TouchableOpacity style={[styles.button, styles.createButton]} onPress={() => navigation.navigate('Postar', { idComunidade: idComunidade })}>
        <Icon name="add" size={28} color="#ffffff" />
      </TouchableOpacity>

      {/* Botão Notificações */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Notificacoes')}>
        <Icon name="notifications" size={28} color="#333" />
        {
          notificationCount > 0 ?
            <View style={styles.bubble}>
              <Text style={{ color: 'white', textAlign: 'center' }}>{notificationCount}</Text>
            </View> : null
        }
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Perfil')}>
        <Icon name="person" size={28} color="#333" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  createButton: {
    backgroundColor: '#ff7f00', // Cor de destaque para o botão de criar
    width: 60,
    height: 60,
    borderRadius: 30,
    position: 'relative',
    bottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: 24,
    color: '#333',
  },
  createIcon: {
    fontSize: 30,
    color: '#ffffff',
  },
  bubble: {
    backgroundColor: 'red',
    borderRadius: 100,
    width: 20,
    marginLeft: -10
  },
});

export default BottomMenuComunidade;
