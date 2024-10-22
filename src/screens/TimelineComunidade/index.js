import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';  

const data = [
  {
    id: '1',
    user: 'Maria Eduarda',
    handle: '@dardão',
    content: 'Alguém consegue me passar o conteúdo da prova da Wellida? To frita nessas questões de Concordância Verbal.',
    avatar: 'https://th.bing.com/th/id/R.a2f0d025807f7840aa1dff0cea3691cb?rik=xnaoVQACpKXzEw&riu=http%3a%2f%2fpngimg.com%2fuploads%2fminecraft%2fminecraft_PNG70.png&ehk=e9%2fmwq5zOn5zMfSkEnEP%2bnvS0qG3FI5K9DRrP0AHNcM%3d&risl=&pid=ImgRaw&r=0',
    likes: 10,
  },
  {
    id: '2',
    user: 'Beatriz Francielle',
    handle: '@babi123',
    content: 'Voces fizeram pam? eu esqueci.',
    avatar: 'https://www.abbviecomvoce.com.br/resource/1569573722000/assets_patient_skyrizi_new/img/avatar.png',
    likes: 5,
  },
  {
    id: '3',
    user: 'Guilherme Moreira',
    handle: '@guilMoreira',
    content: 'Terminei pw,finamente.',
    avatar: 'https://th.bing.com/th/id/R.04e2f0bc395ee37944f14b1f9381ae30?rik=TRhFy2ha0CA35w&pid=ImgRaw&r=0',
    likes: 4,
  },
  {
    id: '4',
    user: 'vic',
    handle: '@vicvaporub',
    content: ' a Ingryd é uma querida.',
    avatar: 'https://th.bing.com/th/id/OIP.2VGV0T-xNC-tN2k9zYOlwgHaF4?rs=1&pid=ImgDetMain',
    likes: 1,
  },
  {
    id: '5',
    user: 'ze',
    handle: '@zeze',
    content: 'Terminei pam, irei jogar rapaziada.',
    avatar: 'https://th.bing.com/th/id/OIP.gSoNcOX49eIFpQNpusAskwHaHa?rs=1&pid=ImgDetMain',
    likes: 2,
  },
  {
    id: '6',
    user: 'dudaaz ',
    handle: '@dudazzs',
    content: 'O provao ta quase ai,MEDOOO.',
    avatar: 'https://th.bing.com/th/id/OIP.jKNYs4vigYHhfDsmTCUgfQHaLG?rs=1&pid=ImgDetMain',
    likes: 9,
  },
  {
    id: '7',
    user: 'jeba ',
    handle: '@jebas',
    content: 'aaaaaaa nao estou conseguindo commitar',
    avatar: 'https://th.bing.com/th/id/OIP.DMSK7Vkp0Ei655b1STUjOAHaE5?rs=1&pid=ImgDetMain',
    likes: 2,
  },
  {
    id: '8',
    user: 'belusca',
    handle: '@bella',
    content: 'Quem vai no hopi???',
    avatar: 'https://i.pinimg.com/originals/c2/bb/fb/c2bbfb0a51cfb320ad129e68383903a7.jpg',
    likes: 19,
  },
];

const TimelineComunidade = () => {
  const navigation = useNavigation();  

  const [postData, setPostData] = useState(data);

  const handleLike = (id) => {
    setPostData(postData.map(post => 
      post.id === id ? { ...post, likes: post.likes + 1 } : post
    ));
  };

  const renderItem = ({ item }) => (
    <View style={styles.postContainer}>
      <View style={styles.postHeader}>
        <Image source={{ uri: item.avatar }} style={styles.avatar} />
        <View style={styles.postInfo}>
          <Text style={styles.user}>{item.user}</Text>
          <Text style={styles.handle}>{item.handle}</Text>
        </View>
        <TouchableOpacity style={styles.fButton}>
          <Text style={styles.fText}>...</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.content}>{item.content}</Text>
      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton} onPress={() => handleLike(item.id)}>
          <Text style={styles.actionText}>Curtidas ({item.likes})</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionText}>Comentários</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>   3DS   </Text>
        <Text style={styles.headerMember}>   32 integrantes  </Text>
        <Text style={styles.headerSubtitle}>Garotes de Programas 🐝👏</Text>
          <Text style={styles.descText}>Apenas o terceirao DS 2024 </Text>
      </View>
      <FlatList
        data={postData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={styles.feed}
      />
      <View style={styles.navBar}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Timeline')}>
        <Text style={styles.backButtonText}> Home</Text>
      </TouchableOpacity>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Comunidades')}>
        <Text style={styles.backButtonText}> Criar Comunidade</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Notiicacoes')}>
        <Text style={styles.backButtonText}> Notificações</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
 
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#f58523',
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
  },
  headerTitle: {
    fontSize: 40,
    color: '#fff',
    fontWeight: '400',
    flex: 1,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    flex: 1,
  },
  headerSubtitle: {
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
});

export default TimelineComunidade;