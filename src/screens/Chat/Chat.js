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
} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {captureScreen} from 'react-native-view-shot';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SCREEN_WIDTH = Dimensions.get('screen').width;

const Chat = ({navigation}) => {
  const bottomSheetRef = useRef();

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
      friend_name: 'Username',
      status: false,
    },
    {
      id: 1,
      friend_name: 'Username',
      status: false,
    },
    {
      id: 2,
      friend_name: 'Username',
      status: false,
    },
    {
      id: 3,
      friend_name: 'Username',
      status: false,
    },
    {
      id: 4,
      friend_name: 'Username',
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
        <Text style={{color: '#003e6b', fontSize: 18, textAlign: 'center'}}>
          Friends List
        </Text>

        <TouchableOpacity
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
        </TouchableOpacity>
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
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false}>
        <View style={styles.headerView}>
          <Pressable onPress={() => handleOpenDrawer(navigation)}>
            <Image source={require('../../../assets/images/Line1.png')} />
            <Image
              source={require('../../../assets/images/Line2.png')}
              style={{marginTop: 5}}
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
                }}>
                No conversation match your search
              </Text>
            </View>
          </View>
        ) : (
          <View style={{flex: 1}}>
            <View style={{flex: 1}}>
              <Text
                style={{color: '#000000', fontSize: 16, paddingHorizontal: 20}}>
                Chats
              </Text>

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
                    }}>
                    start a conversation
                  </Text>
                </View>
              </View>
            </View>
          </View>
        )}

        <BottomSheetComponent />
      </ScrollView>
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    // paddingHorizontal: 20,
    paddingTop: 20,
  },
  headerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 40,
    paddingHorizontal: 20,
  },
  headerTitle: {color: '#000000', fontSize: 25, fontWeight: '500'},
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
  },
  btnArrow: {
    height: 20,
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
