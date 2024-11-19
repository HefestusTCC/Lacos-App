import React, { useState } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    Alert,
    TextInput,
    Image,
} from 'react-native';

// Simulação de dados
const postData = {
    id: '1',
    content: 'Eu tenho amigos que só vejo pela telinha e que valem ouro.',
    creator: {
        name: 'Henrique',
        handle: '@henrique',
        profileImage: 'https://via.placeholder.com/50',
    },
    isCommunityPost: false,
    community: null,
    image: 'https://via.placeholder.com/300', // Imagem do post
    likes: 10,
    comments: [
        {
            id: 'c1',
            user: {
                name: 'Gabriel',
                handle: '@gabriel',
                profileImage: 'https://via.placeholder.com/50',
            },
            text: '(e moramos na mesma cidade)',
        },
        {
            id: 'c2',
            user: {
                name: 'Paranoia Delirante',
                handle: '@paranoia',
                profileImage: 'https://via.placeholder.com/50',
            },
            text: 'Tu e o FP quebrando tabu sábado',
        },
    ],
};

const PostDetailScreen = () => {
    const [post, setPost] = useState(postData);
    const [user, setUser] = useState({
        name: 'Henrique',
        handle: '@henrique',
        profileImage: 'https://via.placeholder.com/50',
    });
    const [newComment, setNewComment] = useState('');

    const handleMenu = () => {
        const options =
            post.creator.name === user.name
                ? ['Editar', 'Excluir', 'Denunciar']
                : ['Denunciar'];

        Alert.alert(
            'Opções',
            null,
            options.map((option) => ({
                text: option,
                onPress: () => console.log(`${option} selecionado`),
            }))
        );
    };

    const handleAddComment = () => {
        if (newComment.trim()) {
            const updatedComments = [
                ...post.comments,
                {
                    id: `c${post.comments.length + 1}`,
                    user,
                    text: newComment,
                },
            ];
            setPost({ ...post, comments: updatedComments });
            setNewComment('');
        }
    };

    const renderComment = ({ item }) => (
        <View style={styles.comment}>
            <Image
                source={{ uri: item.user.profileImage }}
                style={styles.commentProfileImage}
            />
            <View>
                <Text style={styles.commentUser}>
                    {item.user.name} <Text style={styles.commentHandle}>{item.user.handle}</Text>
                </Text>
                <Text style={styles.commentText}>{item.text}</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            {/* Cabeçalho */}
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

            {/* Imagem do post */}
            {post.image && (
                <Image source={{ uri: post.image }} style={styles.postImage} />
            )}

            {/* Conteúdo do post */}
            <Text style={styles.content}>{post.content}</Text>

            {/* Botões de interação */}
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

            {/* Campo para adicionar comentário */}
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

            {/* Lista de comentários */}
            <FlatList
                data={post.comments}
                keyExtractor={(item) => item.id}
                renderItem={renderComment}
                style={styles.commentList}
            />
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
        marginBottom: 10,
    },
    commentInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 8,
        marginRight: 10,
    },
    addCommentButton: {
        backgroundColor: '#007bff',
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
});

export default PostDetailScreen;
