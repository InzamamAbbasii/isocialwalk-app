import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

const AccountCreated = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text
        style={{
          color: '#000000',
          fontSize: 18,
        }}>
        Your Account has been created
      </Text>
      <Text style={{color: '#838383', fontSize: 14}}>
        We created an account for you
      </Text>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate('TabNavigation')}>
        <Text style={{color: '#ffffff', fontSize: 17}}>Proceed to Home</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AccountCreated;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    backgroundColor: '#38ACFF',
    marginTop: 30,
    marginBottom: 20,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    width: '56%',
  },
});
