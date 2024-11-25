import { useFocusEffect } from '@react-navigation/native';
import { useState, useCallback } from 'react';
import { View, Text, Image, StyleSheet, FlatList, Pressable, Alert, Dimensions, Modal, TextInput, Button } from 'react-native';
import api from '../../config/api.js';
import BottomMenu from '../../components/BottomMenu';
import ComunidadeMenuDialog from '../../components/ComunidadeMenuDialog/index.js';
const { width, height } = Dimensions.get('window');

export default function ({ navigation }) {
    const [comunidades, setComunidades] = useState(null);
    const [modalVisible, setModalVisible] = useState(false); // Controle de visibilidade do modal
    const [denunciaText, setDenunciaText] = useState(''); // Texto da denúncia
    const [selectedCommunityId, setSelectedCommunityId] = useState(null); // ID da comunidade selecionada para denúncia

    // Função para buscar as comunidades
    const getCommunities = useCallback(async () => {
        try {
            const response = await api.get('/community/all');
            setComunidades(response.data.data); // Atualiza as comunidades no estado
        } catch (error) {
            Alert.alert("Erro ao consultar feed", error.response?.data?.message || "Erro desconhecido");
        }
    }, []);

    const handleDeleteCommunity = (comunidadeId) => {
        setComunidades((prevComunidades) => prevComunidades.filter((comunidade) => comunidade.id !== comunidadeId));
    };

    // Usando o useFocusEffect para atualizar as comunidades sempre que a tela for focada
    useFocusEffect(
        useCallback(() => {
            getCommunities(); // Chama a função para carregar as comunidades
        }, [getCommunities])
    );


    const renderItem = ({ item }) => (
        <View style={styles.communityCard}>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', width: '100%'}}>
                <ComunidadeMenuDialog community={item} onDeleteCommunity={handleDeleteCommunity} navigation={navigation} />
            </View>
            <Pressable onPress={() => navigation.navigate('TimelineComunidade', { id: item.id })}>
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
                            <Pressable onPress={() => navigation.navigate('Comunidades')}>
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
                        keyExtractor={item => item.id.toString()}
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


            <BottomMenu></BottomMenu>
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
        width: 35,
        height: 35,
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
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        display: 'flex',
        flexDirection: 'row',
        width: width - 15,
    },
    communityCard: {
        alignItems: 'center',
        width: 150,
        margin: 15,
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        padding: 10,
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        flex: 1,
    },
    communityImage: {
        width: width * 0.25,
        height: width * 0.25,
        borderRadius: 100,
    },
    communityName: {
        textAlign: 'center',
        fontSize: height * 0.015,
        color: '#333',
        marginTop: 5,
        maxWidth: '90%'
    },
    denunciarButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        borderRadius: 15,
        padding: 5,
    },
    denunciarText: {
        color: 'black',
        fontSize: 18,
        fontWeight: 'bold',
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: '80%',
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,

    },
    textInput: {
        width: '100%',
        height: 100,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 20,
        padding: 10,
        textAlignVertical: 'top',

    },
    modalButtons: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: 'orange',
    },
});
