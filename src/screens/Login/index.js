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
import * as SecureStore from 'expo-secure-store';
import SERVER_IP from "../../config/serverConfig";
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
      const response = await axios.post(`${SERVER_IP}/users/login`, userData);
      //console.log(response);
      if (response.status === 200) {
        setEmail("");
        setPassword("");
        SecureStore.setItem("jwt_token", response.data.accessToken);
        SecureStore.setItem("expiration", response.data.expiresIn.toString());
        SecureStore.setItem("user", JSON.stringify(response.data.user));
        navigation.navigate('Perfil');
      } else {
        Alert.alert("Erro", "O e-mail ou senha informados estão incorretos.");
      }
    } catch (error) {
      Alert.alert("Erro de credencial", "O e-mail ou senha informados estão incorretos.");
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
        <Text>Não tem uma conta? <Pressable onPress={() => navigation.navigate('Cadastro')} style={styles.ancora}><Text>Cadastre-se Aqui.</Text></Pressable></Text>
      </View>
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
    backgroundColor: "#FFFFFF",
    padding: 16,
  },

  topCorner: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 100,
    height: 100,
  },
  bottomCorner: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: 100,
    height: 100,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: "center",
    flexDirection: "row",
  },
  welcome: {
    color: "#000",
  },
  appName: {
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
    marginTop: 10,
  },
  ancora: {

  },
  // Estilos mantidos como no código original
});

export default App;
