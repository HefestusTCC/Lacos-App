import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  Alert,
  Image,
  Pressable,
} from "react-native";
import axios from "axios";
import Perfil from '../screens/Perfil/index.js';

const App = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async () => {
    if (!email || !password) {
      Alert.alert("Por favor, preencha todos os campos.");
      return;
    }

    const userData = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post("https://suaapi.com/endpoint", userData);

      if (response.status === 200) {
        Alert.alert("Usuário encontrado com sucesso!");
        setEmail("");
        setPassword("");
        navigation.navigate(Perfil);
      } else {
        Alert.alert("Erro", "Não foi possível encontrar o usuário. Tente novamente.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Ocorreu um erro ao encontrar o usuário.");
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../../assets/top-corner.png")}
        style={styles.topCorner}
      />
      <Image
        source={require("../../../assets/bottom-corner.png")}
        style={styles.bottomCorner}
      />
      <Text style={styles.title}>
        <Text style={styles.welcome}>Bem Vindo(a) ao</Text>
        {" "}
        <Text style={styles.appName}>Laços</Text>
      </Text>

      <Image style={styles.logo} source={require("../../../assets/logo.png")} />

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
      <View style={styles.containerButton}>
        <Text>Não tem uma conta? Cadastre-se <Pressable onPress={() => navigation.navigate('Cadastro')} style={styles.ancora}>Aqui</Pressable></Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Entrar" onPress={handleSignUp} color="#FF6E15" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // Estilos mantidos como no código original
});

export default App;
