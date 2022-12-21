import React, {useState, useRef, useEffect} from 'react';
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
} from 'react-native';
import Header from '../../Reuseable Components/Header';
import DropDownPicker from 'react-native-dropdown-picker';

import {LineChart} from 'react-native-chart-kit';
import {
  getDatabase,
  get,
  ref,
  set,
  onValue,
  push,
  update,
  off,
} from 'firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {setLoginUserDetail, setUserForChat} from '../../redux/actions';
import Loader from '../../Reuseable Components/Loader';
import Snackbar from 'react-native-snackbar';

const FriendProfile = ({navigation, route}) => {
  const dispatch = useDispatch();

  const [userId, setUserId] = useState('');
  const [firstName, setFirstName] = useState('Saffa');
  const [lastName, setLastName] = useState('Saffa');
  const [fullName, setFullName] = useState('Saffa');
  const [profileImage, setProfileImage] = useState('');

  const [commonGroupsList, setCommonGroupsList] = useState([
    {
      id: 0,
      name: 'Carnage Coverage',
      avatar: require('../../../assets/images/friend-profile.png'),
    },
    {
      id: 1,
      name: 'GhostRunners',
      avatar: require('../../../assets/images/friend-profile.png'),
    },
  ]);

  const [isTypeOpen, setIsTypeOpen] = useState(false);
  const [performanceTypes, setPerformanceTypes] = useState([
    {label: 'This Day', value: 'Day'},
    {label: 'This Week', value: 'Week'},
    {label: 'This Month', value: 'Month'},
  ]);
  const [selectedType, setSelectedType] = useState(performanceTypes[0]?.value);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (route?.params) {
      console.log('params :: ', route?.params?.user);
      console.log('full_name :: ');
      setUserId(route?.params?.user?.id);
      setFullName(route?.params?.user?.full_name);
      setFirstName(route?.params?.user?.firstName);
      setLastName(route?.params?.user?.lastname);
      setProfileImage(route?.params?.user?.image);
    }
  }, [route?.params]);

  //---------------------------------------------CHATTING USING FIREBASE START---------------------------------------------------------

  const handleChatPress = async user_id => {
    if (userId) {
      onAddFriend(user_id);
    } else {
      Snackbar.show({
        text: 'Something went wrong.User Not found',
        duration: Snackbar.LENGTH_SHORT,
      });
    }
  };
  // -------------------------------
  // addding data to firebase for chatting
  const createUser = async (id, name, email) => {
    return new Promise((resolve, reject) => {
      try {
        const database = getDatabase();
        //first check if the user registered before
        const newUserObj = {
          id: id ? id : '',
          name: name ? name : '',
          email: email ? email : '',
        };
        set(ref(database, `users/${id}`), newUserObj);
        resolve(true);
      } catch (error) {
        console.log('error while creating new user', error);
        resolve(false);
      }
    });
  };
  const onAddFriend = async selected_user_id => {
    try {
      setLoading(true);
      //find user and add it to my friends and also add me to his friends
      let loggedinFirebaseuser = await AsyncStorage.getItem(
        'LoggedInUserFirebaseDetail',
      );
      if (loggedinFirebaseuser != null) {
        loggedinFirebaseuser = JSON.parse(loggedinFirebaseuser);
      }

      let isLoggedInUserExist = await findUser(loggedinFirebaseuser?.id);

      //TODO: if loggged in user record not exist in firebase then create it
      if (isLoggedInUserExist == null) {
        let result = await createUser(
          loggedinFirebaseuser?.id,
          loggedinFirebaseuser?.name,
          loggedinFirebaseuser?.email,
        );
        loggedinFirebaseuser = await findUser(loggedinFirebaseuser?.id);
      }

      const database = getDatabase();

      let user = await findUser(selected_user_id);
      if (user == null) {
        let result = await createUser(selected_user_id, firstName, '');
        user = await findUser(selected_user_id);
      }

      if (user) {
        if (user?.id === loggedinFirebaseuser?.id) {
          // don't let user add himself
          ///-------------------------------------------------
          let loggedin_user = await findUser(loggedinFirebaseuser?.id);
          let filter = loggedin_user?.friends?.filter(
            element => element?.id == selected_user_id,
          );
          if (filter.length > 0) {
            dispatch(setUserForChat(filter[0]));
            dispatch(setLoginUserDetail(loggedin_user));
            navigation.navigate('Conversations');
          } else {
            let obj = {
              chatroomId: '',
              name: '',
              id: 0,
            };
            dispatch(setUserForChat(obj));
            dispatch(setLoginUserDetail(loggedin_user));
            navigation.navigate('Conversations');
          }
          setLoading(false);
          return;
          //--------------------------------------------
        }

        if (
          loggedinFirebaseuser?.friends &&
          loggedinFirebaseuser?.friends.findIndex(f => f?.id === user?.id) >= 0
        ) {
          // don't let user add a user twice

          ///-------------------------------------------------
          let loggedin_user = await findUser(loggedinFirebaseuser?.id);
          let filter = loggedin_user?.friends?.filter(
            element => element?.id == selected_user_id,
          );
          // console.log('loggedin_user......', loggedin_user);
          // console.log('filter......', filter[0]);
          if (filter.length > 0) {
            dispatch(setUserForChat(filter[0]));
            dispatch(setLoginUserDetail(loggedin_user));
            navigation.navigate('Conversations');
          } else {
            let obj = {
              chatroomId: '',
              name: '',
              id: 0,
            };
            dispatch(setUserForChat(obj));
            dispatch(setLoginUserDetail(loggedin_user));
            navigation.navigate('Conversations');
          }
          setLoading(false);
          return;
          //-----------------------------------
        }
        // create a chatroom and store the chatroom id

        const newChatroomRef = push(ref(database, 'chatrooms'), {
          firstUser: loggedinFirebaseuser?.name,
          secondUser: user?.name,
          firstUserId: loggedinFirebaseuser?.id,
          secondUserId: user?.id,
          messages: [],
        });

        const newChatroomId = newChatroomRef?.key;

        const userFriends = user?.friends || [];
        let clicked_user_Obj = {
          id: user?.id,
          name: user?.name,
          email: user?.email,
          friends: [
            ...userFriends,
            {
              id: loggedinFirebaseuser?.id,
              name: loggedinFirebaseuser?.name,
              chatroomId: newChatroomId,
              isPinned: false,
            },
          ],
        };

        update(ref(database, `users/${user?.id}`), clicked_user_Obj);

        const myFriends = loggedinFirebaseuser?.friends || [];
        //add this user to my friend list
        let loggedin_user_Obj = {
          id: loggedinFirebaseuser?.id,
          name: loggedinFirebaseuser?.name,
          email: loggedinFirebaseuser?.email,
          friends: [
            ...myFriends,
            {
              id: user?.id,
              name: user?.name,
              chatroomId: newChatroomId,
              isPinned: false,
            },
          ],
        };
        //update loggedin user in async storage
        await AsyncStorage.setItem(
          'LoggedInUserFirebaseDetail',
          JSON.stringify(loggedin_user_Obj),
        );
        update(
          ref(database, `users/${loggedinFirebaseuser?.id}`),
          loggedin_user_Obj,
        );
        ///-------------------------------------------------
        let loggedin_user = await findUser(loggedinFirebaseuser?.id);
        let filter = loggedin_user?.friends?.filter(
          element => element?.id == selected_user_id,
        );
        if (filter.length > 0) {
          dispatch(setUserForChat(filter[0]));
          dispatch(setLoginUserDetail(loggedin_user));
          navigation.navigate('Conversations');
        } else {
          let obj = {
            chatroomId: '',
            name: '',
            id: 0,
          };
          dispatch(setUserForChat(obj));
          dispatch(setLoginUserDetail(loggedin_user));
          navigation.navigate('Conversations');
        }
        setLoading(false);
        return;
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };
  const findUser = async id => {
    console.log('find user name...', id);
    const database = getDatabase();
    const mySnapshot = await get(ref(database, `users/${id}`));
    return mySnapshot.val();
  };
  //--------------------------------------

  //---------------------------------------------CHATTING USING FIREBASE END ----------------------------------------------------------

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
        showsVerticalScrollIndicator={false}>
        <Header title={firstName} navigation={navigation} />
        {loading && <Loader />}

        <TouchableOpacity
          onPress={() => handleChatPress(userId)}
          // onPress={() => alert(userId)}
          style={{
            position: 'absolute',
            right: 0,
            top: 20,
          }}>
          <Image
            source={require('../../../assets/images/chat1.png')}
            style={{width: 25, height: 25}}
          />
        </TouchableOpacity>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: 20,
            paddingLeft: 30,
          }}>
          <Image
            source={require('../../../assets/images/user1.png')}
            style={{width: 110, height: 110, resizeMode: 'contain'}}
          />
          <Text
            style={{
              color: '#000000',
              fontSize: 18,
              marginVertical: 10,
              fontFamily: 'Rubik-Medium',
            }}>
            {/* Saffa Waller */}
            {fullName}
          </Text>
          <Text
            style={{
              color: '#4C7897',
              fontSize: 16,
              fontFamily: 'Rubik-Regular',
            }}>
            Daily Goal: 8,500 Steps
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              color: '#000000',
              fontSize: 16,
              fontFamily: 'Rubik-Regular',
            }}>
            {selectedType} Performance
          </Text>
          <DropDownPicker
            zIndex={999}
            open={isTypeOpen}
            value={selectedType}
            items={performanceTypes}
            setOpen={setIsTypeOpen}
            setValue={setSelectedType}
            setItems={setPerformanceTypes}
            arrowIconStyle={{
              tintColor: 'white',
            }}
            containerStyle={{
              width: '37%',
            }}
            dropDownContainerStyle={{
              padding: 0,
              alignSelf: 'center',
              borderWidth: 1,
              borderColor: '#ccc',
              borderRadius: 4,
              zIndex: 999,
            }}
            showTickIcon={false}
            iconContainerStyle={{
              color: '#fff',
            }}
            selectedItemContainerStyle={{
              backgroundColor: '#0496ff',
              marginHorizontal: 5,
            }}
            selectedItemLabelStyle={{
              color: '#FFF',
              fontFamily: 'Rubik-Regular',
            }}
            scrollViewProps={{
              showsVerticalScrollIndicator: false,
              showsHorizontalScrollIndicator: false,
            }}
            labelStyle={{
              fontSize: 14,
              textAlign: 'left',
              color: '#fff',
              fontFamily: 'Rubik-Regular',
            }}
            props={{
              style: {
                height: 36,
                // width: 90,
                paddingHorizontal: 8,
                borderRadius: 5,
                backgroundColor: '#003E6B',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              },
            }}
          />
        </View>
        {/* -------------------------Performance Graph------------------------------------ */}
        <View style={styles.performanceCard}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'flex-end',
                justifyContent: 'flex-end',
                height: 80,
              }}>
              <View>
                <Image
                  source={require('../../../assets/images/friend-profile.png')}
                  style={{width: 60, height: 60}}
                />
              </View>
              <View
                style={{
                  marginLeft: 5,
                  marginBottom: 10,
                }}>
                <Text
                  style={{
                    color: '#38ACFF',
                    fontSize: 16,
                    fontFamily: 'Rubik-Medium',
                  }}>
                  39,283
                </Text>
                <Text
                  style={{
                    color: '#38ACFF',
                    fontSize: 14,
                    fontFamily: 'Rubik-Regular',
                  }}>
                  Me
                </Text>
              </View>
            </View>
            <Text
              style={{
                color: '#000000',
                fontSize: 14,
                fontFamily: 'Rubik-Regular',
              }}>
              vs
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'flex-end',
                height: 80,
              }}>
              <View style={{marginRight: 5, marginBottom: 10}}>
                <Text
                  style={{
                    color: '#003E6B',
                    fontSize: 16,
                    fontFamily: 'Rubik-Medium',
                  }}>
                  94,434
                </Text>
                <Text
                  style={{
                    color: '#003E6B',
                    fontSize: 14,
                    fontFamily: 'Rubik-Regular',
                  }}>
                  Saffa
                </Text>
              </View>
              <View>
                <Image
                  source={require('../../../assets/images/crown.png')}
                  style={{
                    width: 20,
                    height: 20,
                    resizeMode: 'contain',
                    alignSelf: 'center',
                  }}
                />
                <Image
                  source={require('../../../assets/images/user1.png')}
                  style={{width: 60, height: 60}}
                />
              </View>
            </View>
          </View>

          {/* ------------------------------------graph------------------------------------------- */}

          <View style={{}}>
            <LineChart
              data={{
                labels: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
                datasets: [
                  {
                    data: [10, 20, 5, 15, 45, 30, 20, 9],
                    color: (opacity = 1) => `#38ACFF`, // optional
                    strokeWidth: 2,
                  },
                  {
                    data: [15, 10, 20, 8, 30, 3, 50, 25],
                    color: (opacity = 1) => `#003E6B`, // optional
                    strokeWidth: 2,
                  },
                ],
              }}
              width={Dimensions.get('window').width - 80} // from react-native
              height={160}
              withDots={true}
              withInnerLines={false}
              withOuterLines={false}
              withVerticalLabels={true}
              withHorizontalLabels={false}
              withShadow={false}
              chartConfig={{
                backgroundColor: '#fff',
                backgroundGradientFrom: '#fff',
                backgroundGradientTo: '#fff',
                labelColor: (opacity = 1) => `#878484`,
                decimalPlaces: 2,
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
              }}
              //   bezier
              style={{
                paddingRight: 13,
                paddingLeft: 15,
                marginTop: 15,
              }}
            />
          </View>
          {/* ------------------------------------graph------------------------------------------- */}
        </View>
        {/* -----------------------------Common Groups------------------------------------------ */}
        <View style={{flex: 1}}>
          <Text
            style={{
              color: '#000000',
              fontSize: 18,
              fontFamily: 'Rubik-Regular',
            }}>
            Groups in Common
          </Text>
          {commonGroupsList.length === 0 ? (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: '#000000',
                  fontSize: 14,
                  fontFamily: 'Rubik-Regular',
                }}>
                No Groups in common
              </Text>
            </View>
          ) : (
            <FlatList
              key={'_'}
              data={commonGroupsList}
              numColumns={3}
              keyExtractor={(item, index) => '_' + index.toString()}
              renderItem={(item, index) => {
                return (
                  <TouchableOpacity
                    onPress={() => navigation.navigate('GroupDetail')}
                    style={{
                      ...styles.cardView,
                      justifyContent: 'center',
                      height: 125,
                      // width: '28.9%',
                      width: '32.9%',
                      marginRight: 15,
                    }}>
                    <Image
                      source={item.item.avatar}
                      style={{marginVertical: 8, width: 50, height: 50}}
                    />
                    <Text style={styles.cardText}>{item.item.name}</Text>
                  </TouchableOpacity>
                );
              }}
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default FriendProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
  },
  cardView: {
    height: 137,
    width: 92,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    shadowColor: 'blue',
    elevation: 5,
    padding: 5,
    alignItems: 'center',
    marginHorizontal: 8,
    marginVertical: 10,
    overflow: 'hidden',
  },
  cardText: {
    color: '#000000',
    textAlign: 'center',
    fontSize: 13,
    // fontWeight: '500',
    fontFamily: 'Rubik-Medium',
    width: 90,
  },
  performanceCard: {
    zIndex: -1,
    height: 295,
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    shadowColor: 'blue',
    elevation: 5,
    marginHorizontal: 4,
    marginVertical: 20,
    overflow: 'hidden',
  },
  performanceCardImage: {},
});
