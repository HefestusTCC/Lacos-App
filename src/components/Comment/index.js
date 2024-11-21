import { View, Text, Image, Pressable, StyleSheet} from 'react-native';

const Comment = ({ comment }) => {
    if (!comment) return null;
    comment = comment.item;
    return (
        <>
            <View style={styles.commentContainer}>
                <Pressable onPress={() => navigation.navigate('PerfilOutraPessoa', { userId: comment.author.id })}>
                    <Image source={{ uri: comment.author.profilePictureURL }} style={styles.commentUserImage} />
                </Pressable>
                <View>
                    <Text style={styles.userName}>{comment.author.name}</Text>
                    <Text style={styles.userHandle}>@{comment.author.username}</Text>
                    <Text style={styles.commentText}>{comment.content}</Text>
                </View>
            </View>
        </>
    );
};
const styles = StyleSheet.create({
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
});
export default Comment;