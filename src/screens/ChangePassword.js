import React, {useState, useRef, useCallback} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import MenuHeader from '../Reuseable Components/MenuHeader';

const ChangePassword = ({navigation}) => {
  return (
    <View style={styles.container}>
      <MenuHeader title={'Change Password'} navigation={navigation} />
    </View>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
  },
});
