import React, { useState, useCallback } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    Alert,
    TextInput,
    Image,
    Pressable,
    Modal,
    Dimensions
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import LikeButton from '../../components/LikeButton';
import CommentButtonDetails from '../../components/CommentButtonDetails';
import PostMenuDialog from '../../components/PostMenuDialog';
import Comment from '../../components/Comment';
import api from '../../config/api';
const { width, height } = Dimensions.get('window');


const PostDetailScreen = ({ navigation, id }) => {

    const [post, setPost] = useState();
    const [newComment, setNewComment] = useState('');

    const createComment = async (id) => {

        const commentData = {
            "content": newComment
        }
        try {
            const response = await api.post(`/post/${id}/comment`, commentData);
            if (response.status == 201) {
                Alert.alert("Comentário criado com sucesso");
                return response.data.data;
            }
        } catch (error) {
            Alert.alert("Erro ao criar comentário", error.response.data.message)
        }
    }

    const handleAddComment = async () => {
        if (!newComment) {
            Alert.alert("Não é possível criar um comentário vazio.");
            return;
        }
        let updatedComments = await createComment(id);
        if (updatedComments) {
            setPost(updatedComments);
        }
        setNewComment('');
    };

    useFocusEffect(
        useCallback(() => {
            const getPost = async (id) => {
                try {
                    const response = await api.get(`/post/{${id}}`);
                    return response.data.data;
                } catch (error) {
                    console.log(error);
                }
            }
            const post = getPost(id);
            setPost(post);
        }, [navigation])
    );

    return (
        <View style={styles.container}>
            <View style={styles.newPublication}>
                <View style={styles.header}>
                    <Pressable onPress={() => navigation.navigate('PerfilOutraPessoa', { userId: post.author.id })}>
                        <Image
                            source={{ uri: post.author.profilePictureURL }}
                            style={styles.userImage}
                        />
                    </Pressable>
                    <View>
                        <Text style={styles.userName}>{post.author.name}</Text>
                        <Text style={styles.userHandle}>@{post.author.username}</Text>
                    </View>
                    <PostMenuDialog post={post}></PostMenuDialog>
                </View>
                <Text style={styles.publicationText}>{post.content}</Text>
                {post.image != null ? <Image
                    source={{ uri: post.image }}
                    style={styles.publicationImage}
                /> : null}
            </View>


            <View style={styles.actions}>
                <View style={styles.likeButtonContainer}>
                    <LikeButton post={post}></LikeButton>
                </View>
                <View style={styles.likeButtonContainer}>
                    <CommentButtonDetails post={post}></CommentButtonDetails>
                </View>
            </View>

            <View style={styles.commentInputContainer}>
                <TextInput
                    style={styles.commentInput}
                    placeholder="Adicione um comentário..."
                    value={newComment}
                    onChangeText={setNewComment}
                />
                <TouchableOpacity style={styles.addCommentButton} onPress={handleAddComment}>
                    <Text style={styles.addCommentText}>Comentar</Text>
                </TouchableOpacity>
            </View>
            {post.comments.length > 0 ?
                <FlatList
                    data={post.comments}
                    renderItem={(item) => item ? <Comment comment={item} /> : null} // Renderiza cada comentário
                    keyExtractor={(item) => item.id.toString()}
                    style={styles.comments}
                /> : <Text style={{ textAlign: 'center', margin: 5, color: 'gray' }}>Esse post não possui comentários. Comente agora!</Text>}
            {/* Cabeçalho
            <View style={styles.header}>
                <View style={styles.userInfo}>
                    <Image
                        source={{ uri: post.creator.profileImage }}
                        style={styles.profileImage}
                    />
                    <View>
                        <Text style={styles.creator}>{post.creator.name}</Text>
                        <Text style={styles.handle}>{post.creator.handle}</Text>
                    </View>
                </View>
                <TouchableOpacity onPress={handleMenu}>
                    <Text style={styles.menu}>⋮</Text>
                </TouchableOpacity>
            </View>


            {post.image && (
                <Image source={{ uri: post.image }} style={styles.postImage} />
            )}


            <Text style={styles.content}>{post.content}</Text>


            <View style={styles.actions}>
                <TouchableOpacity
                    style={styles.action}
                    onPress={() => setPost({ ...post, likes: post.likes + 1 })}
                >
                    <Text>👍 Curtir ({post.likes})</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.action}>
                    <Text>💬 Comentar ({post.comments.length})</Text>
                </TouchableOpacity>
            </View>


            <View style={styles.commentInputContainer}>
                <TextInput
                    style={styles.commentInput}
                    placeholder="Adicione um comentário..."
                    value={newComment}
                    onChangeText={setNewComment}
                />
                <TouchableOpacity style={styles.addCommentButton} onPress={handleAddComment}>
                    <Text style={styles.addCommentText}>Postar</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={post.comments}
                keyExtractor={(item) => item.id}
                renderItem={renderComment}
                style={styles.commentList}
            /> */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    creator: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    handle: {
        color: '#555',
        fontSize: 14,
    },
    menu: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    postImage: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        marginVertical: 10,
    },
    content: {
        fontSize: 15,
        marginBottom: 10,
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
    action: {
        paddingHorizontal: 10,
    },
    commentInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginBottom: 10,
    },
    commentInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 8,
        marginRight: 10,
        width: '100%'
    },
    addCommentButton: {
        backgroundColor: '#f58523',
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 15,
    },
    addCommentText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    commentList: {
        marginTop: 10,
    },
    comment: {
        flexDirection: 'row',
        marginBottom: 10,
        alignItems: 'center',
    },
    commentProfileImage: {
        width: 30,
        height: 30,
        borderRadius: 15,
        marginRight: 10,
    },
    commentUser: {
        fontWeight: 'bold',
    },
    commentHandle: {
        color: '#555',
        fontSize: 12,
    },
    commentText: {
        fontSize: 14,
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
    posts: {
        flex: 1,
    },
    comments: {
        maxHeight: 200
    },
});

export default PostDetailScreen;
