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
  Dimensions
} from "react-native";

import { Picker } from '@react-native-picker/picker';
import axios from "axios";
import SERVER_IP from "../../config/serverConfig";

const App = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [selectedEtec, setSelectedEtec] = useState("Nenhuma");
  const [cursos, setCursos] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");


  const handleEtecChange = (etec) => {
    setSelectedEtec(etec);
    setCursos(etecs[etec]?.cursos || []);
    setSelectedCourse("");
  };

  const etecs = {
    "Etec da Zona Leste (Cidade A. E. Carvalho)": {
      cursos: ["Nenhuma", "Administração", "Contabilidade", "Desenvolvimento de Sistemas", "Logística", "Serviços Jurídicos"]
    },
    "Etec de Cidade Tiradentes (Cidade Tiradentes)": {
      cursos: ["Nenhuma", "Administração", "Farmácia", "Nutrição e Dietética", "Química", "Segurança do Trabalho"]
    },
    "Etec de Guarulhos": {
      cursos: ["Nenhuma", "Administração", "Desenvolvimento de Sistemas"]
    },
    "Etec de Guaianazes (Guaianazes)": {
      cursos: ["Nenhuma", "Administração", "Desenvolvimento de Sistemas", "Edificações", "Eletrônica", "Eletrotécnica", "Nutrição e Dietética",]
    },
    "Etec de Itaquera (Cohab 2)": {
      cursos: ["Nenhuma", "Administração", "Contabilidade", "Desenvolvimento de Sistemas", "Informática"]
    },
    "Etec de Suzano": {
      cursos: ["Nenhuma", "Administração", "Comércio Exterior", "Contabilidade", "Enfermagem", "Eventos", "Química", "Secretariado"]
    },
    "Etec de Tiquatira (Penha)": {
      cursos: ["Nenhuma", "Administração", "Design Gráfico", "Modelagem do Vestuário", "Química"]
    },
    "Etec Itaquera II (Itaquera)": {
      cursos: ["Nenhuma", "Administração", "Desenho de Construção Civil", "Design de Interiores", "Edificações", "Transações Imobiliárias"]
    },
    "Etec Prof. Aprígio Gonzaga (Penha)": {
      cursos: ["Nenhuma", "Administração", "Agenciamento de Viagem", "Comércio Exterior", "Eletromecânica", "Eletrônica", "Guia de Turismo", "Secretariado", "Segurança do Trabalho", "Turismo Receptivo"]
    },
    "Etec São Mateus (São Mateus)": {
      cursos: ["Nenhuma", "Administração", "Eletrônica", "Nutrição e Dietética", "Segurança do Trabalho"]
    }
  };

  const handleSignUp = async () => {
    if (!email || !username || !fullName || !password || !selectedCourse || !selectedEtec || selectedCourse == 'Nenhuma') {
      console.log(createUserData);
      Alert.alert("Por favor, preencha todos os campos.");
      return;
    }

    const createUserData = {
      name: fullName,
      username: username,
      email: email,
      password: password,
      school: selectedEtec,
      course: selectedCourse,
      birthDate: "2006-06-09",
      preferences: ["Tecnologia"]
    };

    try {
      const response = await axios.post(`${SERVER_IP}/users/register`, createUserData);
      console.log(response.data);
      if (response.status === 201) {
        Alert.alert("Usuário criado com sucesso!");
        setEmail("");
        setUsername("");
        setFullName("");
        selectedEtec("");
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
        <Text style={styles.welcome}>Bem Vindo(a) ao </Text>
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
      <View>
        {/* Picker de Escolas */}
        <Text>Escolha a Escola:</Text>
        <View style={styles.pickerBox}>
          <Picker
            style={styles.picker}
            selectedValue={selectedEtec}
            onValueChange={(itemValue) => handleEtecChange(itemValue)}
          >
            <Picker.Item label="Nenhuma" value="Nenhuma" />
            {Object.keys(etecs).map((etec) => (
              <Picker.Item key={etec} label={etec} value={etec} style={styles.pickerItem} />
            ))}
          </Picker>
        </View>

        {/* Picker de Cursos */}
        {selectedEtec !== "Nenhuma" ? (
          <>
            <Text>Escolha o Curso:</Text>
            <View style={styles.pickerBox}>
              <Picker
                style={styles.picker}
                selectedValue={selectedCourse} // Pode controlar o curso selecionado aqui
                onValueChange={(itemValue) => setSelectedCourse(itemValue)}
              >
                {cursos.map((curso, index) => (
                  <Picker.Item key={index} label={curso} value={curso} style={styles.pickerItem} />
                ))}
              </Picker>
            </View>
          </>
        ) : (
          null
        )}
      </View>

      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
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
const windowWidth = Dimensions.get('window').width;
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
    width: (windowWidth * 0.8),
    height: 40,
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 12,
    paddingHorizontal: 8,
    color: "#000",
  },
  picker: {
  },
  pickerBox: {
    width: (windowWidth * 0.8),
    height: 40,
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 12,
    color: "#000",
    
    textAlign: 'center'
  },
  pickerItem: {
    width: 40,
  },
  buttonContainer: {
    width: "60%",
    borderRadius: 8,
    marginTop: 10,
  },
});

export default App;
