import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Animated,
} from 'react-native';
import {captureScreen} from 'react-native-view-shot';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ScrollView} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';

const SCREEN_WIDTH = Dimensions.get('screen').width;

const Groups = ({scale, showMenu, setShowMenu, moveToRight, setActiveTab}) => {
  const navigation = useNavigation();
  const [isSearch, setIsSearch] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([
    {
      id: 0,
      group_name: 'Groupname',
    },
    {
      id: 1,
      group_name: 'Groupname',
    },
    {
      id: 2,
      group_name: 'Groupname',
    },
    {
      id: 3,
      group_name: 'Groupname',
    },
    {
      id: 4,
      group_name: 'Groupname',
    },
    {
      id: 5,
      group_name: 'Groupname',
    },
    {
      id: 6,
      group_name: 'Groupname',
    },
    {
      id: 7,
      group_name: 'Groupname',
    },
    {
      id: 8,
      group_name: 'Groupname',
    },
    {
      id: 9,
      group_name: 'Groupname',
    },
    {
      id: 10,
      group_name: 'Groupname',
    },
    {
      id: 11,
      group_name: 'Groupname',
    },
    {
      id: 12,
      group_name: 'Groupname',
    },
  ]);
  const [isSuggestedVisible, setIsSuggestedVisible] = useState(true);
  const [suggestedGroups, setSuggestedGroups] = useState([
    {
      id: 0,
      group_name: 'Incorruptible',
      status: false,
    },
    {
      id: 1,
      group_name: 'Forest Foragers',
      status: false,
    },
    {
      id: 2,
      group_name: 'Cyanide',
      status: false,
    },
    {
      id: 3,
      group_name: 'Group Name',
      status: false,
    },
    {
      id: 4,
      group_name: 'Group Name',
      status: false,
    },
  ]);

  const [groupList, setGroupList] = useState([
    {
      id: 0,
      name: 'Carnage Coverage',
    },
    {
      id: 1,
      name: 'Baseline Grid',
    },
    {
      id: 2,
      name: 'Softlancers',
    },
    {
      id: 3,
      name: 'PRTX',
    },
    {
      id: 4,
      name: 'The Tungstens',
    },
    {
      id: 5,
      name: 'The Nulls',
    },
    {
      id: 6,
      name: 'Helium Hydroxide',
    },
  ]);
  const handleonJoin = id => {
    const newData = suggestedGroups.map(item => {
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
    setSuggestedGroups(newData);
  };

  const handleOpenDrawer = navigation => {
    captureScreen({
      format: 'jpg',
    })
      .then(uri => {
        AsyncStorage.setItem('Screen', uri.toString());
        AsyncStorage.setItem('ScreenName', 'Groups');
        navigation.openDrawer();
      })
      .catch(error => console.log(error));
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
        // transform: [{scale: scale}, {translateX: moveToRight}],
      }}>
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            // paddingHorizontal: 20,
          }}
          showsVerticalScrollIndicator={false}>
          <View
            style={{
              height: 40,
              justifyContent: 'center',
              marginTop: 20,
              paddingHorizontal: 20,
            }}>
            {isSearch ? (
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
                  onPress={() => {
                    setIsSearch(!isSearch);
                    setSearchText('');
                  }}
                  style={styles.btnCancel}>
                  <Text style={styles.btnCancelText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            ) : (
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
                    setActiveTab('Groups');
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
                <TouchableOpacity onPress={() => setIsSearch(!isSearch)}>
                  <Image
                    source={require('../../../assets/images/search.png')}
                  />
                </TouchableOpacity>
              </View>
            )}
          </View>
          <Text style={{...styles.title, paddingHorizontal: 20}}>Groups</Text>
          {searchText.length > 0 ? (
            <View style={{flex: 1, paddingHorizontal: 20}}>
              {/* ----------------------Search Result List ---------------------------- */}
              <View style={{marginVertical: 15, paddingBottom: 10}}>
                <FlatList
                  data={searchResults}
                  numColumns={3}
                  showsVerticalScrollIndicator={false}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={item => {
                    return (
                      <View style={{...styles.cardView, width: '28.9%'}}>
                        <Image
                          source={require('../../../assets/images/group-profile.png')}
                          style={{marginVertical: 8}}
                        />
                        <Text style={styles.cardText}>
                          {item.item.group_name}
                        </Text>
                        <View
                          style={{
                            justifyContent: 'flex-end',
                            flex: 1,
                          }}>
                          <TouchableOpacity
                            onPress={() => handleonJoin(item.item.id)}
                            style={styles.cardButton}>
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
                  marginTop: 10,
                  paddingHorizontal: 20,
                }}>
                <Text
                  style={{
                    color: '#000000',
                    fontSize: 16,
                    fontFamily: 'Rubik-Regular',
                  }}>
                  Suggested Groups
                </Text>

                <TouchableOpacity
                  style={{
                    height: 20,
                    width: 30,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
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
              {/* ----------------------Suggested Groups List ---------------------------- */}
              <View
                style={{
                  marginVertical: 15,
                  paddingHorizontal: 10,
                }}>
                {isSuggestedVisible && (
                  <FlatList
                    data={suggestedGroups}
                    keyExtractor={(item, index) => index.toString()}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={item => {
                      return (
                        <TouchableOpacity
                          onPress={() => navigation.navigate('JoinGroup')}
                          style={{...styles.cardView, width: 101}}>
                          <Image
                            source={require('../../../assets/images/group-profile.png')}
                            style={{marginVertical: 8}}
                          />

                          <Text style={styles.cardText}>
                            {item.item.group_name}
                          </Text>
                          <View
                            style={{
                              justifyContent: 'flex-end',
                              flex: 1,
                            }}>
                            {item.item.status ? (
                              <TouchableOpacity
                                onPress={() => handleonJoin(item.item.id)}
                                style={{
                                  ...styles.cardButton,
                                  backgroundColor: '#d8d8d8',
                                  width: 70,
                                }}>
                                <Text style={{color: '#ffffff', fontSize: 11}}>
                                  Requested
                                </Text>
                              </TouchableOpacity>
                            ) : (
                              <TouchableOpacity
                                onPress={() => handleonJoin(item.item.id)}
                                style={styles.cardButton}>
                                <Text style={{color: '#ffffff', fontSize: 11}}>
                                  Join
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
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingHorizontal: 20,
                }}>
                <Text style={{color: '#000000', fontSize: 16}}>Groups</Text>
                {groupList.length > 0 && (
                  <TouchableOpacity
                    style={{...styles.btnCreateGroup, width: 115, height: 33}}
                    onPress={() => navigation.navigate('CreateGroup')}>
                    <Text style={{color: '#FFFFFF', fontSize: 13}}>
                      Create a Group
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
              {groupList.length == 0 ? (
                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Image
                    source={require('../../../assets/images/group1.png')}
                    style={{backgroundColor: '#FFFF', resizeMode: 'contain'}}
                  />

                  <Text
                    style={{
                      width: 206,
                      textAlign: 'center',
                      fontSize: 16,
                      color: '#000000',
                      marginVertical: 20,
                    }}>
                    Create or join a group and compete in challenges with other
                    groups
                  </Text>
                  <TouchableOpacity
                    style={styles.btnCreateGroup}
                    onPress={() => navigation.navigate('CreateGroup')}>
                    <Text style={{color: '#FFFFFF', fontSize: 13}}>
                      Create a Group
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View
                  style={{
                    marginVertical: 15,
                    paddingBottom: 10,
                    paddingHorizontal: 20,
                  }}>
                  <FlatList
                    data={groupList}
                    numColumns={3}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={item => {
                      return (
                        <TouchableOpacity
                          onPress={() => navigation.navigate('GroupDetail')}
                          style={{
                            ...styles.cardView,
                            justifyContent: 'center',
                            height: 110,
                            width: '28.9%',
                          }}>
                          <Image
                            source={require('../../../assets/images/group-profile.png')}
                            style={{marginVertical: 8}}
                          />
                          <Text style={styles.cardText}>{item.item.name}</Text>
                        </TouchableOpacity>
                      );
                    }}
                  />
                </View>
              )}
            </View>
          )}
        </ScrollView>
      </View>
    </Animated.View>
  );
};

export default Groups;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  },
  searchTextIntput: {
    flex: 1,
    borderColor: '#FFFFFF',
    padding: 8,
    color: '#000000',
  },
  btnCancel: {
    flex: 0.25,
    height: '100%',
    justifyContent: 'center',
  },
  btnCancelText: {
    textAlign: 'right',
    color: '#4e4e4e',
    fontSize: 16,
  },
  title: {
    color: '#000000',
    fontSize: 30,
    marginTop: 12,
    fontFamily: 'Rubik-Regular',
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
    color: '#040103',
    textAlign: 'center',
    fontSize: 13,
    width: 75,
    fontFamily: 'Rubik-Regular',
  },
  cardButton: {
    backgroundColor: '#38acff',
    width: 60,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
    alignSelf: 'flex-end',
    padding: 5,
  },
  btnCreateGroup: {
    width: 144,
    height: 40,
    backgroundColor: '#38acff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
});
