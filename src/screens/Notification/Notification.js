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
import RBSheet from "react-native-raw-bottom-sheet";
import Header from "../../Reuseable Components/Header";

import { api } from "../../constants/api";
import Loader from "../../Reuseable Components/Loader";
import Snackbar from "react-native-snackbar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment/moment";

const Notification = ({ navigation }) => {
  const bottomSheetRef = useRef();

  const [loading, setLoading] = useState(false);

  ///friend
  const [selected_friend_id, setSelected_friend_id] = useState("");
  const [selected_friend_name, setSelected_friend_name] = useState("");
  const [selected_friend_profile, setSelected_friend_profile] = useState("");

  const [selected_noti_id, setSelected_noti_id] = useState("");

  const [isFriendRequestApproved, setIsFriendRequestApproved] = useState(false);
  const [profileImage, setProfileImage] = useState(
    require("../../../assets/images/friend-profile.png")
  );
  const [notificationsList, setNotificationsList] = useState([
    // {
    //   id: 0,
    //   title: 'Boris Findlay',
    //   description: 'wants to be your friend',
    //   avater: require('../../../assets/images/friend-profile.png'),
    //   date: '5 MINS AGO',
    // },
    // {
    //   id: 1,
    //   title: 'Forest Foragers Group',
    //   description: 'Your request to join the group was approved',
    //   avater: require('../../../assets/images/group-profile2.png'),
    //   date: '18 HRS AGO',
    // },
    // {
    //   id: 2,
    //   title: '20km Challenge',
    //   description: 'Your request to join the challenge was approved',
    //   avater: require('../../../assets/images/Challenge.png'),
    //   date: 'YESTERDAY',
    // },
    // {
    //   id: 3,
    //   title: 'Nikel Challenge',
    //   description: 'Barnabas Finley wants to join  the challenge',
    //   avater: require('../../../assets/images/Challenge.png'),
    //   date: 'YESTERDAY',
    // },
  ]);
  useEffect(() => {
    getAllNotification();

    // let str = '05-12-22';
    // const [month, day, year] = str.split('-');
    // console.log({month, day, year});
    // let date = new Date('05-12-22 09:13:02');
    // console.log('date :: ', date);
    // let d = moment(date).fromNow();
    // console.log('d :::: ', d);
  }, []);
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
  const getAllNotification = async () => {
    let user_id = await AsyncStorage.getItem("user_id");
    setLoading(true);
    setNotificationsList([]);

    var requestOptions = {
      method: "POST",
      body: JSON.stringify({
        to_id: user_id,
      }),
      redirect: "follow",
    };
    fetch(api.get_notifications, requestOptions)
      .then((response) => response.json())
      .then(async (result) => {
        if (result?.error == false || result?.error == "false") {
          let notificationList = result?.Notifications
            ? result?.Notifications
            : [];
          let list = [];
          for (const element of notificationList) {
            let user_info = await getUser_Info(element?.from_id);
            let obj = {
              ...element,
              user_info,
            };
            list?.push(obj);
          }
          setNotificationsList(list);
        } else {
          Snackbar.show({
            text: result?.Message,
            duration: Snackbar.LENGTH_SHORT,
          });
        }
      })
      .catch((error) => console.log("error", error))
      .finally(() => setLoading(false));
  };
  const getSpecificUserDetail = async (id) => {
    setLoading(true);
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
          // console.log('result :: ', result);
          setSelected_friend_id(id);
          setSelected_friend_name(result[0]?.first_name);
          setSelected_friend_profile(result[0]["profile image"]);
          bottomSheetRef?.current?.open();
        } else {
          Snackbar.show({
            text: result?.Message,
            duration: Snackbar.LENGTH_SHORT,
          });
        }
      })
      .catch((error) => {
        Snackbar.show({
          text: "Something went wrong",
          duration: Snackbar.LENGTH_SHORT,
        });
      })
      .finally(() => setLoading(false));
  };
  const handleApproveFriend = async (friend_id) => {
    console.log("friend id to approve -->", friend_id);
    let user_id = await AsyncStorage.getItem("user_id");
    console.log("logged in user id ::", user_id);
    setLoading(true);
    let obj = {
      noti_type_id: selected_noti_id,
      // this_user_id: user_id,
      // friend_user_id: friend_id,
      this_user_id: friend_id,
      friend_user_id: user_id,
    };
    console.log("data pass to approve request ::: ", obj);
    var requestOptions = {
      method: "POST",
      body: JSON.stringify(obj),
      redirect: "follow",
    };
    fetch(api.approveRequest, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log("approve friend request response :::: ", result);
        if (result[0]?.error == "false" || result[0]?.error == false) {
          // console.log('result :: ', result);

          Snackbar.show({
            text: result[0]?.message,
            duration: Snackbar.LENGTH_SHORT,
          });
          bottomSheetRef?.current?.close();
        } else {
          Snackbar.show({
            text: result?.Message,
            duration: Snackbar.LENGTH_SHORT,
          });
        }
      })
      .catch((error) => {
        Snackbar.show({
          text: "Something went wrong",
          duration: Snackbar.LENGTH_SHORT,
        });
      })
      .finally(() => setLoading(false));
    // setIsFriendRequestApproved(!isFriendRequestApproved);
  };

  const handleUnApprove_FriendRequest = async (friend_id) => {
    let user_id = await AsyncStorage.getItem("user_id");
    bottomSheetRef?.current?.close();
    setLoading(true);
    let obj = {
      friend_user_id: user_id,
      this_user_id: friend_id,
    };
    var requestOptions = {
      method: "POST",
      body: JSON.stringify(obj),
      redirect: "follow",
    };
    fetch(api.unApproveRequest, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        Snackbar.show({
          text: "Request Canceled successfully",
          duration: Snackbar.LENGTH_SHORT,
        });
      })
      .catch((error) => {
        console.log("error in unapproveing request :: ", error);
        Snackbar.show({
          text: "Something went wrong",
          duration: Snackbar.LENGTH_SHORT,
        });
      })
      .finally(() => setLoading(false));
    // setIsFriendRequestApproved(!isFriendRequestApproved);
  };

  const handleNotificationPress = (item) => {
    // console.log('item::::', item);
    // console.log('notificatio id ::: ', item?.id);
    setSelected_noti_id(item?.id);
    // bottomSheetRef?.current?.open();
    if (item?.noti_type == "friends to friends") {
      getSpecificUserDetail(item?.from_id);
    }
  };
  return (
    <View style={styles.container}>
      <Header title={"Notifications"} navigation={navigation} />
      {loading && <Loader />}
      {notificationsList.length == 0 ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={require("../../../assets/images/bell2.png")}
            style={{
              width: 92,
              height: 113,
              resizeMode: "contain",
            }}
          />
          <Text
            style={{
              color: "#000000",
              fontSize: 16,
              width: 182,
              textAlign: "center",
              marginVertical: 20,
              fontFamily: "Rubik-Regular",
            }}
          >
            All your Notifications will appear here
          </Text>
        </View>
      ) : (
        <View
          style={{
            flex: 1,
            marginTop: 15,
          }}
        >
          <FlatList
            data={notificationsList}
            keyExtractor={(item, index) => index.toString()}
            renderItem={(item) => {
              return (
                <View
                  style={{
                    flexDirection: "row",
                    marginVertical: 15,
                    justifyContent: "space-between",
                    alignItems: "center",
                    flex: 1,
                  }}
                >
                  {item?.item?.noti_type == "friends to friends" ? (
                    //friend notification
                    <Image
                      source={require("../../../assets/images/friend-profile.png")}
                      style={{
                        height: 60,
                        width: 60,
                      }}
                    />
                  ) : item?.item?.noti_type == "user to group" ? (
                    //group notification
                    <Image
                      source={require("../../../assets/images/group-profile2.png")}
                      style={{
                        height: 60,
                        width: 60,
                      }}
                    />
                  ) : item?.item?.noti_type == "user to indiviual challenge" ? (
                    //challenge notification
                    <Image
                      source={require("../../../assets/images/Challenge.png")}
                      style={{
                        height: 60,
                        width: 60,
                      }}
                    />
                  ) : (
                    <Image
                      source={require("../../../assets/images/friend-profile.png")}
                      style={{
                        height: 60,
                        width: 60,
                      }}
                    />
                  )}
                  {/* <Image
                    source={item.item.avater}
                    style={{
                      height: 60,
                      width: 60,
                    }}
                  /> */}
                  <TouchableOpacity
                    onPress={() => {
                      // item.index === 0 && bottomSheetRef?.current?.open();
                      handleNotificationPress(item?.item);
                    }}
                    style={{ flex: 1, marginLeft: 10 }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text
                        style={{
                          color: "#000000",
                          fontSize: 16,
                          fontFamily: "Rubik-Medium",
                        }}
                      >
                        {/* {item.item.title} */}

                        {item?.item?.noti_type == "friends to friends"
                          ? "Friend Request"
                          : "other"}
                      </Text>
                      <Text
                        style={{
                          color: "#838383",
                          fontFamily: "Rubik-Regular",
                        }}
                      >
                        {item.item.date}
                      </Text>
                    </View>
                    <Text
                      style={{
                        // color: item.index == 0 ? '#003e6b' : '#000000',
                        color:
                          item?.item?.status == "unread"
                            ? "#003e6b"
                            : "#000000",
                        fontFamily: "Rubik-Regular",
                      }}
                    >
                      {/* {item.item.description} */}
                      {/* notification description */}
                      {/* {item?.item?.noti_type} */}
                      {item?.item?.user_info?.first_name} wants to be your
                      friend
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        </View>
      )}

      <RBSheet
        ref={bottomSheetRef}
        height={300}
        openDuration={270}
        closeOnDragDown={true}
        closeOnPressMask={false}
        animationType={"slide"}
        customStyles={{
          container: {
            padding: 5,
            alignItems: "center",
            // height: 530,
            flex: 1.1,
            backgroundColor: "#ffffff",
            borderRadius: 30,
          },
          draggableIcon: {
            backgroundColor: "#003e6b",
          },
        }}
      >
        <Text
          style={{
            color: "#003e6b",
            fontSize: 18,
            fontFamily: "Rubik-Regular",
            marginTop: 5,
          }}
        >
          Friend Request
        </Text>
        <Image
          source={profileImage}
          style={{
            marginTop: 20,
            marginBottom: 10,
            width: 110,
            height: 110,
            resizeMode: "contain",
          }}
        />
        <Text
          style={{
            color: "#000000",
            fontSize: 16,
            fontFamily: "Rubik-Medium",
          }}
        >
          {/* Boris Findlay */}
          {selected_friend_name}
        </Text>
        {isFriendRequestApproved ? (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text
              style={{
                ...styles.btnText,
                fontSize: 15,
                fontFamily: "Rubik-Medium",
                color: "#38ACFF",
              }}
            >
              You and Boris are now friends
            </Text>
          </View>
        ) : (
          <View style={{ width: "100%", alignItems: "center" }}>
            <TouchableOpacity
              style={styles.btnBottomSheet}
              onPress={() =>
                // setIsFriendRequestApproved(!isFriendRequestApproved)
                handleApproveFriend(selected_friend_id)
              }
            >
              <Text style={styles.btnText}>Approve Request</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                ...styles.btnBottomSheet,
                backgroundColor: "transparent",
                borderWidth: 1,
              }}
              onPress={() => handleUnApprove_FriendRequest(selected_friend_id)}
            >
              <Text style={{ ...styles.btnText, color: "#38ACFF" }}>
                Ignore Request
              </Text>
            </TouchableOpacity>
          </View>
        )}

        <TouchableOpacity
          style={{ ...styles.btnBottomSheet, backgroundColor: "#003e6b" }}
          onPress={() => {
            navigation.navigate("FriendRequest", {
              id: selected_friend_id,
              selected_noti_id: selected_noti_id,
            });
            bottomSheetRef?.current?.close();
          }}
        >
          <Text style={styles.btnText}>View Profile</Text>
        </TouchableOpacity>
      </RBSheet>
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
  },
  btnText: {
    color: "#FFF",
    fontSize: 14,
    fontFamily: "Rubik-Regular",
  },
  btnBottomSheet: {
    backgroundColor: "#38ACFF",
    borderColor: "#38ACFF",
    marginHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
    width: "85%",
    height: 45,
    marginVertical: 8,
  },
});
