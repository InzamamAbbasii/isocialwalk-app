import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
  Animated,
  Pressable,
} from 'react-native';
import MenuHeader from '../Reuseable Components/MenuHeader';

const ConnectDevices = ({
  navigation,
  scale,
  showMenu,
  setShowMenu,
  moveToRight,
}) => {
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

  const handleOpenCustomDrawer = () => {
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
    setShowMenu(!showMenu);
  };
  return (
    <Animated.View
      style={{
        flex: 1,
        backgroundColor: 'white',
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        borderRadius: showMenu ? 15 : 0,
        transform: [{scale: scale}, {translateX: moveToRight}],
      }}>
      <View style={styles.container}>
        <MenuHeader
          title={'Connect Devices'}
          navigation={navigation}
          onPress={() => handleOpenCustomDrawer()}
        />

        {/* <View style={styles.headerView}>
          <Pressable
            style={{padding: 10, paddingLeft: 0}}
            // onPress={() => navigation.openDrawer()}>
            // onPress={() => handleOpenDrawer(navigation)}
            onPress={() => {
              handleOpenCustomDrawer();
            }}>
            <Image
              source={require('../../assets/images/menu1.png')}
              style={{width: 34, height: 17}}
            />
          </Pressable>
          <Text
            style={{
              color: '#000000',
              textAlign: 'center',
              flex: 1,
              fontSize: 25,
              //   fontWeight: 'bold',
            }}>
            Connect Devices
          </Text>
        </View> */}

        <FlatList
          style={{marginBottom: 10, marginTop: 30}}
          data={devicesList}
          keyExtractor={(item, index) => index.toString()}
          renderItem={item => {
            return (
              <View style={styles.itemView}>
                <Text
                  style={{
                    color: '#000000',
                    fontSize: 17,
                    fontFamily: 'Rubik-Regular',
                  }}>
                  {item.item.name}
                </Text>
                <TouchableOpacity
                  style={{padding: 10}}
                  // onPress={() => handleConnectDevice(item.item.id)}>
                  onPress={() =>
                    !item.item.isConnected && showAlert(item.item)
                  }>
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
    </Animated.View>
  );
};

export default ConnectDevices;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
  },
  headerView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  itemView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
    marginHorizontal: 5,
    alignItems: 'center',
  },
});
