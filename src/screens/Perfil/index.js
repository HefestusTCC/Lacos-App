import React, { useState, useCallback } from 'react';
import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity, ScrollView, Pressable, Alert, Modal, Dimensions, FlatList } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { useFocusEffect } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import api from '../../config/api';
const { width, height } = Dimensions.get('window');
import BottomMenu from '../../components/BottomMenu';
const ProfileScreen = ({ navigation }) => {

  const [user, setUser] = useState({
  });
  const [profile, setProfile] = useState('');
  const securedUser = SecureStore.getItem('user');
  var userId = JSON.parse(securedUser).id;

  const loadUserData = async () => {
    try {
      const jsonString = await SecureStore.getItemAsync('user');
      if (jsonString) {
        const storedUser = JSON.parse(jsonString);
        setUser((prevUser) => ({
          ...prevUser,
          id: storedUser.id,
          profilePictureURL: storedUser.profilePictureURL,
          name: storedUser.name,
          course: storedUser.course,
          username: storedUser.username,
          school: storedUser.school,
          course: storedUser.course,
          backgroundPicture: storedUser.backgroundPictureURL,
          bio: storedUser.bio
        }));
      }
    } catch (error) {
      Alert.alert('Erro ao carregar dados: ' + error.message);
    }
  };

  const [reportModal, setReportModal] = useState(null);
  const [menuVisible, setMenuVisible] = useState(false);
  const [visibleCommentsForPost, setVisibleCommentsForPost] = useState(null);
  const [posts, setPosts] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [reportValue, setReportValue] = useState('');

  const openReportModal = (postId) => {
    setReportModal(postId);
  }

  const closeReportModal = () => {
    setReportModal(null);
  };

  const openCommentsModal = (postId) => {
    setVisibleCommentsForPost(postId);
  };
  const closeCommentsModal = () => {
    setVisibleCommentsForPost(null);
  };



  const report = async (id) => {
    if (!reportValue) {
      Alert.alert("Não é possível criar uma denúncia vazia");
      return;
    }
    const reportData = {
      "message": reportValue
    }
    try {
      const response = await api.post(`/tickets/post/${id}`, reportData);
      if (response.status == 201) {
        Alert.alert("Denúncia criada com sucesso");
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
    // setReportValue('');
    setReportModal(null);
  };

  // Função para adicionar comentário
  const handleAddComment = async (id) => {
    if (!newComment) {
      Alert.alert("Não é possível criar um comentário vazio.");
      return;
    }
    let updatedComments = await createComment(id);
    if (updatedComments) {
      setPosts(prevPosts =>
        prevPosts.map(post =>
          post.id === id
            ? {
              ...post,
              comments: updatedComments // Atualiza com os comentários retornados
            }
            : post
        )
      );
    }
    setNewComment('');
  };


  const didUserLikePost = (post) => {
    return post.likes.some(like => like.user.id === user.id);
  };

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
  const createComment = async (id) => {

    const commentData = {
      "content": newComment
    }
    try {
      const response = await api.post(`/post/${id}/comment`, commentData);
      if (response.status == 201) {
        Alert.alert("Comentário criado com sucesso");
        return response.data.data.comments;
      }
    } catch (error) {
      Alert.alert("Erro ao criar comentário", error.response.data.message)
    }

  }

  // Componente LikeButton
  const LikeButton = ({ post }) => {
    const [liked, setLiked] = useState(didUserLikePost(post));
    const [likeCount, setLikeCount] = useState(post.likeCount);
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
            size={32}
            color='orange'
            margin={20}
          />
        </TouchableOpacity>
        <Text>{likeCount}</Text>
      </View>
    );
  };

  // Componente CommentButton
  const CommentButton = ({ id }) => {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity onPress={() => openCommentsModal(id)}>
          <AntDesign name="message1" size={32} color='orange' />
        </TouchableOpacity>
      </View>
    );
  };

  // Componente para exibir cada comentário
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

  const renderPosts = ({ item }) => {
    if (!item || !item.author) {

      return null;
    }
    let post = item;


    return (
      <>
        {/* Seção de Publicação */}
        <View style={styles.newPublication}>
          <View style={styles.header}>
            <Image
              source={{ uri: post.author.profilePictureURL }}
              style={styles.userImage}
            />
            <View>
              <Text style={styles.userName}>{post.author.name}</Text>
              <Text style={styles.userHandle}>@{post.author.username}</Text>
            </View>
            <Pressable onPress={() => openReportModal(post.id)} style={styles.optionsButton}>
              <Text style={styles.moreOptions}>...</Text>
            </Pressable>
          </View>
          <Text style={styles.publicationText}>{post.content}</Text>
          {post.image != null ? <Image
            source={{ uri: post.image }}
            style={styles.publicationImage}
            onPress={() => openCommentsModal(post.id)} // Abre o modal de comentários ao pressionar a imagem
          /> : null}

          {/* LIKE BUTTON */}
          <View style={styles.likeButtonContainer}>
            <LikeButton post={post} />
            <CommentButton id={post.id} />
          </View>

          {/* Modal para Comentários */}
          <Modal animationType="slide" transparent={true} visible={visibleCommentsForPost === post.id} onRequestClose={closeCommentsModal}>
            <View style={styles.modalBackground}>
              <View style={styles.modalContainer}>
                <Text style={styles.modalTitle}>Comentários</Text>
                <View style={styles.header}>
                  <Image
                    source={{ uri: post.author.profilePictureURL }}
                    style={styles.userImage}
                  />
                  <View>
                    <Text style={styles.userName}>{post.author.name}</Text>
                    <Text style={styles.userHandle}>@{post.author.username}</Text>
                  </View>
                </View>
                <Text style={styles.publicationText}>{post.content}</Text>
                {post.image ? <Image source={{ uri: post.image }} style={styles.publicationImage} /> : null}
                <FlatList
                  data={item.comments}
                  renderItem={(item) => item ? <Comment comment={item} /> : null} // Renderiza cada comentário
                  keyExtractor={(item) => item.id.toString()}
                  style={styles.comments}
                />
                <TextInput
                  style={styles.commentInput}
                  placeholder="Adicione um comentário..."
                  value={newComment}
                  onChangeText={setNewComment}
                />
                <TouchableOpacity onPress={() => handleAddComment(post.id)} style={styles.addCommentButton}>
                  <Text style={styles.addCommentButtonText}>Enviar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setVisibleCommentsForPost(null)} style={styles.closeButton}>
                  <Text style={styles.closeButtonText}>Fechar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          {/* Modal para Denúncia */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={reportModal == post.id}
            onRequestClose={() => closeReportModal()}
          >
            <View style={styles.modalBackground}>
              <View style={styles.modalContainer}>
                <Text style={styles.modalTitle}>Denunciar Postagem</Text>
                <TextInput value={reportValue} onChangeText={setReportValue} style={styles.reportInput} placeholder="Motivo da denúncia" />
                <TouchableOpacity onPress={() => handleReport(post.id)} style={styles.reportButton}>
                  <Text style={styles.reportButtonText}>Enviar Denúncia</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </>
    );
  }

  const getProfileData = async () => {
    try {
      const response = await api.get(`/users/${userId}`);
      if (response.status == 200) {
        return response.data.data;
      }
    } catch (error) {
      Alert.alert("Erro ao carregar o perfil");
    }
  }

  useFocusEffect(
    useCallback(() => {
      const profileData = async () => {
        let data = await getProfileData();
        setProfile(data);
        if (data.posts) {
          setPosts(data.posts); // Defina os posts aqui apenas quando estiverem disponíveis

        }
      }
      loadUserData();
      profileData();
    }, [navigation])
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Pressable onPress={() => navigation.navigate('Timeline')}>
        <Image
          source={require("../../../assets/voltar.png")}
          style={styles.voltar}
        />
      </Pressable>
      <Image
        source={{ uri: user.backgroundPicture }}
        style={styles.profileFundo}
      />
      <Image
        source={{ uri: user.profilePictureURL }}
        style={styles.profileImage}
      />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.title}>{user.course}</Text>
        <Text></Text>
        <Text style={styles.ct}>{user.school}</Text>
        <Text style={styles.quote}>{user.bio}</Text>
      </View>
      <View style={styles.editButtonContainer}>
        <Pressable onPress={() => navigation.navigate('Editar')}>
          <Image
            source={{ uri: user.editar }}
            style={styles.editar}
          />
        </Pressable>
      </View>

      {/* Publicação */}
      <Text style={styles.Publication}>PUBLICAÇÕES</Text>
      <View style={{ flex: 1 }}>
        <FlatList
          data={posts}
          renderItem={renderPosts}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ flexGrow: 1 }}
          style={{ height: '100%', width: '100%' }}
          nestedScrollEnabled={true}  // O conteúdo pode expandir
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: "white",
  },
  voltar: {
    position: "absolute",
    top: 6,
    right: 16,
    width: 35,
    height: 35,
  },
  profileFundo: {
    position: 'absolute',
    top: 5,
    left: 5,
    width: '97%',
    height: 200,
    borderRadius: 30,
    marginBottom: 20,
  },
  profileImage: {
    position: 'absolute',
    top: 160,
    left: 20,
    width: 120,
    height: 120,
    borderRadius: 100,
    borderWidth: 5,
    borderColor: '#fff',
  },
  infoContainer: {
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    width: '100%',
    paddingRight: 25,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 200,
  },
  title: {
    fontSize: 18,
    color: 'gray',
    width: 200,
    marginBottom: 8,
  },
  pronouns: {
    fontSize: 16,
    marginBottom: 5,
  },
  ct: {
    fontSize: 16,
    marginBottom: 5,
    color: '#4CAF50',
  },
  quote: {
    fontSize: 14,
    fontStyle: 'italic',
    marginBottom: 10,
  },
  editButtonContainer: {
    position: 'absolute',
    top: 160,
    right: 20,
  },
  editar: {
    width: 40,
    height: 40,
  },
  Publication: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  card: {
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 10,
    width: '90%',
    marginBottom: 20,
  },
  namePublic: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  username: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 10,
  },
  textPublication: {
    fontSize: 14,
  },
  suggestionsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  suggestionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
  },
  suggestionItem: {
    alignItems: 'center',
  },
  suggestionImage: {
    width: 90,
    height: 90,
    borderRadius: 50,
  },
  followButton: {
    marginTop: 5,
    backgroundColor: '#FF6E15',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  followButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  newPublication: {
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 10,
    width: width * 0.8,
    marginTop: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  userHandle: {
    fontSize: 14,
    color: 'gray',
  },
  moreOptions: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'flex-end',
  },
  publicationText: {
    fontSize: 16,
    marginVertical: 10,
  },
  publicationImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  logo: {
    width: 50,
    height: 50,
    marginLeft: 10,
  },
  newButton: {
    backgroundColor: '#f58523',
    padding: height * 0.02,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: height * 0.02,
  },
  newButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: height * 0.02,
  },

  profileInfo: {
    flex: 1,
  },
  welcomeText: {
    fontSize: height * 0.025,
  },
  orangeText: {
    color: 'orange',
  },
  courseText: {
    fontSize: height * 0.022,
    color: '#777',
  },
  bioText: {
    fontSize: height * 0.02,
    color: '#666',
  },
  communitySection: {
    padding: 10,
    backgroundColor: '#f8f8f8',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  communitiesRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  communityCard: {
    width: width * 0.28,
    alignItems: 'center',
  },
  communityImage: {
    width: '100%',
    height: width * 0.30,
    borderRadius: 10,

  },
  communityName: {
    marginTop: 5,
    fontWeight: 'bold',
  },
  newPublication: {
    padding: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: width * 0.8
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
  userName: {
    fontWeight: 'bold',
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
    justifyContent: 'space-between',
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
    height: 400,
    width: '100%',
    flex: 1,
  },
  comments: {
    maxHeight: 200
  },
});

export default ProfileScreen;
