import React, {useEffect} from 'react';
import {StyleSheet, Text, View, Image, StatusBar} from 'react-native';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Welcome');
    }, 2000);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#38ACFF',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <StatusBar backgroundColor={'#38ACFF'} />
      <Image
        source={require('../../assets/images/logo.png')}
        style={{width: '65%', resizeMode: 'contain'}}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({});
