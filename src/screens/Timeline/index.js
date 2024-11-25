import { useFocusEffect } from '@react-navigation/native';
import { useState, useEffect, useCallback } from 'react';
import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity, ScrollView, Pressable, Alert, Modal, Dimensions, FlatList } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { AntDesign } from '@expo/vector-icons';
import api from '../../config/api.js';
import BottomMenu from '../../components/BottomMenu';
import PostCard from '../../components/PostCard';
const { width, height } = Dimensions.get('window');

export default function Timeline({ navigation }) {
    const jsonString = SecureStore.getItem("user");
    const storedUser = JSON.parse(jsonString);
    const [userData, setUserData] = useState({
        id: storedUser.id,
        name: storedUser.name,
        username: storedUser.username,
        profilePictureUrl: storedUser.profilePictureURL,
        backgroundPictureUrl: storedUser.backgroundPictureURL,
        bio: storedUser.bio,
        school: storedUser.school,
        course: storedUser.course
    });

    const [posts, setPosts] = useState([]);
    const [search, setSearch] = useState('');

    const handleDeletePost = (postId) => {
        setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
    };
    const getFeed = async () => {
        try {
            const response = await api.get('/feed');
            //console.log(response.data.data)
            return await response.data.data;
        } catch (error) {
            Alert.alert("Erro ao consultar feed", error.response.data.message)
        }
    }

    const pesquisar = () => {
       if(!search){
        return;
       }
       navigation.navigate('PesquisarUsuario', {search: search});
    }

    useFocusEffect(
        useCallback(() => {
            const fetchFeed = async () => {
                const feedData = await getFeed();
                setPosts(feedData); // Adiciona novos posts à lista existente
            };
            const jsonString = SecureStore.getItem("user");
            const storedUser = JSON.parse(jsonString);
            setUserData(storedUser)
            fetchFeed();
        }, [])

    );

    return (
        <View style={styles.container}>
            <View style={styles.searchBarContainer}>
                <Image source={require("../../../assets/logo.png")} style={styles.logo} />
                <TextInput style={styles.searchInput} placeholder="Pesquise algo..." 
                    onChangeText={setSearch}
                    value={search}
                />

                <Pressable style={styles.pesquisar} onPress={pesquisar}>
                    <Text style={{fontSize: 17, color: 'white', fontWeight: 'bold'}}>Pesquisar</Text>
                </Pressable>
            </View>
            <View style={styles.profileSection}>
                <Pressable onPress={() => navigation.navigate('Perfil')}>
                    <Image
                        source={{ uri: userData.profilePictureURL }}
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
            <FlatList
                data={posts}
                renderItem={(item) => <PostCard post={item.item} navigation={navigation} handleDeletePost={handleDeletePost}></PostCard>}
                keyExtractor={item => item.id.toString()}
                style={styles.posts}
            />

            <BottomMenu></BottomMenu>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    searchBarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#f8f8f8',
        marginTop: 25,
    },
    menuButton: {
        marginRight: 10,
    },
    menuIcon: {
        width: 30,
        height: 30,
    },
    searchInput: {
        flex: 1,
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
    },
    logo: {
        width: 50,
        height: 50,
        marginLeft: 10,
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
    },
    profileSection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: height * 0.02,
        padding: 5,
    },
    profileImage: {
        width: width * 0.15,
        height: width * 0.15,
        borderRadius: (width * 0.15) / 2,
        marginRight: width * 0.02,
    },
    profileInfo: {
        flex: 1,
    },
    welcomeText: {
        fontSize: height * 0.025,
    },
    orangeText: {
        color: 'orange',
    },
    courseText: {
        fontSize: height * 0.022,
        color: '#777',
    },
    bioText: {
        fontSize: height * 0.02,
        color: '#666',
    },
    communitySection: {
        padding: 10,
        backgroundColor: '#f8f8f8',
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    communitiesRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
    },
    communityCard: {
        width: width * 0.28,
        alignItems: 'center',
    },
    communityImage: {
        width: '100%',
        height: width * 0.30,
        borderRadius: 10,

    },
    communityName: {
        marginTop: 5,
        fontWeight: 'bold',
    },
    newPublication: {
        padding: 10,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    userImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    userName: {
        fontWeight: 'bold',
    },
    userHandle: {
        color: '#aaa',
    },
    optionsButton: {
        marginLeft: 'auto',
    },
    moreOptions: {
        fontSize: 20,
    },
    publicationText: {
        marginVertical: 10,
    },
    publicationImage: {
        width: '100%',
        height: 200,
        borderRadius: 10,
    },
    likeButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: width * 0.8,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: width * 0.05,
        elevation: 5,
    },
    modalTitle: {
        fontSize: height * 0.025,
        fontWeight: 'bold',
        marginBottom: height * 0.02,
    },
    commentInput: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginTop: 10,
    },
    addCommentButton: {
        backgroundColor: '#f58523',
        padding: height * 0.02,
        borderRadius: 10,
        marginTop: 10,
        alignItems: 'center',
    },
    addCommentButtonText: {
        color: '#fff',
    },
    closeButton: {
        marginTop: 10,
        alignItems: 'center',
    },
    closeButtonText: {
        color: 'orange',
    },
    menu: {
        position: 'absolute',
        right: 0,
        top: 50,
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 5,
        elevation: 5,
    },
    menuItem: {
        padding: 10,
    },
    commentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    commentUserImage: {
        width: 30,
        height: 30,
        borderRadius: 15,
        marginRight: 10,
    },
    commentUserName: {
        fontWeight: 'bold',
    },
    commentText: {
        color: '#555',
    },

    posts: {
        flex: 1,
        marginBottom: 40,
        padding: 10,
    },
    comments: {
        maxHeight: 200
    },
    pesquisar:{
        backgroundColor: '#f58523',
        borderRadius: 5,
        margin: 5,
        padding: 5,
    },
});