import React, {useState, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import Header from '../../Reuseable Components/Header';
import RBSheet from 'react-native-raw-bottom-sheet';

const GroupDetail = ({navigation}) => {
  const bottomSheetRef = useRef();
  const bottomSheetAddMemberRef = useRef();
  const [groupMembersList, setGroupMembersList] = useState([
    {
      id: 0,
      name: 'Me',
      avater: require('../../../assets/images/friend-profile.png'),
      selected: false,
    },
    {
      id: 1,
      name: 'Nahla',
      avater: require('../../../assets/images/friend-profile.png'),
      selected: false,
    },
    {
      id: 2,
      name: 'Saffa',
      avater: require('../../../assets/images/friend-profile.png'),
      selected: false,
    },
    {
      id: 3,
      name: 'Rui',
      avater: require('../../../assets/images/friend-profile.png'),
      selected: false,
    },
    {
      id: 4,
      name: 'Anum',
      avater: require('../../../assets/images/friend-profile.png'),
      selected: false,
    },
    {
      id: 5,
      name: 'Zaina',
      avater: require('../../../assets/images/friend-profile.png'),
      selected: false,
    },
  ]);

  const [allMembersList, setAllMembersList] = useState([
    {
      id: 0,
      name: 'Me',
      avater: require('../../../assets/images/friend-profile.png'),
      selected: false,
    },
    {
      id: 1,
      name: 'Nahla',
      avater: require('../../../assets/images/friend-profile.png'),
      selected: false,
    },
    {
      id: 2,
      name: 'Saffa',
      avater: require('../../../assets/images/friend-profile.png'),
      selected: false,
    },
    {
      id: 3,
      name: 'Rui',
      avater: require('../../../assets/images/friend-profile.png'),
      selected: false,
    },
    {
      id: 4,
      name: 'Anum',
      avater: require('../../../assets/images/friend-profile.png'),
      selected: false,
    },
    {
      id: 5,
      name: 'Zaina',
      avater: require('../../../assets/images/friend-profile.png'),
      selected: false,
    },
    // {
    //   id: 6,
    //   name: 'Noami',
    // avater:require('../../../assets/images/friend-profile.png')
    // selected: false,
    // },
  ]);

  const handleAddMemberSelect = id => {
    const newData = allMembersList.map(item => {
      if (id === item.id) {
        return {
          ...item,
          selected: !item.selected,
        };
      } else {
        return {
          ...item,
        };
      }
    });
    setAllMembersList(newData);
  };

  const handleRemoveMemberSelect = id => {
    const newData = groupMembersList.map(item => {
      if (id === item.id) {
        return {
          ...item,
          selected: !item.selected,
        };
      } else {
        return {
          ...item,
        };
      }
    });
    setGroupMembersList(newData);
  };

  const handleRemoveFromGroup = () => {
    const newData = groupMembersList.filter(item => item.selected === false);
    setGroupMembersList(newData);
    bottomSheetRef?.current?.close();
  };

  const handleAddMemberToGroup = () => {
    const newData = allMembersList.filter(item => item.selected === true);
    setGroupMembersList(groupMembersList.concat(newData));
    const newData1 = allMembersList.filter(item => item.selected === false);
    setAllMembersList(newData1);
    bottomSheetAddMemberRef?.current?.close();
  };
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
        showsVerticalScrollIndicator={false}>
        <View style={{paddingHorizontal: 20}}>
          <Header title={'Carnage Coverage'} navigation={navigation} />
        </View>
        <View
          style={{
            marginVertical: 10,
            paddingHorizontal: 20,
            alignItems: 'center',
          }}>
          <Image
            source={require('../../../assets/images/group-profile2.png')}
            style={{
              marginVertical: 12,
              height: 123,
              width: 123,
            }}
          />
          <Text
            style={{
              color: '#000000',
              fontSize: 17,
              fontFamily: 'Rubik-Regular',
            }}>
            Cyanide
          </Text>
          <View
            style={{
              flexDirection: 'row',
              width: '90%',
              justifyContent: 'space-between',
              marginTop: 20,
            }}>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => bottomSheetAddMemberRef?.current?.open()}>
              <Text style={{color: '#FFF', fontSize: 16}}>Add Members</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{
                ...styles.btn,
                backgroundColor: 'transparent',
                borderColor: '#38ACFF',
                borderWidth: 1,
              }}>
              <Text style={{color: '#38ACFF', fontSize: 14}}>Exit Group</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{marginVertical: 10, paddingHorizontal: 20}}>
          <Text
            style={{
              color: '#000000',
              fontSize: 16,
              fontFamily: 'Rubik-Regular',
            }}>
            Active Challenges
          </Text>
          <View
            style={{
              height: 120,
              justifyContent: 'center',
              alignItems: 'center',
              fontFamily: 'Rubik-Regular',
            }}>
            <Text style={{color: '#000'}}> No Active Challenges</Text>
          </View>
        </View>
        <View style={{}}>
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
              Group Members ({groupMembersList.length})
            </Text>
            <TouchableOpacity onPress={() => bottomSheetRef?.current?.open()}>
              <Text
                style={{
                  color: '#6f92c9',
                  fontSize: 16,
                  fontFamily: 'Rubik-Regular',
                }}>
                Remove Member
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              marginVertical: 15,
              paddingBottom: 10,
              paddingHorizontal: 20,
            }}>
            <FlatList
              data={groupMembersList}
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
                      source={item.item.avater}
                      style={{marginVertical: 8, width: 44, height: 44}}
                    />
                    <Text style={styles.cardText}>{item.item.name}</Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </View>
        {/* ------------------------------------------Remove Member Bottom Sheet---------------------------------------------- */}
        <RBSheet
          ref={bottomSheetRef}
          //   height={500}
          openDuration={250}
          closeOnDragDown={true}
          closeOnPressMask={false}
          animationType={'slide'}
          customStyles={{
            container: {
              padding: 5,
              height: 460,
              backgroundColor: '#ffffff',
              borderRadius: 30,
            },
            draggableIcon: {
              backgroundColor: '#003e6b',
            },
          }}>
          <View style={{alignItems: 'center', flex: 1}}>
            <Text
              style={{
                color: '#003e6b',
                fontSize: 18,
                textAlign: 'center',
                fontFamily: 'Rubik-Regular',
                marginTop: 5,
              }}>
              Remove Member
            </Text>
            <View
              style={{
                marginVertical: 15,
                paddingHorizontal: 20,
                flex: 1,
                // backgroundColor: 'red',
                width: '100%',
              }}>
              <FlatList
                data={groupMembersList}
                numColumns={3}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                renderItem={item => {
                  return (
                    <TouchableOpacity
                      onPress={() => handleRemoveMemberSelect(item.item.id)}
                      style={{
                        ...styles.bootSheetCardView,
                        width: '28.9%',
                        marginVertical: 5,
                        marginHorizontal: 7,
                        borderWidth: item.item.selected ? 1 : 0,
                        borderColor: item.item.selected
                          ? '#38ACFF'
                          : 'transparent',
                      }}>
                      <Image
                        source={item.item.avater}
                        style={{marginVertical: 8, width: 44, height: 44}}
                      />
                      <Text
                        style={{color: '#040103', fontFamily: 'Rubik-Regular'}}>
                        {item.item.name}
                      </Text>
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
            <TouchableOpacity
              onPress={() => handleRemoveFromGroup()}
              style={{
                backgroundColor: '#38ACFF',
                marginBottom: 10,
                height: 50,
                width: '92%',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 5,
                fontFamily: 'Rubik-Regular',
              }}>
              <Text style={{color: '#FFF', fontSize: 16}}>
                Remove from group
              </Text>
            </TouchableOpacity>
          </View>
        </RBSheet>

        {/* ------------------------------------------Add Member Bottom Sheet-------------------------------------------- */}
        <RBSheet
          ref={bottomSheetAddMemberRef}
          openDuration={250}
          closeOnDragDown={true}
          closeOnPressMask={false}
          dragFromTopOnly
          animationType={'slide'}
          customStyles={{
            container: {
              padding: 5,
              height: 460,
              backgroundColor: '#ffffff',
              borderRadius: 30,
            },
            draggableIcon: {
              backgroundColor: '#003e6b',
            },
          }}>
          <View
            style={{
              alignItems: 'center',
              flex: 1,
            }}>
            <Text
              style={{
                color: '#003e6b',
                fontSize: 18,
                textAlign: 'center',
                fontFamily: 'Rubik-Regular',
                marginTop: 5,
              }}>
              Add Members
            </Text>
            <View
              style={{
                marginVertical: 15,
                paddingHorizontal: 20,
                flex: 1,
                width: '100%',
              }}>
              <FlatList
                data={allMembersList}
                numColumns={3}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                renderItem={item => {
                  return (
                    <TouchableOpacity
                      onPress={() => handleAddMemberSelect(item.item.id)}
                      style={{
                        ...styles.bootSheetCardView,
                        width: '28.9%',
                        marginVertical: 5,
                        marginHorizontal: 7,
                        borderWidth: item.item.selected ? 1 : 0,
                        borderColor: item.item.selected
                          ? '#38ACFF'
                          : 'transparent',
                      }}>
                      <Image
                        source={item.item.avater}
                        style={{marginVertical: 8, width: 44, height: 44}}
                      />
                      <Text
                        style={{color: '#040103', fontFamily: 'Rubik-Regular'}}>
                        {item.item.name}
                      </Text>
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
            <TouchableOpacity
              onPress={() => handleAddMemberToGroup()}
              style={{
                backgroundColor: '#38ACFF',
                marginBottom: 10,
                height: 50,
                width: '92%',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 5,
              }}>
              <Text
                style={{
                  color: '#FFF',
                  fontSize: 16,
                  fontFamily: 'Rubik-Regular',
                }}>
                Add to group
              </Text>
            </TouchableOpacity>
          </View>
        </RBSheet>
      </ScrollView>
    </View>
  );
};

export default GroupDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    color: '#040103',
    textAlign: 'center',
    fontSize: 13,
    width: 75,
    fontFamily: 'Rubik-Regular',
  },
  btn: {
    flex: 1,
    backgroundColor: '#38ACFF',
    marginHorizontal: 10,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  bootSheetCardView: {
    height: 100,
    width: 101,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    shadowColor: 'blue',
    elevation: 6,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
  },
});
