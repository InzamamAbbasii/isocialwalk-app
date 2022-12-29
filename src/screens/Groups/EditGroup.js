import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  Platform,
  Dimensions,
} from "react-native";
import moment from "moment/moment";
import Header from "../../Reuseable Components/Header";
import DropDownPicker from "react-native-dropdown-picker";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import { api } from "../../constants/api";
import Snackbar from "react-native-snackbar";
import Loader from "../../Reuseable Components/Loader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL_Image } from "../../constants/Base_URL_Image";

const SCREEN_WIDTH = Dimensions.get("screen").width;
const EditGroup = ({ navigation, route }) => {
  const [loading, setLoading] = useState(false);
  const [groupImage, setGroupImage] = useState(null);
  const [groupImage_Name, setGroupImage_Name] = useState("");
  const [groupImage_Type, setGroupImage_Type] = useState("");

  const [groupId, setGroupId] = useState("");
  const [groupName, setGroupName] = useState("");
  const [isValidGroupName, setIsValidGroupName] = useState(true);
  // membership list
  const [isMembershipopen, setIsMembershipopen] = useState(false);
  const [membershipList, setMembershipList] = useState([
    // {label: 'Anyone can join', value: 'Anyone can join'},
    // {label: 'Permission Required', value: 'Permission Required'},
    { label: "Anyone can join", value: "public" },
    { label: "Permission Required", value: "private" },
  ]);
  const [selectedMembership, setSelectedMembership] = useState(
    membershipList[0].value
  );

  // visibilty list

  const [isVisibiltyOpen, setIsVisibiltyOpen] = useState(false);
  const [visiblityList, setVisiblityList] = useState([
    { label: "Public", value: "public" },
    { label: "Private", value: "private" },
  ]);
  const [selectedVisiblity, setSelectedVisiblity] = useState(
    visiblityList[0].value
  );

  useEffect(() => {
    if (route?.params) {
      getGroupDetail(route?.params?.id);
    }
  }, [route?.params]);

  const getGroupDetail = (id) => {
    setLoading(true);
    let data = {
      id: id,
    };
    var requestOptions = {
      method: "POST",
      body: JSON.stringify(data),
      redirect: "follow",
    };
    fetch(api.get_group_detail, requestOptions)
      .then((response) => response.json())
      .then(async (result) => {
        if (result == null) {
          Snackbar.show({
            text: "Group Detail Not Found",
            duration: Snackbar.LENGTH_SHORT,
          });
        } else {
          let name = result[0]?.name ? result[0]?.name : "";
          let group_privacy = result[0]?.group_privacy
            ? result[0]?.group_privacy
            : "public";
          let group_visibility = result[0]?.group_visibility
            ? result[0]?.group_visibility
            : "public";
          let image_link = result[0]?.image_link ? result[0]?.image_link : "";

          setGroupId(result[0]?.id);
          setGroupName(name);
          //   setGroupImage(image_link);
          setSelectedMembership(group_privacy?.toLowerCase());
          setSelectedVisiblity(group_visibility?.toLowerCase());
        }
      })
      .catch((error) => {
        console.log("error :: ", error);
        Snackbar.show({
          text: "Something went wrong.",
          duration: Snackbar.LENGTH_SHORT,
        });
      })
      .finally(() => setLoading(false));
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
        console.log("res :", res);
        if (res.didCancel) {
          console.log("User cancelled image picker");
        } else if (res.error) {
          console.log("ImagePicker Error: ", res.error);
        } else if (res.customButton) {
          console.log("User tapped custom button: ", res.customButton);
        } else {
          console.log("image set...");
          setGroupImage(res.assets[0].uri);
          setGroupImage_Name(res.assets[0].fileName);
          setGroupImage_Type(res.assets[0].type);
        }
      })
      .catch((error) => console.log(error));
  };

  //update group details
  const handleUpdateGroupDetails = async () => {
    console.log("handle edit group details");
    setIsValidGroupName(true);
    if (groupName?.length == 0) {
      setIsValidGroupName(false);
    } else {
      setLoading(true);

      let data = {
        id: groupId,
        name: groupName,
        group_visibility: selectedVisiblity,
      };
      var requestOptions = {
        method: "POST",
        body: JSON.stringify(data),
        redirect: "follow",
      };

      fetch(api.edit_group_details, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          console.log("update group response ::   ", result);
          if (result[0]?.error == false || result[0]?.error == "false") {
            //update group privacy
            handleUpdateGroupPrivacy();

            Snackbar.show({
              text: "Group Updated Successfully!",
              duration: Snackbar.LENGTH_SHORT,
            });
          } else {
            Snackbar.show({
              text: result?.message,
              duration: Snackbar.LENGTH_SHORT,
            });
          }
        })
        .catch((error) => {
          Snackbar.show({
            text: "Something went wrong.",
            duration: Snackbar.LENGTH_SHORT,
          });
        })
        .finally(() => setLoading(false));
    }
  };

  //update group privacy
  const handleUpdateGroupPrivacy = () => {
    let data = {
      id: groupId,
      group_privacy: selectedMembership,
    };
    console.log("data pass to update group privacy :: ", data);

    var requestOptions = {
      method: "POST",
      body: JSON.stringify(data),
      redirect: "follow",
    };

    fetch(api.changeprivacy, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log("update group response ::   ", result);
        if (result[0]?.error == false || result[0]?.error == "false") {
          console.log("Group Privacy Updated Successfully!");
          // Snackbar.show({
          //   text: "Group Privacy Updated Successfully!",
          //   duration: Snackbar.LENGTH_SHORT,
          // });
        } else {
          console.log("else  : ", result?.message);
          // Snackbar.show({
          //   text: result?.message,
          //   duration: Snackbar.LENGTH_SHORT,
          // });
        }
      })
      .catch((error) => {
        console.log("error :: ", error);

        Snackbar.show({
          text: "Something went wrong.Group Privacy Update Failed.",
          duration: Snackbar.LENGTH_SHORT,
        });
      });
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 20,
        }}
        showsVerticalScrollIndicator={false}
      >
        <Header title={"Edit Group"} navigation={navigation} />
        {loading && <Loader />}
        <View style={{ marginVertical: 10, alignItems: "center" }}>
          <View style={{}}>
            {groupImage == null ? (
              <Image
                source={require("../../../assets/images/group-profile2.png")}
                style={{
                  marginVertical: 10,
                  height: 123,
                  width: 123,
                }}
              />
            ) : (
              <Image
                source={{ uri: groupImage }}
                style={{
                  marginVertical: 10,
                  height: 123,
                  width: 123,
                  borderRadius: 123,
                }}
              />
            )}
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
                  resizeMode: "contain",
                }}
              />
            </TouchableOpacity>
          </View>

          <Text
            style={{
              color: "#000000",
              fontSize: 17,
              fontFamily: "Rubik-Regular",
            }}
          >
            Group image
          </Text>
        </View>
        <View>
          <View style={styles.textInputView}>
            <Text style={styles.textInputHeading}>Group Name</Text>
            <TextInput
              style={styles.textInput}
              placeholder={"Enter Group Name"}
              autoFocus
              value={groupName}
              onChangeText={(txt) => setGroupName(txt)}
            />
            {!isValidGroupName && (
              <Text style={styles.errorText}>Please enter a group name</Text>
            )}
          </View>
          <View style={styles.textInputView}>
            <Text style={styles.textInputHeading}>Group Membership</Text>
            <DropDownPicker
              zIndex={isMembershipopen ? 999 : 0}
              open={isMembershipopen}
              value={selectedMembership}
              items={membershipList}
              setOpen={setIsMembershipopen}
              setValue={setSelectedMembership}
              setItems={setMembershipList}
              containerStyle={{
                width: "100%",
              }}
              dropDownContainerStyle={{
                padding: 0,
                alignSelf: "center",
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 4,
              }}
              showTickIcon={false}
              selectedItemContainerStyle={{
                backgroundColor: "#0496ff",
                marginHorizontal: 5,
              }}
              selectedItemLabelStyle={{
                color: "#FFF",
              }}
              scrollViewProps={{
                showsVerticalScrollIndicator: false,
                showsHorizontalScrollIndicator: false,
              }}
              labelStyle={{
                fontSize: 14,
                textAlign: "left",
                paddingLeft: 5,
              }}
              style={{
                borderRadius: 4,
                borderWidth: 1,
                borderColor: "#ccc",
                alignSelf: "center",
                justifyContent: "center",
              }}
            />
          </View>
          {/* ----------------------Group Visibilty Dropdown______________________________________________ */}
          <View style={styles.textInputView}>
            <Text style={styles.textInputHeading}>Group Visibility</Text>
            <DropDownPicker
              zIndex={isVisibiltyOpen ? 999 : 0}
              open={isVisibiltyOpen}
              value={selectedVisiblity}
              items={visiblityList}
              setOpen={setIsVisibiltyOpen}
              setValue={setSelectedVisiblity}
              setItems={setVisiblityList}
              containerStyle={{
                width: "100%",
              }}
              dropDownContainerStyle={{
                padding: 0,
                alignSelf: "center",
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 4,
              }}
              showTickIcon={false}
              selectedItemContainerStyle={{
                backgroundColor: "#0496ff",
                marginHorizontal: 5,
              }}
              selectedItemLabelStyle={{
                color: "#FFF",
              }}
              scrollViewProps={{
                showsVerticalScrollIndicator: false,
                showsHorizontalScrollIndicator: false,
              }}
              labelStyle={{
                fontSize: 14,
                textAlign: "left",
                paddingLeft: 5,
              }}
              style={{
                borderRadius: 4,
                borderWidth: 1,
                borderColor: "#ccc",
                alignSelf: "center",
                justifyContent: "center",
              }}
            />
          </View>
          {/* ----------------------Group Visibilty Dropdown______________________________________________ */}
          <View
            style={{
              flex: 1,
              paddingTop: 90,
            }}
          >
            <TouchableOpacity
              style={{ ...styles.btn }}
              onPress={() => handleUpdateGroupDetails()}
            >
              <Text style={styles.btnText}>Edit Group</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default EditGroup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  textInputView: {
    marginVertical: 12,
  },
  textInputHeading: {
    color: "#000000",
    fontSize: 17,
    marginVertical: 5,
    marginBottom: 15,
    fontFamily: "Rubik-Regular",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 9,
    paddingHorizontal: 17,
    borderRadius: 5,
  },

  cardView: {
    height: 137,
    width: 101,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    shadowColor: "blue",
    elevation: 5,
    padding: 5,
    alignItems: "center",
    marginHorizontal: 8,
    marginVertical: 25,
    overflow: "hidden",
  },
  cardButton: {
    backgroundColor: "#d8d8d8",
    width: 70,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 5,
    alignSelf: "flex-end",
    padding: 5,
  },
  name: {
    color: "#040103",
    textAlign: "center",
    fontSize: 13,
    width: 75,
    marginVertical: 5,
    fontFamily: "Rubik-Regular",
  },
  btn: {
    backgroundColor: "#38acff",
    marginBottom: 40,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  btnText: { color: "#ffffff", fontSize: 17, fontFamily: "Rubik-Regular" },
  errorText: {
    color: "#D66262",
    fontSize: 12,
    marginLeft: 10,
    marginTop: 3,
    fontFamily: "Rubik-Regular",
  },
});
