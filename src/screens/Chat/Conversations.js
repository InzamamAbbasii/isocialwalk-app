import React, {useState, useCallback, useEffect, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {
  GiftedChat,
  Send,
  Bubble,
  Time,
  InputToolbar,
  Composer,
  SystemMessage,
  Actions,
} from 'react-native-gifted-chat';
import uuid from 'react-native-uuid';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Header from '../../Reuseable Components/Header';
import {getDatabase, get, ref, onValue, off, update} from 'firebase/database';
import {useSelector} from 'react-redux';
import storage from '@react-native-firebase/storage';
import Loader from '../../Reuseable Components/Loader';

const Conversations = ({navigation, route}) => {
  const chatRef = useRef(null);
  const _messageContainerRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [userId, setUserId] = useState('-1');
  // const [userId, setUserId] = useState(route.params.user.id);
  // console.log(route.params.user.id);

  //
  const [selectedUserType, setSelectedUserType] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedUser_PhoneNo, setSelectedUser_PhoneNo] = useState('');
  const [profile_Image, setProfile_Image] = useState(null);

  useEffect(() => {
    if (chatRef) {
      //scroll to specific message
      chatRef?.current?._messageContainerRef?.current?.scrollToIndex({
        animated: true,
        index: 6,
      });
      console.log('chatRaf :: ');
    } else {
      console.log('chat ref is undefiend......');
    }
  }, []);

  //
  //--------------------------------------------------CHATTING USING FIREBASE---------------------------------------------

  // chating through firebase
  const [myData, setMyData] = useState(null);
  let {userDetail, routeUserType, selectedChatUser} = useSelector(
    state => state.userReducer,
  );
  let selectedUser = selectedChatUser;

  const findUser = async name => {
    const database = getDatabase();

    const mySnapshot = await get(ref(database, `users/${name}`));
    return mySnapshot.val();
  };
  useEffect(() => {
    //getting user type i.e patient,doctor or hospital
    const loadData = async () => {
      const myChatroom = await fetchMessages();
      let messagesList =
        myChatroom?.messages?.length > 0 ? myChatroom.messages : [];
      if (messagesList.length > 0) {
        // console.log('message list :: ', messagesList);

        //handle mark all messages as read ---------------------
        let myArr = [];
        messagesList.forEach((element, index) => {
          let obj = {
            node: index,
            data: element,
          };
          myArr.push(obj);
        });
        let unReadMessages = myArr?.filter(
          item =>
            item?.data?.user?._id == selectedUser?.id &&
            item?.data?.read == false,
        );
        // console.log('unReadMessages :: ', unReadMessages);
        //mark all new messages as read
        const db = getDatabase();
        for (const element of unReadMessages) {
          update(
            ref(
              db,
              `chatrooms/${selectedUser.chatroomId}/messages/${element?.node}`,
            ),
            {
              read: true,
            },
          );
        }

        //----------------------------------------------------------
        setMessages(messagesList.reverse());
      }
    };
    loadData();
  }, [fetchMessages, renderMessages, selectedUser?.chatroomId]);
  const renderMessages = useCallback(
    msgs => {
      return msgs
        ? msgs.reverse().map((msg, index) => ({
            ...msg,
            _id: index,
            user: {
              _id:
                msg.user._id === userDetail?.id
                  ? userDetail?.id
                  : selectedUser?.id,
              avatar:
                msg.user._id === userDetail?.id
                  ? userDetail?.avatar
                  : selectedUser?.avatar,
              name:
                msg.user._id === userDetail?.name
                  ? userDetail?.name
                  : selectedUser?.name,
            },
          }))
        : [];
    },
    [
      userDetail?.avatar,
      userDetail?.name,
      selectedUser?.avatar,
      selectedUser?.name,
    ],
  );

  const fetchMessages = useCallback(async () => {
    const database = getDatabase();
    const snapshot = await get(
      ref(database, `chatrooms/${selectedUser.chatroomId}`),
    );
    return snapshot.val();
  }, [selectedUser?.chatroomId]);

  const handleSend = useCallback(
    async (msg = '', url, isImage) => {
      //send the msg[0] to the other user
      const database = getDatabase();
      //fetch fresh messages from server
      const currentChatroom = await fetchMessages();

      const lastMessages = currentChatroom.messages || [];

      if (userDetail?.id) {
        let newMessage = msg[0];
        let obj_newMessage = {
          // _id: newMessage?._id,
          _id: uuid.v4(),
          // text: newMessage?.text,
          text: isImage ? '' : newMessage?.text,
          image: isImage ? url : '',
          type: isImage ? 'image' : 'text',
          createdAt: isImage ? new Date() : newMessage?.createdAt,
          read: false,
          user: {
            _id: userDetail?.id,
            name: userDetail?.name,
          },
        };

        //TODO: also update messages list in firebase
        update(ref(database, `chatrooms/${selectedUser.chatroomId}`), {
          messages: [...lastMessages, obj_newMessage],
        });

        setMessages(previousMessages =>
          GiftedChat.append(previousMessages, obj_newMessage),
        );
      }
    },
    [fetchMessages, myData?.username, selectedUser?.chatroomId],
  );

  const handleImageUpload = useCallback(async (fileName, filePath) => {
    try {
      if (!fileName) return;
      setLoading(true);
      // let fileName = file?.path?.split('/').pop();

      const uploadTask = storage().ref().child(fileName).putFile(filePath);
      uploadTask.on(
        'state_changed',
        snapshot => {
          // const progress = Math.round(
          //   (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
          // );
        },
        error => {
          // alert(error);
          setLoading(false);
        },
        async () => {
          const url = await storage().ref(fileName).getDownloadURL();
          let isImage = true;
          let message = '';
          setLoading(false);

          handleSend(message, url, isImage);
        },
      );
    } catch (error) {
      setLoading(false);
    }
  }, []);

  //---------------------------------------------

  //--------------------------------------------------CHATTING USING FIREBASE---------------------------------------------

  // useEffect(() => {
  //   // console.log(route.params.user.id);
  //   setMessages([
  //     {
  //       _id: 1,
  //       text: 'Hello developer',
  //       createdAt: new Date(),
  //       user: {
  //         _id: 2,
  //         name: 'React Native',
  //         avatar: 'https://placeimg.com/140/140/any',
  //       },
  //       image: null,
  //     },
  //     {
  //       _id: 2,
  //       text: 'Hello developer how was the day',
  //       createdAt: new Date(),
  //       user: {
  //         _id: 3,
  //         name: 'React Native',
  //         avatar: 'https://placeimg.com/140/140/any',
  //       },
  //       image: null,
  //     },
  //   ]);
  // }, []);

  const onSend = useCallback((messages = []) => {
    handleSend(messages);
    // setMessages(previousMessages =>
    //   GiftedChat.append(previousMessages, messages),
    // );
  }, []);

  const SendComponent = props => {
    return (
      <Send
        {...props}
        containerStyle={{
          borderWidth: 0,
        }}>
        <View
          style={{
            justifyContent: 'center',
            height: '100%',
            marginRight: 10,
            borderWidth: 0,
          }}>
          <Image
            source={require('../../../assets/images/send.png')}
            style={{
              height: 20,
              width: 20,
              resizeMode: 'contain',
              // marginBottom: 14,
            }}
          />
        </View>
      </Send>
    );
  };

  // const CustomBubble = props => {
  //   return (
  //     <Bubble
  //       {...props}
  //       textStyle={{
  //         right: {
  //           color: '#ffffff',
  //         },
  //         left: {
  //           color: '#ffffff',
  //         },
  //       }}
  //       wrapperStyle={{
  //         left: {
  //           backgroundColor: '#0496FF',
  //         },
  //         right: {
  //           backgroundColor: '#003E6B',
  //         },
  //       }}
  //     />
  //   );
  // };

  const CustomBubble = props => {
    return (
      <Bubble
        ref={_messageContainerRef}
        {...props}
        textStyle={{
          right: {
            color: '#ffffff',
          },
          left: {
            color: '#ffffff',
          },
        }}
        wrapperStyle={{
          left: {
            backgroundColor: '#0496FF',
            marginBottom: 25,
          },
          right: {
            backgroundColor: '#003E6B',
            marginBottom: 25,
          },
        }}
      />
    );
  };

  const CustomTime = props => {
    return (
      <View style={{position: 'relative', top: 25}}>
        <Time
          {...props}
          timeTextStyle={{
            left: {
              color: '#838383',
            },
            right: {
              color: '#838383',
            },
          }}
        />
      </View>
    );
  };

  const CustomInputToolbar = props => {
    return (
      <View
        style={{
          backgroundColor: '#fff',
          height: 60,
          alignContent: 'center',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          left: 0,
          right: 0,
          bottom: 9,
        }}>
        <View
          style={{
            backgroundColor: 'red',
            position: 'absolute',
            top: 52,
            left: 18,
            width: '100%',
          }}>
          <InputToolbar
            {...props}
            containerStyle={{
              //   backgroundColor: 'red',
              height: 42,
              borderColor: '#ccc',
              borderTopColor: '#ccc',
              borderTopWidth: 1,
              borderWidth: 1,
              borderRadius: 10,
              width: '90%',
            }}
          />
        </View>
      </View>
    );
  };

  const handleImagePick = async () => {
    var options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    let id = messages.length;
    await launchCamera(options)
      .then(res => {
        handleImageUpload(res.assets[0].fileName, res.assets[0].uri);

        // let obj1 = {
        //   _id: uuid.v4(),
        //   // _id: id,
        //   text: '',
        //   createdAt: new Date(),
        //   user: {
        //     _id: userId,
        //     name: 'React Native',
        //     // avatar: 'https://placeimg.com/140/140/any',
        //   },
        //   image: res.assets[0].uri,
        // };
        // onSend(obj1);
      })
      .catch(error => console.log(error));
  };

  const handleGallery = async () => {
    var options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    let id = messages.length;
    await launchImageLibrary(options)
      .then(res => {
        handleImageUpload(res.assets[0].fileName, res.assets[0].uri);
        // let obj1 = {
        //   _id: uuid.v4(),
        //   // _id: id,
        //   text: '',
        //   createdAt: new Date(),
        //   user: {
        //     _id: userId,
        //     name: 'React Native',
        //     // avatar: 'https://placeimg.com/140/140/any',
        //   },
        //   image: res.assets[0].uri,
        // };
        // onSend(obj1);
      })
      .catch(error => console.log(error));
  };
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      handleSearch(searchText);
    }, 1500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchText]);

  const handleSearch = txt => {
    if (txt) {
      let index = messages?.findIndex(
        obj => obj?.text?.toLocaleLowerCase() === txt?.toLocaleLowerCase(),
      );
      if (index != -1 && chatRef) {
        console.log('scrolling to index ::: ', index);
        chatRef?.current?._messageContainerRef?.current?.scrollToIndex({
          animated: true,
          index: index,
        });
      } else {
        console.log('not scrolling index find ::: ', index);
      }
    }
  };
  return (
    <View style={styles.container}>
      {!isSearch ? (
        <View style={styles.headerView}>
          <TouchableOpacity
            style={{padding: 10, paddingLeft: 0}}
            onPress={() => navigation?.goBack()}>
            <Image
              source={require('../../../assets/images/left-arrow.png')}
              style={{width: 12, height: 20}}
            />
          </TouchableOpacity>
          <Image
            source={require('../../../assets/images/user1.png')}
            style={{width: 40, height: 40, marginHorizontal: 10}}
          />
          <View style={{flex: 1}}>
            <Text
              style={{
                color: '#000000',
                fontSize: 17,
                fontFamily: 'Rubik-Medium',
              }}>
              {/* {route?.params?.user?.name} */}
              {/* test */}
              {selectedUser?.name}
            </Text>
            <Text
              style={{
                color: '#4BE36C',
                fontSize: 14,
                fontFamily: 'Rubik-Regular',
              }}>
              Online Now
            </Text>
          </View>
          <TouchableOpacity onPress={() => setIsSearch(true)}>
            <Image
              source={require('../../../assets/images/search-small.png')}
            />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.headerView}>
          <View style={styles.searchView}>
            <TextInput
              style={styles.searchTextIntput}
              placeholder={'Search'}
              value={searchText}
              onChangeText={txt => {
                setSearchText(txt);
              }}
            />
            <Image
              source={require('../../../assets/images/search.png')}
              style={{height: 20, width: 20}}
            />
          </View>
          <TouchableOpacity
            style={styles.btnCancel}
            onPress={() => {
              setIsSearch(false);
              setSearchText('');
            }}>
            <Text style={styles.btnCancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={{flex: 0.97, backgroundColor: '#DAE7F1'}}>
        {loading && <Loader />}
        <GiftedChat
          // isTyping
          ref={chatRef}
          messages={messages}
          placeholder={'Type something...'}
          onSend={messages => {
            onSend(messages);
          }}
          user={{
            // _id: userId,
            _id: userDetail?.id,
            // _id: 1,
          }}
          showUserAvatar={false}
          // isCustomViewBottom={false}
          // renderMessageText={props => {
          //   let {currentMessage} = props;
          //   console.log(currentMessage);
          //   return (
          //     <View
          //       style={{
          //         backgroundColor:
          //           currentMessage.user._id == 1 ? 'red' : 'blue',
          //       }}>
          //       <Text>{currentMessage.text}</Text>
          //     </View>
          //   );
          // }}
          renderInputToolbar={props => {
            return <CustomInputToolbar {...props} />;
          }}
          renderAvatar={props => {
            return null;
          }}
          renderBubble={props => {
            return <CustomBubble {...props} />;
          }}
          renderSend={props => {
            return <SendComponent {...props} />;
          }}
          renderTime={props => {
            return <CustomTime {...props} />;
          }}
          alwaysShowSend
          renderActions={props => {
            return (
              <Actions
                style={{backgroundColor: 'red', marginBottom: 20}}
                {...props}
                options={{
                  ['Open Camera']: props => {
                    handleImagePick();
                  },
                  ['Open Gallery']: props => {
                    handleGallery();
                  },

                  Cancel: props => {
                    console.log('Cancel');
                  },
                }}
                icon={() => (
                  <Image
                    source={require('../../../assets/images/Bitmap.png')}
                    style={{width: 20, height: 20, marginTop: 2}}
                  />
                )}
                // onSend={args => console.log(args)}
              />
            );
          }}
          renderChatEmpty={props => {
            return (
              <View
                {...props}
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: '#000',
                    fontSize: 14,
                    transform: [{scaleY: -1}],
                  }}>
                  No Conversations Yet
                </Text>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};

export default Conversations;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    // paddingBottom: 30,
  },
  headerView: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    // zIndex: 999,
  },

  searchView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#CCC',
    paddingHorizontal: 10,
    marginRight: 15,
    height: 40,
  },
  searchTextIntput: {
    flex: 1,
    borderColor: '#FFFFFF',
    padding: 8,
    color: '#000000',
  },
  btnCancel: {
    // alignSelf: 'flex-end',
    justifyContent: 'center',
  },
  btnCancelText: {
    textAlign: 'right',
    color: '#4e4e4e',
    fontSize: 16,
    fontFamily: 'Rubik-Regular',
  },
});
