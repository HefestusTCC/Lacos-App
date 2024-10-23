import { useFocusEffect } from '@react-navigation/native';
import { useState, useEffect, useCallback } from 'react';
import { View, Text, Image, StyleSheet, FlatList, Pressable, Dimensions } from 'react-native';
import api from '../../config/api.js';
const { width, height } = Dimensions.get('window');

export default function ({ navigation }) {
    const [comunidades, setComunidades] = useState(null);
    const getCommunities = async () => {
        try {
            const response = await api.get('/community/all');
            //console.log(response.data.data)
            return await response.data.data;
        } catch (error) {
            Alert.alert("Erro ao consultar feed", error.response.data.message)
        }
    }

    useFocusEffect(
        useCallback(() => {
            const getCommunities = async () => {
                try {
                    const response = await api.get('/community/all');
                    //console.log(response.data.data)
                    setComunidades(response.data.data);
                } catch (error) {
                    Alert.alert("Erro ao consultar feed", error.response.data.message)
                }
            }
            getCommunities();
        }, [])
    );
    const renderItem = ({ item }) => (
        <View style={styles.communityCard}>
            <Pressable onPress={() => navigation.navigate('TimelineComunidade', {id: item.id})}>
                <Image
                    source={{ uri: item.communityImageUrl }}
                    style={styles.communityImage}
                />
                <Text style={styles.communityName}>{item.name}</Text>
            </Pressable>
        </View>
    );

    return (
        <>
            <View style={styles.topCorner}>
                <Image
                    source={require("../../../assets/top-corner.png")}
                    style={{ width: '100%', height: '100%' }}
                />
            </View>
            <View style={styles.container}>
                <View style={styles.nav}>
                    <View style={styles.navButton}>
                        <Pressable onPress={() => navigation.navigate('Timeline')}>
                            <Image
                                source={require("../../../assets/voltar.png")}
                                style={styles.voltar}
                            />
                        </Pressable>
                    </View>
                </View>
                <View style={styles.communitySection}>
                    <View style={styles.sectionTitleContainer}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.sectionTitle}>Comunidades</Text>
                            <Pressable onPress={() => navigation.navigate('Adicionar_Comunidade')}>
                                <Image
                                    source={require("../../../assets/adicionar.png")}
                                    style={styles.adicionar}
                                />
                            </Pressable>
                        </View>
                    </View>
                    <FlatList
                        data={comunidades}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                        numColumns={3} 
                        contentContainerStyle={styles.communitiesRow}
                    />
                </View>
            </View>
            <View style={styles.bottomCorner}>
                <Image
                    source={require("../../../assets/bottom-corner.png")}
                    style={{ width: '100%', height: '100%' }}
                />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: width * 0.05,
        backgroundColor: '#fff',
    },
    topCorner: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: 120,
        height: 120,
        zIndex: 1,
    },
    bottomCorner: {
        position: "absolute",
        bottom: 0,
        left: 0,
        width: 100,
        height: 100,
    },
    nav: {
        flexDirection: 'row',
        alignItems: 'left',
        marginTop: 30,
        justifyContent: 'space-between',
    },
    navButton: {
        flex: 1,
        alignItems: 'left',
    },
    voltar: {
        width: 22,
        height: 22,
    },
    adicionar: {
        width: 24,
        height: 24,
    },
    communitySection: {
        marginTop: height * 0.03,
        paddingBottom: 20,
    },
    sectionTitleContainer: {
        paddingVertical: 10,
        marginBottom: 20,
        alignItems: 'center',
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    sectionTitle: {
        fontSize: 24,
        color: '#ff6f00',
        fontWeight: 'bold',
        textAlign: 'center',
        flex: 1,
    },
    communitiesRow: {
        justifyContent: 'center',
    },
    communityCard: {
        alignItems: 'center',
        width: '30%', 
        marginBottom: height * 0.03,
        marginHorizontal: width * 0.01,
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        padding: 10,
    },
    communityImage: {
        width: width * 0.25, 
        height: width * 0.25, 
        borderRadius: 10,
    },
    communityName: {
        textAlign: 'center',
        fontSize: height * 0.015,
        color: '#333',
        marginTop:5
    },
});
