import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Image, StatusBar} from 'react-native';
import Loader from '../Reuseable Components/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoadingScreen = ({navigation}) => {
  const [loading, setLoading] = useState(true);
  const getUser = async () => {
    let user = await AsyncStorage.getItem('user');

    if (user === null) {
      setLoading(false);
      navigation.navigate('Welcome');
    } else {
      setLoading(false);
      navigation.navigate('DrawerTest');
    }
  };
  useEffect(() => {
    setTimeout(() => {
      // navigation.replace('Welcome');
      getUser();
    }, 2000);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <StatusBar backgroundColor={'#38ACFF'} />
      {loading && <Loader />}

      {/* <Image
        source={require('../../assets/images/logo.png')}
        style={{width: '65%', resizeMode: 'contain'}}
      /> */}
    </View>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({});
