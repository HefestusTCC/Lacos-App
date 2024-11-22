import React from "react";
import { useState } from "react";
import { View, Text, TouchableOpacity } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { AntDesign } from '@expo/vector-icons';
import api from '../../config/api.js';


const LikeButton = ({ post }) => {
    const didUserLikePost = (post) => {
        return post.likes.some(like => like.user.id === userData.id);
    };
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
    const [liked, setLiked] = useState(didUserLikePost(post));
    const [likeCount, setLikeCount] = useState(post.likeCount);
    const like = async (id, alreadyLiked) => {
        try {
            const response = await api.post(`/post/${id}/like`);
            if (response.status == 200) {
                return !alreadyLiked;
            }
        } catch (error) {
            Alert.alert("Erro ao dar like ou unlike:", error.response.data.message)
        }
    }

    const toggleLike = async (id, alreadyLiked) => {
        let newLikedState = await like(id, alreadyLiked);
        if (newLikedState) {
            setLikeCount(likeCount + 1);
        } else {
            setLikeCount(likeCount - 1);
        }
        setLiked(newLikedState);
    };

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => toggleLike(post.id, liked)}>
                <AntDesign
                    name={liked ? 'heart' : 'hearto'}
                    size={24}
                    color='orange'
                    margin={20}
                />
            </TouchableOpacity>
            <Text>{likeCount}</Text>
        </View>
    );
};

export default LikeButton;