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
const Notification = ({navigation}) => {
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
                    // backgroundColor: 'red',
                  }}>
                  <Image
                    source={item.item.avater}
                    style={{
                      height: 60,
                      width: 60,
                    }}
                  />
                  <View style={{flex: 1, marginLeft: 10}}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text style={{color: '#000000', fontWeight: 'bold'}}>
                        {item.item.title}
                      </Text>
                      <Text style={{color: '#838383'}}>{item.item.date}</Text>
                    </View>
                    <Text style={{color: '#000000'}}>
                      {item.item.description}
                    </Text>
                  </View>
                </View>
              );
            }}
          />
        </View>
      )}
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
});
