import React from "react";
import { View, Text, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';


const CommentButton = ({ post }) => {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => navigation.navigate('PostDetailScreen', {post: post})}>
                <AntDesign name="message1" size={32} color='orange' margin={20}/>
                <Text>{post.commentCount}</Text>
            </TouchableOpacity>
        </View>
    );
};

export default CommentButton;