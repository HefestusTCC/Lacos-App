import React from "react";
import { View, Text, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';


const CommentButtonDetails = ({ post }) => {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', display: 'flex', justifyContent: 'space-evenly'}}>
            <TouchableOpacity>
                <AntDesign name="message1" size={24} color='orange' margin={20}/>
            </TouchableOpacity>
            <Text>{post.commentCount}</Text>
        </View>
    );
};

export default CommentButtonDetails;