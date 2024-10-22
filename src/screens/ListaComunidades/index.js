import React from 'react';
import { View, Text, Image, StyleSheet, FlatList, Pressable, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');


const comunidades = [
    { id: '1', nome: 'DS 1', imagem: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhW5S7bNG6u5fKsmwvycoS0EgtE2naf9wblA&s' },
    { id: '2', nome: 'DS 2', imagem: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhW5S7bNG6u5fKsmwvycoS0EgtE2naf9wblA&s' },
    { id: '3', nome: 'DS 3', imagem: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhW5S7bNG6u5fKsmwvycoS0EgtE2naf9wblA&s' },
    { id: '4', nome: 'Teste 4', imagem: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhW5S7bNG6u5fKsmwvycoS0EgtE2naf9wblA&s' },
    { id: '5', nome: 'Teste 5', imagem: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhW5S7bNG6u5fKsmwvycoS0EgtE2naf9wblA&s' },
    { id: '6', nome: 'Teste 6', imagem: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhW5S7bNG6u5fKsmwvycoS0EgtE2naf9wblA&s' },
];

export default function ({ navigation }) {
    const renderItem = ({ item }) => (
        <View style={styles.communityCard}>
            <Pressable onPress={() => navigation.navigate('Editar_Comunidade')}>
                <Image
                    source={{ uri: item.imagem }}
                    style={styles.communityImage}
                />
                <Text style={styles.communityName}>{item.nome}</Text>
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
