import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert } from 'react-native';

const App = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    if (!email || !password) {
      Alert.alert('Por favor, preencha todos os campos.');
      return;
    }

    // Simulando o armazenamento dos dados localmente
    const userData = {
      email: email,
      password: password,
    };

    Alert.alert('Usuário criado com sucesso!', JSON.stringify(userData));
    
    // Limpar campos após cadastro
    setEmail('');
    setPassword('');
  };

  return (
    <View style={styles.container}>
      
      <Text style={styles.title}>Bem Vindo(a) ao Laços</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        placeholderTextColor="#000"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor="#000"
      />
      <View style={styles.buttonContainer}>
        <Button title="Entrar" onPress={handleSignUp} color="#FF6E15" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF5E1",
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    color: "#FF6E15",
  },
  input: {
    width: "80%",
    height: 40,
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 12,
    paddingHorizontal: 8,
    color: "#000",
  },
  buttonContainer: {
    width: "80%",
    borderRadius: 10,
  },
});

export default App;