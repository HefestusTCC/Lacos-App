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
    Pressable,
    Modal,
    Dimensions
} from 'react-native';
import LikeButton from '../../components/LikeButton';
import CommentButtonDetails from '../../components/CommentButtonDetails';
import PostMenuDialog from '../../components/PostMenuDialog';
const { width, height } = Dimensions.get('window');
// Simulação de dados
const postData = {
    "id": 21,
    "author": {
        "id": 4,
        "name": "José Pedro",
        "email": "jose.roberto3@etec.sp.gov.br",
        "username": "pecraxy",
        "profilePictureURL": "https://res.cloudinary.com/dl85nlwfe/image/upload/v1731720639/x7y5tma7lu5iou5pcvmg.jpg",
        "backgroundPictureURL": "https://res.cloudinary.com/dl85nlwfe/image/upload/v1731458216/slxbnizbovmiv5hzpxvy.png",
        "bio": "zé.",
        "school": "Etec de Cidade Tiradentes (Cidade Tiradentes)",
        "course": "Desenvolvimento de Sistemas"
    },
    "content": "bolsonaro neles",
    "image": "https://res.cloudinary.com/dl85nlwfe/image/upload/v1731720776/mexxqu4p43zrtjsahbo9.jpg",
    "video": null,
    "likeCount": 0,
    "commentCount": 0,
    "createdAt": null,
    "categories": [],
    "comments": [],
    "likes": [],
    "community": {
        "id": 5,
        "creator": {
            "id": 4,
            "name": "José Pedro",
            "email": "jose.roberto3@etec.sp.gov.br",
            "username": "pecraxy",
            "profilePictureURL": "https://res.cloudinary.com/dl85nlwfe/image/upload/v1731720639/x7y5tma7lu5iou5pcvmg.jpg",
            "backgroundPictureURL": "https://res.cloudinary.com/dl85nlwfe/image/upload/v1731458216/slxbnizbovmiv5hzpxvy.png",
            "bio": "zé.",
            "school": "Etec de Cidade Tiradentes (Cidade Tiradentes)",
            "course": "Desenvolvimento de Sistemas"
        },
        "name": "Os do Job",
        "description": "Comunidade para os apreciadores do Job.",
        "bannerUrl": "https://www.solidbackgrounds.com/images/1600x900/1600x900-black-solid-color-background.jpg",
        "communityImageUrl": "https://cdn-icons-png.flaticon.com/512/992/992541.png",
        "categories": [
            {
                "id": 1,
                "description": "Tecnologia"
            },
            {
                "id": 4,
                "description": "Administração"
            }
        ],
        "status": "ativo",
        "memberCount": 2,
        "members": [
            {
                "user": {
                    "id": 4,
                    "name": "José Pedro",
                    "email": "jose.roberto3@etec.sp.gov.br",
                    "username": "pecraxy",
                    "profilePictureURL": "https://res.cloudinary.com/dl85nlwfe/image/upload/v1731720639/x7y5tma7lu5iou5pcvmg.jpg",
                    "backgroundPictureURL": "https://res.cloudinary.com/dl85nlwfe/image/upload/v1731458216/slxbnizbovmiv5hzpxvy.png",
                    "bio": "zé.",
                    "school": "Etec de Cidade Tiradentes (Cidade Tiradentes)",
                    "course": "Desenvolvimento de Sistemas"
                },
                "status": "ativo",
                "joinedAt": "2024-11-11T20:28:31Z"
            }
        ],
        "createdAt": "2024-11-11T20:28:31Z"
    }
};

const PostDetailScreen = ({ navigation }) => {

    const [post, setPost] = useState(postData);

    const [newComment, setNewComment] = useState('');

    const handleMenu = () => {
        const options =
            post.author.name === post.author.name
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
                // Abre o modal de comentários ao pressionar a imagem
                /> : null}

                {/* LIKE BUTTON */}


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
                    <Text style={styles.addCommentText}>Postar</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.postActions}>

            </View>
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
    posts: {
        flex: 1,
    },
    comments: {
        maxHeight: 200
    },
});

export default PostDetailScreen;
