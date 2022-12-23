import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Pressable,
} from "react-native";
import Header from "../../Reuseable Components/Header";
import RBSheet from "react-native-raw-bottom-sheet";
import { api } from "../../constants/api";
import Loader from "../../Reuseable Components/Loader";
import Snackbar from "react-native-snackbar";
import AsyncStorage from "@react-native-async-storage/async-storage";

const JoinGroup = ({ navigation, route }) => {
  console.log("route ::: ", route?.params);
  const bottomSheetRef = useRef();
  const bottomSheetAddMemberRef = useRef();

  const [loading, setLoading] = useState(false);
  const [groupId, setGroupId] = useState("");
  const [groupName, setGroupName] = useState("");

  const [groupMembersList, setGroupMembersList] = useState([
    // {
    //   id: 0,
    //   name: "Me",
    //   avater: require("../../../assets/images/friend-profile.png"),
    // },
    // {
    //   id: 1,
    //   name: "Nahla",
    //   avater: require("../../../assets/images/friend-profile.png"),
    // },
    // {
    //   id: 2,
    //   name: "Saffa",
    //   avater: require("../../../assets/images/friend-profile.png"),
    // },
    // {
    //   id: 3,
    //   name: "Rui",
    //   avater: require("../../../assets/images/friend-profile.png"),
    // },
    // {
    //   id: 4,
    //   name: "Anum",
    //   avater: require("../../../assets/images/friend-profile.png"),
    // },
    // {
    //   id: 5,
    //   name: "Zaina",
    //   avater: require("../../../assets/images/friend-profile.png"),
    // },
    // {
    //   id: 6,
    //   name: 'Noami',
    // avater:require('../../../assets/images/friend-profile.png')
    // },
  ]);

  const [allMembersList, setAllMembersList] = useState([
    {
      id: 0,
      name: "Me",
      avater: require("../../../assets/images/friend-profile.png"),
    },
    {
      id: 1,
      name: "Nahla",
      avater: require("../../../assets/images/friend-profile.png"),
    },
    {
      id: 2,
      name: "Saffa",
      avater: require("../../../assets/images/friend-profile.png"),
    },
    {
      id: 3,
      name: "Rui",
      avater: require("../../../assets/images/friend-profile.png"),
    },
    {
      id: 4,
      name: "Anum",
      avater: require("../../../assets/images/friend-profile.png"),
    },
    {
      id: 5,
      name: "Zaina",
      avater: require("../../../assets/images/friend-profile.png"),
    },
    // {
    //   id: 6,
    //   name: 'Noami',
    // avater:require('../../../assets/images/friend-profile.png')
    // },
  ]);
  useEffect(() => {
    if (route?.params) {
      setGroupId(route?.params?.item?.id);
      setGroupName(route?.params?.item?.group_name);
      //getting list of members that is added in this group
      getGroupMembers(route?.params?.item?.id);
    }
  }, [route?.params]);

  const getUser_Info = (id) => {
    return new Promise((resolve, reject) => {
      try {
        var requestOptions = {
          method: "POST",
          body: JSON.stringify({
            user_id: id,
          }),
          redirect: "follow",
        };
        fetch(api.get_specific_user, requestOptions)
          .then((response) => response.json())
          .then((result) => {
            if (result?.length > 0) {
              resolve(result[0]);
            } else {
              resolve(false);
            }
          })
          .catch((error) => {
            console.log("error in getting user detail ::", error);
            resolve(false);
          });
      } catch (error) {
        console.log("error occur in getting user profile detail ::", error);
        resolve(false);
      }
    });
  };
  const getGroupMembers = (id) => {
    setGroupMembersList([]);
    console.log("groud id pass :: ", id);
    if (id) {
      setLoading(true);
      let data = {
        id: id,
      };
      var requestOptions = {
        method: "POST",
        body: JSON.stringify(data),
        redirect: "follow",
      };
      fetch(api.get_specific_group_members, requestOptions)
        .then((response) => response.json())
        .then(async (result) => {
          if (result[0]?.error == false || result[0]?.error == false) {
            let membersList = result[0]?.Members ? result[0]?.Members : [];
            let list = [];
            if (membersList?.length > 0) {
              for (const element of membersList) {
                let userInfo = await getUser_Info(element?.user_id);
                if (userInfo != false) {
                  let obj = {
                    id: element?.user_id,
                    user_id: element?.user_id,
                    first_name: userInfo ? userInfo?.first_name : "",
                    last_name: userInfo ? userInfo?.last_name : "",
                    profile: userInfo ? userInfo["profile image"] : "",
                    selected: false,
                  };
                  list.push(obj);
                }
              }
              setGroupMembersList(list);
            } else {
              Snackbar.show({
                text: result[0]?.message,
                duration: Snackbar.LENGTH_SHORT,
              });
            }
          } else {
            Snackbar.show({
              text: result[0]?.message,
              duration: Snackbar.LENGTH_SHORT,
            });
          }
        })
        .catch((error) => {
          console.log("error in getting groups list ::: ", error);
          Snackbar.show({
            text: "Something went wrong.Unable to get group members.",
            duration: Snackbar.LENGTH_SHORT,
          });
        })
        .finally(() => setLoading(false));
    }
  };
  const handleJoinGroup = async () => {
    if (groupId) {
      let user_id = await AsyncStorage.getItem("user_id");
      setLoading(true);
      let data = {
        user_id: user_id,
        group_id: groupId,
      };

      var requestOptions = {
        method: "POST",
        body: JSON.stringify(data),
        redirect: "follow",
      };
      fetch(api.join_group, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          Snackbar.show({
            text: result[0]?.message,
            duration: Snackbar.LENGTH_SHORT,
          });
          navigation?.goBack();
        })
        .catch((error) => {
          Snackbar.show({
            text: "Something went wrong",
            duration: Snackbar.LENGTH_SHORT,
          });
        })
        .finally(() => setLoading(false));
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
        showsVerticalScrollIndicator={false}
      >
        {loading && <Loader />}

        <View style={{ paddingHorizontal: 20 }}>
          {/* <Header title={"Incorruptibles"} navigation={navigation} /> */}
          <Header title={groupName} navigation={navigation} />
        </View>
        <View
          style={{
            marginVertical: 10,
            paddingHorizontal: 20,
            alignItems: "center",
          }}
        >
          <Image
            source={require("../../../assets/images/group-profile2.png")}
            style={{
              marginVertical: 10,
              height: 123,
              width: 123,
            }}
          />
          <Text
            style={{
              color: "#000000",
              fontSize: 17,
              fontFamily: "Rubik-Regular",
              marginTop: 5,
            }}
          >
            {/* Incorruptibles */}
            {groupName}
          </Text>

          <TouchableOpacity
            style={styles.btn}
            onPress={() => handleJoinGroup()}
          >
            <Text
              style={{
                color: "#FFF",
                fontSize: 16,
                fontFamily: "Rubik-Regular",
              }}
            >
              Join Group
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginVertical: 10, paddingHorizontal: 20 }}>
          <Text
            style={{
              color: "#000000",
              fontSize: 16,
              fontFamily: "Rubik-Regular",
            }}
          >
            Active Challenges
          </Text>
          <View
            style={{
              height: 120,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "#000", fontFamily: "Rubik-Regular" }}>
              No Active Challenges
            </Text>
          </View>
        </View>
        <View style={{}}>
          <Text
            style={{
              color: "#000000",
              fontSize: 16,
              paddingHorizontal: 20,
              fontFamily: "Rubik-Regular",
            }}
          >
            Group Members ({groupMembersList.length})
          </Text>

          <View
            style={{
              marginVertical: 15,
              paddingBottom: 10,
              paddingHorizontal: 20,
            }}
          >
            <FlatList
              data={groupMembersList}
              numColumns={3}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              renderItem={(item) => {
                return (
                  <Pressable
                    // onPress={() => navigation.navigate("GroupDetail")}
                    style={{
                      ...styles.cardView,
                      justifyContent: "center",
                      height: 110,
                      width: "28.9%",
                    }}
                  >
                    <Image
                      source={require("../../../assets/images/friend-profile.png")}
                      style={{ marginVertical: 8, width: 44, height: 44 }}
                    />
                    <Text style={styles.cardText}>
                      {item?.item?.first_name}
                    </Text>
                  </Pressable>
                );
              }}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default JoinGroup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  cardView: {
    height: 137,
    width: 92,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    shadowColor: "blue",
    elevation: 5,
    padding: 5,
    alignItems: "center",
    marginHorizontal: 8,
    marginVertical: 10,
    overflow: "hidden",
  },
  cardText: {
    color: "#040103",
    textAlign: "center",
    fontSize: 13,
    width: 75,
    fontFamily: "Rubik-Regular",
  },
  btn: {
    marginTop: 15,
    width: 120,
    height: 35,
    backgroundColor: "#38ACFF",
    marginHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  bootSheetCardView: {
    height: 100,
    width: 101,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    shadowColor: "blue",
    elevation: 6,
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 5,
  },
});
