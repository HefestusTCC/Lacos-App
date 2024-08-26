import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  Alert,
  Image,
  Pressable
} from "react-native";
import axios from "axios"; 


const App = ({navigation}) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [etecName, setEtecName] = useState("");
  const [password, setPassword] = useState("");
  const [course, setCourse] = useState("");

  const handleSignUp = async () => {
    if (!email || !username || !fullName || !etecName || !password || !course) {
      Alert.alert("Por favor, preencha todos os campos.");
      return;
    }

    const createUserData = {
      name: fullName,
      username: username,
      email: email,
      password: password,
      school: etecName,
      course: course,
      birthDate: "2006-06-09",
      preferences: ["Tecnologia"]
    };

    try {
      
      const response = await axios.post("http://179.63.113.7:8080/users/register", createUserData);
      console.log(response.data);
      if (response.status === 201) {
        Alert.alert("Usuário criado com sucesso!");
        setEmail("");
        setUsername("");
        setFullName("");
        setEtecName("");
        setPassword("");
        setCourse("");
        navigation.navigate('Login');
      } else {
        Alert.alert("Erro ao criar usuário. Tente novamente.");
      }
    } catch (error) {
      Alert.alert("Erro ao criar usuário:", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../../assets/logo.png")}
        style={styles.divImage}
      />
      <Text style={styles.title}>
        <Text style={styles.welcome}>Bem Vindo(a) ao</Text>{" "}
        <Text style={styles.appName}>Laços</Text>
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Nome Completo"
        value={fullName}
        onChangeText={setFullName}
      />
      <TextInput
        style={styles.input}
        placeholder="Nome da ETEC"
        value={etecName}
        onChangeText={setEtecName}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Curso"
        value={course}
        onChangeText={setCourse}
      />
      <View style={styles.containerButton}>
        <Text>Já tem conta? <Pressable onPress={() => navigation.navigate('Login')} style={styles.ancora}><Text>Faça login.</Text></Pressable></Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Cadastrar" onPress={handleSignUp} color="#FF6E15" />
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
  divImage: {
    position: "absolute",
    top: 16,
    right: 16,
    width: 60,
    height: 60,
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
    width: "60%",
    borderRadius: 8,
    marginTop: 10,
  },
});

export default App;
