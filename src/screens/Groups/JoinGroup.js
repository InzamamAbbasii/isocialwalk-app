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

const JoinGroup = ({navigation}) => {
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

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
        showsVerticalScrollIndicator={false}>
        <View style={{paddingHorizontal: 20}}>
          <Header title={'Incorruptibles'} navigation={navigation} />
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
          <Text
            style={{
              color: '#000000',
              fontSize: 17,
              fontFamily: 'Rubik-Regular',
              marginTop: 5,
            }}>
            Incorruptibles
          </Text>

          <TouchableOpacity style={styles.btn}>
            <Text
              style={{
                color: '#FFF',
                fontSize: 16,
                fontFamily: 'Rubik-Regular',
              }}>
              Join Group
            </Text>
          </TouchableOpacity>
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
            }}>
            <Text style={{color: '#000', fontFamily: 'Rubik-Regular'}}>
              No Active Challenges
            </Text>
          </View>
        </View>
        <View style={{}}>
          <Text
            style={{
              color: '#000000',
              fontSize: 16,
              paddingHorizontal: 20,
              fontFamily: 'Rubik-Regular',
            }}>
            Group Members ({groupMembersList.length})
          </Text>

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
                  <Pressable
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
                  </Pressable>
                );
              }}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default JoinGroup;

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
    marginTop: 15,
    width: 120,
    height: 35,
    backgroundColor: '#38ACFF',
    marginHorizontal: 10,
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
