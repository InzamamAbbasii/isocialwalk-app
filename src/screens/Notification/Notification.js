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
import { BASE_URL_Image } from "../../constants/Base_URL_Image";
import { useFocusEffect } from "@react-navigation/native";

const Notification = ({ navigation }) => {
  const bottomSheetRef = useRef();
  const groupRequest_RBSheetRef = useRef();
  const challengeRequest_RBSheetRef = useRef();

  const [loading, setLoading] = useState(false);

  ///friend
  const [selected_friend_id, setSelected_friend_id] = useState("");
  const [selected_friend_name, setSelected_friend_name] = useState("");
  const [selected_friend_profile, setSelected_friend_profile] = useState("");
  const [selected_request_status, setSelected_request_status] = useState("");

  //challenge
  const [selected_challenge_id, setSelected_challenge_id] = useState("");
  const [selected_challenge_name, setSelected_challenge_name] = useState("");
  const [selected_challenge_status, setSelected_challenge_status] =
    useState("");

  //group request
  const [selected_group_id, setSelected_group_id] = useState("");
  const [selected_group_name, setSelected_group_name] = useState("");
  const [selected_group_status, setSelected_group_status] = useState("");

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
    setLoading(true);

    // let str = '05-12-22';
    // const [month, day, year] = str.split('-');
    // console.log({month, day, year});
    // let date = new Date('05-12-22 09:13:02');
    // console.log('date :: ', date);
    // let d = moment(date).fromNow();
    // console.log('d :::: ', d);
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      getAllNotification();
    }, [])
  );

  const getUser_Info = (id) => {
    return new Promise((resolve, reject) => {
      if (id) {
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
      } else {
        resolve(false);
      }
    });
  };
  const getAllNotification = async () => {
    setLoading(true);
    let user_id = await AsyncStorage.getItem("user_id");

    var requestOptions = {
      method: "POST",
      body: JSON.stringify({
        to_id: user_id,
      }),
      redirect: "follow",
    };
    fetch(api.get_all_notifications1, requestOptions)
      .then((response) => response.json())
      .then(async (result) => {
        if (result?.error == false || result?.error == "false") {
          let notificationList = result?.Notifications
            ? result?.Notifications
            : [];
          let list = [];
          for (const element of notificationList) {
            let user_info = await getUser_Info(element?.from_id);
            let notification_detail = await getNotification_Detail(element?.id);
            if (user_info && notification_detail != false) {
              let obj = {
                ...element,
                user_info,
                notification_detail,
              };
              list?.push(obj);
            }
          }

          setNotificationsList(list?.reverse());
        } else {
          setNotificationsList([]);
          Snackbar.show({
            text: result?.Message,
            duration: Snackbar.LENGTH_SHORT,
          });
        }
      })
      .catch((error) => {
        setNotificationsList([]);
        Snackbar.show({
          text: "Something went wrong.Unable to get notifications.",
          duration: Snackbar.LENGTH_SHORT,
        });
      })
      .finally(() => setLoading(false));
  };

  //getting notification detail
  const getNotification_Detail = async (id) => {
    return new Promise(async (resolve) => {
      if (!id) {
        resolve(false);
      } else {
        try {
          var requestOptions = {
            method: "POST",
            body: JSON.stringify({
              id: id,
            }),
            redirect: "follow",
          };
          fetch(api.get_notification_detail, requestOptions)
            .then((response) => response.json())
            .then(async (result) => {
              if (result != null) {
                resolve(result[0]);
              } else {
                resolve(false);
              }
            })
            .catch((error) => {
              resolve(false);
            });
        } catch (error) {
          resolve(false);
        }
      }
    });
  };

  const getSpecificUserDetail = async (id, type) => {
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
          if (type == "group") {
            groupRequest_RBSheetRef?.current?.open();
          } else if (type == "challenge") {
            challengeRequest_RBSheetRef?.current?.open();
          } else {
            bottomSheetRef?.current?.open();
          }
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
    bottomSheetRef?.current?.close();
    console.log("friend id to approve -->", friend_id);
    let user_id = await AsyncStorage.getItem("user_id");
    console.log("logged in user id ::", user_id);
    setLoading(true);
    let obj = {
      noti_type_id: selected_noti_id,
      this_user_id: friend_id,
      friend_user_id: user_id,
      // this_user_id: user_id,
      // friend_user_id: friend_id,
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

          getAllNotification();
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

  const handleUnApprove_FriendRequest = async (friend_id, noti_id) => {
    console.log({ friend_id, noti_id });

    console.log("handle unapprove friend request ::: ", friend_id);
    let user_id = await AsyncStorage.getItem("user_id");
    bottomSheetRef?.current?.close();
    setLoading(true);
    let obj = {
      // friend_user_id: user_id,
      // this_user_id: friend_id,

      friend_user_id: user_id,
      noti_type_id: noti_id,
      this_user_id: friend_id,
    };
    console.log("daTA PASS :: ", obj);

    var requestOptions = {
      method: "POST",
      body: JSON.stringify(obj),
      redirect: "follow",
    };
    fetch(api.unApproveRequest, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log("result ::: ", result);

        Snackbar.show({
          text: "Request Canceled successfully",
          duration: Snackbar.LENGTH_SHORT,
        });
        getAllNotification();
      })
      .catch((error) => {
        console.log("error in unapproveing request :: ", error);
        Snackbar.show({
          text: "Something went wrong",
          duration: Snackbar.LENGTH_SHORT,
        });
      })
      .finally(() => setLoading(false));
    //setIsFriendRequestApproved(!isFriendRequestApproved);
  };

  const hanldeApprove_GroupRequest1 = () => {
    setLoading(true);
    let data = {
      group_id: groupId,
      adminid: adminId,
      user_id: memberList,
    };
    var requestOptions = {
      method: "POST",
      body: JSON.stringify(data),
      redirect: "follow",
    };

    fetch(api.addmembers, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log("add memebrs response :::: ", result);
      })
      .catch((error) => {
        Snackbar.show({
          text: "Something went wrong",
          duration: Snackbar.LENGTH_SHORT,
        });
      })
      .finally(() => setLoading(false));
  };
  //approve challenge join request
  const handleApprove_ChallengeRequest = (notificationId) => {
    console.log("notificationId :::: ", notificationId);
    challengeRequest_RBSheetRef?.current?.close();
    setLoading(true);
    let obj = {
      status: "membered",
      noti_type_id: notificationId,
    };
    var requestOptions = {
      method: "POST",
      body: JSON.stringify(obj),
      redirect: "follow",
    };
    fetch(api.approve_individual_challenge, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log("challenge request approve response :::: ", result);
        if (result[0]?.error == false || result[0]?.error == "false") {
          Snackbar.show({
            text: "Request approved successfully",
            duration: Snackbar.LENGTH_SHORT,
          });
          getAllNotification();
        } else {
          Snackbar.show({
            text: "Something went wrong",
            duration: Snackbar.LENGTH_SHORT,
          });
        }
      })
      .catch((error) => {
        console.log("error in unapproveing request :: ", error);
        Snackbar.show({
          text: "Something went wrong",
          duration: Snackbar.LENGTH_SHORT,
        });
        console.log("error in unapproveing request :: ", error);
      })
      .finally(() => setLoading(false));
  };

  //reject challenge join request
  const handleIgnore_ChallengeRequest = (notificationId) => {
    setLoading(true);
    challengeRequest_RBSheetRef?.current?.close();
    let obj = {
      status: "rejected",
      noti_type_id: notificationId,
    };
    var requestOptions = {
      method: "POST",
      body: JSON.stringify(obj),
      redirect: "follow",
    };
    fetch(api.approve_individual_challenge, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log("challenge request approve response :::: ", result);
        if (result[0]?.error == false || result[0]?.error == "false") {
          Snackbar.show({
            text: "Request rejected successfully",
            duration: Snackbar.LENGTH_SHORT,
          });
          getAllNotification();
        } else {
          Snackbar.show({
            text: "Something went wrong",
            duration: Snackbar.LENGTH_SHORT,
          });
        }
      })
      .catch((error) => {
        console.log("error in unapproveing request :: ", error);
        Snackbar.show({
          text: "Something went wrong",
          duration: Snackbar.LENGTH_SHORT,
        });
        console.log("error in unapproveing request :: ", error);
      })
      .finally(() => setLoading(false));
  };

  //handle approve group request
  const hanldeApprove_GroupRequest = (noti_id, group_id) => {
    console.log("notification id :::: ", noti_id);
    console.log("group id :::: ", group_id);
    // alert("handle approve group request");
    groupRequest_RBSheetRef?.current?.close();
    setLoading(true);
    let data = {
      noti_type_id: noti_id,
      status: "approved",
    };
    var requestOptions = {
      method: "POST",
      body: JSON.stringify(data),
      redirect: "follow",
    };

    fetch(api.update_group_request, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log("update group request response   :::: ", result);
        if (result[0]?.error == false || result[0]?.error == "false") {
          Snackbar.show({
            text: "Request approved Successfully",
            duration: Snackbar.LENGTH_SHORT,
          });
          getAllNotification();
        } else {
          Snackbar.show({
            text: "Something went wrong",
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

  //handle unapprove group request

  const handleUnApprove_GroupRequest = (noti_id, group_id) => {
    console.log({ noti_id, group_id });

    groupRequest_RBSheetRef?.current?.close();

    setLoading(true);
    let data = {
      noti_type_id: noti_id,
      status: "rejected",
    };
    var requestOptions = {
      method: "POST",
      body: JSON.stringify(data),
      redirect: "follow",
    };

    fetch(api.update_group_request, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log("update group request response   :::: ", result);
        if (result[0]?.error == false || result[0]?.error == "false") {
          Snackbar.show({
            text: "Request Rejected Successfully",
            duration: Snackbar.LENGTH_SHORT,
          });
          getAllNotification();
        } else {
          Snackbar.show({
            text: "Something went wrong",
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

  //get specific challenge info
  const getChallengeInfo = (id) => {
    return new Promise((resolve, reject) => {
      let data = {
        challenge_id: id,
      };
      var requestOptions = {
        method: "POST",
        body: JSON.stringify(data),
        redirect: "follow",
      };
      fetch(api.get_challenge_details, requestOptions)
        .then((response) => response.json())
        .then(async (result) => {
          if (result?.error == false || result?.error == "false") {
            let detail = result?.Challenge[0] ? result?.Challenge[0] : null;
            if (detail == null) {
              resolve(false);
            } else {
              resolve(detail);
            }
          } else {
            resolve(false);
          }
        })
        .catch((error) => {
          resolve(false);
        });
    });
  };
  //get specific group info
  const getGroup_Info = (id) => {
    return new Promise((resolve, reject) => {
      try {
        var requestOptions = {
          method: "POST",
          body: JSON.stringify({
            id: id,
          }),
          redirect: "follow",
        };
        fetch(api.get_group_detail, requestOptions)
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

  //mark specifc notification as read
  const markAsRead = (id) => {
    var requestOptions = {
      method: "POST",
      body: JSON.stringify({
        id: id,
      }),
      redirect: "follow",
    };
    fetch(api.mark_notification_as_read, requestOptions)
      .then((response) => response.json())
      .then(async (result) => {
        if (result?.error == false || result?.error == "false") {
          const newData = notificationsList?.map((item) => {
            if (id == item.id) {
              return {
                ...item,
                status: "read",
              };
            } else {
              return {
                ...item,
              };
            }
          });
          setNotificationsList(newData);
        } else {
          console.log("something went wrong");
        }
      })
      .catch((error) => {
        console.log("error while marking notification as read", error);
      });
  };

  //mark all notification as read
  const handleMarkAllAsRead = async () => {
    try {
      let user_id = await AsyncStorage.getItem("user_id");
      console.log("user_id", user_id);
      setLoading(true);
      var requestOptions = {
        method: "POST",
        body: JSON.stringify({
          to_id: user_id,
        }),
        redirect: "follow",
      };
      fetch(api.mark_all_notifications_as_read, requestOptions)
        .then((response) => response.json())
        .then(async (result) => {
          console.log("mark all as read", result);
          if (result?.error == false || result?.error == "false") {
            const newData = notificationsList?.map((item) => {
              return {
                ...item,
                status: "read",
              };
            });
            setNotificationsList(newData);
            Snackbar.show({
              text: "Marked all notifications as read successfully",
              duration: Snackbar.LENGTH_SHORT,
            });
          } else {
            Snackbar.show({
              text: "Something went wrong",
              duration: Snackbar.LENGTH_SHORT,
            });
          }
        })
        .catch((error) => {
          console.log("error while marking notification as read", error);
          Snackbar.show({
            text: "Something went wrong.Please try again",
            duration: Snackbar.LENGTH_SHORT,
          });
        })
        .finally(() => setLoading(false));
    } catch (error) {
      console.log("error catch ::", error);
      setLoading(false);
      Snackbar.show({
        text: "Something went wrong.Please try again",
        duration: Snackbar.LENGTH_SHORT,
      });
    }
  };

  const handleNotificationPress = async (item) => {
    console.log("notification press ::: ", item);
    let user_id = item.from_id;

    let first_name = item?.user_info?.first_name;
    let last_name = item?.user_info?.last_name;
    let full_name = first_name + " " + last_name;
    let img = item?.user_info["profile image"]
      ? BASE_URL_Image + "/" + item?.user_info["profile image"]
      : "";
    setSelected_friend_id(user_id);
    setSelected_friend_name(full_name);
    setSelected_friend_profile(img);

    setSelected_noti_id(item?.id);

    //change notification status
    markAsRead(item?.id);

    if (item?.noti_type == "friends to friends") {
      // getSpecificUserDetail(item?.from_id);

      console.log(
        "item?.notification_detail?.status ::: ",
        item?.notification_detail?.status
      );
      setSelected_request_status(item?.notification_detail?.staus);
      bottomSheetRef?.current?.open();
    } else if (
      item?.noti_type == "user to group" ||
      item?.noti_type == "Admin to User For group"
    ) {
      // getSpecificUserDetail(item?.from_id, "group");

      let group_id = item?.notification_detail?.group_id;
      setLoading(true);
      let group_info = await getGroup_Info(group_id);
      setLoading(false);
      if (group_info) {
        console.log("group_info:::::: ", group_info);
        let id = group_info?.id;
        let name = group_info?.name;
        setSelected_group_id(id);
        setSelected_group_name(name);
        setSelected_group_status(item?.notification_detail?.status);
        groupRequest_RBSheetRef?.current?.open();
      } else {
        alert("Something went wrong");
      }
    } else if (item?.noti_type == "user to indiviual challenge") {
      let challenge_id = item?.notification_detail?.challenge_id;
      setLoading(true);
      let challenge_info = await getChallengeInfo(challenge_id);
      setLoading(false);
      if (challenge_info) {
        console.log("challenge_info", challenge_info);
        let id = challenge_info?.id;
        let name = challenge_info?.name;
        setSelected_challenge_id(id);
        setSelected_challenge_name(name);
        setSelected_challenge_status(item?.notification_detail?.status);
        challengeRequest_RBSheetRef?.current?.open();
      } else {
        alert("Something went wrong");
      }
    }
  };
  return (
    <View style={styles.container}>
      {/* <Header title={"Notifications"} navigation={navigation} /> */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 20,
        }}
      >
        <TouchableOpacity
          style={{ padding: 10, paddingLeft: 0 }}
          onPress={() => navigation?.goBack()}
        >
          <Image
            source={require("../../../assets/images/left-arrow.png")}
            style={{ width: 14, height: 22 }}
          />
        </TouchableOpacity>
        <Text
          style={{
            color: "#000000",
            textAlign: "right",
            flex: 1,
            marginRight: 14,
            fontSize: 23,
            fontFamily: "Rubik-Medium",
          }}
        >
          Notifications
        </Text>
        <TouchableOpacity
          style={{ paddingVertical: 10 }}
          onPress={() => handleMarkAllAsRead()}
        >
          <Text
            style={{
              color: "#000000",
              textAlign: "center",
              fontSize: 11,
              fontFamily: "Rubik-Regular",
            }}
          >
            Mark All as Read
          </Text>
        </TouchableOpacity>
      </View>

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
            showsVerticalScrollIndicator={false}
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
                  ) : item?.item?.noti_type == "user to group" ||
                    item?.item?.noti_type == "Admin to User For group" ? (
                    //group notification
                    <Image
                      source={require("../../../assets/images/group-profile2.png")}
                      style={{
                        height: 60,
                        width: 60,
                      }}
                    />
                  ) : item?.item?.noti_type == "user to indiviual challenge" ||
                    item?.item?.noti_type == "admin to user for challenges" ? (
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
                          : item?.item?.noti_type == "user to group" ||
                            item?.item?.noti_type == "Admin to User For group"
                          ? "Group Request"
                          : item?.item?.noti_type ==
                              "user to indiviual challenge" ||
                            item?.item?.noti_type ==
                              "admin to user for challenges"
                          ? "Challenge Request"
                          : "other"}
                      </Text>
                      <Text
                        style={{
                          color: "#838383",
                          fontFamily: "Rubik-Regular",
                        }}
                      >
                        {item?.item?.date &&
                          moment(item.item.date).format("DD-MM-YY")}
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

                      {item?.item?.noti_type == "friends to friends"
                        ? `${item?.item?.user_info?.first_name} wants to be your friend`
                        : item?.item?.noti_type == "user to group"
                        ? `${item?.item?.user_info?.first_name} wants to join your group`
                        : item?.item?.noti_type == "Admin to User For group"
                        ? `${item?.item?.user_info?.first_name} added you in group`
                        : item?.item?.noti_type ==
                            "user to indiviual challenge" ||
                          item?.item?.noti_type ==
                            "admin to user for challenges"
                        ? `${item?.item?.user_info?.first_name} wants to join challenge`
                        : "other"}
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        </View>
      )}

      {/* ---------------------------------------Friend Bottom Sheet------------------------------------------------------- */}
      <RBSheet
        ref={bottomSheetRef}
        height={320}
        openDuration={270}
        closeOnDragDown={true}
        closeOnPressMask={false}
        animationType={"slide"}
        customStyles={{
          container: {
            padding: 5,
            alignItems: "center",
            // height: 530,
            flex: 1.4,
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
        {selected_friend_profile ? (
          <Image
            source={{ uri: selected_friend_profile }}
            style={{
              marginTop: 20,
              marginBottom: 10,
              width: 110,
              height: 110,
              borderRadius: 110,
              backgroundColor: "#ccc",
              resizeMode: "contain",
            }}
          />
        ) : (
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
        )}

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
        {/* <Text
          style={{
            color: "#000000",
            fontSize: 16,
            fontFamily: "Rubik-Medium",
          }}
        >
          status : {selected_request_status}
        </Text> */}
        {selected_request_status == "unapproved" ||
        selected_request_status == "rejected" ? (
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
              You rejected this request
            </Text>
          </View>
        ) : isFriendRequestApproved || selected_request_status == "friends" ? (
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
              You are now friends
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
              onPress={() =>
                handleUnApprove_FriendRequest(
                  selected_friend_id,
                  selected_noti_id
                )
              }
              // onPress={() => bottomSheetRef?.current?.close()}
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
              status: selected_request_status,
            });
            bottomSheetRef?.current?.close();
          }}
        >
          <Text style={styles.btnText}>View Profile</Text>
        </TouchableOpacity>
      </RBSheet>
      {/* ----------------------------------------Group Bottom Sheet--------------------------------------------------------- */}
      <RBSheet
        ref={groupRequest_RBSheetRef}
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
          Group Request
        </Text>
        {selected_friend_profile ? (
          <Image
            source={{ uri: selected_friend_profile }}
            style={{
              marginTop: 20,
              marginBottom: 10,
              width: 110,
              height: 110,
              borderRadius: 110,
              backgroundColor: "#ccc",
              resizeMode: "contain",
            }}
          />
        ) : (
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
        )}
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

        <View
          style={{
            width: "87%",
            justifyContent: "space-between",
            flexDirection: "row",
            marginVertical: 8,
          }}
        >
          <Text
            style={{
              color: "#000000",
              fontSize: 14,
              fontFamily: "Rubik-Medium",
            }}
          >
            Request For :
          </Text>
          <Text
            style={{
              color: "#000000",
              fontSize: 14,
              fontFamily: "Rubik-Medium",
            }}
          >
            {selected_group_name}
          </Text>
        </View>

        {/* <Text
          style={{
            color: "#000000",
            fontSize: 14,
            fontFamily: "Rubik-Medium",
          }}
        >
          status : {selected_group_status}
        </Text> */}
        {selected_group_status == "requested" ? (
          <View style={{ width: "100%", alignItems: "center" }}>
            <TouchableOpacity
              style={styles.btnBottomSheet}
              onPress={() => {
                // handleApproveFriend(selected_friend_id)
                hanldeApprove_GroupRequest(selected_noti_id, selected_group_id);
              }}
            >
              <Text style={styles.btnText}>Approve Request</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                ...styles.btnBottomSheet,
                backgroundColor: "transparent",
                borderWidth: 1,
              }}
              // onPress={() => groupRequest_RBSheetRef?.current?.close()}
              onPress={() =>
                handleUnApprove_GroupRequest(
                  selected_noti_id,
                  selected_group_id
                )
              }
            >
              <Text style={{ ...styles.btnText, color: "#38ACFF" }}>
                Ignore Request
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
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
              {selected_group_status == "rejected"
                ? "Request Rejected"
                : "Request Accepted"}
            </Text>
          </View>
        )}
      </RBSheet>
      {/*------------------------------------------Challenge Bottom Sheet-------------------------------------------------------------- */}
      <RBSheet
        ref={challengeRequest_RBSheetRef}
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
          Challenge Request
        </Text>
        {selected_friend_profile ? (
          <Image
            source={{ uri: selected_friend_profile }}
            style={{
              marginTop: 20,
              marginBottom: 10,
              width: 110,
              height: 110,
              borderRadius: 110,
              backgroundColor: "#ccc",
              resizeMode: "contain",
            }}
          />
        ) : (
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
        )}
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
        <View
          style={{
            width: "87%",
            justifyContent: "space-between",
            flexDirection: "row",
            marginVertical: 10,
          }}
        >
          <Text
            style={{
              color: "#000000",
              fontSize: 14,
              fontFamily: "Rubik-Medium",
            }}
          >
            Request For :
          </Text>
          <Text
            style={{
              color: "#000000",
              fontSize: 14,
              fontFamily: "Rubik-Medium",
            }}
          >
            {selected_challenge_name}
          </Text>
        </View>
        {/* <Text
          style={{
            color: "#000000",
            fontSize: 14,
            fontFamily: "Rubik-Medium",
          }}
        >
          status : {selected_challenge_status}
        </Text> */}

        {selected_challenge_status == "requested" ? (
          <View style={{ width: "100%", alignItems: "center" }}>
            <TouchableOpacity
              style={styles.btnBottomSheet}
              onPress={() => {
                // handleApproveFriend(selected_friend_id)
                handleApprove_ChallengeRequest(selected_noti_id);
              }}
            >
              <Text style={styles.btnText}>Approve Request</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                ...styles.btnBottomSheet,
                backgroundColor: "transparent",
                borderWidth: 1,
              }}
              onPress={() => handleIgnore_ChallengeRequest(selected_noti_id)}
            >
              <Text style={{ ...styles.btnText, color: "#38ACFF" }}>
                Ignore Request
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
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
              {selected_challenge_status == "rejected"
                ? "Request Rejected"
                : "Request Accepted"}
            </Text>
          </View>
        )}
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
