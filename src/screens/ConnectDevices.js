import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import MenuHeader from '../Reuseable Components/MenuHeader';

const ConnectDevices = ({navigation}) => {
  const right_arrow = require('../../assets/images/right-arrow.png');
  const tick_icon = require('../../assets/images/tick-icon.png');
  const [devicesList, setDevicesList] = useState([
    {
      id: 0,
      name: 'Apple Watch',
      isConnected: false,
    },
    {
      id: 1,
      name: 'Fitbit',
      isConnected: false,
    },
    {
      id: 2,
      name: 'Garmin',
      isConnected: false,
    },
  ]);

  const handleConnectDevice = id => {
    const newData = devicesList.map(item => {
      if (id === item.id) {
        return {
          ...item,
          isConnected: !item.isConnected,
        };
      } else {
        return {
          ...item,
        };
      }
    });
    setDevicesList(newData);
  };
  const showAlert = item =>
    Alert.alert(
      'Connect Device',
      `Are you sure you want to connect your ${item.name} to isocialWalk?`,
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => handleConnectDevice(item.id)},
      ],
    );

  return (
    <View style={styles.container}>
      <MenuHeader title={'Connect Devices'} navigation={navigation} />
      <FlatList
        style={{marginBottom: 10, marginTop: 30}}
        data={devicesList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={item => {
          return (
            <View style={styles.itemView}>
              <Text style={{color: '#000000', fontSize: 17}}>
                {item.item.name}
              </Text>
              <TouchableOpacity
                style={{padding: 10}}
                // onPress={() => handleConnectDevice(item.item.id)}>
                onPress={() => !item.item.isConnected && showAlert(item.item)}>
                {item.item.isConnected ? (
                  <Image
                    source={tick_icon}
                    style={{
                      width: 17,
                      height: 13,
                    }}
                  />
                ) : (
                  <Image
                    source={right_arrow}
                    style={{
                      width: 9,
                      height: 14,
                    }}
                  />
                )}
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </View>
  );
};

export default ConnectDevices;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
  },
  itemView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
    marginHorizontal: 5,
    alignItems: 'center',
  },
});
