import { View, Text, Image, StyleSheet, Pressable, Dimensions } from 'react-native';
import LikeButton from '../LikeButton';
import CommentButton from '../CommentButton';
import PostMenuDialogCard from '../PostMenuDialogCard';
const { width, height } = Dimensions.get('window');
const PostCard = ({ post, navigation, handleDeletePost }) => {
    return (
        <>
            {/* Seção de Publicação */}
            <Pressable style={styles.newPublication} onPress={() => navigation.navigate('PostDetailScreen', { id: post.id })}>
                {post.community != null ?
                    <View style={styles.header}>
                        <Pressable onPress={() => navigation.navigate('TimelineComunidade', { id: post.community.id })}>
                            <Image
                                source={{ uri: post.community.communityImageUrl }}
                                style={styles.communityImage}
                            />
                        </Pressable>
                        <Pressable onPress={() => navigation.navigate('PerfilOutraPessoa', { userId: post.author.id })}>
                            <Image
                                source={{ uri: post.author.profilePictureURL }}
                                style={[styles.userImage, { marginLeft: -width * 0.09, height: 30, width: 30, marginBottom: -height * 0.02 }]}
                            />
                        </Pressable>
                        <View>
                            <Text style={styles.communityName}>{post.community.name}</Text>
                            <Text style={styles.userNameCommunity}>{post.author.name}</Text>
                            <Text style={styles.userHandle}>@{post.author.username}</Text>
                        </View>
                        <PostMenuDialogCard post={post} onDeletePost={handleDeletePost} navigation={navigation}></PostMenuDialogCard>
                    </View> :
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
                        <PostMenuDialogCard post={post} onDeletePost={handleDeletePost} navigation={navigation}></PostMenuDialogCard>
                    </View>
                }

                <Text style={styles.publicationText}>{post.content}</Text>
                {post.image != null ? <Image
                    source={{ uri: post.image }}
                    style={styles.publicationImage}
                // Abre o modal de comentários ao pressionar a imagem
                /> : null}

                {/* LIKE BUTTON */}
                <View style={styles.likeButtonContainer}>
                    <LikeButton post={post} />
                    <CommentButton post={post} navigation={navigation} />
                </View>
            </Pressable>
        </>
    );
}


const styles = StyleSheet.create({
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
    communityImage: {
        width: 40,
        height: 40,
        borderRadius: 5,
        marginRight: 10,
    },
    userName: {
        fontWeight: 'bold',
    },
    userNameCommunity: {

    },
    communityName: {
        fontWeight: 'bold',
        fontSize: 15
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
        justifyContent: 'space-around',
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
    posts: {
        flex: 1,
    },
    comments: {
        maxHeight: 200
    },
})

export default PostCard;