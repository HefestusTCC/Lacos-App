import { useFocusEffect } from '@react-navigation/native';
import { useState, useEffect, useCallback } from 'react';
import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity, ScrollView, Pressable, Alert, Modal, Dimensions, FlatList } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { AntDesign } from '@expo/vector-icons';
import BottomMenuComunidade from '../../components/ComunidadeMenu';
import PostCard from '../../components/PostCard';
import api from '../../config/api';
import BotaoEditarComunidade from '../../components/BotaoEditarComunidade';

const { width, height } = Dimensions.get('window');


const TimelineComunidade = ({ navigation, route }) => {
  const idComunidade = route?.params?.id;
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
  const [comunidade, setComunidade] = useState(false);
  const [posts, setPosts] = useState([]);
  const [inCommunity, setInCommunity] = useState();
  const handleDeletePost = (postId) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
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
      const data = response.data.data;
      setComunidade(data);
      setInCommunity(isUserInCommunity(data, storedUser.id));
      console.log(inCommunity);
    } catch (error) {
      Alert.alert("Erro ao consultar comunidade", error.response.data.message)
    }
  }

  const leaveCommunity = async () => {
    try {
      const response = await api.post(`/community/${idComunidade}/leave`);
      const data = response.data.data;
      setComunidade(data);
      setInCommunity(isUserInCommunity(data, storedUser.id));
      console.log(inCommunity)
    } catch (error) {
      Alert.alert("Erro ao consultar comunidade", error.response.data.message)
    }
  }

  const isUserInCommunity = (comunidade, id) => {
    return comunidade.members.some(member => member.user.id == id);
  }

  useFocusEffect(
    useCallback(() => {
      const fetchFeed = async () => {
        const feedData = await getFeed();
        const comunidade = await getCommunity();
        setPosts(feedData);
        setComunidade(comunidade);
        setInCommunity(isUserInCommunity(comunidade, storedUser.id));
      };
      fetchFeed();
    }, [])
  );

  return (

    <View style={styles.container}>
      <View style={styles.headerBanner}>
        <Image
          source={{ uri: comunidade.bannerUrl }}
          style={styles.headerBannerImage}
        ></Image>
        <View style={styles.nav}>
        </View>
        <View>
        </View>
        <Image
          source={{ uri: comunidade.communityImageUrl }}
          style={styles.imagemComunidade}
        />
        <View style={{ marginTop: 25 }}>
          <Text style={styles.headerTitleBanner}>{comunidade.name}</Text>
          <Text style={styles.headerMember}>{comunidade.memberCount} membro(s)</Text>
        </View>
        <View>
          {
            comunidade ?
              comunidade.creator.id == userData.id ?
                <BotaoEditarComunidade community={comunidade} navigation={navigation} />
                :
                inCommunity ?
                  <Pressable onPress={() => leaveCommunity()} style={styles.botao}><Text style={{ color: 'white', fontSize: 15 }}>Sair</Text></Pressable>
                  :
                  <Pressable style={styles.botao} onPress={() => joinCommunity()}><Text style={{ color: 'white', fontSize: 15 }}>Entrar</Text></Pressable>
              :
              null
          }
        </View>
      </View>
      <View style={{ display: 'flex', justifyContent: 'center', margin: 10, }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Sobre: </Text>
        <Text>{comunidade.description}</Text>
      </View>
      {posts.length === 0 ? <Text style={{ textAlign: 'center', marginTop: 10, fontSize: 15 }}>A comunidade não possui posts. Crie um!</Text> :
        <>
          <Text style ={{fontWeight: 'bold', textAlign: 'center', margin: 5, fontSize: 20}}>Publicações</Text>
          <FlatList
            data={posts}
            renderItem={(item) => <PostCard post={item.item} navigation={navigation} handleDeletePost={handleDeletePost}></PostCard>}
            keyExtractor={item => item.id.toString()}
            style={styles.posts}
          />
        </>
      }
      <BottomMenuComunidade idComunidade={idComunidade} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerBanner: {
    width: '100%',
    height: '28%',
  },
  headerBannerImage: {
    width: '100%',
    height: '100%',
    position: 'absolute'
  },
  headerTitleBanner: {
    fontSize: 27,
    color: '#fff',
    fontWeight: '400',
    marginTop: '18%',
    marginLeft: '25%',
  },
  imagemComunidade: {
    height: 75,
    width: 75,
    position: 'absolute',
    marginTop: '35%',
    marginLeft: '2%',
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'white'
  },
  headerMember: {
    fontSize: 15,
    color: '#fcc195',
    marginLeft: '25%',
  },
  nav: {
    flexDirection: 'row',
    alignItems: 'left',
    marginTop: '12%',
    marginLeft: '5%'
  },

  navButton: {
    flex: 1,
    alignItems: 'left',
  },
  voltar: {
    width: 22,
    height: 22,
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

  descText: {
    fontSize: 12,
    color: '#fff',
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
    marginBottom: 40,
    padding: 10,
  },
  comments: {
    maxHeight: 200
  },
  botao: {
    display: 'flex',
    width: '25%',
    marginLeft: width * 0.70,
    marginTop: -10,
    backgroundColor: '#ff6f00',
    textAlign: 'center',
    alignItems: 'center'
    , justifyContent: 'center',
    borderRadius: 10,
    color: 'white',
    height: 30,
  }
});

export default TimelineComunidade;