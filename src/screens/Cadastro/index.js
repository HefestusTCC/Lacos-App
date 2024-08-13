import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert } from 'react-native';
import {auth} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const App = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [etecName, setEtecName] = useState('');
  const [password, setPassword] = useState('');
  const [course, setCourse] = useState('');

  const handleSignUp = async () => {
    if (!email || !username || !fullName || !etecName || !password || !course) {
      Alert.alert('Por favor, preencha todos os campos.');
      return;
    }

    try {
      // Criar conta de usuário no Firebase Authentication
      const userCredential = await auth().createUserWithEmailAndPassword(email, password);
      const userId = userCredential.user.uid;

      // Salvar dados adicionais no Firestore
      await firestore().collection('users').doc(userId).set({
        email: email,
        username: username,
        fullName: fullName,
        etecName: etecName,
        course: course,
      });

      Alert.alert('Usuário criado com sucesso!');

      // Limpar campos após cadastro
      setEmail('');
      setUsername('');
      setFullName('');
      setEtecName('');
      setPassword('');
      setCourse('');
    } catch (error) {
      Alert.alert('Erro ao criar usuário:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        placeholderTextColor="#FFF5E1"
      />
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        placeholderTextColor="#FFF5E1"
      />
      <TextInput
        style={styles.input}
        placeholder="Nome Completo"
        value={fullName}
        onChangeText={setFullName}
        placeholderTextColor="#FFF5E1"
      />
      <TextInput
        style={styles.input}
        placeholder="Nome da ETEC"
        value={etecName}
        onChangeText={setEtecName}
        placeholderTextColor="#FFF5E1"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor="#FFF5E1"
      />
      <TextInput
        style={styles.input}
        placeholder="Curso"
        value={course}
        onChangeText={setCourse}
        placeholderTextColor="#FFF5E1"
      />
      <View style={styles.buttonContainer}>
        <Button title="Cadastrar" onPress={handleSignUp} color="#FFA07A" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF5E1',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    color: '#FFB347',
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: '#FFA07A',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 12,
    paddingHorizontal: 8,
    backgroundColor: '#FFCCBC',
    color: '#333',
  },
  buttonContainer: {
    width: '80%',
    borderRadius: 8,
  },
});

export default App;