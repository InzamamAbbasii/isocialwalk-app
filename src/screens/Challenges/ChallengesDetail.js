import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import Header from "../../Reuseable Components/Header";
import RBSheet from "react-native-raw-bottom-sheet";

import moment from "moment";
import { api } from "../../constants/api";
import Loader from "../../Reuseable Components/Loader";
import Snackbar from "react-native-snackbar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";

const ChallengesDetail = ({ navigation, route }) => {
  const bottomSheetRef = useRef();
  const bottomSheetAddMemberRef = useRef();
  const [participantList, setParticipantList] = useState([
    {
      id: 0,
      name: "Me",
      steps: 9000,
      avater: require("../../../assets/images/user1.png"),
    },
    {
      id: 1,
      name: "Nahla",
      steps: 8000,
      avater: require("../../../assets/images/user2.png"),
    },
    {
      id: 2,
      name: "Saffa",
      steps: 7000,
      avater: require("../../../assets/images/user3.png"),
    },
    {
      id: 3,
      name: "Rui",
      steps: 6000,
      avater: require("../../../assets/images/friend-profile.png"),
    },
    {
      id: 4,
      name: "Anum",
      steps: 5000,
      avater: require("../../../assets/images/friend-profile.png"),
    },
    {
      id: 5,
      name: "Zaina",
      steps: 4000,
      avater: require("../../../assets/images/friend-profile.png"),
    },
    {
      id: 6,
      name: "Noami",
      steps: 3000,
      avater: require("../../../assets/images/friend-profile.png"),
    },
    {
      id: 7,
      name: "Noami",
      steps: 2000,
      avater: require("../../../assets/images/friend-profile.png"),
    },
    {
      id: 8,
      name: "Noami",
      steps: 1000,
      avater: require("../../../assets/images/friend-profile.png"),
    },
    {
      id: 9,
      name: "Noami",
      steps: 500,
      avater: require("../../../assets/images/friend-profile.png"),
    },
  ]);

  const [allMembersList, setAllMembersList] = useState([
    {
      id: 0,
      name: "Me",
      avater: require("../../../assets/images/friend-profile.png"),
      selected: false,
    },
    {
      id: 1,
      name: "Nahla",
      avater: require("../../../assets/images/friend-profile.png"),
      selected: false,
    },
    {
      id: 2,
      name: "Saffa",
      avater: require("../../../assets/images/friend-profile.png"),
      selected: false,
    },
    {
      id: 3,
      name: "Rui",
      avater: require("../../../assets/images/friend-profile.png"),
      selected: false,
    },
    {
      id: 4,
      name: "Anum",
      avater: require("../../../assets/images/friend-profile.png"),
      selected: false,
    },
    {
      id: 5,
      name: "Zaina",
      avater: require("../../../assets/images/friend-profile.png"),
      selected: true,
    },
    // {
    //   id: 6,
    //   name: 'Noami',
    // avater:require('../../../assets/images/friend-profile.png')
    // selected: false,
    // },
  ]);

  const [loading, setLoading] = useState(false);
  const [logged_in_user_id, setLogged_in_user_id] = useState("");
  const [endDate, setEndDate] = useState("");
  const [profile, setProfile] = useState("");
  const [adminId, setAdminId] = useState("");
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [metric_no, setMetric_no] = useState("");
  const [step_type, setStep_type] = useState("");
  const [challengeId, setChallengeId] = useState("");

  const [ends_in, setEnds_in] = useState("");

  const [challengeImage, setchallengeImage] = useState(null);
  const [fileName, setFileName] = useState("");
  const [fileType, setFileType] = useState("");
  const getLoggedInUser = async () => {
    let user_id = await AsyncStorage.getItem("user_id");
    setLogged_in_user_id(user_id);
  };
  useEffect(() => {
    getLoggedInUser();
    if (route?.params) {
      let {
        id,
        created_by_user_id,
        image,
        name,
        challenge_type,
        end_date,
        challenge_metric_no,
        challenge_metric_step_type,
      } = route?.params?.item;

      setChallengeId(id);
      setAdminId(created_by_user_id);
      setName(name);
      setProfile(image);
      setType(challenge_type);
      setEndDate(end_date);
      setMetric_no(challenge_metric_no);
      setType(challenge_metric_step_type);

      var now = moment(new Date()); //todays date
      var end = moment(end_date); // another date
      var duration = moment.duration(end.diff(now));
      var days = duration.asDays();
      setEnds_in(days?.toFixed(0));
    }
  }, [route?.params]);

  const generateColor = () => {
    const randomColor = Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0");
    return `#${randomColor}`;
  };
  const pickImage = async () => {
    var options = {
      storageOptions: {
        skipBackup: true,
        path: "images",
      },
    };
    await launchImageLibrary(options)
      .then((res) => {
        console.log("images selected :: ", res.assets[0]?.fileName);
        setFileName(res.assets[0]?.fileName);
        setFileType(res.assets[0]?.type);
        setchallengeImage(res.assets[0].uri);
        handleUploadImage(
          challengeId,
          res.assets[0].uri,
          res.assets[0]?.fileName,
          res.assets[0]?.type
        );
      })
      .catch((error) => console.log(error));
  };

  const handleUploadImage = (challangeId, image, fileName, fileType) => {
    if (challangeId && image) {
      setLoading(true);
      let formData = new FormData();
      formData.append("id", challangeId);
      let obj = {
        uri: image,
        type: fileType,
        name: fileName,
      };
      console.log("image obj  : ", obj);
      formData.append("image", obj);

      // body.append('Content-Type', 'image/png');
      var requestOptions = {
        method: "POST",
        body: formData,
        redirect: "follow",
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
        },
      };

      fetch(api.upload_challenge_image, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          Snackbar.show({
            text: result[0]?.message,
            duration: Snackbar.LENGTH_SHORT,
          });
        })
        .catch((error) =>
          console.log("error in uploading group image :: ", error)
        )
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
        <View style={{ paddingHorizontal: 20 }}>
          <Header title={name} navigation={navigation} />
        </View>
        {loading && <Loader />}
        <View
          style={{
            marginVertical: 10,
            paddingHorizontal: 20,
            alignItems: "center",
          }}
        >
          {/* <Image
            source={require("../../../assets/images/Challenge.png")}
            style={{
              marginVertical: 12,
              height: 123,
              width: 123,
            }}
          /> */}

          <View style={{}}>
            {challengeImage == null ? (
              <Image
                source={require("../../../assets/images/Challenge.png")}
                style={{
                  marginVertical: 10,
                  height: 123,
                  width: 123,
                }}
              />
            ) : (
              <Image
                source={{ uri: challengeImage }}
                style={{
                  marginVertical: 10,
                  height: 123,
                  width: 123,
                  borderRadius: 123,
                }}
              />
            )}

            {adminId == logged_in_user_id && (
              <TouchableOpacity
                onPress={() => pickImage()}
                style={{
                  position: "absolute",
                  right: 0,
                  top: 20,
                }}
              >
                <Image
                  source={require("../../../assets/images/camera.png")}
                  style={{
                    width: 30,
                    height: 28,
                    borderRadius: 30,
                    resizeMode: "contain",
                  }}
                />
              </TouchableOpacity>
            )}
          </View>

          <View
            style={{
              flexDirection: "row",
              width: "90%",
              justifyContent: "space-between",
              marginTop: 20,
            }}
          >
            <View>
              <Text
                style={{
                  color: "#000",
                  fontSize: 14,
                  fontFamily: "Rubik-Regular",
                }}
              >
                Ends in:
              </Text>
              <Text
                style={{
                  color: "#38ACFF",
                  fontSize: 14,
                  marginTop: 4,
                  fontFamily: "Rubik-Medium",
                }}
              >
                {ends_in} Days:
              </Text>
            </View>
            <View>
              <Text
                style={{
                  color: "#000",
                  fontSize: 14,
                  fontFamily: "Rubik-Regular",
                }}
              >
                Challenge:
              </Text>
              <Text
                style={{
                  color: "#38ACFF",
                  fontSize: 14,
                  marginTop: 4,
                  fontFamily: "Rubik-Medium",
                }}
              >
                {metric_no} Total Steps
              </Text>
            </View>
          </View>
        </View>

        <View style={{ marginTop: 10 }}>
          <Text
            style={{
              color: "#000000",
              fontSize: 16,
              fontFamily: "Rubik-Regular",
              paddingHorizontal: 20,
            }}
          >
            Participants/Results
          </Text>

          <View
            style={{
              marginVertical: 15,
              paddingBottom: 10,
              paddingHorizontal: 20,
            }}
          >
            <FlatList
              data={participantList}
              numColumns={3}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              renderItem={(item) => {
                let itemColor = generateColor();
                return (
                  <View
                    style={{
                      ...styles.cardView,
                      justifyContent: "center",
                      height: 120,
                      width: "28.9%",
                    }}
                  >
                    <Text
                      style={{
                        color: "#000",
                        position: "absolute",
                        right: 10,
                        top: 5,
                      }}
                    >
                      {item.index + 1}
                    </Text>
                    <View style={{ height: 18, width: 18 }}>
                      {item.index < 3 && (
                        <Image
                          source={require("../../../assets/images/crown.png")}
                          style={{
                            width: "100%",
                            height: "100%",
                            resizeMode: "contain",
                          }}
                        />
                      )}
                    </View>
                    <View style={{ marginBottom: 3 }}>
                      <AnimatedCircularProgress
                        rotation={360}
                        size={55}
                        width={2.5}
                        fill={80}
                        // tintColor="#38ACFF"
                        tintColor={itemColor}
                        backgroundColor="#eee"
                      >
                        {(fill) => (
                          <Image
                            source={item.item.avater}
                            style={{ marginVertical: 8, width: 44, height: 44 }}
                          />
                        )}
                      </AnimatedCircularProgress>
                    </View>
                    <Text style={styles.cardText}>{item.item.name}</Text>
                    <Text
                      style={{
                        ...styles.cardText,
                        color: itemColor,
                        fontFamily: "Rubik-Medium",
                      }}
                    >
                      {item.item.steps}
                    </Text>
                  </View>
                );
              }}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ChallengesDetail;

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
    flex: 1,
    backgroundColor: "#38ACFF",
    marginHorizontal: 10,
    height: 35,
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
