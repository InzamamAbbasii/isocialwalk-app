import React, {useState, useRef} from 'react';
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
import RBSheet from 'react-native-raw-bottom-sheet';

const GroupDetail = ({navigation}) => {
  const bottomSheetRef = useRef();
  const bottomSheetAddMemberRef = useRef();
  const [groupMembersList, setGroupMembersList] = useState([
    {
      id: 0,
      name: 'Me',
      avater: require('../../../assets/images/friend-profile.png'),
    },
    {
      id: 1,
      name: 'Nahla',
      avater: require('../../../assets/images/friend-profile.png'),
    },
    {
      id: 2,
      name: 'Saffa',
      avater: require('../../../assets/images/friend-profile.png'),
    },
    {
      id: 3,
      name: 'Rui',
      avater: require('../../../assets/images/friend-profile.png'),
    },
    {
      id: 4,
      name: 'Anum',
      avater: require('../../../assets/images/friend-profile.png'),
    },
    {
      id: 5,
      name: 'Zaina',
      avater: require('../../../assets/images/friend-profile.png'),
    },
    // {
    //   id: 6,
    //   name: 'Noami',
    // avater:require('../../../assets/images/friend-profile.png')
    // },
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
      selected: true,
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

  const BottomSheetAddMembers = () => {
    return (
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
        <View style={{alignItems: 'center', flex: 1}}>
          <Text style={{color: '#003e6b', fontSize: 18, textAlign: 'center'}}>
            Add Members
          </Text>
          <View
            style={{
              marginVertical: 15,
              paddingHorizontal: 20,
              flex: 1,
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
                    <Text style={{color: '#040103'}}>{item.item.name}</Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: '#38ACFF',
              marginBottom: 10,
              height: 50,
              width: '92%',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 5,
            }}>
            <Text style={{color: '#FFF', fontSize: 16}}>Add to group</Text>
          </TouchableOpacity>
        </View>
      </RBSheet>
    );
  };

  const BottomSheetRemoveMembers = () => {
    return (
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
          <Text style={{color: '#003e6b', fontSize: 18, textAlign: 'center'}}>
            Remove Member
          </Text>
          <View
            style={{
              marginVertical: 15,
              // paddingBottom: 10,
              paddingHorizontal: 20,
              flex: 1,
            }}>
            <FlatList
              data={groupMembersList}
              numColumns={3}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              renderItem={item => {
                return (
                  <View
                    style={{
                      ...styles.bootSheetCardView,
                      width: '28.9%',
                      // marginTop: 10,
                      marginVertical: 5,
                      marginHorizontal: 7,
                    }}>
                    <Image
                      source={item.item.avater}
                      style={{marginVertical: 8, width: 44, height: 44}}
                    />
                    <Text style={{color: '#040103'}}>{item.item.name}</Text>
                  </View>
                );
              }}
            />
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: '#38ACFF',
              marginBottom: 10,
              height: 50,
              width: '92%',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 5,
            }}>
            <Text style={{color: '#FFF', fontSize: 16}}>Remove from group</Text>
          </TouchableOpacity>
        </View>
      </RBSheet>
    );
  };
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
        showsVerticalScrollIndicator={false}>
        <BottomSheetAddMembers />
        <BottomSheetRemoveMembers />
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
              marginVertical: 10,
              height: 123,
              width: 123,
            }}
          />
          <Text style={{color: '#000000', fontSize: 17}}>Cyanide</Text>
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
            }}>
            Active Challenges
          </Text>
          <View
            style={{
              height: 120,
              justifyContent: 'center',
              alignItems: 'center',
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
              }}>
              Group Members ({groupMembersList.length})
            </Text>
            <TouchableOpacity onPress={() => bottomSheetRef?.current?.open()}>
              <Text
                style={{
                  color: '#6f92c9',
                  fontSize: 16,
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
