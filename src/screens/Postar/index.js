import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, Alert, StyleSheet, Dimensions, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '../../config/api.js';
import * as ImagePicker from 'expo-image-picker';
const { width, height } = Dimensions.get('window');
const Index = ({ navigation, route }) => {
    const [text, setText] = useState(null);
    const [image, setImage] = useState(null);
    const idComunidade = route?.params?.idComunidade;

    async function pickImage() {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permissionResult.granted) {
            alert("Permissão para acessar a galeria é necessária!");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            quality: 0.8,
        });

        if (!result.canceled) {
            let imageUrl = await uploadImageToCloudinary(result.assets[0].uri);
            setImage(imageUrl)
        }
    }
    async function uploadImageToCloudinary(imageUri) {
        const cloudName = "dl85nlwfe";
        const uploadPreset = "lacosapp";

        const formData = new FormData();
        formData.append("file", {
            uri: imageUri,
            type: "image/jpeg",
            name: "profile_image.jpg",
        });
        formData.append("upload_preset", uploadPreset);

        try {
            const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
                method: "POST",
                body: formData,
            });
            const data = await response.json();
            return data.secure_url; // Retorna a URL da imagem carregada
        } catch (error) {
            console.log(error)
            console.error("Erro ao fazer upload da imagem:", error.response);
            return null;
        }
    }

    const createPost = async () => {
        if (!text) {
            Alert.alert("Você não pode criar um post sem conteúdo!");
            return;
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
        if (idComunidade) {
            try {
                const response = await api.post(`/community/${idComunidade}/post`, postData);
                if (response.status == 201) {
                    Alert.alert("Post criado com sucesso");
                    navigation.goBack();
                }
            } catch (error) {
                Alert.alert("Erro ao criar um post", error.response.data.message);
                console.log(error.response.data)
            }
            setText('');
            setImage('');
            return;
        }
        try {
            const response = await api.post(`/post`, postData);
            if (response.status == 201) {
                Alert.alert("Post criado com sucesso");
                navigation.goBack();
            }
        } catch (error) {
            Alert.alert("Erro ao criar um post", error.response.data.message);
            console.log(error.response.data)
        }
        setText('');
        setImage('');
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
                <Text style={{ fontSize: 24, marginRight: 95, }}> Vem no Laço </Text>

                <Image source={require("../../../assets/logo.png")} style={{ width: 60, height: 60, marginLeft: 0 }} />
            </View>
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
                onChangeText={setText}
            />

            {image ? (

                <Image source={{ uri: image }} style={styles.imageBackground} />
            ) : (
                <Pressable onPress={pickImage} style={styles.imageButton}>
                    <Icon name="image" size={40} color="black" /> // Ícone de imagem
                </Pressable>
            )}

            <TouchableOpacity style={{
                backgroundColor: '#ff7f00',
                padding: 15,
                borderRadius: 10,
                width: '40%',
                marginTop: 20,
                alignSelf: 'center',
            }}
                onPress={() => createPost()}
            >
                <Text style={{ fontSize: 18, color: '#fff', textAlign: 'center', }}>Postar</Text>
            </TouchableOpacity>
        </View>

    );
}
export default Index;


const styles = StyleSheet.create({
    imagePlaceholder: {
        color: '#888',
        fontSize: 16,
    },
    imageBackground: {
        width: '90%',
        height: 250,
        backgroundColor: '#d3d3d3',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 8,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 100,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20,
    },
    headerText: {
        fontSize: 24,
        marginRight: 10,
    },
    logo: {
        width: 60,
        height: 60,
    },
    textInput: {
        width: '70%',
        height: 120,
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        fontSize: 16,
        marginBottom: 20,
    },
    uploadButton: {
        backgroundColor: '#d3d3d3',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginBottom: 20,
    },
    uploadButtonText: {
        color: '#888',
        fontSize: 16,
    },
    previewImage: {
        width: width * 0.7,
        height: 200,
        borderRadius: 8,
        marginBottom: 20,
    },
    postButton: {
        backgroundColor: '#ff7f00',
        padding: 15,
        borderRadius: 10,
        width: '40%',
        marginTop: 20,
        alignSelf: 'center',
    },
    postButtonText: {
        fontSize: 18,
        color: '#fff',
        textAlign: 'center',
    },
    imageButton: {
        marginRight: width * 0.55,
    }


});