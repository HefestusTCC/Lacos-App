import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const BottomMenu = () => {
  const navigation = useNavigation();

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
      <TouchableOpacity style={[styles.button, styles.createButton]} onPress={() => navigation.navigate('Postar')}>
        <Icon name="add" size={28} color="#ffffff" />
      </TouchableOpacity>

      {/* Botão Notificações */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Notificacoes')}>
        <Icon name="notifications" size={28} color="#333" />
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
    backgroundColor: '#ff6347', // Cor de destaque para o botão de criar
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
});

export default BottomMenu;
