import React, {useState, useRef, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  TextInput,
  Pressable,
  Animated,
} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {captureScreen} from 'react-native-view-shot';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SwipeListView, SwipeRow} from 'react-native-swipe-list-view';
import {useFocusEffect, useNavigation} from '@react-navigation/native';

import {
  getDatabase,
  get,
  ref,
  set,
  onValue,
  push,
  update,
  off,
  remove,
} from 'firebase/database';

import {useDispatch, useSelector} from 'react-redux';
import {setLoginUserDetail, setUserForChat} from '../../redux/actions';
import moment from 'moment/moment';
import {api} from '../../constants/api';
import Loader from '../../Reuseable Components/Loader';
import Snackbar from 'react-native-snackbar';
import {firebase} from '@react-native-firebase/storage';

const SCREEN_WIDTH = Dimensions.get('screen').width;

const Chat = ({
  scale,
  showMenu,
  setShowMenu,
  moveToRight,
  activeTab,
  setActiveTab,
}) => {
  const navigation = useNavigation();
  const bottomSheetRef = useRef();
  const friendsBottomSheetRef = useRef();

  const dispatch = useDispatch();
  let {userDetail, routeUserType} = useSelector(state => state.userReducer);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState('');

  const [swipeListRightOpenValue, setSwipeListRightOpenValue] = useState(-110);

  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([
    {
      id: 0,
      friend_name: 'Username',
    },
    {
      id: 1,
      friend_name: 'Username',
    },
    {
      id: 2,
      friend_name: 'Username',
    },
    {
      id: 3,
      friend_name: 'Username',
    },
    {
      id: 4,
      friend_name: 'Username',
    },
    {
      id: 5,
      friend_name: 'Username',
    },
    {
      id: 6,
      friend_name: 'Username',
    },
    {
      id: 7,
      friend_name: 'Username',
    },
    {
      id: 8,
      friend_name: 'Username',
    },
    {
      id: 9,
      friend_name: 'Username',
    },
    {
      id: 10,
      friend_name: 'Username',
    },
    {
      id: 11,
      friend_name: 'Username',
    },
    {
      id: 12,
      friend_name: 'Username',
    },
  ]);
  const [isSuggestedVisible, setIsSuggestedVisible] = useState(true);
  const [suggestedFriends, setSuggestedFriends] = useState([
    // {
    //   id: 0,
    //   name: 'Saffa',
    //   avater: require('../../../assets/images/user1.png'),
    //   status: false,
    // },
    // {
    //   id: 1,
    //   name: 'Nahla',
    //   avater: require('../../../assets/images/user2.png'),
    //   status: false,
    // },
    // {
    //   id: 2,
    //   name: 'Naomi',
    //   avater: require('../../../assets/images/friend-profile.png'),
    //   status: false,
    // },
    // {
    //   id: 3,
    //   name: 'Rui',
    //   avater: require('../../../assets/images/user3.png'),
    //   status: false,
    // },
    // {
    //   id: 4,
    //   name: 'Anum',
    //   avater: require('../../../assets/images/friend-profile.png'),
    //   status: false,
    // },
    // {
    //   id: 5,
    //   name: 'Zaina',
    //   avater: require('../../../assets/images/friend-profile.png'),
    //   status: false,
    // },
  ]);

  const [friendsList, setFriendsList] = useState([
    {
      id: 0,
      name: 'Saffa',
      avater: require('../../../assets/images/user1.png'),
    },
    {
      id: 0,
      name: 'Nahla',
      avater: require('../../../assets/images/user2.png'),
    },
    {
      id: 0,
      name: 'Naomi',
      avater: require('../../../assets/images/friend-profile.png'),
    },
    {
      id: 0,
      name: 'Rui',
      avater: require('../../../assets/images/user3.png'),
    },
    {
      id: 0,
      name: 'Anum',
      avater: require('../../../assets/images/friend-profile.png'),
    },
    {
      id: 0,
      name: 'Zaina',
      avater: require('../../../assets/images/friend-profile.png'),
    },
  ]);

  const [chatList, setChatList] = useState([
    // {
    //   id: 0,
    //   name: 'Boris Findlay',
    //   message: 'This is dummy message',
    //   avater: require('../../../assets/images/user1.png'),
    //   createdAt: '5 MIN AGO',
    //   count: 2,
    //   isPinned: false,
    // },
    // {
    //   id: 1,
    //   name: 'Saffa',
    //   message: 'we break down where the money went',
    //   avater: require('../../../assets/images/user2.png'),
    //   createdAt: '10 MIN AGO',
    //   count: 2,
    //   isPinned: false,
    // },
    // {
    //   id: 2,
    //   name: 'Saffa',
    //   message: 'This is dummy message',
    //   avater: require('../../../assets/images/user3.png'),
    //   createdAt: '15 MIN AGO',
    //   count: 1,
    //   isPinned: false,
    // },
    // {
    //   id: 3,
    //   name: 'Saffa',
    //   message: 'This is dummy message',
    //   avater: require('../../../assets/images/friend-profile.png'),
    //   createdAt: '15 MIN AGO',
    //   count: 1,
    //   isPinned: false,
    // },
    // {
    //   id: 4,
    //   name: 'Saffa',
    //   message: 'This is dummy message',
    //   avater: require('../../../assets/images/friend-profile.png'),
    //   createdAt: '15 MIN AGO',
    //   count: 1,
    //   isPinned: false,
    // },
    // {
    //   id: 5,
    //   name: 'Saffa',
    //   message: 'This is dummy message',
    //   avater: require('../../../assets/images/friend-profile.png'),
    //   createdAt: '15 MIN AGO',
    //   count: 1,
    //   isPinned: false,
    // },
  ]);

  //----------------------------------------------------------------------
  useEffect(() => {
    setLoading(true);
    getSuggestedFriendsList();
  }, []);
  const getUser_ID = async () => {
    const user_id = await AsyncStorage.getItem('user_id');
    setUserId(user_id);
    return user_id;
  };
  useFocusEffect(
    React.useCallback(() => {
      let myUserRef = null;
      let user_id = getUser_ID(); //logged in user id
      const database = getDatabase();
      myUserRef = ref(database, `users/${userId}`);
      const loadData = async () => {
        let data = await getChatingList(myUserRef);
        //TODO: short list base on pinned chat --> to show pinned chat on top of chat list
        data.sort(function (a, b) {
          return b.isPinned - a.isPinned;
        });
        setChatList(data);
        setLoading(false);
      };
      loadData();
      return () => {
        //remove chatroom listener
        off(myUserRef);
      };
    }, [userId]),
  );
  const getChatingList = myUserRef => {
    return new Promise(async (resolve, reject) => {
      try {
        onValue(myUserRef, async snapshot => {
          const data = snapshot.val();

          let usersList = [];
          if (data) {
            let listofUsers = data?.friends ? data?.friends : [];

            for (const item of listofUsers) {
              let lastMessage_info = await getLatestMessage(item?.chatroomId);
              // let user_info = await getUserInfo(item?.id);
              // console.log('user_info________________________', user_info);
              // let profile = '';
              // if (user_info == false || typeof user_info?.pfp == 'undefined') {
              //   profile = null;
              // } else {
              //   profile = Base_URL_Image + '/' + user_info?.pfp;
              // }
              let obj = {
                id: item?.id,
                name: item?.name,
                isPinned: item?.isPinned,
                createdAt:
                  lastMessage_info != '' ? lastMessage_info?.createdAt : '',
                unReadCount:
                  lastMessage_info != '' ? lastMessage_info?.unReadCount : '',
                read: lastMessage_info != '' ? lastMessage_info?.read : '',
                chatroomId: item?.chatroomId,
                message:
                  lastMessage_info != '' ? lastMessage_info?.message : '',
                image: lastMessage_info != '' ? lastMessage_info?.image : '',
                // message: "message",
                // profile: profile,
              };
              usersList.push(obj);
            }
          }
          dispatch(setLoginUserDetail(data));
          resolve(usersList);
        });
      } catch (error) {
        resolve([]);
      }
    });
  };
  const getLatestMessage = chatroomId => {
    return new Promise((resolve, reject) => {
      try {
        if (chatroomId) {
          console.log('getting latest messages list ::::::: ');
          const database = getDatabase();
          const chatroomRef = ref(database, `chatrooms/${chatroomId}`);
          onValue(chatroomRef, snapshot => {
            const data = snapshot.val();
            let messagesList = data?.messages ? data.messages : [];

            const unreadMessages = messagesList?.filter(
              item => item?.read == false && item?.user?._id != userId,
            );
            let lastitem = messagesList?.pop();

            let lastMessage = lastitem?.text;
            //  lastitem
            //   ? lastitem?.type == "image"
            //     ? "photo"
            //     : lastitem?.text
            //   : "";
            let obj = {
              createdAt: lastitem?.createdAt,
              message: lastitem?.text,
              image: lastitem?.image,
              read: lastitem?.read,
              unReadCount: unreadMessages?.length,
            };
            resolve(obj);
          });
        } else {
          resolve('');
        }
      } catch (error) {
        resolve('');
      }
    });
  };
  const getUsersList = async () => {
    try {
      //getting list of chating of loggedin user
      let username = userDetail?.name;
      const database = getDatabase();
      //first check if the user registered before

      const user = await findUser(username);

      //create a new user if not registered
      if (user) {
        // set loggedin user details
        dispatch(setLoginUserDetail(user));
      } else {
        // create new user
        const newUserObj = {
          username: username,
          avatar: 'https://i.pravatar.cc/150?u=' + Date.now(),
        };

        set(ref(database, `users/${username}`), newUserObj);
        dispatch(setLoginUserDetail(newUserObj));
      }

      // set friends list change listener
      const myUserRef = ref(database, `users/${username}`);
      setList([]);
      onValue(myUserRef, snapshot => {
        const data = snapshot.val();
        if (data) {
          data.friends?.map((item, index) => {
            setList([
              // ...list,
              {
                id: index,
                name: item.name,
                type: '',
              },
            ]);
          });
        }
        dispatch(setLoginUserDetail(data));
        setLoddedInuserData(prevData => ({
          ...prevData,
          data: data,
          friends: data.friends,
        }));
      });
    } catch (error) {
      console.error(error);
    }
  };

  const findUser = async name => {
    const database = getDatabase();
    const mySnapshot = await get(ref(database, `users/${name}`));
    return mySnapshot.val();
  };

  const handlePress = async selectedUser1 => {
    let user = await findUser(userDetail?.id);
    let filter = user?.friends?.filter(
      element => element?.id == selectedUser1?.id,
    );
    dispatch(setUserForChat(filter[0]));
    navigation.navigate('Conversations');
  };
  //----------------------------------------------------------------------

  const getSuggestedFriendsList = async () => {
    try {
      let user_id = await AsyncStorage.getItem('user_id');
      setLoading(true);
      setSuggestedFriends([]);
      let data = {
        this_user_id: user_id,
      };
      var requestOptions = {
        method: 'POST',
        body: JSON.stringify(data),
        redirect: 'follow',
      };

      fetch(api.getfriendsuggestions, requestOptions)
        .then(response => response.json())
        .then(result => {
          let responseList = [];
          if (result?.length > 0) {
            result.forEach(element => {
              let obj = {
                id: element['Friend ID'],
                firstName: element['First Name'],
                lastname: element['lastname'],
                full_name: element['First Name'] + ' ' + element['lastname'],
                // status: element?.status,
                status: false,
                image: element?.image,
                active_watch: element['active watch'],
              };
              responseList.push(obj);
            });
          }

          setSuggestedFriends(responseList);
        })
        .catch(error => console.log('error', error))
        .finally(() => setLoading(false));
    } catch (error) {
      console.log('error :', error);
      setLoading(false);
    }
  };

  const handleonAdd = id => {
    const newData = suggestedFriends.map(item => {
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
    setSuggestedFriends(newData);
  };

  const BottomSheetComponent = () => {
    return (
      <RBSheet
        ref={bottomSheetRef}
        height={300}
        openDuration={250}
        closeOnDragDown={true}
        closeOnPressMask={false}
        animationType={'slide'}
        customStyles={{
          container: {
            padding: 5,
            //   alignItems: 'center',
            height: 530,
            flex: 1,
            backgroundColor: '#ffffff',
            borderRadius: 30,
          },
          draggableIcon: {
            backgroundColor: '#003e6b',
          },
        }}>
        <Text
          style={{
            color: '#003e6b',
            fontSize: 18,
            textAlign: 'center',
            marginTop: 5,
            fontFamily: 'Rubik-Regular',
          }}>
          Friend's List
        </Text>

        <View
          style={{
            marginVertical: 15,
            paddingHorizontal: 20,
            flex: 1,
          }}>
          <FlatList
            data={friendsList}
            numColumns={3}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={item => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('FriendProfile'),
                      bottomSheetRef?.current.close();
                  }}
                  style={{
                    ...styles.bootSheetCardView,
                    width: '28.9%',
                    marginVertical: 5,
                    marginHorizontal: 7,
                    borderWidth: item.item.selected ? 1 : 0,
                    borderColor: item.item.selected ? '#38ACFF' : 'transparent',
                  }}>
                  <Image
                    source={item.item.avater}
                    style={{marginVertical: 8, width: 44, height: 44}}
                  />
                  <Text
                    style={{
                      color: '#040103',
                      fontSize: 13,
                      fontFamily: 'Rubik-Regular',
                    }}>
                    {item.item.name}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>

        {/* <TouchableOpacity
          onPress={() => navigation.navigate('Friends')}
          style={{
            height: 137,
            width: 101,
            borderRadius: 5,
            padding: 5,
            alignItems: 'center',
            justifyContent: 'center',
            marginHorizontal: 5,
          }}>
          <Image source={require('../../../assets/images/addFriend.png')} />
          <Text style={{color: '#002138', marginTop: 8, fontSize: 14}}>
            Add a Friend
          </Text>
        </TouchableOpacity> */}
      </RBSheet>
    );
  };

  const handleOpenDrawer = navigation => {
    captureScreen({
      format: 'jpg',
    })
      .then(uri => {
        AsyncStorage.setItem('Screen', uri.toString());
        AsyncStorage.setItem('ScreenName', 'Chat');
        navigation.openDrawer();
      })
      .catch(error => console.log(error));
  };

  const EmptyChatView = () => {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: 20,
        }}>
        <Image
          source={require('../../../assets/images/chat2.png')}
          style={{height: 114, width: 114}}
        />

        <View
          style={{
            width: 200,
            marginVertical: 20,
            alignItems: 'center',
          }}>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                fontSize: 16,
                color: '#000000',
                fontFamily: 'Rubik-Regular',
              }}>
              Tap
            </Text>
            <Image
              source={require('../../../assets/images/chat1.png')}
              style={{width: 19, height: 19, marginHorizontal: 5}}
            />
            <Text
              style={{
                fontSize: 16,
                color: '#000000',
              }}>
              this at the top right to
            </Text>
          </View>
          <Text
            style={{
              fontSize: 16,
              color: '#000000',
              fontFamily: 'Rubik-Regular',
            }}>
            start a conversation
          </Text>
        </View>
      </View>
    );
  };

  const deleteItem = async (id, item) => {
    // console.log('item ::  ', item?.chatroomId);
    try {
      setLoading(true);
      let user_id = await AsyncStorage.getItem('user_id');

      const myDetail = await findUser(userId);
      const selectedUserDetail = await findUser(id);

      console.log('user detail ::: ', myDetail);
      //  remove friend from my friend list
      let filter = myDetail?.friends?.filter(element => element?.id != id);
      console.log('filter  ::: ', filter);
      let newObj = {
        ...myDetail,
        friends: filter,
      };
      const database = getDatabase();
      update(ref(database, `users/${userId}`), newObj);

      await AsyncStorage.setItem(
        'LoggedInUserFirebaseDetail',
        JSON.stringify(newObj),
      );

      const selectedFilter = selectedUserDetail?.friends?.filter(
        element => element?.id != userId,
      );
      let newObj1 = {
        ...selectedUserDetail,
        friends: selectedFilter,
      };
      update(ref(database, `users/${id}`), newObj1);

      //also room chatting from chatroom
      remove(ref(database, `chatrooms/${item?.chatroomId}`));

      const newData = chatList.filter(item => item.id != id);
      setChatList(newData);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log('error occur in removeing friend  :', error);
    }
  };

  const pinItem = async id => {
    try {
      let user_id = await AsyncStorage.getItem('user_id');

      const myDetail = await findUser(user_id);
      let myFriends = myDetail?.friends ? myDetail?.friends : [];

      //change pin status in firebase
      const newData = myFriends.map(item => {
        if (id === item.id) {
          return {
            ...item,
            isPinned: !item.isPinned,
          };
        } else {
          return {
            ...item,
          };
        }
      });
      let newObj = {
        ...myDetail,
        friends: newData,
      };
      const database = getDatabase();
      update(ref(database, `users/${userId}`), newObj);
      //also update local storage
      await AsyncStorage.setItem(
        'LoggedInUserFirebaseDetail',
        JSON.stringify(newObj),
      );

      //also update chatlist state value to show pinned chat on top of list
      const newData1 = chatList.map(item => {
        if (id === item.id) {
          return {
            ...item,
            isPinned: !item.isPinned,
          };
        } else {
          return {
            ...item,
          };
        }
      });
      newData1.sort(function (a, b) {
        return b.isPinned - a.isPinned;
      });
      setChatList(newData1);

      setLoading(false);
    } catch (error) {
      console.log('error occur in pin item   :: ', error);
    }
  };

  const ChatListComponent = () => {
    return (
      <SwipeListView
        data={chatList}
        renderItem={(data, rowMap) => (
          <Pressable
            onPress={() =>
              // navigation.navigate('Conversations', {
              //   user: data.item,
              // })
              handlePress(data?.item)
            }
            style={styles.chatCardView}>
            <Image
              source={require('../../../assets/images/user1.png')}
              style={{width: 45, height: 45}}
            />
            <View style={{marginLeft: 15, flex: 1}}>
              <Text style={styles.userName}>{data.item.name}</Text>
              {/* <Text style={styles.userName}>{data?.item?.unReadCount}</Text> */}
              {data?.item?.unReadCount > 0 ? (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={require('../../../assets/images/user1.png')}
                    style={{
                      width: 15,
                      height: 15,
                      resizeMode: 'contain',
                      marginRight: 4,
                    }}
                  />
                  <Text
                    numberOfLines={1}
                    style={{...styles.messageText, color: '#003E6B'}}>
                    {typeof data?.item?.image == 'undefined' &&
                    typeof data.item.message == 'undefined'
                      ? ''
                      : data?.item?.image != ''
                      ? 'photo'
                      : data.item.message}
                  </Text>
                </View>
              ) : (
                <Text numberOfLines={1} style={styles.messageText}>
                  {typeof data?.item?.image == 'undefined' &&
                  typeof data.item.message == 'undefined'
                    ? ''
                    : data?.item?.image != ''
                    ? 'photo'
                    : data.item.message}
                </Text>
              )}
            </View>
            <View style={{marginLeft: 15, alignItems: 'flex-end'}}>
              <Text
                style={{
                  color: '#838383',
                  fontSize: 12,
                }}>
                {/* {data.item.createdAt} */}
                {data?.item?.createdAt &&
                  moment(data?.item?.createdAt).fromNow()}
              </Text>
              {data?.item?.unReadCount > 0 && (
                <View
                  style={{
                    height: 15,
                    width: 15,
                    borderRadius: 15,
                    backgroundColor: 'red',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 10,
                    }}>
                    {/* {data.item.count} */}
                    {data?.item?.unReadCount}
                  </Text>
                </View>
              )}
            </View>
          </Pressable>
        )}
        // disableLeftSwipe={true}

        disableRightSwipe={true}
        renderHiddenItem={(data, rowMap) => (
          <View style={styles.rowBack}>
            <TouchableOpacity
              onPress={() => deleteItem(data.item.id, data?.item)}
              style={[styles.backRightBtn, styles.backRightBtnRight]}>
              <Image
                source={require('../../../assets/images/delete.png')}
                style={{height: 40, width: 40}}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => pinItem(data.item.id)}
              style={[styles.backRightBtn, {right: 50}]}>
              <Image
                source={require('../../../assets/images/pin.png')}
                style={{height: 40, width: 40}}
              />
            </TouchableOpacity>
          </View>
        )}
        // leftOpenValue={175}
        rightOpenValue={-115}
      />
    );
  };

  return (
    <Animated.View
      style={{
        zIndex: 999,
        flex: 1,
        backgroundColor: 'white',
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        borderRadius: showMenu ? 15 : 0,
        // transform:
        //   typeof scale != 'undefined'
        //     ? [{scale: scale}, {translateX: moveToRight}]
        //     : [{scale: 1}],
      }}>
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          showsVerticalScrollIndicator={false}>
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
                setActiveTab('Chat');
                setShowMenu(!showMenu);
              }}>
              {/* <Image source={require('../../../assets/images/Line1.png')} />
              <Image
                source={require('../../../assets/images/Line2.png')}
                style={{marginTop: 5}}
              /> */}
              <Image
                source={require('../../../assets/images/menu1.png')}
                style={{width: 34, height: 17}}
              />
            </Pressable>
            <Text style={styles.headerTitle}>Chat</Text>
            <TouchableOpacity onPress={() => bottomSheetRef?.current?.open()}>
              <Image
                source={require('../../../assets/images/chat1.png')}
                style={{width: 25, height: 25}}
              />
            </TouchableOpacity>
          </View>

          <View style={{...styles.searchView, marginHorizontal: 20}}>
            <TextInput
              style={styles.searchTextInput}
              placeholder={'Search'}
              value={searchText}
              onChangeText={txt => setSearchText(txt)}
            />
            <Image
              source={require('../../../assets/images/search-small.png')}
              style={{height: 20, width: 20}}
            />
          </View>
          {searchText.length > 0 ? (
            <View style={{flex: 1, paddingHorizontal: 20}}>
              <Text
                style={{
                  color: '#000000',
                  fontSize: 16,
                  fontFamily: 'Rubik-Regular',
                }}>
                Search Results
              </Text>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={require('../../../assets/images/search3.png')}
                  style={{height: 99, width: 99}}
                />
                <Text
                  style={{
                    color: '#000000',
                    marginTop: 15,
                    width: 175,
                    textAlign: 'center',
                    fontSize: 16,
                    fontFamily: 'Rubik-Regular',
                  }}>
                  No conversation match your search
                </Text>
              </View>
            </View>
          ) : (
            <View style={{flex: 1}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingHorizontal: 20,
                }}>
                <Text
                  style={{
                    color: '#000000',
                    fontSize: 16,
                    fontFamily: 'Rubik-Regular',
                  }}>
                  Suggested Friends
                </Text>

                <TouchableOpacity
                  style={styles.btnArrow}
                  onPress={() => setIsSuggestedVisible(!isSuggestedVisible)}>
                  {isSuggestedVisible ? (
                    <Image
                      source={require('../../../assets/images/arrow-up1.png')}
                      style={{height: 9, width: 15}}
                    />
                  ) : (
                    <Image
                      source={require('../../../assets/images/arrow-down1.png')}
                      style={{height: 9, width: 15, tintColor: '#000'}}
                    />
                  )}
                </TouchableOpacity>
              </View>
              {/* ----------------------Suggested Friends List ---------------------------- */}
              <View
                style={{
                  marginVertical: 15,
                  paddingHorizontal: 10,
                }}>
                {isSuggestedVisible && (
                  <FlatList
                    data={suggestedFriends}
                    keyExtractor={(item, index) => index.toString()}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={item => {
                      return (
                        <TouchableOpacity
                          // onPress={() => navigation.navigate('FriendRequest')}
                          onPress={() =>
                            navigation.navigate('FriendProfile', {
                              user: item?.item,
                            })
                          }
                          style={{
                            ...styles.cardView,
                            width: 101,
                            height: 110,
                            justifyContent: 'center',
                          }}>
                          {/* <Image
                            source={item.item.avater}
                            style={{marginVertical: 8, width: 44, height: 44}}
                          /> */}
                          <Image
                            source={require('../../../assets/images/friend-profile.png')}
                            style={{marginVertical: 8, width: 44, height: 44}}
                          />
                          <Text style={styles.friend_name}>
                            {/* {item.item.name} */}
                            {item?.item?.firstName}
                          </Text>
                        </TouchableOpacity>
                      );
                    }}
                  />
                )}
              </View>

              <View style={{flex: 1}}>
                <Text
                  style={{
                    color: '#000000',
                    fontSize: 16,
                    paddingHorizontal: 20,
                    marginBottom: 20,
                    fontFamily: 'Rubik-Regular',
                  }}>
                  Chats
                </Text>
                {chatList.length == 0 ? (
                  <EmptyChatView />
                ) : (
                  <ChatListComponent />
                )}
              </View>
            </View>
          )}

          <BottomSheetComponent />
        </ScrollView>
      </View>
    </Animated.View>
  );
};

export default Chat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
  },
  headerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 40,
    paddingHorizontal: 20,
  },
  headerTitle: {color: '#000000', fontSize: 25, fontFamily: 'Rubik-Regular'},
  searchView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#CCC',
    paddingHorizontal: 20,
    marginVertical: 20,
  },
  searchTextInput: {
    flex: 1,
    borderColor: '#FFFFFF',
    paddingVertical: 8,
    color: '#000000',
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
  cardButton: {
    backgroundColor: '#d8d8d8',
    width: 70,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
    alignSelf: 'flex-end',
    padding: 5,
  },
  cardText: {
    color: '#040103',
    textAlign: 'center',
    fontSize: 15,
    width: 75,
  },
  friend_name: {
    color: '#040103',
    textAlign: 'center',
    fontSize: 13,
    width: 75,
    fontFamily: 'Rubik-Regular',
  },
  btnArrow: {
    height: 20,
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chatCardView: {
    flexDirection: 'row',
    marginVertical: 10,
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  userName: {
    color: '#040103',
    fontSize: 16,
    fontFamily: 'Rubik-Medium',
  },
  messageText: {
    color: '#040103',
    fontSize: 14,
    fontFamily: 'Rubik-Regular',
  },

  rowBack: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
    backgroundColor: '#fff',
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
  },
  backRightBtnRight: {
    right: 0,
  },
  bootSheetCardView: {
    height: 100,
    width: 101,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    shadowColor: 'blue',
    elevation: 2,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
  },
});
