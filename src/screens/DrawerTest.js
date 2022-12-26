import React, { useRef, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Image,
  TouchableOpacity,
  FlatList,
  Alert,
  StatusBar,
} from "react-native";
import Home from "./Home";
import Chat from "./Chat/Chat";
import History from "./History/History";
import ChangePassword from "./ChangePassword";
import ConnectDevices from "./ConnectDevices";
import PrivacyPolicy from "./PrivacyPolicy";
import UpdateGoals from "./UpdateGoals";
import UpdateProfile from "./UpdateProfile";

import CustomTab from "./CustomTab";
import TabNavigation from "./Navigation/TabNavigation";
import {
  useFocusEffect,
  useIsFocused,
  useNavigationState,
} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const DrawerTest = ({ navigation, route }) => {
  const [showMenu, setShowMenu] = useState(false);
  const moveToRight = useRef(new Animated.Value(1)).current;
  const scale = useRef(new Animated.Value(1)).current;
  const [selectedMenuItem, setSelectedMenuItem] = useState(0);
  const [activeTab, setActiveTab] = useState("Home");
  const homeIcon = require("../../assets/images/home-inactive1.png");
  const friendIcon = require("../../assets/images/friends-dark.png");
  const chatIcon = require("../../assets/images/chat-inactive.png");
  const groupsIcon = require("../../assets/images/group-dark.png");
  const challengesIcon = require("../../assets/images/trophy-light.png");

  const [firstName, setFirstName] = useState("");

  const [menuList, setMenuList] = useState([
    {
      title: "Home",
      icon: require("../../assets/images/home1.png"),
    },
    {
      title: "History",
      icon: require("../../assets/images/history.png"),
    },
    {
      title: "Change Password",
      icon: require("../../assets/images/lock.png"),
    },
    {
      title: "ConnectDevices",
      icon: require("../../assets/images/connectedDevices.png"),
    },
    {
      title: "Privacy Policy",
      icon: require("../../assets/images/privacy.png"),
    },

    {
      title: "Updated Goals",
      icon: require("../../assets/images/goals.png"),
    },
  ]);

  const handleLogout = (props) =>
    Alert.alert(
      "Log out",
      `Are you sure you want to logout from isocialWalk?`,
      [
        {
          text: "No",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: async () => {
            await AsyncStorage.clear();
            navigation.replace("AuthScreen");
            Animated.timing(scale, {
              toValue: showMenu ? 1 : 0.8,
              duration: 300,
              useNativeDriver: true,
            }).start();
            Animated.timing(moveToRight, {
              toValue: showMenu ? 0 : 230,
              duration: 300,
              useNativeDriver: true,
            }).start();
            setActiveTab("Home");
            setShowMenu(!showMenu);
          },
        },
      ]
    );

  const getUser = async () => {
    let user_info = await AsyncStorage.getItem("user");

    if (user_info != null) {
      let parse = JSON.parse(user_info);
      setFirstName(parse?.first_name);
      // setLastName(parse?.last_name);
      //   setPhoneNo(parse?.first_name);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getUser();
    }, [])
  );
  useEffect(() => {
    setTimeout(() => {
      StatusBar.setBackgroundColor(showMenu ? "#38ACFF" : "#fff");
    }, 200);
  }, [showMenu]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "green",
      }}
    >
      {/* <StatusBar backgroundColor={showMenu ? '#38ACFF' : '#fff'} /> */}
      {/* menu */}
      <View style={{ flex: 1, backgroundColor: "#38ACFF" }}>
        <TouchableOpacity
          onPress={() => {
            setSelectedMenuItem(-1);
            Animated.timing(scale, {
              // toValue: 1,
              toValue: showMenu ? 1 : 0.8,
              duration: 300,
              useNativeDriver: true,
            }).start();
            Animated.timing(moveToRight, {
              toValue: showMenu ? 0 : 230,
              duration: 300,
              useNativeDriver: true,
            }).start();
            setShowMenu(!showMenu);
          }}
          style={{
            flexDirection: "row",
            marginLeft: 10,
            alignItems: "center",
            marginBottom: 15,
            marginTop: 120,
            // marginTop: ,
          }}
        >
          <Image
            source={require("../../assets/images/friend-profile.png")}
            style={{
              width: 55,
              height: 55,
              borderRadius: 55,
              resizeMode: "contain",
              marginLeft: 8,
            }}
          />
          <Text style={{ color: "#002138", marginLeft: 10, fontSize: 16 }}>
            {/* Jonathan */}
            {firstName}
          </Text>
        </TouchableOpacity>
        <View style={{ paddingBottom: 220 }}>
          <FlatList
            data={menuList}
            keyExtractor={(item, index) => index.toString()}
            renderItem={(item, index) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    setSelectedMenuItem(item.index);
                    Animated.timing(scale, {
                      // toValue: 1,
                      toValue: showMenu ? 1 : 0.8,
                      duration: 300,
                      useNativeDriver: true,
                    }).start();
                    Animated.timing(moveToRight, {
                      toValue: showMenu ? 0 : 230,
                      duration: 300,
                      useNativeDriver: true,
                    }).start();
                    setShowMenu(!showMenu);
                  }}
                  style={styles.drawerItemView}
                >
                  {item.index == 0 ? (
                    <Image
                      source={
                        activeTab === "Home"
                          ? homeIcon
                          : activeTab === "Friends"
                          ? friendIcon
                          : activeTab === "Chat"
                          ? chatIcon
                          : activeTab === "Groups"
                          ? groupsIcon
                          : activeTab === "Challenges"
                          ? challengesIcon
                          : homeIcon
                      }
                      style={{
                        ...styles.drawerIcon,
                        tintColor:
                          selectedMenuItem == item.index ? "#002138" : "#fff",
                      }}
                    />
                  ) : (
                    <Image
                      source={item.item.icon}
                      style={{
                        ...styles.drawerIcon,
                        tintColor:
                          selectedMenuItem == item.index ? "#002138" : "#fff",
                      }}
                    />
                  )}
                  <Text
                    style={{
                      color:
                        selectedMenuItem == item.index ? "#002138" : "#fff",
                    }}
                  >
                    {item.index == 0 ? activeTab : item.item.title}
                  </Text>
                </TouchableOpacity>
              );
            }}
            ListFooterComponent={() => {
              return (
                <TouchableOpacity
                  onPress={() => handleLogout()}
                  style={styles.drawerItemView}
                >
                  <Image
                    source={require("../../assets/images/logout1.png")}
                    style={styles.drawerIcon}
                  />
                  <Text style={styles.drawerItemText}>Logout</Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </View>

      {/*  screens */}

      {selectedMenuItem === -1 ? (
        <UpdateProfile
          scale={scale}
          showMenu={showMenu}
          setShowMenu={setShowMenu}
          moveToRight={moveToRight}
        />
      ) : selectedMenuItem === 0 ? (
        <TabNavigation
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          scale={scale}
          showMenu={showMenu}
          setShowMenu={setShowMenu}
          moveToRight={moveToRight}
        />
      ) : selectedMenuItem === 1 ? (
        <History
          scale={scale}
          showMenu={showMenu}
          setShowMenu={setShowMenu}
          moveToRight={moveToRight}
        />
      ) : selectedMenuItem === 2 ? (
        <ChangePassword
          scale={scale}
          showMenu={showMenu}
          setShowMenu={setShowMenu}
          moveToRight={moveToRight}
        />
      ) : selectedMenuItem === 3 ? (
        <ConnectDevices
          scale={scale}
          showMenu={showMenu}
          setShowMenu={setShowMenu}
          moveToRight={moveToRight}
        />
      ) : selectedMenuItem === 4 ? (
        <PrivacyPolicy
          scale={scale}
          showMenu={showMenu}
          setShowMenu={setShowMenu}
          moveToRight={moveToRight}
        />
      ) : (
        <UpdateGoals
          scale={scale}
          showMenu={showMenu}
          setShowMenu={setShowMenu}
          moveToRight={moveToRight}
        />
      )}
    </View>
  );
};

export default DrawerTest;

const styles = StyleSheet.create({
  drawerItemView: {
    width: 170,
    padding: 10,
    marginLeft: 20,
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  drawerIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
    resizeMode: "contain",
    tintColor: "#fff",
  },
  drawerItemText: {
    color: "#fff",
  },
});

// <Animated.View
//         style={{
//           flex: 1,
//           backgroundColor: 'white',
//           position: 'absolute',
//           left: 0,
//           right: 0,
//           top: 0,
//           bottom: 0,
//           borderRadius: showMenu ? 15 : 0,
//           transform: [{scale: scale}, {translateX: moveToRight}],
//         }}>
//         <View style={{flexDirection: 'row', marginTop: 50}}>
//           <TouchableOpacity
//             style={{marginLeft: 20}}
//             onPress={() => {
//               Animated.timing(scale, {
//                 toValue: showMenu ? 1 : 0.8,
//                 duration: 300,
//                 useNativeDriver: true,
//               }).start();
//               Animated.timing(moveToRight, {
//                 toValue: showMenu ? 0 : 230,
//                 duration: 300,
//                 useNativeDriver: true,
//               }).start();
//               setShowMenu(!showMenu);
//             }}>
//             <Image
//               source={require('../../assets/images/menu.png')}
//               style={{width: 30, height: 30, resizeMode: 'contain'}}
//             />
//           </TouchableOpacity>
//         </View>
//         <Home />
//       </Animated.View>
