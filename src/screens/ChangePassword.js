import React, {useState, useRef, useCallback} from 'react';
import {
  StyleSheet,
  Text,
  ToastAndroid,
  View,
  TouchableOpacity,
  Image,
  Animated,
  TextInput,
} from 'react-native';
import {toast, Toasts, ToastPosition} from '@backpackapp-io/react-native-toast';
import MenuHeader from '../Reuseable Components/MenuHeader';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const ChangePassword = ({
  navigation,
  scale,
  showMenu,
  setShowMenu,
  moveToRight,
}) => {
  const toastRef = useRef();
  const [password, setPassword] = useState('');
  const [isInvalidPassword, setIsInvalidPassword] = useState(false);
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

  const handleUpdate = () => {
    if (password.length === 0) {
      setIsInvalidPassword(true);
    } else {
      setIsInvalidPassword(false);
      toast.dismiss();
      toast('Password Update was a Success', {
        position: ToastPosition.BOTTOM,
        duration: 2000,
        customToast: toast => {
          return (
            <View
              style={{
                height: toast.height,
                // width: toast.width,
                padding: 15,
                backgroundColor: '#28a745',
                borderRadius: 8,
                justifyContent: 'center',
                alignItems: 'center',
                // alignSelf: 'center',
                position: 'absolute',
                left: wp(13),
                // right: 0,
              }}>
              <Text style={{color: '#fff'}}>{toast.message}</Text>
            </View>
          );
        },
      });
    }
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
        <Toasts />
        <MenuHeader
          title={'Change Password'}
          navigation={navigation}
          onPress={() => handleOpenCustomDrawer()}
        />
        <View style={{flex: 1, marginTop: 30}}>
          <View style={styles.textInputView}>
            <Text style={styles.textInputHeading}>Password</Text>
            <TextInput
              style={{
                ...styles.textInput,
                borderColor: isInvalidPassword ? '#D66262' : '#ccc',
              }}
              autoFocus
              placeholder={'Enter your Password'}
              value={password}
              onChangeText={txt => setPassword(txt)}
            />
            {isInvalidPassword && (
              <Text style={styles.errorText}>
                Enter a password with a cap, small letter, symbol and a number
              </Text>
            )}
          </View>

          <TouchableOpacity style={styles.btn} onPress={() => handleUpdate()}>
            <Text style={styles.btnText}>Updated Password</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
  },
  errorText: {
    color: '#D66262',
    fontSize: 10,
    marginLeft: 10,
    marginTop: 3,
    fontFamily: 'Rubik-Regular',
  },
  textInputView: {
    marginVertical: 15,
  },
  textInputHeading: {
    color: '#000',
    marginVertical: 7,
    fontFamily: 'Rubik-Regular',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 5,
    paddingHorizontal: 17,
    borderRadius: 5,
  },
  btn: {
    backgroundColor: '#38ACFF',
    marginTop: 20,
    marginBottom: 40,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  btnText: {
    color: '#FFF',
    fontSize: 16,
    fontFamily: 'Rubik-Regular',
  },
});
