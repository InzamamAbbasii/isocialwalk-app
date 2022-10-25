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
import RBSheet from 'react-native-raw-bottom-sheet';
import Header from '../../Reuseable Components/Header';

const Notification = ({navigation}) => {
  const bottomSheetRef = useRef();
  const [isFriendRequestApproved, setIsFriendRequestApproved] = useState(false);
  const [profileImage, setProfileImage] = useState(
    require('../../../assets/images/friend-profile.png'),
  );
  const [notificationsList, setNotificationsList] = useState([
    {
      id: 0,
      title: 'Boris Findlay',
      description: 'wants to be your friend',
      avater: require('../../../assets/images/friend-profile.png'),
      date: '5 MINS AGO',
    },
    {
      id: 1,
      title: 'Forest Foragers Group',
      description: 'Your request to join the group was approved',
      avater: require('../../../assets/images/group-profile2.png'),
      date: '18 HRS AGO',
    },
    {
      id: 2,
      title: '20km Challenge',
      description: 'Your request to join the challenge was approved',
      avater: require('../../../assets/images/Challenge.png'),
      date: 'YESTERDAY',
    },
    {
      id: 3,
      title: 'Nikel Challenge',
      description: 'Barnabas Finley wants to join  the challenge',
      avater: require('../../../assets/images/Challenge.png'),
      date: 'YESTERDAY',
    },
  ]);
  return (
    <View style={styles.container}>
      <Header title={'Notifications'} navigation={navigation} />
      {notificationsList.length == 0 ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={require('../../../assets/images/bell2.png')}
            style={{
              width: 92,
              height: 113,
              resizeMode: 'contain',
            }}
          />
          <Text
            style={{
              color: '#000000',
              fontSize: 16,
              width: 182,
              textAlign: 'center',
              marginVertical: 20,
              fontFamily: 'Rubik-Regular',
            }}>
            All your Notifications will appear here
          </Text>
        </View>
      ) : (
        <View
          style={{
            flex: 1,
            marginTop: 15,
          }}>
          <FlatList
            data={notificationsList}
            keyExtractor={(item, index) => index.toString()}
            renderItem={item => {
              return (
                <View
                  style={{
                    flexDirection: 'row',
                    marginVertical: 15,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flex: 1,
                  }}>
                  <Image
                    source={item.item.avater}
                    style={{
                      height: 60,
                      width: 60,
                    }}
                  />
                  <TouchableOpacity
                    onPress={() => {
                      item.index === 0 && bottomSheetRef?.current?.open();
                    }}
                    style={{flex: 1, marginLeft: 10}}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text
                        style={{
                          color: '#000000',
                          fontSize: 16,
                          fontFamily: 'Rubik-Medium',
                        }}>
                        {item.item.title}
                      </Text>
                      <Text
                        style={{color: '#838383', fontFamily: 'Rubik-Regular'}}>
                        {item.item.date}
                      </Text>
                    </View>
                    <Text
                      style={{
                        color: item.index == 0 ? '#003e6b' : '#000000',
                        fontFamily: 'Rubik-Regular',
                      }}>
                      {item.item.description}
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        </View>
      )}

      <RBSheet
        ref={bottomSheetRef}
        height={300}
        openDuration={270}
        closeOnDragDown={true}
        closeOnPressMask={false}
        animationType={'slide'}
        customStyles={{
          container: {
            padding: 5,
            alignItems: 'center',
            // height: 530,
            flex: 1.1,
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
            fontFamily: 'Rubik-Regular',
            marginTop: 5,
          }}>
          Friend Request
        </Text>
        <Image
          source={profileImage}
          style={{
            marginTop: 20,
            marginBottom: 10,
            width: 110,
            height: 110,
            resizeMode: 'contain',
          }}
        />
        <Text
          style={{
            color: '#000000',
            fontSize: 16,
            fontFamily: 'Rubik-Medium',
          }}>
          Boris Findlay
        </Text>
        {isFriendRequestApproved ? (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text
              style={{
                ...styles.btnText,
                fontSize: 15,
                fontFamily: 'Rubik-Medium',
                color: '#38ACFF',
              }}>
              You and Boris are now friends
            </Text>
          </View>
        ) : (
          <View style={{width: '100%', alignItems: 'center'}}>
            <TouchableOpacity
              style={styles.btnBottomSheet}
              onPress={() =>
                setIsFriendRequestApproved(!isFriendRequestApproved)
              }>
              <Text style={styles.btnText}>Approve Request</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                ...styles.btnBottomSheet,
                backgroundColor: 'transparent',
                borderWidth: 1,
              }}
              onPress={() => bottomSheetRef?.current?.close()}>
              <Text style={{...styles.btnText, color: '#38ACFF'}}>
                Ignore Request
              </Text>
            </TouchableOpacity>
          </View>
        )}

        <TouchableOpacity
          style={{...styles.btnBottomSheet, backgroundColor: '#003e6b'}}
          onPress={() => {
            navigation.navigate('FriendProfile');
            bottomSheetRef?.current?.close();
          }}>
          <Text style={styles.btnText}>View Profile</Text>
        </TouchableOpacity>
      </RBSheet>
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
  },
  btnText: {
    color: '#FFF',
    fontSize: 14,
    fontFamily: 'Rubik-Regular',
  },
  btnBottomSheet: {
    backgroundColor: '#38ACFF',
    borderColor: '#38ACFF',
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    width: '85%',
    height: 45,
    marginVertical: 8,
  },
});
