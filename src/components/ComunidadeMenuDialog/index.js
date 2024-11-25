
import React, { useState } from 'react';
import {
    View,
    Text,
    Modal,
    TouchableOpacity,
    StyleSheet,
    Alert,
    Pressable,
    Dimensions,
    TextInput
} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import api from '../../config/api';

const { width, height } = Dimensions.get('window');

const ComunidadeMenuDialog = ({ community, navigation, onDeleteCommunity }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [reportModalVisible, setReportModalVisible] = useState(false);
    const [reportValue, setReportValue] = useState('');
    const jsonString = SecureStore.getItem("user");
    const storedUser = JSON.parse(jsonString);
    const userData = {
        id: storedUser.id,
        name: storedUser.name,
        username: storedUser.username,
        profilePictureUrl: storedUser.profilePictureURL,
        backgroundPictureUrl: storedUser.backgroundPictureURL,
        bio: storedUser.bio,
        school: storedUser.school,
        course: storedUser.course
    };

    const options = community.creator.id === userData.id ? ['Editar', 'Excluir',]: ['Denunciar'];
    const onClose = () => {
        setIsVisible(!isVisible);
    }

    const openMenu = () => {
        setIsVisible(true);
    }

    const closeReportModal = () => {
        setReportModalVisible(false);
    }

    const report = async (id) => {
        if (!reportValue) {
            Alert.alert("Não é possível criar uma denúncia vazia");
            return;
        }
        const reportData = {
            message: reportValue
        }
        try {
            const response = await api.post(`/tickets/community/${id}`, reportData);
            if (response.status == 201) {
                Alert.alert("Denúncia criada com sucesso.", "Aguarde e ela será respondida por um administrador.");
                return true;
            }
        } catch (error) {
            Alert.alert("Erro ao criar denúncia", error.response.data.message);
            return false;
        }
        setReportValue('');
    }

    // Função para enviar denúncia
    const handleReport = async (id) => {
        let reported = await report(id);
        setReportModalVisible(false);
    };


    const excluirComunidade = async (community) => {
        try {
            const response = await api.delete(`/community/${community.id}`);
            const data = response.data.data;
        } catch (error) {
            console.log(error);
        }
    }



    const mostrarAlertaConfirmação = () => {
        Alert.alert(
            "Excluir a comunidade",
            "Você tem certeza que deseja excluir a comunidade? Uma vez excluida, não será possível recuperá-la.", // Mensagem do alerta
            [
                {
                    text: "Sim",
                    onPress: () => excluirComunidade(community)
                },
                {
                    text: "Não",
                    onPress: () => { return false },
                }
            ],
            { cancelable: true }
        );
    }

    const handleOptionPress = (option) => {
        switch (option) {
            case "Editar":
                navigation.navigate('Editar_Comunidade', { community: community })
                break;

            case "Excluir":
                mostrarAlertaConfirmação();
                break;

            case "Denunciar":
                setReportModalVisible(true)
                break;
        }
        onClose();
    };

    return (

        <>
            <Pressable onPress={openMenu} style={styles.botao}>
                <Text style={{color: 'black', fontSize: 20, fontWeight: 'bold', textAlign: 'center'}}>...</Text>
            </Pressable>
            <Modal
                transparent={true}
                visible={isVisible}
                animationType="fade"
                onRequestClose={onClose}
            >
                <TouchableOpacity style={styles.overlay} onPress={onClose} />
                <View style={styles.modalContent}>
                    {
                        options.map((option, index) => {
                            if (option == "Editar") {
                                return (
                                    <TouchableOpacity
                                        key={index}
                                        style={styles.optionButton}
                                        onPress={() => handleOptionPress(option)}
                                    >
                                        <MaterialIcons name="edit" size={24} color="black" />
                                        <Text style={styles.optionText}>{option}</Text>
                                    </TouchableOpacity>
                                )
                            }
                            if (option == "Excluir") {
                                return (
                                    <TouchableOpacity
                                        key={index}
                                        style={styles.optionButton}
                                        onPress={() => handleOptionPress(option)}
                                    >
                                        <MaterialIcons name="delete" size={24} color="red" />
                                        <Text style={styles.optionText}>{option}</Text>
                                    </TouchableOpacity>
                                )
                            }
                            if (option == "Denunciar") {
                                return (
                                    <TouchableOpacity
                                        key={index}
                                        style={styles.optionButton}
                                        onPress={() => handleOptionPress(option)}
                                    >
                                        <FontAwesome name="flag" size={24} color="orange" />
                                        <Text style={styles.optionText}>{option}</Text>
                                    </TouchableOpacity>
                                )
                            }
                        }
                        )
                    }
                </View>
            </Modal>

            <Modal
                animationType="fade"
                transparent={true}
                visible={reportModalVisible}
                onRequestClose={closeReportModal}
            >
                <TouchableOpacity style={styles.overlay} onPress={closeReportModal} />
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Denunciar Comunidade</Text>
                        <TextInput value={reportValue} onChangeText={setReportValue} style={styles.reportInput} placeholder="Motivo da denúncia" />
                        <TouchableOpacity onPress={() => handleReport(community.id)} style={styles.reportButton}>
                            <Text style={styles.reportButtonText}>Enviar Denúncia</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        display: 'flex',
        flexDirection: 'column',
    },
    optionButton: {
        paddingVertical: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '90%'
    },
    optionText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
        marginLeft: 15
    },
    optionsButton: {
        marginLeft: 'auto',
    },
    botao: {
        width: 35,
    },
    moreOptions: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    modalBackground: {
        flex: 1,
        position: 'absolute',
        top: height * 0.35,
        left: width * 0.1
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
    reportInput: {
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        padding: height * 0.015,
        marginBottom: height * 0.02,
        height: 90
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

});

export default ComunidadeMenuDialog;
