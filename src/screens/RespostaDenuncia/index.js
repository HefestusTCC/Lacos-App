import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
export default function RespostaDenuncia({ navigation, route }) {
    const ticketAnswer = route?.params?.ticketAnswer;
    const content = route?.params?.content;
    return (
        <View style={styles.container}>

            <View style={styles.profileContainer}>
                <Image
                    source={{ uri: ticketAnswer.user.profilePictureURL }}
                    style={styles.profileImage}
                />
                <View>
                    <Text style={styles.name}>{ticketAnswer.user.name}</Text>
                    <Text style={styles.username}>{ticketAnswer.user.username}</Text>
                </View>
            </View>
            <View style={styles.postagem}>
                <Text style={styles.titleSubject}>
                    Você denunciou o post/comentário de conteúdo:
                </Text>
                <Text style={styles.messageContainer}>
                    {content}
                </Text>
            </View>
            <Text></Text>
            <Text>Resposta do administrador:</Text>
            <View style={styles.messageContainer}>
                <Text style={styles.titleSubject}>
                    Assunto: {ticketAnswer.subject}
                </Text>
                <Text style={styles.messageText}>
                    Resposta: {ticketAnswer.message}
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: height * 0.2,
        padding: 20,
        backgroundColor: 'white', // cor de fundo para manter o tema
    },
    profileContainer: {
        alignItems: 'center',
        marginBottom: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FF6E15',
    },
    username: {
        fontSize: 16,
        color: '#666',
    },
    messageContainer: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 10,
        borderColor: 'black',
        borderWidth: 1,
        width: '100%',
    },
    messageText: {
        fontSize: 16,
        color: '#333',
    },
    titleSubject: {
        fontSize: 20,
        color: 'black',
    },
});
