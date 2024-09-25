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
import { Picker } from '@react-native-picker/picker';
import axios from "axios";
import SERVER_IP from "../../config/serverConfig";

const App = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [etecName, setEtecName] = useState(""); // Estado para o nome da ETEC
  const [password, setPassword] = useState("");
  const [course, setCourse] = useState("");
  const [selectedEtec, setSelectedEtec] = useState("Nenhuma");
  const [cursos, setCursos] = useState([]);

  const handleEtecChange = (etec) => {
    setSelectedEtec(etec);
    setCursos(etecs[etec]?.cursos || []); // Atualiza o picker de cursos, se a escola for válida
  };

  let etecs = {
    "Etec da Zona Leste (Cidade A. E. Carvalho)": {
      cursos: ["Administração", "Contabilidade", "Desenvolvimento de Sistemas", "Logística" , "Serviços Jurídicos"]
    },
    "Etec de Cidade Tiradentes (Cidade Tiradentes)": {
      cursos: ["Administração", "Farmácia", "Nutrição e Dietética", "Química", "Segurança do Trabalho"]
    },
    "Etec de Guarulhos": {
      cursos: ["Administração", "Desenvolvimento de Sistemas"]
    },
    "Etec de Guaianazes (Guaianazes)": {
      cursos: ["Administração", "Desenvolvimento de Sistemas","Edificações","Eletrônica","Eletrotécnica","Nutrição e Dietética",]
    },
    "Etec de Itaquera (Cohab 2)": {
      cursos: ["Administração", "Contabilidade","Desenvolvimento de Sistemas","Informática"]
    },
    "Etec de Suzano": {
      cursos: ["Administração", "Comércio Exterior","Contabilidade","Enfermagem","Eventos","Química","Secretariado"]
    },
    "Etec de Tiquatira (Penha)": {
      cursos: ["Administração", "Design Gráfico","Modelagem do Vestuário","Química"]
    },
    "Etec Itaquera II (Itaquera)": {
      cursos: ["Administração", "Desenho de Construção Civil","Design de Interiores","Edificações","Transações Imobiliárias"]
    },
    "Etec Prof. Aprígio Gonzaga (Penha)": {
      cursos: ["Administração", "Agenciamento de Viagem","Comércio Exterior","Eletromecânica","Eletrônica","Guia de Turismo","Secretariado","Segurança do Trabalho","Turismo Receptivo"]
    },
    "Etec São Mateus (São Mateus)": {
      cursos: ["Administração", "Eletrônica","Nutrição e Dietética","Segurança do Trabalho"]
    }
  };

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
      const response = await axios.post(`${SERVER_IP}/users/register`, createUserData);
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
      <View>
        {/* Picker de Escolas */}
        <Text>Escolha a Escola:</Text>
        <Picker
          selectedValue={selectedEtec}
          onValueChange={(itemValue) => handleEtecChange(itemValue)}
        >
          <Picker.Item label="Nenhuma" value="Nenhuma" />
          {Object.keys(etecs).map((etec) => (
            <Picker.Item key={etec} label={etec} value={etec} />
          ))}
        </Picker>

        {/* Picker de Cursos */}
        {selectedEtec !== "Nenhuma" ? (
          <>
            <Text>Escolha o Curso:</Text>
            <Picker
              selectedValue={null} // Pode controlar o curso selecionado aqui
              onValueChange={(itemValue) => console.log("Curso selecionado:", itemValue)}
            >
              {cursos.map((curso, index) => (
                <Picker.Item key={index} label={curso} value={curso} />
              ))}
            </Picker>
          </>
        ) : (
          <Text>Selecione uma escola para ver os cursos.</Text>
        )}
      </View>

      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />


      <Picker
        selectedValue={course}
        style={styles.input}
        onValueChange={(itemValue) => setCourse(itemValue)}
      >
        <Picker.Item label="Selecione um curso" value="" />
        <Picker.Item label="Administração" value="Administração" />
        <Picker.Item label="Agenciamento de Viagem" value="Agenciamento de Viagem" />
        <Picker.Item label="Comércio Exterior" value="Comércio Exterior" />
        <Picker.Item label="Contabilidade" value="Contabilidade" />
        <Picker.Item label="Desenho de Construção Civil" value="Desenho de Construção Civil" />
        <Picker.Item label="Desenvolvimento de Sistemas" value="Desenvolvimento de Sistemas" />
        <Picker.Item label="Design de Interiores" value="Design de Interiores" />
        <Picker.Item label="Design Gráfico" value="Design Gráfico" />
        <Picker.Item label="Edificações" value="Edificações" />
        <Picker.Item label="Eletrônica" value="Eletrônica" />
        <Picker.Item label="Eletrotécnica" value="Eletrotécnica" />
        <Picker.Item label="Enfermagem" value="Enfermagem" />
        <Picker.Item label="Eventos" value="Eventos" />
        <Picker.Item label="Farmácia" value="Farmácia" />
        <Picker.Item label="Guia de Turismo" value="Guia de Turismo" />
        <Picker.Item label="Informática" value="Informática" />
        <Picker.Item label="Logística" value="Logística" />
        <Picker.Item label="Mecânica" value="Mecânica" />
        <Picker.Item label="Modelagem do Vestuário" value="Modelagem do Vestuário" />
        <Picker.Item label="Nutrição e Dietética" value="Nutrição e Dietética" />
        <Picker.Item label="Recursos Humanos" value="Recursos Humanos" />
        <Picker.Item label="Secretariado" value="Secretariado" />
        <Picker.Item label="Segurança do Trabalho" value="Segurança do Trabalho" />
        <Picker.Item label="Serviços Jurídicos" value="Serviços Jurídicos" />
        <Picker.Item label="Transações Imobiliárias" value="Transações Imobiliárias" />
        <Picker.Item label="Turismo Receptivo" value="Turismo Receptivo" />
      </Picker>

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
