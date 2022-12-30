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
  ScrollView,
  Animated,
} from "react-native";

import { captureScreen } from "react-native-view-shot";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import { api } from "../../constants/api";
import Loader from "../../Reuseable Components/Loader";
import Snackbar from "react-native-snackbar";

const SCREEN_WIDTH = Dimensions.get("screen").width;

const Challenges = ({
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
    //   group_name: "Summerbody Challenge",
    // },
    // {
    //   id: 1,
    //   group_name: "25km",
    // },
    // {
    //   id: 2,
    //   group_name: "Cyanide",
    // },
    // {
    //   id: 3,
    //   group_name: "Summerbody Challenge",
    // },
    // {
    //   id: 4,
    //   group_name: "25km",
    // },
    // {
    //   id: 5,
    //   group_name: "Cyanide",
    // },
    // {
    //   id: 6,
    //   group_name: "Summerbody Challenge",
    // },
    // {
    //   id: 7,
    //   group_name: "25km",
    // },
    // {
    //   id: 8,
    //   group_name: "Cyanide",
    // },
    // {
    //   id: 9,
    //   group_name: "Summerbody Challenge",
    // },
    // {
    //   id: 10,
    //   group_name: "25km",
    // },
    // {
    //   id: 11,
    //   group_name: "Cyanide",
    // },
    // {
    //   id: 12,
    //   group_name: "Summerbody Challenge",
    // },
  ]);
  const [isSuggestedVisible, setIsSuggestedVisible] = useState(true);
  const [suggestedChallenges, setSuggestedChallenges] = useState([
    // {
    //   id: 0,
    //   group_name: 'Summerbody Challenge',
    //   status: false,
    // },
    // {
    //   id: 1,
    //   group_name: '25km',
    //   status: false,
    // },
    // {
    //   id: 2,
    //   group_name: 'Cyanide',
    //   status: false,
    // },
    // {
    //   id: 3,
    //   group_name: 'Challenge Name',
    //   status: false,
    // },
    // {
    //   id: 4,
    //   group_name: 'Challenge Name',
    //   status: false,
    // },
  ]);
  const [challengesList, setChallengesList] = useState([
    // {
    //   id: 0,
    //   name: "Carnage Coverage",
    // },
    // {
    //   id: 1,
    //   name: "Carnage Coverage",
    // },
    // {
    //   id: 2,
    //   name: "Carnage Coverage",
    // },
    // {
    //   id: 3,
    //   name: "Carnage Coverage",
    // },
    // {
    //   id: 4,
    //   name: "Carnage Coverage",
    // },
    // {
    //   id: 5,
    //   name: "Carnage Coverage",
    // },
    // {
    //   id: 6,
    //   name: "Carnage Coverage",
    // },
  ]);

  const [joinedChallenge, setJoinedChallenge] = useState([]);
  useEffect(() => {
    setLoading(true);
    getSuggestedChallengesList();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      getLogged_in_user_Challenges();
      getUserJoinedChallenges();
    }, [])
  );
  const getLogged_in_user_Challenges = async () => {
    let user_id = await AsyncStorage.getItem("user_id");
    setChallengesList([]);
    let data = {
      created_by_user_id: user_id,
    };
    var requestOptions = {
      method: "POST",
      body: JSON.stringify(data),
      redirect: "follow",
    };

    fetch(api.get_admin_challenges, requestOptions)
      .then((response) => response.json())
      .then(async (result) => {
        console.log("logged in user challenges", result);
        if (result?.error == false || result?.error == "false") {
          // console.log("add member list response  ::: ", result);
          let list = result?.Challenges ? result?.Challenges : [];
          setChallengesList(list);
          // let responseList = [];
          // for (const element of list) {
          //   let obj = {
          //     id: element?.id,
          //     created_by_user_id: element?.created_by_user_id,
          //     image: element?.image,
          //     name: element?.name,
          //     challenge_type: element?.challenge_type,
          //     challenge_visibility: element?.challenge_visibility,
          //     challenge_privacy: element?.challenge_privacy,
          //     start_date: element?.start_date,
          //     end_date: element?.end_date,
          //     challenge_metric_no: element?.challenge_metric_no,
          //     challenge_metric_step_type: element?.challenge_metric_step_type,
          //     status: false,
          //   };
          //   responseList.push(obj);
          // }
          // console.log("response list", responseList);
        } else {
          console.log("no challeg found for logged in use");
          // Snackbar.show({
          //   text: result?.message ? result?.message : result?.Message,
          //   duration: Snackbar.LENGTH_SHORT,
          // });
        }
      })
      .catch((error) => {
        Snackbar.show({
          text: "Something went wrong.Unable to get challenge list",
          duration: Snackbar.LENGTH_SHORT,
        });
      })
      .finally(() => setLoading(false));
  };

  const getSuggestedChallengesList = async () => {
    try {
      let user_id = await AsyncStorage.getItem("user_id");
      setLoading(true);
      // setSuggestedFriends([]);
      console.log("url ::: ", api.getSuggestedChallenges);
      let data = {
        this_user_id: user_id,
      };
      var requestOptions = {
        method: "POST",
        body: JSON.stringify(data),
        redirect: "follow",
      };

      fetch(api.getSuggestedChallenges, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          let responseList = [];
          if (result?.length > 0) {
            result?.forEach((element) => {
              let obj = {
                id: element["challenge ID"],
                name: element["challenge Name"],
                privacy: element["challenge privacy"],
                visibility: element["challenge visibility"],
                admin: element?.admin,
                start_date: element?.start_date,
                // status: element?.status,
                status: false,
              };
              responseList.push(obj);
            });
          }

          setSuggestedChallenges(responseList);
        })
        .catch((error) => console.log("error", error))
        .finally(() => setLoading(false));
    } catch (error) {
      console.log("error :", error);
      setLoading(false);
    }
  };

  //getting joinned challenges list

  const getUserJoinedChallenges = async () => {
    try {
      let user_id = await AsyncStorage.getItem("user_id");

      // setSuggestedFriends([]);

      let data = {
        user_id: user_id,
      };
      var requestOptions = {
        method: "POST",
        body: JSON.stringify(data),
        redirect: "follow",
      };

      fetch(api.get_specific_user_joined_challenges, requestOptions)
        .then((response) => response.json())
        .then(async (result) => {
          if (result?.error == false || result?.error == "false") {
            let responstList = result?.challenges ? result?.challenges : [];
            let list = [];
            for (const element of responstList) {
              let challengeInfo = await getChallengeDetail(
                element?.challenge_id
              );
              if (challengeInfo != false) {
                let obj = {
                  id: element?.id,
                  challenge_id: element?.challenge_id,
                  user_id: element?.user_id,
                  status: element?.status,
                  challengeInfo: {
                    id: challengeInfo?.id,
                    created_by_user_id: challengeInfo?.created_by_user_id,
                    image: challengeInfo?.image,
                    name: challengeInfo?.name,
                    challenge_type: challengeInfo?.challenge_type,
                    challenge_visibility: challengeInfo?.challenge_visibility,
                    challenge_privacy: challengeInfo?.challenge_privacy,
                    start_date: challengeInfo?.start_date,
                    end_date: challengeInfo?.end_date,
                    challenge_metric_no: challengeInfo?.challenge_metric_no,
                    challenge_metric_step_type:
                      challengeInfo?.challenge_metric_step_type,
                  },
                };
                list.push(obj);
              }
            }
            setJoinedChallenge(list);
          } else {
            Snackbar.show({
              text: result[0]?.message,
              duration: Snackbar.LENGTH_SHORT,
            });
          }
        })
        .catch((error) => {
          Snackbar.show({
            text: "Something went wrong.Unable to get joined challenges",
            duration: Snackbar.LENGTH_SHORT,
          });
        })
        .finally(() => setLoading(false));
    } catch (error) {
      console.log("error :", error);
      setLoading(false);
    }
  };

  const getChallengeDetail = (id) => {
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

  const handleonJoin = (id, adminId, item, item1) => {
    const newData = suggestedChallenges.map((item) => {
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
    setSuggestedChallenges(newData);
  };

  const handleJoin_InSearchList = (id) => {
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
  };

  const updateSuggestedChallengStatus = (id) => {
    const newData = suggestedChallenges.map((item) => {
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
    setSuggestedChallenges(newData);
  };

  const handleLeaveChallenge = async (id) => {
    let user_id = await AsyncStorage.getItem("user_id");
    setLoading(true);
    let data = {
      user_id: user_id,
      challenge_id: id,
    };

    var requestOptions = {
      method: "POST",
      body: JSON.stringify(data),
      redirect: "follow",
    };

    fetch(api.leave_challenges, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (
          result?.error == false ||
          result[0]?.error == false ||
          result[0]?.error == "false"
        ) {
          updateSuggestedChallengStatus(id);
          Snackbar.show({
            text: "Challenge Leaved successfully!",
            duration: Snackbar.LENGTH_SHORT,
          });
        } else {
          Snackbar.show({
            text: result?.message,
            duration: Snackbar.LENGTH_SHORT,
          });
        }
      })
      .catch((error) => console.log("error occur in leave challenge ", error))
      .finally(() => setLoading(false));
  };

  const handleJoinChallenge = async (id, adminId) => {
    let user_id = await AsyncStorage.getItem("user_id");
    setLoading(true);
    let data = {
      challenge_id: id,
      user_id: user_id,
    };
    console.log("data passs to join challange ::: ", data);
    var requestOptions = {
      method: "POST",
      body: JSON.stringify(data),
      redirect: "follow",
    };
    fetch(api.join_individual_challenge, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log("result  :: ", result);
        if (
          result?.error == false ||
          result[0]?.error == false ||
          result[0]?.error == "false"
        ) {
          updateSuggestedChallengStatus(id);
          Snackbar.show({
            text: "Challenge Joined successfully!",
            duration: Snackbar.LENGTH_SHORT,
          });
        } else {
          Snackbar.show({
            text: result?.message,
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
        AsyncStorage.setItem("ScreenName", "Challenges");
        navigation.openDrawer();
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      handleSearch(searchText);
    }, 1500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchText]);

  const handleSearch = (searchText) => {
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
      fetch(api.search_challenges, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if (result[0]?.error == false || result[0]?.error == "false") {
            let responseList = result[0]?.Challenges
              ? result[0]?.Challenges
              : [];
            // setSearchResults(groupsList);
            let list = [];
            if (responseList?.length > 0) {
              responseList.forEach((element) => {
                let obj = {
                  id: element?.id,
                  created_by_user_id: element?.created_by_user_id,
                  image: element?.image,
                  name: element?.name,
                  status: false,
                };
                list.push(obj);
              });
            } else {
              Snackbar.show({
                text: "No Record Found",
                duration: Snackbar.LENGTH_SHORT,
              });
            }
            setSearchResults(list);
          } else {
            console.log("else :::", result[0]?.Message);
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

  const EmptyChallengesView = () => {
    return (
      <View
        style={{
          flex: 1,
          height: 400,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          source={require("../../../assets/images/trophy.png")}
          style={{ width: 119, height: 119, resizeMode: "contain" }}
        />

        <Text
          style={{
            width: 206,
            textAlign: "center",
            fontSize: 16,
            color: "#000000",
            marginVertical: 20,
            fontFamily: "Rubik-Regular",
          }}
        >
          Create and compete in Challenges with friend and other groups
        </Text>
        <TouchableOpacity
          style={styles.btnCreateGroup}
          onPress={() => navigation.navigate("CreateChallenges")}
        >
          <Text
            style={{
              color: "#FFFFFF",
              fontSize: 13,
              fontFamily: "Rubik-Regular",
            }}
          >
            Create Challenge
          </Text>
        </TouchableOpacity>
      </View>
    );
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
          style={{ flex: 1 }}
          contentContainerStyle={{
            //   flex: 1,
            flexGrow: 1,
            // paddingHorizontal: 20,
          }}
          showsVerticalScrollIndicator={false}
        >
          <View style={{ height: 40, justifyContent: "center", marginTop: 20 }}>
            {isSearch ? (
              <View style={styles.headerView}>
                <View style={styles.searchView}>
                  <TextInput
                    style={styles.searchTextIntput}
                    placeholder={"Search"}
                    value={searchText}
                    onChangeText={(txt) => setSearchText(txt)}
                  />
                  <Image
                    source={require("../../../assets/images/search-small.png")}
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
                    setActiveTab("Challenges");
                    setShowMenu(!showMenu);
                  }}
                >
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
          <Text style={styles.title}>Challenges</Text>
          {searchText.length > 0 ? (
            <View style={{ flex: 1 }}>
              {/* ----------------------Search Result List ---------------------------- */}
              <View
                style={{
                  marginVertical: 15,
                  paddingBottom: 10,
                  paddingHorizontal: 5,
                }}
              >
                <FlatList
                  data={searchResults}
                  numColumns={3}
                  scrollEnabled={false}
                  showsVerticalScrollIndicator={false}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={(item) => {
                    return (
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate("ChallengesDetail", {
                            item: item?.item,
                          })
                        }
                        style={{ ...styles.cardView, width: "28.7%" }}
                      >
                        <Image
                          source={require("../../../assets/images/group-profile.png")}
                          style={{ marginVertical: 8 }}
                        />
                        <Text style={styles.cardText}>{item?.item?.name}</Text>
                        <View
                          style={{
                            justifyContent: "flex-end",
                            flex: 1,
                          }}
                        >
                          <TouchableOpacity
                            onPress={() =>
                              handleJoin_InSearchList(item?.item?.id)
                            }
                            style={styles.cardButton}
                          >
                            <Text
                              style={{
                                color: "#ffffff",
                                fontSize: 11,
                                fontFamily: "Rubik-Regular",
                              }}
                            >
                              Participate
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </TouchableOpacity>
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
                  Suggested Challenges
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
              {/* ----------------------Suggested Challenges List ---------------------------- */}
              <View
                style={{
                  marginVertical: 15,
                  width: SCREEN_WIDTH - 15,
                  // paddingRight: 15,
                  paddingHorizontal: 10,
                }}
              >
                {isSuggestedVisible && (
                  <FlatList
                    data={suggestedChallenges}
                    keyExtractor={(item, index) => index.toString()}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={(item) => {
                      return (
                        <TouchableOpacity
                          onPress={() =>
                            navigation.navigate("ChallengesDetail", {
                              item: item?.item,
                            })
                          }
                          style={{
                            ...styles.cardView,
                            width: 101,
                          }}
                        >
                          <Image
                            source={require("../../../assets/images/group-profile.png")}
                            style={{ marginVertical: 8 }}
                          />
                          <Text style={styles.cardText}>
                            {item?.item?.name}
                          </Text>
                          <View
                            style={{
                              justifyContent: "flex-end",
                              flex: 1,
                            }}
                          >
                            {item?.item?.status ? (
                              <TouchableOpacity
                                onPress={() =>
                                  handleLeaveChallenge(item.item.id)
                                }
                                style={{
                                  ...styles.cardButton,
                                  backgroundColor: "#d8d8d8",
                                }}
                              >
                                <Text
                                  style={{ color: "#ffffff", fontSize: 11 }}
                                >
                                  Participant
                                </Text>
                              </TouchableOpacity>
                            ) : (
                              <TouchableOpacity
                                onPress={() =>
                                  handleJoinChallenge(
                                    item.item.id,
                                    item?.item?.admin
                                  )
                                }
                                style={styles.cardButton}
                              >
                                <Text
                                  style={{ color: "#ffffff", fontSize: 11 }}
                                >
                                  Participate
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
              <View style={{ flex: 1 }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
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
                    Challenges
                  </Text>
                  {challengesList.length > 0 && (
                    <TouchableOpacity
                      style={{
                        ...styles.btnCreateGroup,
                        width: 130,
                        height: 33,
                      }}
                      onPress={() => navigation.navigate("CreateChallenges")}
                    >
                      <Text
                        style={{
                          color: "#FFFFFF",
                          fontSize: 13,
                          fontFamily: "Rubik-Regular",
                        }}
                      >
                        Create a Challenge
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
                {challengesList.length == 0 ? (
                  <EmptyChallengesView />
                ) : (
                  <View
                    style={{
                      marginVertical: 15,
                      paddingBottom: 10,
                      paddingHorizontal: 20,
                    }}
                  >
                    <FlatList
                      data={challengesList}
                      numColumns={3}
                      showsVerticalScrollIndicator={false}
                      keyExtractor={(item, index) => index.toString()}
                      renderItem={(item) => {
                        return (
                          <TouchableOpacity
                            onPress={() =>
                              navigation.navigate("ChallengesDetail", {
                                item: item?.item,
                              })
                            }
                            style={{
                              ...styles.cardView,
                              justifyContent: "center",
                              height: 110,
                              width: "28.9%",
                            }}
                          >
                            <Image
                              source={require("../../../assets/images/Challenge.png")}
                              style={{
                                marginVertical: 8,
                                height: 44,
                                width: 44,
                              }}
                            />
                            <Text style={styles.cardText}>
                              {item.item.name}
                            </Text>
                          </TouchableOpacity>
                        );
                      }}
                    />
                  </View>
                )}
              </View>

              {/* -------------------------------------Joinned challenges list _______________________________________________________ */}

              <View style={{ flex: 1 }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
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
                    Joined Challenges
                  </Text>
                </View>

                <View
                  style={{
                    marginVertical: 15,
                    paddingBottom: 10,
                    paddingHorizontal: 20,
                  }}
                >
                  <FlatList
                    data={joinedChallenge}
                    numColumns={3}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                    ListEmptyComponent={() => {
                      return (
                        <View
                          style={{
                            justifyContent: "center",
                            alignItems: "center",
                            // padding: 300,
                          }}
                        >
                          <Text
                            style={{
                              color: "#000000",
                              fontSize: 16,
                              fontFamily: "Rubik-Regular",
                            }}
                          >
                            No Results Found
                          </Text>
                        </View>
                      );
                    }}
                    renderItem={(item) => {
                      return (
                        <TouchableOpacity
                          onPress={() =>
                            navigation.navigate("ChallengesDetail", {
                              item: item?.item?.challengeInfo,
                              type: "joined",
                            })
                          }
                          style={{
                            ...styles.cardView,
                            justifyContent: "center",
                            height: 110,
                            width: "28.9%",
                          }}
                        >
                          <Image
                            source={require("../../../assets/images/Challenge.png")}
                            style={{
                              marginVertical: 8,
                              height: 44,
                              width: 44,
                            }}
                          />
                          <Text style={styles.cardText}>
                            {item.item?.challengeInfo?.name}
                          </Text>
                        </TouchableOpacity>
                      );
                    }}
                  />
                </View>
              </View>

              {/* -------------------------------------Joinned challenges list _______________________________________________________ */}
            </View>
          )}
        </ScrollView>
      </View>
    </Animated.View>
  );
};

export default Challenges;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    // padding: 20,
    // paddingHorizontal: 20,
    // paddingTop: 20,
  },
  headerView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
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
    paddingHorizontal: 20,
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
    fontFamily: "Rubik-Regular",
  },
  cardButton: {
    backgroundColor: "#38acff",
    // width: 60,
    width: 70,
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
