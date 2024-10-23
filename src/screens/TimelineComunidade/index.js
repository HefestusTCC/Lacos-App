import { useFocusEffect } from '@react-navigation/native';
import { useState, useEffect, useCallback } from 'react';
import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity, ScrollView, Pressable, Alert, Modal, Dimensions, FlatList } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { AntDesign } from '@expo/vector-icons';

import api from '../../config/api';
const { width, height } = Dimensions.get('window');


const TimelineComunidade = ({ navigation, route }) => {
  const idComunidade = route.params.id;
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

  const [reportModal, setReportModal] = useState(null);
  const [comunidade, setComunidade] = useState(false);
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
  const getFeed = async () => {
    try {
      const response = await api.get(`/community/${idComunidade}/feed`);
      let data = response;

      return await data.data.data;
    } catch (error) {

      Alert.alert("Erro ao consultar feed", error.response.data.message)
    }
  }

  const getCommunity = async () => {
    try {
      const response = await api.get(`/community/${idComunidade}`);

      return await response.data.data;
    } catch (error) {
      Alert.alert("Erro ao consultar comunidade", error.response.data.message)
    }
  }

  const joinCommunity = async () => {
    try {
      const response = await api.post(`/community/${idComunidade}/enter`);
      return await response.data.data;
    } catch (error) {
      Alert.alert("Erro ao consultar comunidade", error.response.data.message)
    }
  }


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
    return post.likes.some(like => like.user.id === userData.id);
  };

  const like = async (id, alreadyLiked) => {
    try {
      const response = await api.post(`/post/${id}/like`);
      if (response.status == 200) {
        // console.log("likes: " + JSON.stringify(response.data.data.likes));
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
          <Image source={{ uri: comment.author.profilePictureURL }} style={styles.commentUserImage} />
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


  useFocusEffect(
    useCallback(() => {
      const fetchFeed = async () => {
        const feedData = await getFeed();
        const comunidade = await getCommunity();

        setPosts(feedData);
        setComunidade(comunidade);

        if (comunidade.members.some(member => member.user.id == userData.id)) {
          console.log('é da comu')
        } else {
          await joinCommunity();
        }
      };
      fetchFeed();
    }, [])
  );


  return (

    <View style={styles.container}>
      <View style={styles.headerBanner}>
        <Text style={styles.headerTitleBanner}>{comunidade.name}</Text>
        <Text style={styles.headerMember}>{comunidade.memberCount} membro(s)</Text>
        <Text style={styles.headerSubtitle}>{comunidade.description}</Text>
      </View>
      <FlatList
        data={posts}
        renderItem={renderPosts}
        keyExtractor={item => item.id}
        style={styles.feed}
      />
      <View style={styles.navBar}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Timeline')}>
          <Text style={styles.backButtonText}> Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Postar', { idComunidade: idComunidade })}>
          <Text style={styles.backButtonText}> Criar Post para comunidade</Text>
        </TouchableOpacity>
        {comunidade ? 
          comunidade.creator.id ? 
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Editar_Comunidade', { comunidade: comunidade })}>
              <Text style={styles.backButtonText}> Editar Comunidade</Text>
            </TouchableOpacity> 
            : null 
        : null}

      </View>
    </View>
  );
};
const styles = StyleSheet.create({

  headerBanner: {
    alignItems: '',
    padding: 10,
    backgroundColor: '#f58523',
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
  },
  headerTitleBanner: {
    alignItems: 'center',
    fontSize: 20,
    color: '#fff',
    fontWeight: '400',
  },
  headerSubtitleFirst: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    flex: 1,
  },
  headerSubtitleFirst: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    flex: 1,
  },
  saveButton: {
    padding: 1,
  },
  enterButton: {
    padding: 1,
  },
  saveText: {
    color: '#fff',
  },
  enterText: {
    color: '#fff',
  },

  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    alignItems: '',
    padding: 10,
    backgroundColor: '#f58523',
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,

  },
  headerTitle: {
    alignItems: 'center',
    fontSize: 40,
    color: '#fff',
    fontWeight: '400',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#fff',
  },
  descText: {
    fontSize: 12,
    color: '#fff',
  },
  headerMember: {
    fontSize: 15,
    color: '#d2691e',
  },
  feed: {
    padding: 30,
  },
  postContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  postInfo: {
    flex: 1,
  },
  user: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  handle: {
    fontSize: 15,  //arroba
    color: 'gray',
  },

  content: {
    fontSize: 16,
    marginTop: 10,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 20,
  },
  actionButton: {
    marginRight: 50,
  },
  actionText: {
    color: '#f58523',
    fontWeight: 'bold',
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    padding: 10,
    backgroundColor: '#fff',
    borderTopWidth: 8,
    borderColor: '#DDD',
  },
  navButton: {
    alignItems: 'center',
  },

  backButton: {
    padding: 10,
    backgroundColor: '#F4A460',
    alignItems: 'center',
    marginBottom: 20,
    borderRadius: 5,
  },
  backButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    padding: width * 0.05,
    backgroundColor: '#fff',
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f8f8f8',
  },
  menuButton: {
    marginRight: 10,
  },
  menuIcon: {
    width: 30,
    height: 30,
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
  profileImage: {
    width: width * 0.15,
    height: width * 0.15,
    borderRadius: (width * 0.15) / 2,
    marginRight: width * 0.02,
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
    flex: 1,
  },
  comments: {
    maxHeight: 200
  },
});

export default TimelineComunidade;