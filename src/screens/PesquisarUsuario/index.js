import React, { useEffect, useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  ActivityIndicator,
  ScrollView,
  Pressable,
  TextInput,
  Dimensions
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/MaterialIcons";
import api from "../../config/api.js";
import BottomMenu from "../../components/BottomMenu";
const { width, height } = Dimensions.get('window');


const PesquisarUsuario = ({ navigation, route }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const searchValue = route?.params?.search;
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const searchUsers = async (search) => {
    setLoading(true);
    try {
      const response = await api.get(
        `/users/search?search=${encodeURIComponent(search)}`
      );
      const data = await response.data.data;
      setSearchResult(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      setSearch(searchValue);
      searchUsers(searchValue);
    }, [])
  );

  const UserCard = (user) => {
    let item = user.item.item;
    console.log(item);
    return (
      <Pressable
        onPress={() => {
          navigation.navigate("PerfilOutraPessoa", {
            userId: item.id,
          });
        }}
        style={[styles.likeCardContainer, styles.seen]}
      >
        <View style={styles.contentContainer}>
          <View>
            <Image
              source={{ uri: item.profilePictureURL }}
              style={styles.userImage}
            />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.username}> {item.name} </Text>
            <Text style={styles.action}>@{item.username} </Text>
            <Text style={styles.postSnippet}> {item.bio} </Text>
          </View>
        </View>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../../assets/top-corner.png")}
        style={styles.topCorner}
      />
      <Image
        source={require("../../../assets/bottom-corner.png")}
        style={styles.bottomCorner}
      />
      <View style={styles.header}>
        <Text style={{ textAlign: "center", fontSize: 35 }}>Pesquisa</Text>
      </View>
      <View style={styles.inputPesquisa}>
        <TextInput
          style={styles.searchInput}
          placeholder="Pesquise algo..."
          onChangeText={setSearch}
          value={search}
        />

        <Pressable style={styles.pesquisar} onPress={() => searchUsers(search)}>
          <Text style={{ fontSize: 17, color: "white", fontWeight: "bold", textAlign: 'center' }}>
            Pesquisar
          </Text>
        </Pressable>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#FF6E15" />
      ) : searchResult.length === 0 ? (
        <Text style={{ textAlign: "center", fontSize: 15, margin: 10 }}>
          Nenhum usuário foi encontrado
        </Text>
      ) : (
        <FlatList
          data={searchResult}
          keyExtractor={(item) => item.id.toString()}
          renderItem={(item) => <UserCard item={item}></UserCard>}
          style={{ marginBottom: 60 }}
        />
      )}
      <BottomMenu> </BottomMenu>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingTop: 25,
    paddingHorizontal: 0,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: "center",
    flexDirection: "row",
    flex: 1,
  },
  seen: {
    backgroundColor: "white",
  },
  unseen: {
    backgroundColor: "#f0f0f0",
  },
  card: {
    backgroundColor: "#FFF",
    padding: 5,
    marginVertical: 0,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    borderTopWidth: 0.5,
    marginTop: 0,
    height: 100,
    width: "100%",
  },
  header: {
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: height * 0.15,
    borderBottomColor: "#000",
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 15,
  },
  cardLikedimage: {
    padding: 10,
  },
  backScreen: {
    padding: 15,
    flex: 1,
    width: 45,
    height: 45,

    marginRight: 15,
  },
  imageLike: {
    width: 35,
    height: 35,
    borderRadius: 35,
    marginRight: 15,
  },
  cardContent: {
    flex: 1,
  },
  title: {
    flex: 1,
    flexDirection: "row",
  },

  nameAccount: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000000",
  },

  whoLiked: {
    padding: 15,
    flex: 1,
    fontSize: 32,
    fontWeight: "bold",
    color: "#FF6E15",
    textAlign: "center",
  },
  topCorner: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 100,
    height: 100,
  },
  bottomCorner: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: 100,
    height: 100,
  },
  likeCardContainer: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingRight: 10,
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  username: {
    color: "black",
    fontSize: 15,
    fontWeight: "bold",
  },
  action: {
    color: "#6e6d6d",
  },
  postSnippet: {
    color: '##787878',
  },
  searchInput: {
    flex: 1,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  pesquisar: {
    backgroundColor: "#f58523",
    borderRadius: 5,
    margin: 5,
    padding: 5,
    width: width * 0.3,
    textAlign: 'center'
  },
  inputPesquisa: {
    display: 'flex',
    flexDirection: 'row',
    margin: 15,
  },
});

export default PesquisarUsuario;
