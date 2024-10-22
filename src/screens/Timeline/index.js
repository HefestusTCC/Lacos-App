import React, { useState } from 'react';
import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity, ScrollView, Pressable, Alert, Modal, Dimensions, FlatList } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { AntDesign } from '@expo/vector-icons';
import api from '../../config/api.js';

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
    const [modalVisible, setModalVisible] = useState(false);
    const [menuVisible, setMenuVisible] = useState(false);
    const [commentsVisible, setCommentsVisible] = useState(false);
    const getFeed = async () => {
        try {
            const response = await api.get('/feed');
            //console.log(response.data.data)
            return await response.data.data;
        } catch (error) {
            Alert.alert("Erro ao consultar feed", error.response.data.message)
        }
    }
    const [posts, setPosts] = useState(getFeed());
    const [newComment, setNewComment] = useState('');



    // Função para enviar denúncia
    const handleReport = () => {
        Alert.alert('Denúncia enviada com sucesso!');
        setModalVisible(false);
    };

    // Função para adicionar comentário
    const handleAddComment = () => {
        if (newComment.trim() === '') return;
        // setComments([...comments, { text: newComment, user: userData }]); // Salva o comentário com informações do usuário
        setNewComment('');
    };


    const didUserLikePost = (post) => {
        return post.likes.some(like => like.user.id === userData.id);
    };

    // Componente LikeButton
    const LikeButton = (post) => {
        const [liked, setLiked] = useState(didUserLikePost(post));
        const toggleLike = () => {
            setLiked(!liked);
        };

        return (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity onPress={toggleLike}>
                    <AntDesign
                        name={liked ? 'heart' : 'hearto'}
                        size={32}
                        color='orange'
                        margin={20}
                    />
                </TouchableOpacity>
            </View>
        );
    };

    // Componente CommentButton
    const CommentButton = () => {
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => setCommentsVisible(true)}>
                    <AntDesign name="message1" size={32} color='orange' />
                </TouchableOpacity>
            </View>
        );
    };

    // Componente para exibir cada comentário
    const Comment = ({ comment }) => (
        <View style={styles.commentContainer}>
            <Image source={{ uri: comment.author.profilePictureURL }} style={styles.commentUserImage} />
            <View>
                <Text style={styles.commentUserName}>{comment.author.username}</Text>
                <Text style={styles.commentText}>{comment.content}</Text>
            </View>
        </View>
    );

    const renderPosts = ({ item }) => {
        const post = item;
        console.log(post)
        return (
            <>
                {/* Seção de Publicação */}
                <View style={styles.newPublication}>
                    <View style={styles.header}>
                        <Image
                            source={{ uri: post.author.profilePictureURL }}
                            style={styles.userImage}
                        />
                        <View>
                            <Text style={styles.userName}>{post.author.name}</Text>
                            <Text style={styles.userHandle}>@{post.author.username}</Text>
                        </View>
                        <Pressable onPress={() => setModalVisible(true)} style={styles.optionsButton}>
                            <Text style={styles.moreOptions}>...</Text>
                        </Pressable>
                    </View>
                    <Text style={styles.publicationText}>{post.content}</Text>
                    {post.image != null ? <Image
                        source={{ uri: post.image }}
                        style={styles.publicationImage}
                        onPress={() => setCommentsVisible(true)} // Abre o modal de comentários ao pressionar a imagem
                    /> : null}

                    {/* LIKE BUTTON */}
                    <View style={styles.likeButtonContainer}>
                        <LikeButton post={post} />
                        <CommentButton />
                    </View>

                    {/* Modal para Comentários */}
                    <Modal animationType="slide" transparent={true} visible={commentsVisible} onRequestClose={() => setCommentsVisible(false)}>
                        <View style={styles.modalBackground}>
                            <View style={styles.modalContainer}>
                                <Text style={styles.modalTitle}>Comentários</Text>
                                <Text style={styles.publicationText}>{post.content}</Text>
                                <Image
                                    source={{ uri: post.image }}
                                    style={styles.publicationImage}
                                />
                                <FlatList
                                    data={post.comments}
                                    renderItem={(item) => <Comment comment={item} />} // Renderiza cada comentário
                                    keyExtractor={(item, index) => index.toString()}
                                />
                                <TextInput
                                    style={styles.commentInput}
                                    placeholder="Adicione um comentário..."
                                    value={newComment}
                                    onChangeText={setNewComment}
                                />
                                <TouchableOpacity onPress={handleAddComment} style={styles.addCommentButton}>
                                    <Text style={styles.addCommentButtonText}>Enviar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setCommentsVisible(false)} style={styles.closeButton}>
                                    <Text style={styles.closeButtonText}>Fechar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>

                    {/* Modal para Denúncia */}
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => setModalVisible(false)}
                    >
                        <View style={styles.modalBackground}>
                            <View style={styles.modalContainer}>
                                <Text style={styles.modalTitle}>Denunciar Postagem</Text>
                                <TextInput style={styles.reportInput} placeholder="Motivo da denúncia" />
                                <TouchableOpacity onPress={handleReport} style={styles.reportButton}>
                                    <Text style={styles.reportButtonText}>Enviar Denúncia</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                </View>
            </>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.searchBarContainer}>
                <TouchableOpacity style={styles.menuButton} onPress={() => setMenuVisible(!menuVisible)}>
                    <Image source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hamburger_icon.svg/800px-Hamburger_icon.svg.png' }} style={styles.menuIcon} />
                </TouchableOpacity>

                <TextInput style={styles.searchInput} placeholder="Pesquise algo..." />

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
            {console.log(JSON.stringify(posts))}
            <FlatList
                data={posts}
                renderItem={renderPosts}
                keyExtractor={item => item.id}
            />
            {/* Menu Vertical */}
            {menuVisible && (
                <View style={styles.menu}>
                    <Text style={styles.menuItem}>Configurações</Text>
                    <Text style={styles.menuItem}>Sair</Text>
                </View>
            )}
        </View>
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
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#f8f8f8',
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
        justifyContent: 'space-between',
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
    reportInput: {
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        padding: height * 0.015,
        marginBottom: height * 0.02,
    },
    reportButton: {
        backgroundColor: '#f58523',
        padding: height * 0.02,
        borderRadius: 10,
        alignItems: 'center',
    },
    reportButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});