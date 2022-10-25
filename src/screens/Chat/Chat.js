import React, {useState, useRef} from 'react';
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
import {useNavigation} from '@react-navigation/native';

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
    {
      id: 0,
      name: 'Saffa',
      avater: require('../../../assets/images/user1.png'),
      status: false,
    },
    {
      id: 1,
      name: 'Nahla',
      avater: require('../../../assets/images/user2.png'),
      status: false,
    },
    {
      id: 2,
      name: 'Naomi',
      avater: require('../../../assets/images/friend-profile.png'),
      status: false,
    },
    {
      id: 3,
      name: 'Rui',
      avater: require('../../../assets/images/user3.png'),
      status: false,
    },
    {
      id: 4,
      name: 'Anum',
      avater: require('../../../assets/images/friend-profile.png'),
      status: false,
    },
    {
      id: 5,
      name: 'Zaina',
      avater: require('../../../assets/images/friend-profile.png'),
      status: false,
    },
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
    {
      id: 0,
      name: 'Boris Findlay',
      message: 'This is dummy message',
      avater: require('../../../assets/images/user1.png'),
      createdAt: '5 MIN AGO',
      count: 2,
      isPinned: false,
    },
    {
      id: 1,
      name: 'Saffa',
      message: 'we break down where the money went',
      avater: require('../../../assets/images/user2.png'),
      createdAt: '10 MIN AGO',
      count: 2,
      isPinned: false,
    },
    {
      id: 2,
      name: 'Saffa',
      message: 'This is dummy message',
      avater: require('../../../assets/images/user3.png'),
      createdAt: '15 MIN AGO',
      count: 1,
      isPinned: false,
    },
    {
      id: 3,
      name: 'Saffa',
      message: 'This is dummy message',
      avater: require('../../../assets/images/friend-profile.png'),
      createdAt: '15 MIN AGO',
      count: 1,
      isPinned: false,
    },
    {
      id: 4,
      name: 'Saffa',
      message: 'This is dummy message',
      avater: require('../../../assets/images/friend-profile.png'),
      createdAt: '15 MIN AGO',
      count: 1,
      isPinned: false,
    },
    {
      id: 5,
      name: 'Saffa',
      message: 'This is dummy message',
      avater: require('../../../assets/images/friend-profile.png'),
      createdAt: '15 MIN AGO',
      count: 1,
      isPinned: false,
    },
  ]);

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

  const deleteItem = id => {
    const newData = chatList.filter(item => item.id != id);
    setChatList(newData);
  };

  const pinItem = id => {
    const newData = chatList.map(item => {
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
    newData.sort(function (a, b) {
      return b.isPinned - a.isPinned;
    });
    setChatList(newData);
  };

  const ChatListComponent = () => {
    return (
      <SwipeListView
        data={chatList}
        renderItem={(data, rowMap) => (
          <Pressable
            onPress={() =>
              navigation.navigate('Conversations', {
                user: data.item,
              })
            }
            style={styles.chatCardView}>
            <Image source={data.item.avater} style={{width: 45, height: 45}} />
            <View style={{marginLeft: 15, flex: 1}}>
              <Text style={styles.userName}>{data.item.name}</Text>
              {data.item.id === 0 ? (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={data.item.avater}
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
                    {data.item.message}
                  </Text>
                </View>
              ) : (
                <Text numberOfLines={1} style={styles.messageText}>
                  {data.item.message}
                </Text>
              )}
            </View>
            <View style={{marginLeft: 15, alignItems: 'flex-end'}}>
              <Text
                style={{
                  color: '#838383',
                  fontSize: 12,
                }}>
                {data.item.createdAt}
              </Text>
              {data.item.id === 0 && (
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
                    {data.item.count}
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
              onPress={() => deleteItem(data.item.id)}
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
                          onPress={() => navigation.navigate('FriendRequest')}
                          style={{
                            ...styles.cardView,
                            width: 101,
                            height: 110,
                            justifyContent: 'center',
                          }}>
                          <Image
                            source={item.item.avater}
                            style={{marginVertical: 8, width: 44, height: 44}}
                          />
                          <Text style={styles.friend_name}>
                            {item.item.name}
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
