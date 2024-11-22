import React, { useEffect, useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, FlatList, StyleSheet, Image, ActivityIndicator, ScrollView, Pressable } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '../../config/api.js';
import BottomMenu from '../../components/BottomMenu';
const Notificacoes = ({ navigation }) => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const fetchData = async () => {
        try {
            const response = await api.get('/notifications');
            const data = await response.data;
            setNotifications(data.data);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };
    const goToPost = async (notification) => {
        if (!notification.seen) {
            try {
                let response = await api.post(`/notifications/${notification.id}/seen`);

            } catch (error) {
                console.log(error)
            }
        }
        navigation.navigate('PostDetailScreen', { id: notification.post.id });
    }

    useFocusEffect(
        useCallback(() => {
            fetchData();
        }, [])
    );

    const goToCommunity = async (notification) => {
        if (!notification.seen) {
            try {
                let response = await api.post(`/notifications/${notification.id}/seen`);
                console.log("response" + response.data);
                navigation.navigate('TimelineComunidade', { id: notification.community.id });
            } catch (error) {
                console.log(error)
            }
        } else {
            navigation.navigate('TimelineComunidade', { id: notification.community.id });
        }
    }

    const goToTicketAnswer = async (notification) => {
        if (!notification.seen) {
            try {
                let response = await api.post(`/notifications/${notification.id}/seen`);
                navigation.navigate('RespostaDenuncia', { ticketAnswer: notification.ticketAnswer, content: notification.content });
            } catch (error) {
                console.log(error)
            }
        } else {
            navigation.navigate('RespostaDenuncia', { ticketAnswer: notification.ticketAnswer, content: notification.content });
        }
    }

    const likeNotification = (item) => {
        return (
            <Pressable onPress={() => goToPost(item)} style={[styles.likeCardContainer, item.seen ? styles.seen : styles.unseen]}>
                <View style={styles.iconContainer}>
                    <FontAwesome name="heart" size={24} color="red" />
                </View>
                <View style={styles.contentContainer}>
                    <Pressable onPress={() => { navigation.navigate('PerfilOutraPessoa', { userId: item.sender.id }) }}>
                        <Image source={{ uri: item.sender.profilePictureURL }} style={styles.userImage} />
                    </Pressable>
                    <View style={styles.textContainer}>
                        <Text style={styles.username}>{item.sender.name}</Text>
                        <Text style={styles.action}>{item.message}</Text>
                        <Text style={styles.postSnippet}>{item.content}</Text>
                    </View>
                </View>
            </Pressable>
        );
    }

    const commentNotification = (item) => {
        return (
            <Pressable onPress={() => goToPost(item)} style={[styles.likeCardContainer, item.seen ? styles.seen : styles.unseen]}>
                <View style={styles.iconContainer}>
                    <FontAwesome name="comment" size={24} color="black" />
                </View>
                <View style={styles.contentContainer}>
                    <Pressable onPress={() => { navigation.navigate('PerfilOutraPessoa', { userId: item.sender.id }) }}>
                        <Image source={{ uri: item.sender.profilePictureURL }} style={styles.userImage} />
                    </Pressable>
                    <View style={styles.textContainer}>
                        <Text style={styles.username}>{item.sender.name}</Text>
                        <Text style={styles.action}>{item.message}</Text>
                        <Text style={styles.postSnippet}>{item.content}</Text>
                    </View>
                </View>
            </Pressable>
        );
    }

    const communityApproval = (item) => {
        return (
            <Pressable onPress={() => goToCommunity(item)} style={[styles.likeCardContainer, item.seen ? styles.seen : styles.unseen]}>
                <View style={styles.iconContainer}>
                    <Icon name="groups" size={24} color="#333" />
                </View>
                <View style={styles.contentContainer}>
                    <Pressable onPress={() => { navigation.navigate('PerfilOutraPessoa', { userId: item.sender.id }) }}>
                        <Image source={{ uri: item.sender.profilePictureURL }} style={styles.userImage} />
                    </Pressable>
                    <View style={styles.textContainer}>
                        <Text style={styles.username}>{item.sender.name}</Text>
                        <Text style={styles.action}>{item.message}</Text>
                        <Text style={styles.postSnippet}>{item.community.name}</Text>
                    </View>
                </View>
            </Pressable>
        );
    }

    const communityDenial = (item) => {
        return (
            <View style={[styles.likeCardContainer, item.seen ? styles.seen : styles.unseen]}>
                <View style={styles.iconContainer}>
                    <FontAwesome name="warning" size={24} color="black" />
                </View>
                <View style={styles.contentContainer}>
                    <Pressable onPress={() => { navigation.navigate('PerfilOutraPessoa', { userId: item.sender.id }) }}>
                        <Image source={{ uri: item.sender.profilePictureURL }} style={styles.userImage} />
                    </Pressable>
                    <View style={styles.textContainer}>
                        <Text style={styles.username}>{item.sender.name}</Text>
                        <Text style={styles.action}>{item.message}</Text>

                    </View>
                </View>
            </View>
        );
    }

    const ticketAnswer = (item) => {
        console.log(item)
        return (
            <Pressable onPress={() => goToTicketAnswer(item)} style={[styles.likeCardContainer, item.seen ? styles.seen : styles.unseen]}>
                <View style={styles.iconContainer}>
                    <FontAwesome name="warning" size={24} color="black" />
                </View>
                <View style={styles.contentContainer}>
                    <Pressable onPress={() => { navigation.navigate('PerfilOutraPessoa', { userId: item.sender.id }) }}>
                        <Image source={{ uri: item.sender.profilePictureURL }} style={styles.userImage} />
                    </Pressable>
                    <View style={styles.textContainer}>
                        <Text style={styles.username}>{item.sender.name}</Text>
                        <Text style={styles.action}>{item.message}</Text>
                        <Text style={styles.postSnippet}>{item.content}</Text>
                    </View>
                </View>
            </Pressable>
        );
    }

    const renderItem = ({ item }) => {


        switch (item.type) {
            case "LIKE": {
                return likeNotification(item);
            }
            case "COMMENT": {
                return commentNotification(item);
            }
            case "COMMUNITY_APPROVAL": {
                return communityApproval(item);
            }
            case "COMMUNITY_DENIAL": {
                return communityDenial(item);
            }
            case "TICKET_ANSWER": {
                return ticketAnswer(item);
            }
        }
    };


    return (
        <View style={styles.container}>
            <Image
                source={require("../../../assets/top-corner.png")}
                style={styles.topCorner}
            />
            <Image
                source={require("../../../assets/bottom-corner.png")}
                style={styles.bottomCorner}
            />
            <View style={styles.header}>
                <Text style={{ textAlign: 'center', fontSize: 35 }}>Notificações</Text>
            </View>
            {loading ? (
                <ActivityIndicator size="large" color="#FF6E15" />
            ) :
                notifications.length === 0 ? (<Text style={{ textAlign: 'center', fontSize: 15, margin: 10 }}>Você não possui notificações!</Text>) : <FlatList
                    data={notifications}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderItem}
                />
            }
            <BottomMenu></BottomMenu>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        paddingTop: 25,
        paddingHorizontal: 0,
    },
    title: {
        fontSize: 24,
        marginBottom: 16,
        textAlign: "center",
        flexDirection: "row",
        flex: 1,
    },
    seen: {
        backgroundColor: 'white',
    },
    unseen: {
        backgroundColor: '#f0f0f0',
    },
    card: {
        backgroundColor: '#FFF',
        padding: 5,
        marginVertical: 0,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
        borderTopWidth: 0.5,
        marginTop: 0,
        height: 100,
        width: '100%'

    },
    header: {
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 150,
        borderBottomColor: '#000',
        borderBottomWidth: 2,
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 35,
        marginRight: 15,
    },
    cardLikedimage: {
        padding: 10,

    },
    backScreen: {
        padding: 15,
        flex: 1,
        width: 45,
        height: 45,

        marginRight: 15,
    },
    imageLike: {
        width: 35,
        height: 35,
        borderRadius: 35,
        marginRight: 15,
    },
    cardContent: {
        flex: 1,
    },
    title: {
        flex: 1,
        flexDirection: 'row',

    },

    nameAccount: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000000',


    },

    whoLiked: {
        padding: 15,
        flex: 1,
        fontSize: 32,
        fontWeight: 'bold',
        color: '#FF6E15',
        textAlign: "center",

    },
    topCorner: {
        position: "absolute",
        top: 0,
        right: 0,
        width: 100,
        height: 100,
    },
    bottomCorner: {
        position: "absolute",
        bottom: 0,
        left: 0,
        width: 100,
        height: 100,
    },
    likeCardContainer: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#333',
    },
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingRight: 10,
    },
    contentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    userImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    textContainer: {
        flex: 1,
    },
    username: {
        color: 'black',
        fontSize: 15,
        fontWeight: 'bold',
    },
    action: {
        color: '#000',
    },
    postSnippet: {
        color: '#6e6d6d',
    },
});

export default Notificacoes;
