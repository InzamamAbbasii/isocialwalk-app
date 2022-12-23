import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Animated,
} from "react-native";
import { captureScreen } from "react-native-view-shot";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView } from "react-native-gesture-handler";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import { api } from "../../constants/api";
import Loader from "../../Reuseable Components/Loader";
import Snackbar from "react-native-snackbar";
import axios from "react-native-axios";

const SCREEN_WIDTH = Dimensions.get("screen").width;

const Groups = ({
  scale,
  showMenu,
  setShowMenu,
  moveToRight,
  setActiveTab,
}) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([
    // {
    //   id: 0,
    //   group_name: "Groupname",
    // },
    // {
    //   id: 1,
    //   group_name: "Groupname",
    // },
    // {
    //   id: 2,
    //   group_name: "Groupname",
    // },
    // {
    //   id: 3,
    //   group_name: "Groupname",
    // },
    // {
    //   id: 4,
    //   group_name: "Groupname",
    // },
    // {
    //   id: 5,
    //   group_name: "Groupname",
    // },
    // {
    //   id: 6,
    //   group_name: "Groupname",
    // },
    // {
    //   id: 7,
    //   group_name: "Groupname",
    // },
    // {
    //   id: 8,
    //   group_name: "Groupname",
    // },
    // {
    //   id: 9,
    //   group_name: "Groupname",
    // },
    // {
    //   id: 10,
    //   group_name: "Groupname",
    // },
    // {
    //   id: 11,
    //   group_name: "Groupname",
    // },
    // {
    //   id: 12,
    //   group_name: "Groupname",
    // },
  ]);
  const [isSuggestedVisible, setIsSuggestedVisible] = useState(true);
  const [suggestedGroups, setSuggestedGroups] = useState([
    // {
    //   id: 0,
    //   group_name: "Incorruptible",
    //   status: false,
    // },
    // {
    //   id: 1,
    //   group_name: "Forest Foragers",
    //   status: false,
    // },
    // {
    //   id: 2,
    //   group_name: "Cyanide",
    //   status: false,
    // },
    // {
    //   id: 3,
    //   group_name: "Group Name",
    //   status: false,
    // },
    // {
    //   id: 4,
    //   group_name: "Group Name",
    //   status: false,
    // },
  ]);

  const [groupList, setGroupList] = useState([
    // {
    //   id: 0,
    //   name: "Carnage Coverage",
    // },
    // {
    //   id: 1,
    //   name: "Baseline Grid",
    // },
    // {
    //   id: 2,
    //   name: "Softlancers",
    // },
    // {
    //   id: 3,
    //   name: "PRTX",
    // },
    // {
    //   id: 4,
    //   name: "The Tungstens",
    // },
    // {
    //   id: 5,
    //   name: "The Nulls",
    // },
    // {
    //   id: 6,
    //   name: "Helium Hydroxide",
    // },
  ]);
  const handleonJoin = async (id, type) => {
    console.log("id of group   :::: ", id);
    // const newData = suggestedGroups.map(item => {
    //   if (id == item.id) {
    //     return {
    //       ...item,
    //       status: !item.status,
    //     };
    //   } else {
    //     return {
    //       ...item,
    //     };
    //   }
    // });
    // setSuggestedGroups(newData);

    let user_id = await AsyncStorage.getItem("user_id");
    setLoading(true);
    let data = {
      user_id: user_id,
      group_id: id,
    };

    var requestOptions = {
      method: "POST",
      body: JSON.stringify(data),
      redirect: "follow",
    };
    fetch(api.join_group, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log("result of join group :: ", result);
        if (result[0]?.error == false || result[0]?.error == "false") {
          if (type == "search") {
            const newData = searchResults.map((item) => {
              if (id == item.id) {
                return {
                  ...item,
                  status: !item.status,
                };
              } else {
                return {
                  ...item,
                };
              }
            });
            setSearchResults(newData);
          } else {
            const newData = suggestedGroups.map((item) => {
              if (id == item.id) {
                return {
                  ...item,
                  status: !item.status,
                };
              } else {
                return {
                  ...item,
                };
              }
            });
            setSuggestedGroups(newData);
          }

          Snackbar.show({
            text: result[0]?.message,
            duration: Snackbar.LENGTH_SHORT,
          });
        } else {
          Snackbar.show({
            text: result[0]?.message,
            duration: Snackbar.LENGTH_SHORT,
          });
        }
      })
      .catch((error) => console.log("error", error))
      .finally(() => setLoading(false));
  };

  const handleOpenDrawer = (navigation) => {
    captureScreen({
      format: "jpg",
    })
      .then((uri) => {
        AsyncStorage.setItem("Screen", uri.toString());
        AsyncStorage.setItem("ScreenName", "Groups");
        navigation.openDrawer();
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    setLoading(true);
    setSuggestedGroups([]);
  }, []);
  useFocusEffect(
    React.useCallback(() => {
      getSuggestedGroupsList();
      // getMyGroups();
      getLogged_in_user_groups();
      getMembersList();
    }, [])
  );

  const getSuggestedGroupsList = async () => {
    try {
      let user_id = await AsyncStorage.getItem("user_id");
      let data = {
        this_user_id: user_id,
      };
      var requestOptions = {
        method: "POST",
        body: JSON.stringify(data),
        redirect: "follow",
      };

      fetch(api.groupsuggestions, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          let responseList = [];
          if (result?.length > 0) {
            // setSuggestedGroups(result);
            result.forEach((element) => {
              let obj = {
                id: element["Group ID"],
                group_name: element["Group Name"],
                // status: element?.status,
                status: false,
              };
              responseList.push(obj);
            });
          }
          setSuggestedGroups(responseList);
        })
        .catch((error) => console.log("error", error))
        .finally(() => setLoading(false));
    } catch (error) {
      console.log("error :", error);
      setLoading(false);
    }
  };
  const getLogged_in_user_groups = async () => {
    let user_id = await AsyncStorage.getItem("user_id");

    let data = {
      created_by_user_id: user_id,
    };
    var requestOptions = {
      method: "POST",
      body: JSON.stringify(data),
      redirect: "follow",
    };
    fetch(api.search_group_by_specific_admin, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result?.error == false || result?.error == "false") {
          let list = result?.Groups ? result?.Groups : [];
          setGroupList(list);
        } else {
          Snackbar.show({
            text: result?.Message,
            duration: Snackbar.LENGTH_SHORT,
          });
        }
      })
      .catch((error) => {
        Snackbar.show({
          text: "Something went wrong.Unable to get groups.",
          duration: Snackbar.LENGTH_SHORT,
        });
      })
      .finally(() => setLoading(false));
  };
  //TODO: latter on change with this spscifc user groups list
  // const getMyGroups = async () => {
  //   let user_id = await AsyncStorage.getItem("user_id");
  //   setLoading(true);
  //   setGroupList([]);
  //   let data = {
  //     created_by_user_id: "9",
  //   };
  //   var requestOptions = {
  //     method: "POST",
  //     body: JSON.stringify(data),
  //     redirect: "follow",
  //   };
  //   fetch(api.search_group_by_specific_admin, requestOptions)
  //     .then((response) => response.json())
  //     .then((result) => {
  //       if (result?.error == false || result?.error == "false") {
  //         let list = result?.Groups ? result?.Groups : [];
  //         setGroupList(list);
  //       } else {
  //         Snackbar.show({
  //           text: result?.Message,
  //           duration: Snackbar.LENGTH_SHORT,
  //         });
  //       }
  //       // let responseList = [];
  //       // if (result[0]?.profile == 'No Friends') {
  //       //   console.log('no friend found');
  //       // } else if (result[0]?.profile?.length > 0) {
  //       //   setFriendsList(result[0]?.profile);
  //       // }
  //     })
  //     .catch((error) =>
  //       console.log("error in getting my  groups list ::: ", error)
  //     )
  //     .finally(() => setLoading(false));
  // };

  // useEffect(() => {
  //   const delayDebounceFn = setTimeout(() => {
  //     console.log('seearchy  text :::: ', searchText);
  //     // Send Axios request here
  //     searchGroup(searchText);
  //   }, 2500);

  //   return () => clearTimeout(delayDebounceFn);
  // }, [searchText]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      handleSearch(searchText);
    }, 1500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchText]);

  const handleSearch = (searchText) => {
    console.log("text to search group ::  ", searchText);
    if (searchText) {
      setLoading(true);
      let data = {
        name: searchText,
      };
      var requestOptions = {
        method: "POST",
        body: JSON.stringify(data),
        redirect: "follow",
      };
      fetch(api.search_group, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          console.log('search result of group ":" ', result);
          if (result[0]?.error == false || result[0]?.error == "false") {
            let groupsList = result[0]?.groups ? result[0]?.groups : [];
            // setSearchResults(groupsList);
            let list = [];
            if (groupsList?.length > 0) {
              groupsList.forEach((element) => {
                let obj = {
                  id: element?.id,
                  created_by_user_id: element?.created_by_user_id,
                  image: element?.image,
                  name: element?.name,
                  status: false,
                };
                list.push(obj);
              });
            }
            setSearchResults(list);
          } else {
            setSearchResults([]);
            Snackbar.show({
              text: result[0]?.Message,
              duration: Snackbar.LENGTH_SHORT,
            });
          }
        })
        .catch((error) => console.log("error in searching  group ", error))
        .finally(() => setLoading(false));
    }
  };

  const getMembersList = async () => {
    let user_id = await AsyncStorage.getItem("user_id");
    console.log("user_id ::: ", user_id);
    let data = {
      this_user_id: user_id,
    };
    var requestOptions = {
      method: "POST",
      body: JSON.stringify(data),
      redirect: "follow",
    };
    fetch(api.showmembers, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log("show members list   ::: ", result);
        // let responseList = [];
        if (result[0]?.error == false) {
          let arr = result[0]?.["array of Members"]
            ? result[0]?.["array of Members"]
            : [];
          for (const element of arr) {
            console.log("element :  ", element);
          }
        } else if (result[0]?.profile?.length > 0) {
          setFriendsList(result[0]?.profile);
        }
      })
      .catch((error) => console.log("error in getting groups list ::: ", error))
      .finally(() => setLoading(false));
  };

  return (
    <Animated.View
      style={{
        zIndex: 999,
        flex: 1,
        backgroundColor: "white",
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        borderRadius: showMenu ? 15 : 0,
        // transform: [{scale: scale}, {translateX: moveToRight}],
      }}
    >
      <View style={styles.container}>
        {loading && <Loader />}
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            // paddingHorizontal: 20,
          }}
          showsVerticalScrollIndicator={false}
        >
          <View
            style={{
              height: 40,
              justifyContent: "center",
              marginTop: 20,
              paddingHorizontal: 20,
            }}
          >
            {isSearch ? (
              <View style={styles.headerView}>
                <View style={styles.searchView}>
                  <TextInput
                    style={styles.searchTextIntput}
                    placeholder={"Search"}
                    value={searchText}
                    // onChangeText={txt => setSearchText(txt)}
                    onChangeText={(txt) => {
                      setSearchText(txt);
                      // handleSearch(txt);
                    }}
                  />
                  <Image
                    source={require("../../../assets/images/search.png")}
                    style={{ height: 20, width: 20 }}
                  />
                </View>
                <TouchableOpacity
                  onPress={() => {
                    setIsSearch(!isSearch);
                    setSearchText("");
                  }}
                  style={styles.btnCancel}
                >
                  <Text style={styles.btnCancelText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.headerView}>
                {/* <Pressable onPress={() => handleOpenDrawer(navigation)}> */}
                <Pressable
                  onPress={() => {
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
                    setActiveTab("Groups");
                    setShowMenu(!showMenu);
                  }}
                >
                  {/* <Image source={require('../../../assets/images/Line1.png')} />
                  <Image
                    source={require('../../../assets/images/Line2.png')}
                    style={{marginTop: 5}}
                  /> */}
                  <Image
                    source={require("../../../assets/images/menu1.png")}
                    style={{ width: 34, height: 17 }}
                  />
                </Pressable>
                <TouchableOpacity onPress={() => setIsSearch(!isSearch)}>
                  <Image
                    source={require("../../../assets/images/search.png")}
                  />
                </TouchableOpacity>
              </View>
            )}
          </View>
          <Text style={{ ...styles.title, paddingHorizontal: 20 }}>Groups</Text>
          {searchText.length > 0 ? (
            <View style={{ flex: 1, paddingHorizontal: 20 }}>
              {/* ----------------------Search Result List ---------------------------- */}
              <View style={{ marginVertical: 15, paddingBottom: 10 }}>
                <FlatList
                  data={searchResults}
                  numColumns={3}
                  showsVerticalScrollIndicator={false}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={(item) => {
                    return (
                      <View style={{ ...styles.cardView, width: "28.9%" }}>
                        <Image
                          source={require("../../../assets/images/group-profile.png")}
                          style={{ marginVertical: 8 }}
                        />
                        <Text style={styles.cardText} numberOfLines={2}>
                          {/* {item.item.group_name} */}
                          {item?.item?.name}
                        </Text>
                        <View
                          style={{
                            justifyContent: "flex-end",
                            flex: 1,
                          }}
                        >
                          {item?.item?.status == false ? (
                            <TouchableOpacity
                              onPress={() =>
                                handleonJoin(item.item.id, "search")
                              }
                              style={styles.cardButton}
                            >
                              <Text style={{ color: "#ffffff", fontSize: 11 }}>
                                Join
                              </Text>
                            </TouchableOpacity>
                          ) : (
                            <TouchableOpacity
                              // onPress={() => handleonJoin(item.item.id)}
                              style={{
                                ...styles.cardButton,
                                backgroundColor: "#d8d8d8",
                                width: 70,
                              }}
                            >
                              <Text style={{ color: "#ffffff", fontSize: 11 }}>
                                Requested
                              </Text>
                            </TouchableOpacity>
                          )}
                        </View>
                      </View>
                    );
                  }}
                />
              </View>
            </View>
          ) : (
            <View style={{ flex: 1 }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: 10,
                  paddingHorizontal: 20,
                }}
              >
                <Text
                  style={{
                    color: "#000000",
                    fontSize: 16,
                    fontFamily: "Rubik-Regular",
                  }}
                >
                  Suggested Groups
                </Text>

                <TouchableOpacity
                  style={{
                    height: 20,
                    width: 30,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onPress={() => setIsSuggestedVisible(!isSuggestedVisible)}
                >
                  {isSuggestedVisible ? (
                    <Image
                      source={require("../../../assets/images/arrow-up1.png")}
                      style={{ height: 9, width: 15 }}
                    />
                  ) : (
                    <Image
                      source={require("../../../assets/images/arrow-down1.png")}
                      style={{ height: 9, width: 15, tintColor: "#000" }}
                    />
                  )}
                </TouchableOpacity>
              </View>
              {/* ----------------------Suggested Groups List ---------------------------- */}
              <View
                style={{
                  marginVertical: 15,
                  paddingHorizontal: 10,
                }}
              >
                {isSuggestedVisible && (
                  <FlatList
                    data={suggestedGroups}
                    keyExtractor={(item, index) => index.toString()}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={(item) => {
                      return (
                        <TouchableOpacity
                          onPress={() => navigation.navigate("JoinGroup")}
                          style={{ ...styles.cardView, width: 101 }}
                        >
                          <Image
                            source={require("../../../assets/images/group-profile.png")}
                            style={{ marginVertical: 8 }}
                          />

                          <Text style={styles.cardText} numberOfLines={2}>
                            {item.item.group_name}
                          </Text>
                          <View
                            style={{
                              justifyContent: "flex-end",
                              flex: 1,
                            }}
                          >
                            {item.item.status ? (
                              <TouchableOpacity
                                onPress={() => handleonJoin(item.item.id)}
                                style={{
                                  ...styles.cardButton,
                                  backgroundColor: "#d8d8d8",
                                  width: 70,
                                }}
                              >
                                <Text
                                  style={{ color: "#ffffff", fontSize: 11 }}
                                >
                                  Requested
                                </Text>
                              </TouchableOpacity>
                            ) : (
                              <TouchableOpacity
                                onPress={() => handleonJoin(item.item.id)}
                                style={styles.cardButton}
                              >
                                <Text
                                  style={{ color: "#ffffff", fontSize: 11 }}
                                >
                                  Join
                                </Text>
                              </TouchableOpacity>
                            )}
                          </View>
                        </TouchableOpacity>
                      );
                    }}
                  />
                )}
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingHorizontal: 20,
                }}
              >
                <Text style={{ color: "#000000", fontSize: 16 }}>Groups</Text>
                {groupList.length > 0 && (
                  <TouchableOpacity
                    style={{ ...styles.btnCreateGroup, width: 115, height: 33 }}
                    onPress={() => navigation.navigate("CreateGroup")}
                  >
                    <Text style={{ color: "#FFFFFF", fontSize: 13 }}>
                      Create a Group
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
              {groupList.length == 0 ? (
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Image
                    source={require("../../../assets/images/group1.png")}
                    style={{ backgroundColor: "#FFFF", resizeMode: "contain" }}
                  />

                  <Text
                    style={{
                      width: 206,
                      textAlign: "center",
                      fontSize: 16,
                      color: "#000000",
                      marginVertical: 20,
                    }}
                  >
                    Create or join a group and compete in challenges with other
                    groups
                  </Text>
                  <TouchableOpacity
                    style={styles.btnCreateGroup}
                    onPress={() => navigation.navigate("CreateGroup")}
                  >
                    <Text style={{ color: "#FFFFFF", fontSize: 13 }}>
                      Create a Group
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View
                  style={{
                    marginVertical: 15,
                    paddingBottom: 10,
                    paddingHorizontal: 20,
                  }}
                >
                  <FlatList
                    data={groupList}
                    numColumns={3}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={(item) => {
                      return (
                        <TouchableOpacity
                          onPress={() => navigation.navigate("GroupDetail")}
                          style={{
                            ...styles.cardView,
                            justifyContent: "center",
                            height: 110,
                            width: "28.9%",
                          }}
                        >
                          <Image
                            source={require("../../../assets/images/group-profile.png")}
                            style={{ marginVertical: 8 }}
                          />
                          <Text style={styles.cardText}>{item.item.name}</Text>
                        </TouchableOpacity>
                      );
                    }}
                  />
                </View>
              )}
            </View>
          )}
        </ScrollView>
      </View>
    </Animated.View>
  );
};

export default Groups;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  headerView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  searchView: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#CCC",
    paddingHorizontal: 10,
  },
  searchTextIntput: {
    flex: 1,
    borderColor: "#FFFFFF",
    padding: 8,
    color: "#000000",
  },
  btnCancel: {
    flex: 0.25,
    height: "100%",
    justifyContent: "center",
  },
  btnCancelText: {
    textAlign: "right",
    color: "#4e4e4e",
    fontSize: 16,
  },
  title: {
    color: "#000000",
    fontSize: 30,
    marginTop: 12,
    fontFamily: "Rubik-Regular",
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
  cardButton: {
    backgroundColor: "#38acff",
    width: 60,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 5,
    alignSelf: "flex-end",
    padding: 5,
  },
  btnCreateGroup: {
    width: 144,
    height: 40,
    backgroundColor: "#38acff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
});
