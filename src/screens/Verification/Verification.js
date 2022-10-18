import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import OtpInputs from 'react-native-otp-inputs';
const Verification = ({navigation}) => {
  const left_arrow = require('../../../assets/images/left-arrow.png');
  const [optCode, setOptCode] = useState('');
  const [invalidOTP, setInvalidOTP] = useState(false);
  const handleVerify = () => {
    if (optCode.length < 4) {
      setInvalidOTP(true);
    } else {
      setInvalidOTP(false);
      navigation.navigate('AccountCreated');
    }
  };
  const handleResendCode = () => {
    setOptCode('');
  };
  return (
    <View style={styles.container}>
      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 20,
        }}
        showsVerticalScrollIndicator={false}>
        <View style={styles.headerView}>
          <TouchableOpacity
            style={{padding: 10, paddingLeft: 0}}
            onPress={() => navigation?.goBack()}>
            <Image source={left_arrow} style={{width: 14, height: 24}} />
          </TouchableOpacity>
          <Text
            style={{
              color: '#000000',
              fontSize: 24,
              marginTop: 15,
              fontWeight: 'bold',
            }}>
            Verify your account
          </Text>
        </View>
        <View style={{flex: 1}}>
          <Text
            style={{
              color: '#000000',
              width: '75%',
              fontSize: 16,
              marginTop: 8,
            }}>
            A verification was sent to abbasiinzamam2@gmail.com
          </Text>
          <Text style={{color: '#000000', marginTop: 30, fontSize: 17}}>
            Verification Code
          </Text>

          <OTPInputView
            style={{
              height: 50,
              marginTop: 15,
            }}
            pinCount={4}
            code={optCode}
            onCodeChanged={code => {
              setOptCode(code);
            }}
            autoFocusOnLoad={false}
            placeholderCharacter={''}
            placeholderTextColor={'#ABA7AF'}
            codeInputFieldStyle={{
              ...styles.underlineStyleBase,
              borderColor: invalidOTP ? 'red' : '#CCC',
            }}
            codeInputHighlightStyle={{
              ...styles.underlineStyleHighLighted,
              borderColor: invalidOTP ? 'red' : '#CCC',
            }}
          />
          {invalidOTP && (
            <Text style={styles.errorText}>
              You need to enter a verification code
            </Text>
          )}

          <TouchableOpacity style={styles.btn} onPress={() => handleVerify()}>
            <Text style={{color: '#ffffff', fontSize: 17}}>Verify Now</Text>
          </TouchableOpacity>
          <Text style={{color: '#000', fontSize: 15}}>
            Didn't receive any code?
          </Text>
          <TouchableOpacity onPress={() => handleResendCode()}>
            <Text style={{color: '#38ACFF', fontWeight: 'bold', fontSize: 14}}>
              Re-send Code
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default Verification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerView: {
    marginTop: 20,
  },

  underlineStyleBase: {
    color: '#000000',
    fontSize: 24,
    fontWeight: 'bold',
    width: 60,
    height: 50,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#CCC',
    marginHorizontal: 5,
  },

  underlineStyleHighLighted: {
    borderColor: '#CCC',
  },
  btn: {
    backgroundColor: '#38ACFF',
    marginTop: 30,
    marginBottom: 20,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  errorText: {
    color: '#D66262',
    fontSize: 11,
    marginLeft: 10,
    marginTop: 3,
  },
});
