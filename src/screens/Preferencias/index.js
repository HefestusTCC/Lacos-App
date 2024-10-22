import React, { useState } from 'react';
import { View, Text, Image, Pressable, StyleSheet, ScrollView, Alert } from 'react-native';

const Preferencias = ({ navigation }) => {
  const [selectedPreferences, setSelectedPreferences] = useState({
    memes: false,
    estudos: false,
    geek: false,
    artistas: false,
    literatura: false,
    outros: false,
  });

  const togglePreference = (preference) => {
    setSelectedPreferences((prev) => ({
      ...prev,
      [preference]: !prev[preference],
    }));
  };

  const isSelected = (preference) => selectedPreferences[preference];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Logo */}
      <Image 
        source={require('../../../assets/top-corner.png')}
        style={styles.topCorner} 
        resizeMode="contain"
      />
      <Image 
        source={require('../../../assets/bottom-corner.png')}
        style={styles.bottomCorner} 
        resizeMode="contain"
      />
      <Image 
        source={require('../../../assets/logo.png')}
        style={styles.topRightImage} 
      />

      {/* Contêiner principal para o título, itens e botão */}
      <View style={styles.contentContainer}>
        <Text style={styles.title}>
          Selecione suas <Text style={styles.highlight}>Preferências!</Text>
        </Text>

        <View style={styles.grid}>
          <Pressable onPress={() => togglePreference('memes')} style={styles.item}>
            <View style={styles.innerItem}>
              <Image 
                source={{ uri: 'https://i.pinimg.com/564x/99/ce/24/99ce2499469e75baf6e78e498cf799c6.jpg' }} 
                style={styles.image} 
              />
              <Text style={styles.text}>Memes</Text>
              {isSelected('memes') && <Text style={styles.check}>✔</Text>}
            </View>
          </Pressable>

          <Pressable onPress={() => togglePreference('estudos')} style={styles.item}>
            <View style={styles.innerItem}>
              <Image 
                source={{ uri: 'https://guiadoestudante.abril.com.br/wp-content/uploads/sites/4/2016/10/mesa-estudos-organizar2.jpg?quality=70&strip=info&w=849' }} 
                style={styles.image} 
              />
              <Text style={styles.text}>Estudos</Text>
              {isSelected('estudos') && <Text style={styles.check}>✔</Text>}
            </View>
          </Pressable>

          <Pressable onPress={() => togglePreference('geek')} style={styles.item}>
            <View style={styles.innerItem}>
              <Image 
                source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTj8516Rkady6WOAtHTAoE3hzOtv8M6oHxUIQ&s' }} 
                style={[styles.image, isSelected('geek') && styles.selectedBorder]} 
              />
              <Text style={styles.text}>Geek</Text>
              {isSelected('geek') && <Text style={styles.check}>✔</Text>}
            </View>
          </Pressable>

          <Pressable onPress={() => togglePreference('artistas')} style={styles.item}>
            <View style={styles.innerItem}>
              <Image 
                source={{ uri: 'https://rollingstone.com.br/media/_versions/billie-eilish-the-weeknd-taylor-swift-montagem_widelg.jpg' }} 
                style={styles.image} 
              />
              <Text style={styles.text}>Artistas</Text>
              {isSelected('artistas') && <Text style={styles.check}>✔</Text>}
            </View>
          </Pressable>

          <Pressable onPress={() => togglePreference('literatura')} style={styles.item}>
            <View style={styles.innerItem}>
              <Image 
                source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRH_Lcm9hxzPPhboezIduKEJ4Zmj3pm-sEsag&s' }} 
                style={styles.image} 
              />
              <Text style={styles.text}>Literatura</Text>
              {isSelected('literatura') && <Text style={styles.check}>✔</Text>}
            </View>
          </Pressable>

          <Pressable onPress={() => togglePreference('outros')} style={styles.item}>
            <View style={styles.innerItem}>
              <Image 
                source={{ uri: 'https://as1.ftcdn.net/v2/jpg/00/61/31/78/1000_F_61317812_4x2Iekq0UtaYs5OFMUBpCuzDpke4docY.jpg' }} 
                style={styles.image} 
              />
              <Text style={styles.text}>Outros</Text>
              {isSelected('outros') && <Text style={styles.check}>✔</Text>}
            </View>
          </Pressable>
        </View>

        <Pressable style={styles.button} onPress={() => Alert.alert('Preferências salvas!')}>
          <Text style={styles.buttonText}>Avançar</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 20,
    backgroundColor: '#fff',
  }, 
  bottomCorner: {
    position: 'absolute',
    bottom: 0,     
    left: -3,       
    width: '49%',  
    height: 200,  
  },
  topCorner: {
    position: 'absolute',
    top: -80,     
    right: 0,    
    width: '40%', 
    height: 300,  
  },
  topRightImage: {
    position: 'absolute',
    top: 20,
    right: 10,
    width: 50,
    height: 50,
  },
  contentContainer: {
    top:100,
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20, 
    paddingBottom: 20, 
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold', 
    marginBottom: 20,
    textAlign: 'center',
  },
  highlight: {
    color: '#FF6E15',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center', 
    width: '100%',
  },
  item: {
    width: '35%',
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerItem: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  text: {
    marginTop: 10,
    fontSize: 16,
    textAlign: 'center',
  },
  check: {
    fontSize: 30,
    fontWeight: 'bold', 
    position: 'absolute',
    top: 5,
    right: 5,
    color: '#FF6E15',
  },
  selectedBorder: {
    borderColor: '#FF6E15',
    borderWidth: 2,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#FF6E15',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default Preferencias;
