import React, {useState, useCallback, useEffect} from 'react';
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

const Conversations = ({navigation, route}) => {
  const [messages, setMessages] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [userId, setUserId] = useState(route.params.user.id);
  console.log(route.params.user.id);
  useEffect(() => {
    // console.log(route.params.user.id);
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
        image: null,
      },
      {
        _id: 2,
        text: 'Hello developer how was the day',
        createdAt: new Date(),
        user: {
          _id: 3,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
        image: null,
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
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
    console.log('image picker');
    var options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    let id = messages.length;
    await launchCamera(options)
      .then(res => {
        let obj = {
          _id: id,
          text: '',
          createdAt: new Date(),
          user: {
            _id: userId,
            name: 'React Native',
            // avatar: 'https://placeimg.com/140/140/any',
          },
          image: res.assets[0].uri,
        };
        // setMessages(previousMessages =>
        //   GiftedChat.append(previousMessages, obj),
        // );
        // onSend(obj);
        // onSend({_id: uuid.v4(), image: res.assets[0].uri});
        let obj1 = {
          _id: uuid.v4(),
          // _id: id,
          text: '',
          createdAt: new Date(),
          user: {
            _id: userId,
            name: 'React Native',
            // avatar: 'https://placeimg.com/140/140/any',
          },
          image: res.assets[0].uri,
        };
        onSend(obj1);
      })
      .catch(error => console.log(error));
  };

  const handleGallery = async () => {
    console.log('image picker');
    var options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    let id = messages.length;
    await launchImageLibrary(options)
      .then(res => {
        let obj = {
          _id: id,
          text: '',
          createdAt: new Date(),
          user: {
            _id: userId,
            name: 'React Native',
            // avatar: 'https://placeimg.com/140/140/any',
          },
          image: res.assets[0].uri,
        };
        // setMessages(previousMessages =>
        //   GiftedChat.append(previousMessages, obj),
        // );
        // onSend(obj);
        let obj1 = {
          _id: uuid.v4(),
          // _id: id,
          text: '',
          createdAt: new Date(),
          user: {
            _id: userId,
            name: 'React Native',
            // avatar: 'https://placeimg.com/140/140/any',
          },
          image: res.assets[0].uri,
        };
        onSend(obj1);
      })
      .catch(error => console.log(error));
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
            source={route?.params.user.avater}
            style={{width: 40, height: 40, marginHorizontal: 10}}
          />
          <View style={{flex: 1}}>
            <Text
              style={{
                color: '#000000',
                fontSize: 17,
                fontFamily: 'Rubik-Medium',
              }}>
              {route?.params?.user?.name}
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
              onChangeText={txt => setSearchText(txt)}
            />
            <Image
              source={require('../../../assets/images/search.png')}
              style={{height: 20, width: 20}}
            />
          </View>
          <TouchableOpacity
            style={styles.btnCancel}
            onPress={() => setIsSearch(false)}>
            <Text style={styles.btnCancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={{flex: 0.97, backgroundColor: '#DAE7F1'}}>
        <GiftedChat
          // isTyping

          messages={messages}
          placeholder={'Type something...'}
          onSend={messages => {
            onSend(messages);
          }}
          user={{
            _id: userId,
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
