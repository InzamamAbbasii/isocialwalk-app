import React, {useState, useRef, useCallback} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Animated,
  Pressable,
} from 'react-native';
import MenuHeader from '../Reuseable Components/MenuHeader';

import RBSheet from 'react-native-raw-bottom-sheet';
// import Slider from 'react-native-slider';
// var Slider = require('react-native-slider');
// import Slider from '@react-native-community/slider';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

const UpdateGoals = ({
  navigation,
  scale,
  showMenu,
  setShowMenu,
  moveToRight,
}) => {
  const bottomSheetRef = useRef();
  const [dailyGoal, setDailyGoal] = useState(8500);
  const [weeklyGoal, setWeeklyGoal] = useState(20000);

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
        {/* <MenuHeader title={'Update Goals'} navigation={navigation} /> */}
        <MenuHeader
          title={'Updated Goals'}
          navigation={navigation}
          onPress={() => handleOpenCustomDrawer()}
        />
        <View style={{marginTop: 45}}>
          <View style={{marginVertical: 5}}>
            <Text
              style={{
                color: '#000000',
                fontSize: 14,
                fontFamily: 'Rubik-Regular',
              }}>
              Daily Goals
            </Text>
            <Text style={{...styles.stepsText, marginVertical: 15}}>
              {dailyGoal} steps
            </Text>
          </View>
          <View style={{marginVertical: 5}}>
            <Text
              style={{
                color: '#000000',
                fontSize: 14,
                fontFamily: 'Rubik-Regular',
              }}>
              Weekly Goals
            </Text>
            <Text style={{...styles.stepsText, marginVertical: 15}}>
              {/* 20,000 steps */}
              {weeklyGoal} steps
            </Text>
          </View>

          <TouchableOpacity
            style={styles.btn}
            onPress={() => bottomSheetRef?.current?.open()}>
            <Text
              style={{
                color: '#FFF',
                fontSize: 16,
                fontFamily: 'Rubik-Regular',
              }}>
              Update
            </Text>
          </TouchableOpacity>

          <RBSheet
            ref={bottomSheetRef}
            height={350}
            openDuration={250}
            closeOnDragDown={true}
            closeOnPressMask={true}
            animationType={'slide'}
            customStyles={{
              container: {
                padding: 5,
                alignItems: 'center',
                flex: 1,
                backgroundColor: '#ffffff',
                borderRadius: 30,
              },
              draggableIcon: {
                backgroundColor: '#003e6b',
              },
            }}>
            <View
              style={{
                width: '100%',
                alignItems: 'center',
              }}>
              <Text style={styles.RBTitle}>Steps Goals</Text>
              {/*--------------------------------------- daily goals------------------------------- */}
              <View style={{marginBottom: 5}}>
                <View style={{marginVertical: 5, alignItems: 'center'}}>
                  <Text
                    style={{
                      color: '#000000',
                      fontSize: 14,
                      fontFamily: 'Rubik-Regular',
                    }}>
                    Daily Goals:
                  </Text>
                  <Text style={styles.stepsText}>{dailyGoal} steps</Text>
                  <MultiSlider
                    min={0}
                    max={18000}
                    step={1}
                    values={[dailyGoal]}
                    markerStyle={styles.sliderMarkerStyle}
                    trackStyle={styles.sliderTrackStyle}
                    selectedStyle={styles.sliderSelectedStyle}
                    unselectedStyle={styles.sliderUnSelectedStyle}
                    onValuesChange={value => setDailyGoal(value[0])}
                  />
                </View>
              </View>
              {/* -----------------------------------weekly goals----------------------------------------- */}
              <View style={{marginBottom: 5}}>
                <View style={{marginVertical: 5, alignItems: 'center'}}>
                  <Text
                    style={{
                      color: '#000000',
                      fontSize: 14,
                      fontFamily: 'Rubik-Regular',
                    }}>
                    Weekly Goals:
                  </Text>
                  <Text style={styles.stepsText}>{weeklyGoal} steps</Text>
                  <MultiSlider
                    min={0}
                    max={40000}
                    step={1}
                    values={[weeklyGoal]}
                    markerStyle={styles.sliderMarkerStyle}
                    trackStyle={styles.sliderTrackStyle}
                    selectedStyle={styles.sliderSelectedStyle}
                    unselectedStyle={styles.sliderUnSelectedStyle}
                    onValuesChange={value => setWeeklyGoal(value[0])}
                  />
                </View>
              </View>
              <TouchableOpacity
                style={{...styles.btn, marginTop: 20, width: '90%'}}
                onPress={() => bottomSheetRef?.current?.close()}>
                <Text
                  style={{
                    color: '#FFF',
                    fontSize: 16,
                    fontFamily: 'Rubik-Regular',
                  }}>
                  Update
                </Text>
              </TouchableOpacity>
            </View>
          </RBSheet>
        </View>
      </View>
    </Animated.View>
  );
};

export default UpdateGoals;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
  },
  stepsText: {
    color: '#38acff',
    fontSize: 24,
    fontFamily: 'Rubik-Regular',
  },
  btn: {
    backgroundColor: '#38ACFF',
    marginTop: 30,
    marginBottom: 40,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  RBTitle: {
    color: '#003e6b',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
    marginTop: 5,
    fontFamily: 'Rubik-Regular',
  },
  sliderMarkerStyle: {
    backgroundColor: '#fff',
    height: 20,
    width: 20,
    borderRadius: 20,
    elevation: 5,
    shadowColor: 'blue',
  },
  sliderSelectedStyle: {
    // backgroundColor: '#38acff',
    backgroundColor: '#ccc',
  },
  sliderUnSelectedStyle: {
    backgroundColor: '#ccc',
  },
  sliderTrackStyle: {
    height: 2.5,
  },
});
