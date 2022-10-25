import {roundToNearestMinutes} from 'date-fns';
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  StatusBar,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Entypo from 'react-native-vector-icons/Entypo';

const AuthScreen = ({navigation}) => {
  const [index, setIndex] = useState(0);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);

  const handleRegister = () => {
    if (email.length === 0) {
      setInvalidEmail(true);
    }
    if (password.length === 0) {
      setInvalidPassword(true);
    } else {
      navigation.navigate('Verification', {
        email,
      });
    }
  };
  const handleLogin = () => {
    if (email.length === 0) {
      setInvalidEmail(true);
    }
    if (password.length === 0) {
      setInvalidPassword(true);
    } else {
      navigation.navigate('DrawerTest');
    }
  };
  const handleonTabChange = () => {
    setIndex(index == 0 ? 1 : 0);
    setInvalidEmail(false);
    setInvalidPassword(false);
  };
  return (
    <ScrollView style={styles.container}>
      <StatusBar backgroundColor={'#fff'} />
      <View style={styles.tabView}>
        <TouchableOpacity
          onPress={() => handleonTabChange()}
          style={{
            ...styles.btn,
            backgroundColor: index == 0 ? '#FFF' : 'transparent',
            elevation: index == 0 ? 23 : 0,
          }}>
          <Text style={styles.btnText}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleonTabChange()}
          style={{
            ...styles.btn,
            backgroundColor: index == 1 ? '#FFF' : 'transparent',
            elevation: index == 1 ? 23 : 0,
          }}>
          <Text style={styles.btnText}>Sign in</Text>
        </TouchableOpacity>
      </View>
      {index == 0 ? (
        <View style={{flex: 1}}>
          <Text
            style={{
              color: '#000',
              // fontWeight: 'bold',
              fontFamily: 'PlusJakartaDisplay-Bold',
              fontSize: 20,
              marginTop: 20,
              marginBottom: 10,
            }}>
            Create your account
          </Text>
          <Text
            style={{
              marginBottom: 20,
              color: '#000',
              fontFamily: 'Rubik-Regular',
            }}>
            Signup with Email for an account
          </Text>

          <View style={styles.textInputView}>
            <Text
              style={{
                color: '#000',
                marginVertical: 5,
                fontFamily: 'Rubik-Regular',
              }}>
              Email Address
            </Text>
            <TextInput
              style={{
                ...styles.textInput,
                borderColor: invalidEmail ? '#D66262' : '#ccc',
              }}
              autoFocus
              placeholder={'Enter your Email'}
              value={email}
              onChangeText={txt => setEmail(txt)}
            />
            {invalidEmail && (
              <Text style={styles.errorText}>
                This email doesn't look right
              </Text>
            )}
          </View>
          <View style={styles.textInputView}>
            <Text
              style={{
                color: '#000',
                marginVertical: 5,
                fontFamily: 'Rubik-Regular',
              }}>
              Password
            </Text>
            <View>
              <TextInput
                style={{
                  ...styles.textInput,
                  paddingRight: 45,
                  borderColor: invalidPassword ? '#D66262' : '#ccc',
                }}
                secureTextEntry={!isPasswordShow}
                placeholder={'Enter your Password'}
                value={password}
                onChangeText={txt => setPassword(txt)}
              />
              <TouchableOpacity
                onPress={() => setIsPasswordShow(!isPasswordShow)}
                style={{
                  position: 'absolute',
                  right: 10,
                  top: 0,
                  bottom: 0,
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 30,
                }}>
                <Entypo
                  name={isPasswordShow ? 'eye' : 'eye-with-line'}
                  color={'#000'}
                  size={20}
                  style={{}}
                />
              </TouchableOpacity>
            </View>
            {invalidPassword && (
              <Text style={styles.errorText}>
                Enter a password with a cap, small letter, symbol and a number
              </Text>
            )}
          </View>
          <TouchableOpacity
            style={styles.btnRegister}
            onPress={() => handleRegister()}>
            <Text
              style={{
                color: '#FFF',
                fontSize: 16,
                fontFamily: 'Rubik-Regular',
              }}>
              Register
            </Text>
          </TouchableOpacity>
          <View>
            <TouchableOpacity
              style={styles.socialBtn}
              // onPress={() => navigation.navigate('TabNavigation')}>
              onPress={() => navigation.navigate('DrawerTest')}>
              <Image
                source={require('../../assets/images/apple.png')}
                style={{width: 20, height: 20, marginRight: 10}}
              />
              <Text style={styles.socialBtnText}>Signup with Apple ID</Text>
            </TouchableOpacity>
            <TouchableOpacity
              // onPress={() => navigation.navigate('TabNavigation')}
              onPress={() => navigation.navigate('DrawerTest')}
              style={{...styles.socialBtn, backgroundColor: '#4267B2'}}>
              <Image
                source={require('../../assets/images/facebook.png')}
                style={{
                  width: 20,
                  height: 20,
                  marginRight: 10,
                  tintColor: '#FFF',
                }}
              />
              <Text style={styles.socialBtnText}>Signup with Facebook</Text>
            </TouchableOpacity>
            <TouchableOpacity
              // onPress={() => navigation.navigate('TabNavigation')}
              onPress={() => navigation.navigate('DrawerTest')}
              style={{...styles.socialBtn, backgroundColor: '#4285F4'}}>
              <Image
                source={require('../../assets/images/google.png')}
                style={{width: 20, height: 20, marginRight: 10}}
              />
              <Text style={styles.socialBtnText}>Signup with Google</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={{flex: 1}}>
          <Text
            style={{
              color: '#000',
              fontFamily: 'PlusJakartaDisplay-Bold',
              fontSize: 20,
              marginTop: 20,
              marginBottom: 10,
            }}>
            Welcome back !
          </Text>
          <Text style={{marginBottom: 15, color: '#000', fontWeight: '400'}}>
            Sign in to access your account
          </Text>

          <View style={styles.textInputView}>
            <Text style={{color: '#000', marginVertical: 5}}>
              Email Address
            </Text>
            <TextInput
              style={{
                ...styles.textInput,
                borderColor: invalidEmail ? '#D66262' : '#ccc',
              }}
              autoFocus={true}
              value={email}
              onChangeText={txt => setEmail(txt)}
              placeholder={'Enter your Email'}
            />
            {invalidEmail && (
              <Text style={styles.errorText}>
                This email doesn't look right
              </Text>
            )}
          </View>
          <View style={styles.textInputView}>
            <Text style={{color: '#000', marginVertical: 5}}>Password</Text>
            <View>
              <TextInput
                style={{
                  ...styles.textInput,
                  paddingRight: 45,
                  borderColor: invalidPassword ? '#D66262' : '#ccc',
                }}
                secureTextEntry={!isPasswordShow}
                placeholder={'Enter your Password'}
                value={password}
                onChangeText={txt => setPassword(txt)}
              />
              <TouchableOpacity
                onPress={() => setIsPasswordShow(!isPasswordShow)}
                style={{
                  position: 'absolute',
                  right: 10,
                  top: 0,
                  bottom: 0,
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 30,
                }}>
                <Entypo
                  name={isPasswordShow ? 'eye' : 'eye-with-line'}
                  color={'#000'}
                  size={20}
                  style={{}}
                />
              </TouchableOpacity>
            </View>
            {invalidPassword && (
              <Text style={styles.errorText}>
                Enter a password with a cap, small letter, symbol and a number
              </Text>
            )}
          </View>
          <TouchableOpacity
            style={{...styles.btnRegister, marginBottom: 18}}
            onPress={() => handleLogin()}>
            <Text
              style={{
                color: '#FFF',
                fontSize: 16,
                fontFamily: 'Rubik-Regular',
              }}>
              Sign In
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('ForgotPassword')}>
            <Text
              style={{
                color: '#000',
                fontSize: 14,
                fontFamily: 'Rubik-Regular',
              }}>
              Forgot Password?
            </Text>
            <Text
              style={{
                color: '#3BADFF',
                fontFamily: 'Rubik-Medium',
                marginBottom: 10,
              }}>
              Reset Password
            </Text>
          </TouchableOpacity>
          <View>
            <TouchableOpacity
              style={styles.socialBtn}
              // onPress={() => navigation.navigate('TabNavigation')}
              onPress={() => navigation.navigate('DrawerTest')}>
              <Image
                source={require('../../assets/images/apple.png')}
                style={{width: 20, height: 20, marginRight: 10}}
              />
              <Text style={styles.socialBtnText}>Log in with Apple ID</Text>
            </TouchableOpacity>
            <TouchableOpacity
              // onPress={() => navigation.navigate('TabNavigation')}
              onPress={() => navigation.navigate('DrawerTest')}
              style={{...styles.socialBtn, backgroundColor: '#4267B2'}}>
              <Image
                source={require('../../assets/images/facebook.png')}
                style={{
                  width: 20,
                  height: 20,
                  marginRight: 10,
                  tintColor: '#FFF',
                }}
              />
              <Text style={styles.socialBtnText}>Log in with Facebook</Text>
            </TouchableOpacity>
            <TouchableOpacity
              // onPress={() => navigation.navigate('TabNavigation')}
              onPress={() => navigation.navigate('DrawerTest')}
              style={{...styles.socialBtn, backgroundColor: '#4285F4'}}>
              <Image
                source={require('../../assets/images/google.png')}
                style={{width: 20, height: 20, marginRight: 10}}
              />
              <Text style={styles.socialBtnText}>Log in with Google</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 20,
  },
  tabView: {
    height: 50,
    width: '100%',
    backgroundColor: '#D1ECFF',
    borderRadius: 8,
    paddingVertical: 8,
    flexDirection: 'row',
    marginVertical: 5,
    //   justifyContent: 'space-between',
  },
  btn: {
    backgroundColor: '#FFF',
    flex: 1,
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    shadowColor: '#cdcdcd',
  },
  btnText: {
    color: '#000',
  },
  textInputView: {
    // backgroundColor: 'blue',
    marginVertical: 15,
  },
  textInput: {
    // backgroundColor: 'pink',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 5,
    paddingHorizontal: 17,
    borderRadius: 5,
  },
  btnRegister: {
    // backgroundColor: '#0496FF',
    backgroundColor: '#38ACFF',
    marginTop: 30,
    marginBottom: 40,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  socialBtn: {
    flexDirection: 'row',
    backgroundColor: '#000',
    marginVertical: 10,
    height: 45,
    width: '70%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  socialBtnText: {
    color: '#FFF',
    fontSize: 14,
    fontFamily: 'Rubik-Regular',
  },
  errorText: {
    color: '#D66262',
    fontSize: 10,
    marginLeft: 10,
    marginTop: 3,
    fontFamily: 'Rubik-Regular',
  },
});
