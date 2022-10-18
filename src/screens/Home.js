import React, {useState, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import RBSheet from 'react-native-raw-bottom-sheet';

const Home = ({navigation}) => {
  const bottomSheetRef = useRef(null);
  const [index, setIndex] = useState(0);
  const handleonTabChange = () => {
    setIndex(index == 0 ? 1 : 0);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          // paddingHorizontal: 20,
        }}
        showsVerticalScrollIndicator={false}>
        <View style={styles.headerView}>
          <View>
            <Image source={require('../../assets/images/Line1.png')} />
            <Image
              source={require('../../assets/images/Line2.png')}
              style={{marginTop: 5}}
            />
          </View>
          <Image source={require('../../assets/images/bell.png')} />
        </View>
        <Text style={{color: '#000000', marginTop: 8}}>Good Evening</Text>
        <Text style={{color: '#000305', fontSize: 16, fontWeight: '500'}}>
          Jonathan
        </Text>
        <View style={styles.tabView}>
          <TouchableOpacity
            onPress={() => handleonTabChange()}
            style={{
              ...styles.btn,
              backgroundColor: index == 0 ? '#FFF' : 'transparent',
              elevation: index == 0 ? 23 : 0,
            }}>
            <Text style={styles.btnText}>Today</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleonTabChange()}
            style={{
              ...styles.btn,
              backgroundColor: index == 1 ? '#FFF' : 'transparent',
              elevation: index == 1 ? 23 : 0,
            }}>
            <Text style={styles.btnText}>This Week</Text>
          </TouchableOpacity>
        </View>
        {/* <CircularProgress value={58} /> */}
        <View style={{alignItems: 'center', marginVertical: 30}}>
          <AnimatedCircularProgress
            size={200}
            width={10}
            fill={0}
            tintColor="#38ACFF"
            backgroundColor="#E2E2E2">
            {fill => (
              <View style={{alignItems: 'center'}}>
                <Text
                  style={{color: '#38ACFF', fontSize: 28, fontWeight: '500'}}>
                  {' '}
                  {fill}
                </Text>
                <Text style={{color: '#000305'}}>Total amount of steps</Text>
              </View>
            )}
          </AnimatedCircularProgress>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            //   backgroundColor: 'red',
            justifyContent: 'space-between',
          }}>
          <View style={{alignItems: 'center'}}>
            <Text style={{color: '#38ACFF', fontSize: 16, fontWeight: '600'}}>
              0 kcal
            </Text>
            <View style={{flexDirection: 'row', marginTop: 4}}>
              <Image
                source={require('../../assets/images/kcal.png')}
                style={{marginRight: 5}}
              />
              <Text>Calories</Text>
            </View>
          </View>
          <View style={{alignItems: 'center'}}>
            <Text style={{color: '#38ACFF', fontSize: 16, fontWeight: '600'}}>
              0 km
            </Text>
            <View style={{flexDirection: 'row', marginTop: 4}}>
              <Image
                source={require('../../assets/images/distance.png')}
                style={{marginRight: 5}}
              />
              <Text>Distance</Text>
            </View>
          </View>
          <View style={{alignItems: 'center'}}>
            <Text style={{color: '#38ACFF', fontSize: 16, fontWeight: '600'}}>
              0:01 h
            </Text>
            <View style={{flexDirection: 'row', marginTop: 4}}>
              <Image
                source={require('../../assets/images/time.png')}
                style={{marginRight: 5}}
              />
              <Text>Time</Text>
            </View>
          </View>
        </View>
        <View
          style={{
            marginVertical: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={{color: '#000000', fontSize: 14}}>Today's Ranking</Text>
          <TouchableOpacity
            style={{height: 30, width: 60}}
            onPress={() => bottomSheetRef?.current?.open()}>
            <Text style={{color: '#38acff', fontSize: 14, textAlign: 'right'}}>
              See All
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View
            style={{
              height: 137,
              width: 101,
              backgroundColor: '#ffffff',
              borderRadius: 10,
              padding: 5,
              alignItems: 'center',
              marginHorizontal: 5,
              shadowColor: 'blue',
              elevation: 24,
              shadowOffset: {
                width: 0,
                height: 0.1,
              },
              shadowOpacity: 0.0,
              shadowRadius: 0.1,
            }}>
            <View
              style={{
                backgroundColor: '#D8D8D8',
                height: 50,
                width: 50,
                marginVertical: 5,
                borderRadius: 50,
                alignSelf: 'center',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image source={require('../../assets/images/profile.png')} />
            </View>
            <Text style={{color: '#040103'}}>Me</Text>
            <Text style={{color: '#38acff'}}>0</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                source={require('../../assets/images/flag.png')}
                style={{marginRight: 3, height: 15, width: 15}}
              />
              <Text style={{color: '#a9a9a9'}}>3k</Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('Friends')}
            style={{
              height: 137,
              width: 101,
              borderRadius: 5,
              padding: 5,
              alignItems: 'center',
              justifyContent: 'center',
              marginHorizontal: 5,
            }}>
            <Image source={require('../../assets/images/addFriend.png')} />
            <Text style={{color: '#002138', marginTop: 8, fontSize: 14}}>
              Add a Friend
            </Text>
          </TouchableOpacity>
        </View>

        <RBSheet
          ref={bottomSheetRef}
          height={300}
          openDuration={250}
          closeOnDragDown={true}
          closeOnPressMask={false}
          animationType={'slide'}
          customStyles={{
            container: {
              padding: 5,
              height: 530,
              flex: 1,
              backgroundColor: '#ffffff',
              borderRadius: 30,
            },
            draggableIcon: {
              backgroundColor: '#003e6b',
            },
          }}>
          {index == 0 ? (
            <View>
              <Text
                style={{color: '#003e6b', fontSize: 18, textAlign: 'center'}}>
                Today's Ranking
              </Text>
              <View style={{padding: 10, marginTop: 10}}>
                <View style={styles.bootSheetCardView}>
                  <Image
                    style={{marginVertical: 10}}
                    source={require('../../assets/images/friend-profile.png')}
                  />
                  <Text style={{color: '#040103'}}>Me</Text>
                  <Text style={{color: '#38acff'}}>0</Text>
                </View>
              </View>
            </View>
          ) : (
            <View>
              <Text
                style={{color: '#003e6b', fontSize: 18, textAlign: 'center'}}>
                Week's Ranking
              </Text>
              <View style={{padding: 10, marginTop: 10}}>
                <View style={styles.bootSheetCardView}>
                  <Image
                    style={{marginVertical: 10}}
                    source={require('../../assets/images/friend-profile.png')}
                  />

                  <Text style={{color: '#040103'}}>Me</Text>
                  <Text style={{color: '#38acff'}}>0</Text>
                </View>
              </View>
            </View>
          )}
        </RBSheet>
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  headerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tabView: {
    height: 48,
    marginTop: 25,
    width: '100%',
    backgroundColor: '#d1ecff',
    borderRadius: 8,
    paddingVertical: 8,
    flexDirection: 'row',
    marginVertical: 5,
  },
  btn: {
    backgroundColor: '#FFF',
    flex: 1,
    height: 30,
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    shadowColor: '#cdcdcd',
  },
  btnText: {
    color: '#002138',
  },
  bootSheetCardView: {
    height: 126,
    width: 101,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    shadowColor: 'blue',
    elevation: 6,
    padding: 5,
    alignItems: 'center',
    marginHorizontal: 5,
  },
});
