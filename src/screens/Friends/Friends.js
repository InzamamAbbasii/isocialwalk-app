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
const SCREEN_WIDTH = Dimensions.get('screen').width;

const Friends = ({navigation}) => {
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

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false}>
        <View style={styles.headerView}>
          <View>
            <Image source={require('../../../assets/images/Line1.png')} />
            <Image
              source={require('../../../assets/images/Line2.png')}
              style={{marginTop: 5}}
            />
          </View>
          <Text style={styles.headerTitle}>Friends</Text>
          <TouchableOpacity onPress={() => bottomSheetRef?.current?.open()}>
            <Image source={require('../../../assets/images/addFriend1.png')} />
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
            {/* ----------------------Search Result List ---------------------------- */}
            <View style={{marginVertical: 15, paddingBottom: 10}}>
              <FlatList
                numColumns={3}
                key={'_'}
                data={searchResults}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => '_' + index.toString()}
                renderItem={item => {
                  return (
                    <View style={{...styles.cardView, width: '28.9%'}}>
                      {/* <Image
                      source={require('../../assets/images/friend-profile.png')}
                      style={{marginVertical: 8}}
                    /> */}
                      <Image
                        source={require('../../../assets/images/friend-profile.png')}
                        style={{marginVertical: 8, width: 44, height: 44}}
                      />
                      <Text style={styles.friend_name}>
                        {item.item.friend_name}
                      </Text>
                      <View
                        style={{
                          justifyContent: 'flex-end',
                          flex: 1,
                        }}>
                        <TouchableOpacity
                          style={{
                            ...styles.cardButton,
                            backgroundColor: '#38acff',
                            width: 60,
                          }}>
                          <Text style={{color: '#ffffff', fontSize: 11}}>
                            Join
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  );
                }}
              />
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
                }}>
                Suggested Friends
              </Text>

              <TouchableOpacity
                style={styles.btnArrow}
                onPress={() => setIsSuggestedVisible(!isSuggestedVisible)}>
                {isSuggestedVisible ? (
                  <Image
                    source={require('../../../assets/images/arrow-up.png')}
                  />
                ) : (
                  <Image
                    source={require('../../../assets/images/arrow-down.png')}
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
                        style={{...styles.cardView, width: 101}}>
                        <Image
                          source={require('../../../assets/images/friend-profile.png')}
                          style={{marginVertical: 8, width: 44, height: 44}}
                        />
                        <Text style={styles.friend_name}>
                          {item.item.friend_name}
                        </Text>
                        <View
                          style={{
                            justifyContent: 'flex-end',
                            flex: 1,
                          }}>
                          {item.item.status ? (
                            <TouchableOpacity
                              onPress={() => handleonAdd(item.item.id)}
                              style={styles.cardButton}>
                              <Text style={{color: '#ffffff', fontSize: 11}}>
                                Requested
                              </Text>
                            </TouchableOpacity>
                          ) : (
                            <TouchableOpacity
                              onPress={() => handleonAdd(item.item.id)}
                              style={{
                                ...styles.cardButton,
                                backgroundColor: '#38acff',
                                width: 60,
                              }}>
                              <Text style={{color: '#ffffff', fontSize: 11}}>
                                Add
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

            <View style={{flex: 1}}>
              <Text
                style={{color: '#000000', fontSize: 16, paddingHorizontal: 20}}>
                Friends
              </Text>
              {friendsList.length == 0 ? ( //no friends exist
                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingHorizontal: 20,
                  }}>
                  <Image
                    source={require('../../../assets/images/friend1.png')}
                    style={{backgroundColor: '#FFFF', resizeMode: 'contain'}}
                  />
                  <Text
                    style={{
                      width: 159,
                      textAlign: 'center',
                      fontSize: 16,
                      color: '#000000',
                      marginVertical: 20,
                    }}>
                    Added friends would appear here
                  </Text>
                </View>
              ) : (
                <View
                  style={{
                    marginVertical: 15,
                    paddingBottom: 10,
                    paddingHorizontal: 20,
                  }}>
                  <FlatList
                    data={friendsList}
                    numColumns={3}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={item => {
                      return (
                        <TouchableOpacity
                          onPress={() => navigation.navigate('FriendProfile')}
                          style={{
                            ...styles.cardView,
                            justifyContent: 'center',
                            height: 110,
                            width: '28.9%',
                          }}>
                          <Image
                            source={item.item.avater}
                            style={{marginVertical: 8, width: 55, height: 55}}
                          />
                          <Text style={styles.cardText}>{item.item.name}</Text>
                        </TouchableOpacity>
                      );
                    }}
                  />
                </View>
              )}
            </View>
          </View>
        )}

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
              alignItems: 'center',
              height: 530,
              flex: 1,
              backgroundColor: '#ffffff',
              borderRadius: 30,
            },
            draggableIcon: {
              backgroundColor: '#003e6b',
            },
          }}>
          <Text style={{color: '#003e6b', fontSize: 18}}>Invite Friends</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('ShareableInvitationLink');
              bottomSheetRef?.current?.close();
            }}
            style={{
              flexDirection: 'row',
              marginTop: 30,
              alignItems: 'center',
            }}>
            <Image
              source={require('../../../assets/images/share-link.png')}
              style={{width: 30, height: 30}}
            />
            <Text style={{color: '#000000', fontSize: 16, marginLeft: 10}}>
              Shareable invitation Link
            </Text>
          </TouchableOpacity>
        </RBSheet>
      </ScrollView>
    </View>
  );
};

export default Friends;

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
