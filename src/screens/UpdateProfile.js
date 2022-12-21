import React, {useState, useRef, useEffect, useCallback} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Animated,
  Pressable,
  TextInput,
  Dimensions,
} from 'react-native';
import MenuHeader from '../Reuseable Components/MenuHeader';

import RBSheet from 'react-native-raw-bottom-sheet';
// import Slider from 'react-native-slider';
// var Slider = require('react-native-slider');
// import Slider from '@react-native-community/slider';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import {api} from '../constants/api';
import Loader from '../Reuseable Components/Loader';
import Snackbar from 'react-native-snackbar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {ScrollView} from 'react-native-gesture-handler';

import RNFetchBlob from 'rn-fetch-blob';

const SCREEN_WIDTH = Dimensions.get('screen').width;

import axios from 'react-native-axios';

const UpdateProfile = ({
  navigation,
  scale,
  showMenu,
  setShowMenu,
  moveToRight,
}) => {
  const [loading, setLoading] = useState(false);

  const [profileImage, setProfileImage] = useState(null);
  const [fileName, setFileName] = useState('');
  const [mimeType, setMimeType] = useState('');

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNo, setPhoneNo] = useState('');

  const [invalidEmail, setInvalidEmail] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState(
    "This email doesn't look right",
  );

  const [inValidPhoneNo, setinValidPhoneNo] = useState(false);
  const [invalidFirstName, setInvalidFirstName] = useState(false);
  const [invalidLastName, setInvalidLastName] = useState(false);

  const [image_to_upload, setImage_to_upload] = useState(null);

  const handleOpenCustomDrawer = () => {
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
    setShowMenu(!showMenu);
  };

  const pickImage = async () => {
    var options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    await launchImageLibrary(options)
      .then(res => {
        console.log('image res :: ', res);
        setProfileImage(res.assets[0].uri);
        setFileName(res.assets[0].fileName);
        setMimeType(res.assets[0].type);
        //  apiImagesList.push({
        //     name: "listing-images",
        //     filename: filename,
        //     type: response.assets[0].type,
        //     data: RNFetchBlob.wrap(response.assets[0].uri),
        //   });

        let obj = {
          name: 'profile_image',
          filename: res.assets[0].uri?.split('/').pop(),
          type: 'image/jpeg',
          data: RNFetchBlob.wrap(res.assets[0].uri),
        };
        setImage_to_upload(obj);
      })
      .catch(error => console.log(error));
  };

  const getUser = async () => {
    let user_info = await AsyncStorage.getItem('user');

    if (user_info != null) {
      let parse = JSON.parse(user_info);
      setFirstName(parse?.first_name);
      setLastName(parse?.last_name);
      //   setPhoneNo(parse?.first_name);
    }
    console.log(user_info);
  };
  useEffect(() => {
    getUser();
    setLoading(false);
  }, []);

  const updateProfile = async id => {
    console.log('user id passed ::: ', id);
    setLoading(true);

    //______________________________________________________________________________
    console.log('url ', api.profileimage);
    RNFetchBlob.fetch(
      'POST',
      api.profileimage,
      {
        otherHeader: 'foo',
        'Content-Type': 'multipart/form-data',
      },
      [
        {name: 'id', data: id},
        {
          name: 'profile_image',
          filename: fileName,
          type: mimeType,
          data: RNFetchBlob.wrap(profileImage),
        },
      ],
    )
      .then(response => {
        let myresponse = JSON.parse(response.data);
        console.log('response _____', myresponse);
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => setLoading(false));
    //______________________________________________________________________________

    // var formData = new FormData();
    // formData.append('id', '8');
    // let profile_Obj = {
    //   uri: profileImage,
    //   name: fileName,
    //   type: mimeType,
    // };
    // console.log('profile_Obj ', profile_Obj);
    // formData.append('profile_image', profile_Obj, fileName);
    // console.log('formdata :: ', formData);

    // var requestOptions = {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'multipart/form-data',
    //     Accept: 'application/json',
    //   },
    //   body: formData,
    //   redirect: 'follow',
    // };

    // fetch(api.updateprofile, requestOptions)
    //   .then(response => response.json())
    //   .then(result => {
    //     console.log('result  :: ', result);
    //     if (result[0]) {
    //       if (result[0]?.error == false) {
    //         Snackbar.show({
    //           text: 'Profile Updated Successfully',
    //           duration: Snackbar.LENGTH_SHORT,
    //         });
    //       } else {
    //         Snackbar.show({
    //           text: result[0]?.message,
    //           duration: Snackbar.LENGTH_SHORT,
    //         });
    //       }
    //     }
    //   })
    //   .catch(error => console.log('error in uploading image ::: ', error))
    //   .finally(() => setLoading(false));
  };

  const handleUpdateProfile = async () => {
    setInvalidFirstName(false);
    setInvalidLastName(false);
    setinValidPhoneNo(false);
    console.log({firstName, lastName, phoneNo, profileImage});
    if (firstName.length == 0) {
      setInvalidFirstName(true);
    } else if (lastName.length == 0) {
      setInvalidLastName(true);
    } else if (phoneNo.length == 0) {
      setinValidPhoneNo(true);
    } else {
      //handle update profile
      let user_id = await AsyncStorage.getItem('user_id');
      console.log('logged in user id ::', user_id);
      setLoading(true);
      var data = {
        phoneno: phoneNo,
        first_name: firstName,
        last_name: lastName,
        id: user_id,
      };

      var requestOptions = {
        method: 'POST',
        body: JSON.stringify(data),
        redirect: 'follow',
      };

      fetch(api.updateprofile, requestOptions)
        .then(response => response.json())
        .then(result => {
          if (result[0]) {
            if (result[0]?.error == false) {
              Snackbar.show({
                text: 'Profile Updated Successfully',
                duration: Snackbar.LENGTH_SHORT,
              });
              updateProfile(user_id);
            } else {
              Snackbar.show({
                text: result[0]?.message,
                duration: Snackbar.LENGTH_SHORT,
              });
            }
          }
        })
        .catch(error => console.log('error', error))
        .finally(() => setLoading(false));
    }
  };
  return (
    <Animated.View
      style={{
        flex: 1,
        backgroundColor: 'white',
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        borderRadius: showMenu ? 15 : 0,
        transform: [{scale: scale}, {translateX: moveToRight}],
      }}>
      <ScrollView>
        <View style={styles.container}>
          {loading && <Loader />}
          {/* <MenuHeader title={'Update Goals'} navigation={navigation} /> */}
          <MenuHeader
            title={'Updated Profile'}
            navigation={navigation}
            onPress={() => handleOpenCustomDrawer()}
          />

          <View style={{marginVertical: 10, alignItems: 'center'}}>
            <View style={{}}>
              {profileImage == null ? (
                <Image
                  source={require('../../assets/images/friend-profile.png')}
                  style={{
                    marginVertical: 10,
                    height: 123,
                    width: 123,
                  }}
                />
              ) : (
                <Image
                  source={{uri: profileImage}}
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
                  position: 'absolute',
                  right: 0,
                  top: 20,
                }}>
                <Image
                  source={require('../../assets/images/camera.png')}
                  style={{
                    width: 30,
                    height: 28,
                    resizeMode: 'contain',
                  }}
                />
              </TouchableOpacity>
            </View>

            <Text
              style={{
                color: '#000000',
                fontSize: 17,
                fontFamily: 'Rubik-Regular',
              }}>
              Profile image
            </Text>
          </View>
          <View>
            <View style={styles.textInputView}>
              <Text style={styles.textInputHeading}>First Name</Text>
              <TextInput
                style={styles.textInput}
                placeholder={'Enter Your firstname'}
                autoFocus
                value={firstName}
                onChangeText={txt => setFirstName(txt)}
              />
              {invalidFirstName && (
                <Text style={styles.errorText}>
                  Please enter your first name
                </Text>
              )}
            </View>

            <View style={styles.textInputView}>
              <Text style={styles.textInputHeading}>Last Name</Text>
              <TextInput
                style={styles.textInput}
                placeholder={'Enter Your lastname'}
                value={lastName}
                onChangeText={txt => setLastName(txt)}
              />
              {invalidLastName && (
                <Text style={styles.errorText}>
                  Please enter your last name
                </Text>
              )}
            </View>

            <View style={styles.textInputView}>
              <Text style={styles.textInputHeading}>Phone No.</Text>
              <TextInput
                style={styles.textInput}
                placeholder={'Enter Your phone no.'}
                keyboardType={'number-pad'}
                value={phoneNo}
                onChangeText={txt => setPhoneNo(txt)}
              />
              {inValidPhoneNo && (
                <Text style={styles.errorText}>
                  Please enter your phone no.
                </Text>
              )}
            </View>

            <TouchableOpacity
              style={styles.btn}
              onPress={() => handleUpdateProfile()}>
              <Text style={styles.btnText}>Update</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </Animated.View>
  );
};

export default UpdateProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
  },
  textInputView: {
    marginVertical: 12,
  },
  textInputHeading: {
    color: '#000000',
    fontSize: 17,
    marginVertical: 5,
    marginBottom: 15,
    fontFamily: 'Rubik-Regular',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 9,
    paddingHorizontal: 17,
    borderRadius: 5,
  },
  btn: {
    backgroundColor: '#38acff',
    marginBottom: 40,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: 30,
  },
  btnText: {color: '#ffffff', fontSize: 17, fontFamily: 'Rubik-Regular'},
  errorText: {
    color: '#D66262',
    fontSize: 12,
    marginLeft: 10,
    marginTop: 3,
    fontFamily: 'Rubik-Regular',
  },
});
