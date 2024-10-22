import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native';
import api from '../../config/api.js';
const Index = () => {
    const [text, setText] = useState(null);
    const [image, setImage] = useState(null);
    const createPost = async () => {
        if (!text) {
            Alert.alert("Um post precisa de conteúdo");
        }
        var postData = {
            content: text,
            image: image
        }
        if (!image) {
            postData = {
                content: text
            }
        }
        try {
            const response = await api.post(`/post/${id}/comment`, commentData);
            if (response.status == 201) {
                Alert.alert("Comentário criado com sucesso");
                return response.data.data.comments;
            }
        } catch (error) {
            Alert.alert("Erro ao criar comentário", error.response.data.message)
        }
        setNewComment('');
    }
}
const submit = () => {

}
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
            <Text style={{ fontSize: 24, marginRight: 95 }}> Vem no Laço </Text>

            <Image source={require("../../../assets/logo.png")} style={{ width: 60, height: 60, marginLeft: 0 }} />
        </View>
        <TextInput
            placeholder='Url Imagem'
            style={{
                width: '70%',
                height: 50,
                borderWidth: 1,
                borderRadius: 10,
                padding: 10,
                fontSize: 16,
                margin: 6
            }}
            value={image}
            onChangeText={setImage}
        />
        <TextInput
            placeholder="Digite algo..."
            style={{
                width: '70%',
                height: 120,
                borderWidth: 1,
                borderRadius: 10,
                padding: 10,
                fontSize: 16,
                flexGrow: 1,
                maxHeight: 120,
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
        }}
            onPress={createPost}
        >
            <Text style={{ fontSize: 18, color: '#fff', textAlign: 'center', }}>Postar</Text>
        </TouchableOpacity>
    </View>

);
};

export default Index;