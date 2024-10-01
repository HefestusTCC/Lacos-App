import React from 'react';
import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity, ScrollView, Pressable, Alert, Dimensions } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { useState } from 'react';
const { width, height } = Dimensions.get('window');

export default function Timeline({ navigation }) {
    const jsonString = SecureStore.getItem("user");
    const storedUser = JSON.parse(jsonString);
    const [userData, setUserData] = useState({
        name: storedUser.name,
        username: storedUser.username,
        profilePictureUrl: storedUser.profilePictureURL,
        backgroundPictureUrl: storedUser.backgroundPictureURL,
        bio: storedUser.bio,
        school: storedUser.school,
        course: storedUser.course
    });

    const staticData = {
        PublicacaoImagemURL: 'https://br.web.img2.acsta.net/pictures/20/01/06/14/19/2152576.jpg',
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.searchBarContainer}>
                <TouchableOpacity style={styles.menuButton} onPress={() => Alert.alert('Menu de opções')}>
                    <Image source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hamburger_icon.svg/800px-Hamburger_icon.svg.png' }} style={styles.menuIcon} />
                </TouchableOpacity>

                <TextInput
                    style={styles.searchInput}
                    placeholder="Pesquise algo..."
                />

                <Image source={require("../../../assets/logo.png")} style={styles.logo} />
            </View>

            <TouchableOpacity style={styles.newButton}>
                <Text style={styles.newButtonText}>Novo</Text>
            </TouchableOpacity>

            <View style={styles.profileSection}>
                <Pressable onPress={() => navigation.navigate('Perfil')}>
                    <Image
                        source={{ uri: userData.profilePictureUrl }}
                        style={styles.profileImage}
                    />
                </Pressable>
                <View style={styles.profileInfo}>
                    <Text style={styles.welcomeText}>
                        Bem Vindo (a) <Text style={styles.orangeText}>{userData.name}</Text>
                    </Text>
                    <Text style={styles.courseText}>{userData.course}</Text>
                    <Text style={styles.bioText}>{userData.bio}</Text>
                </View>
            </View>

            <View style={styles.communitySection}>
                <Text style={styles.sectionTitle}>Comunidades</Text>
                <View style={styles.communitiesRow}>
                    <View style={styles.communityCard}>
                        <Image
                            source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhW5S7bNG6u5fKsmwvycoS0EgtE2naf9wblA&s' }}
                            style={styles.communityImage}
                        />
                        <Text style={styles.communityName}>1° DS</Text>
                    </View>
                    <View style={styles.communityCard}>
                        <Image
                            source={{ uri: 'https://www.tecnoset.com.br/wp-content/uploads/2019/01/original-5c134a6326db16e46f81d5adca341559.jpg' }}
                            style={styles.communityImage}
                        />
                        <Text style={styles.communityName}>2° DS</Text>
                    </View>
                    <View style={styles.communityCard}>
                        <Image
                            source={{ uri: 'https://www.asuris.com.br/upload/blog/QhEb6JuOjOogFNZSINwpOaKn9bEJbEVq3Y0iCGu1.jpg' }}
                            style={styles.communityImage}
                        />
                        <Text style={styles.communityName}>3° DS</Text>
                    </View>
                </View>
            </View>

            <View style={styles.newPublication}>
                <View style={styles.header}>
                    <Image
                        source={{ uri: userData.profilePictureUrl }}
                        style={styles.userImage}
                    />
                    <View>
                        <Text style={styles.userName}>{userData.name}</Text>
                        <Text style={styles.userHandle}>@{userData.username}</Text>
                    </View>
                    <Pressable onPress={() => Alert.alert('Opções')} style={styles.optionsButton}>
                        <Text style={styles.moreOptions}>...</Text>
                    </Pressable>
                </View>
                <Text style={styles.publicationText}>Sextou com s de churrasco</Text>
                <Image
                    source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuX3r_jNqILxPP5t43wzDG7hpQHU49MJRf6A&s' }}
                    style={styles.publicationImage}
                />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: width * 0.05,
        backgroundColor: '#fff',
    },
    searchBarContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: height * 0.02,
    },
    menuButton: {
        marginRight: width * 0.02,
    },
    menuIcon: {
        width: width * 0.07,
        height: width * 0.07,
    },
    searchInput: {
        flex: 1,
        padding: height * 0.015,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        backgroundColor: '#f2f2f2',
        marginRight: width * 0.02,
    },
    logo: {
        width: width * 0.12,
        height: width * 0.12,
    },
    newButton: {
        backgroundColor: '#f58523',
        padding: height * 0.02,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: height * 0.02,
    },
    newButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: height * 0.02,
    },
    profileSection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: height * 0.02,
    },
    profileImage: {
        width: width * 0.2,
        height: width * 0.2,
        borderRadius: (width * 0.2) / 2,
        borderWidth: 2,
        borderColor: '#ff6f00',
        marginRight: width * 0.03,
    },
    profileInfo: {
        justifyContent: 'center', // Para centralizar verticalmente
    },
    welcomeText: {
        fontSize: height * 0.025,
    },
    courseText: {
        fontSize: height * 0.018,
        color: 'gray',
        marginTop: 5, // Distância do texto de boas-vindas
    },
    bioText: {
        fontSize: height * 0.015,
        marginTop: 5, // Distância do curso
    },
    orangeText: {
        color: '#ff6f00',
        fontWeight: 'bold',
    },
    communitySection: {
        marginTop: height * 0.03,
    },
    communitiesRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    communityCard: {
        alignItems: 'center',
        width: '30%',
    },
    communityImage: {
        width: width * 0.25,
        height: width * 0.25,
        borderRadius: 10,
        marginBottom: height * 0.01,
    },
    communityName: {
        textAlign: 'center',
        fontSize: height * 0.015,
        color: '#333',
    },
    newPublication: {
        backgroundColor: '#f9f9f9',
        padding: height * 0.02,
        borderRadius: 10,
        marginTop: height * 0.03,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: height * 0.015,
        justifyContent: 'space-between',
    },
    userImage: {
        width: width * 0.13,
        height: width * 0.13,
        borderRadius: (width * 0.13) / 2,
        marginRight: width * 0.03,
    },
    userName: {
        fontSize: height * 0.02,
        fontWeight: 'bold',
    },
    userHandle: {
        fontSize: height * 0.018,
        color: 'gray',
    },
    moreOptions: {
        fontSize: height * 0.03,
        fontWeight: 'bold',
        textAlign: 'right',
    },
    optionsButton: {
        flex: 1,
        alignItems: 'flex-end',
    },
    publicationText: {
        fontSize: height * 0.02,
        marginVertical: height * 0.02,
    },
    publicationImage: {
        width: '100%',
        height: height * 0.3,
        borderRadius: 10,
    },
});