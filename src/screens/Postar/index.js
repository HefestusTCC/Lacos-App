import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native';

const Index = () => {
  const [text, setText] = useState('');

  return (
   
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 100,
     

    }}>
      <View style={{
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        margin: 20,
      }}>
        <Text style={{ fontSize: 24,  marginRight: 95 }}> Vem no Laço </Text>

        <Image source={require("../../../assets/logo.png")} style={{ width: 60, height: 60, marginLeft: 0 }} />
      </View>

      <TextInput
        placeholder="Digite algo..."
        style={{
          width: '70%',
          height: 200,
          borderWidth: 2,
          borderRadius: 10,
          padding: 10,
          fontSize: 16,
          flexGrow: 1,
          maxHeight: 80,
        }}
        multiline={true}
        numberOfLines={10}
        value={text}
        onChangeText={(text) => setText(text)}
      />

      <TouchableOpacity style={{
        backgroundColor: '#ff7f00',
        padding: 15,
        borderRadius: 10,
        width: '40%',
        marginTop: 20,
        alignSelf: 'center',
      }}>
        <Text style={{ fontSize: 18, color: '#fff', textAlign: 'center', }}>Enviar</Text>
      </TouchableOpacity>
    </View>
   
  );
};

export default Index;