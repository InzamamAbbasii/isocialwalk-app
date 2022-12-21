import React, {useState, useRef, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Pressable,
  Animated,
  Dimensions,
} from 'react-native';
import SwiperFlatList from 'react-native-swiper-flatlist';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import RBSheet from 'react-native-raw-bottom-sheet';
import {captureScreen} from 'react-native-view-shot';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {FlatList} from 'react-native-gesture-handler';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import CustomBarChart from '../Reuseable Components/CustomBarChart';
import Loader from '../Reuseable Components/Loader';
import {api} from '../constants/api';
import Snackbar from 'react-native-snackbar';

const SCREEN_WIDTH = Dimensions.get('window').width;
const Home = ({scale, showMenu, setShowMenu, moveToRight, setActiveTab}) => {
  const navigation = useNavigation();
  const bottomSheetRef = useRef(null);
  const [index, setIndex] = useState(0);

  const [firstName, setFirstName] = useState('');
  const [currentHour, setCurrentHour] = useState(0);

  const [loading, setLoading] = useState(false);

  const getUser = async () => {
    let user_info = await AsyncStorage.getItem('user');
    if (user_info != null) {
      let parse = JSON.parse(user_info);
      setFirstName(parse?.first_name);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getUser();
      greeting();
      getRanking();
    }, []),
  );

  const greeting = () => {
    let d = new Date();
    let time = d.getHours();
    setCurrentHour(time);
  };

  const getRanking = async () => {
    try {
      let user_id = await AsyncStorage.getItem('user_id');
      setLoading(true);
      // setSuggestedGroups([]);
      let data = {
        this_user_id: user_id,
      };
      var requestOptions = {
        method: 'POST',
        body: JSON.stringify(data),
        redirect: 'follow',
      };

      fetch(api.get_user_ranking, requestOptions)
        .then(response => response.json())
        .then(result => {
          let responseList = [];
          console.log('user ranking ::: ', result);
        })
        .catch(error => console.log('error in getting ranking ::: ', error))
        .finally(() => setLoading(false));
    } catch (error) {
      console.log('error :', error);
      setLoading(false);
    }
  };

  const handleonTabChange = () => {
    setIndex(index == 0 ? 1 : 0);
  };
  const generateColor = () => {
    const randomColor = Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, '0');
    return `#${randomColor}`;
  };
  const handleOpenDrawer = navigation => {
    captureScreen({
      format: 'jpg',
    })
      .then(uri => {
        AsyncStorage.setItem('Screen', uri.toString());
        AsyncStorage.setItem('ScreenName', 'Home');
        navigation.openDrawer();
      })
      .catch(error => console.log(error));
  };

  const [tabList, setTabList] = useState([
    {
      title: 'Home',
      icon: require('../../assets/images/home1.png'),
    },
    {
      title: 'History',
      icon: require('../../assets/images/history.png'),
    },
    {
      title: 'Change Password',
      icon: require('../../assets/images/lock.png'),
    },
  ]);

  const [todayRankingList, setTodayRankingList] = useState([
    {
      id: 0,
      name: 'Me',
      steps: 9000,
      flag: '3k',
      avater: require('../../assets/images/user1.png'),
    },
    {
      id: 1,
      name: 'Nahla',
      steps: 8000,
      flag: '4k',
      avater: require('../../assets/images/user2.png'),
    },
    {
      id: 2,
      name: 'Saffa',
      steps: 7000,
      flag: '1k',
      avater: require('../../assets/images/user3.png'),
    },
    {
      id: 3,
      name: 'Rui',
      steps: 6000,
      flag: '2k',
      avater: require('../../assets/images/friend-profile.png'),
    },
    {
      id: 4,
      name: 'Anum',
      steps: 5000,
      avater: require('../../assets/images/friend-profile.png'),
    },
    {
      id: 5,
      name: 'Zaina',
      steps: 4000,
      avater: require('../../assets/images/friend-profile.png'),
    },
    {
      id: 6,
      name: 'Noami',
      steps: 3000,
      avater: require('../../assets/images/friend-profile.png'),
    },
    {
      id: 7,
      name: 'Noami',
      steps: 2000,
      avater: require('../../assets/images/friend-profile.png'),
    },
    {
      id: 8,
      name: 'Noami',
      steps: 1000,
      flag: '1k',
      avater: require('../../assets/images/friend-profile.png'),
    },
    {
      id: 9,
      name: 'Noami',
      steps: 500,
      flag: '1k',
      avater: require('../../assets/images/friend-profile.png'),
    },
  ]);
  const [weekRankingList, setWeekRankingList] = useState([
    {
      id: 0,
      name: 'Me',
      steps: 9000,
      flag: '3k',
      avater: require('../../assets/images/user1.png'),
    },
    {
      id: 1,
      name: 'Nahla',
      steps: 8000,
      flag: '4k',
      avater: require('../../assets/images/user2.png'),
    },
    {
      id: 2,
      name: 'Saffa',
      steps: 7000,
      flag: '1k',
      avater: require('../../assets/images/user3.png'),
    },
    {
      id: 3,
      name: 'Rui',
      steps: 6000,
      flag: '2k',
      avater: require('../../assets/images/friend-profile.png'),
    },
    {
      id: 4,
      name: 'Anum',
      steps: 5000,
      avater: require('../../assets/images/friend-profile.png'),
    },
    {
      id: 5,
      name: 'Zaina',
      steps: 4000,
      avater: require('../../assets/images/friend-profile.png'),
    },
    {
      id: 6,
      name: 'Noami',
      steps: 3000,
      avater: require('../../assets/images/friend-profile.png'),
    },
    {
      id: 7,
      name: 'Noami',
      steps: 2000,
      avater: require('../../assets/images/friend-profile.png'),
    },
    {
      id: 8,
      name: 'Noami',
      steps: 1000,
      flag: '1k',
      avater: require('../../assets/images/friend-profile.png'),
    },
    {
      id: 9,
      name: 'Noami',
      steps: 500,
      flag: '1k',
      avater: require('../../assets/images/friend-profile.png'),
    },
  ]);
  const chartData = [
    {label: 'MON', percentage: '135.75%', value: 5430},
    {label: 'TUE', percentage: '155.95%', value: 6238},
    {label: 'WED', percentage: '153.20%', value: 6128},
    {label: 'THU', percentage: '221.22%', value: 8849},
    {label: 'FRI', percentage: '253.25%', value: 10130},
    {label: 'SAT', percentage: '223.57%', value: 8943},
    {label: 'SUN', percentage: '57.85%', value: 2314},
  ];
  const EmptyTodayRankingView = () => {
    return (
      <View style={{flexDirection: 'row', marginBottom: 10}}>
        <View style={styles.cardView}>
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
          <Text
            style={{
              color: '#040103',
              fontSize: 12,
              fontFamily: 'PlusJakartaDisplay-Medium',
            }}>
            Me
          </Text>
          <Text
            style={{
              color: '#38acff',
              fontSize: 16,
              fontFamily: 'PlusJakartaDisplay-Bold',
            }}>
            0
          </Text>
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
          <Image
            source={require('../../assets/images/add-friend1.png')}
            style={{
              width: 33,
              height: 24,
            }}
          />
          <Text
            style={{
              color: '#002138',
              marginTop: 8,
              fontSize: 14,
              fontFamily: 'Rubik-Regular',
            }}>
            Add a Friend
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  const EmptyWeekRankingView = () => {
    return (
      <View style={{flexDirection: 'row', marginBottom: 10}}>
        <View style={styles.cardView}>
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
          <Text
            style={{
              color: '#040103',
              fontSize: 12,
              fontFamily: 'PlusJakartaDisplay-Medium',
            }}>
            Me
          </Text>
          <Text
            style={{
              color: '#38acff',
              fontSize: 16,
              fontFamily: 'PlusJakartaDisplay-Bold',
            }}>
            0
          </Text>
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
          <Image
            source={require('../../assets/images/add-friend1.png')}
            style={{
              width: 33,
              height: 24,
            }}
          />
          <Text
            style={{
              color: '#002138',
              marginTop: 8,
              fontSize: 14,
              fontFamily: 'Rubik-Regular',
            }}>
            Add a Friend
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <Animated.View
      style={{
        zIndex: 999,
        flex: 1,
        backgroundColor: 'white',
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        borderRadius: showMenu ? 15 : 0,
        // transform: [{scale: scale}, {translateX: moveToRight}],
      }}>
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            // paddingHorizontal: 20,
          }}
          showsVerticalScrollIndicator={false}>
          {loading && <Loader />}
          <View style={styles.headerView}>
            {/* <Pressable onPress={() => handleOpenDrawer(navigation)}> */}
            <Pressable
              onPress={() => {
                console.log('home scale', scale, moveToRight);
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
                setActiveTab('Home');
                setShowMenu(!showMenu);
              }}>
              <Image
                source={require('../../assets/images/menu1.png')}
                style={{width: 34, height: 17}}
              />
            </Pressable>
            <TouchableOpacity
              onPress={() => navigation.navigate('Notification')}>
              <Image
                source={require('../../assets/images/bell1.png')}
                style={{width: 25, height: 25, resizeMode: 'contain'}}
              />
            </TouchableOpacity>
          </View>
          <Text
            style={{
              color: '#000000',
              marginTop: 8,
              fontFamily: 'Rubik-Regular',
            }}>
            Good{' '}
            {currentHour < 12
              ? 'Morning'
              : currentHour <= 18 && currentHour >= 12
              ? 'Evening'
              : 'Night'}
          </Text>
          <Text
            style={{
              color: '#000305',
              fontSize: 24,
              fontFamily: 'PlusJakartaDisplay-Regular',
            }}>
            {/* Jonathan */}
            {firstName}
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

          {index == 0 ? (
            <View>
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
                        style={{
                          color: '#38acff',
                          fontSize: 36,
                          // fontFamily: 'Rubik-Regular',
                        }}>
                        {fill}
                      </Text>
                      <Text
                        style={{
                          color: '#000305',
                          fontSize: 14.5,
                          fontFamily: 'PlusJakartaDisplay-Regular',
                        }}>
                        Total Amount of Steps
                      </Text>
                    </View>
                  )}
                </AnimatedCircularProgress>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <View style={{alignItems: 'center'}}>
                  <Text
                    style={{
                      color: '#38ACFF',
                      fontSize: 17,
                      fontFamily: 'Rubik-Regular',
                    }}>
                    0 kcal
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: 8,
                    }}>
                    <Image
                      source={require('../../assets/images/calories.png')}
                      style={{
                        marginRight: 5,
                        width: 11,
                        height: 15,
                        resizeMode: 'contain',
                      }}
                    />
                    <Text
                      style={{
                        color: '#002138',
                        fontSize: 13,
                        fontSize: 13,
                        fontFamily: 'Rubik-Regular',
                      }}>
                      Calories
                    </Text>
                  </View>
                </View>
                <View style={{alignItems: 'center'}}>
                  <Text
                    style={{
                      color: '#38ACFF',
                      fontSize: 17,
                      fontFamily: 'Rubik-Regular',
                    }}>
                    0 km
                  </Text>

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: 8,
                    }}>
                    <Image
                      source={require('../../assets/images/man-walking.png')}
                      style={{
                        marginRight: 5,
                        width: 12,
                        height: 15,
                        resizeMode: 'contain',
                      }}
                    />
                    <Text
                      style={{
                        color: '#002138',
                        fontSize: 13,
                        fontFamily: 'Rubik-Regular',
                      }}>
                      Distance
                    </Text>
                  </View>
                </View>
                <View style={{alignItems: 'center'}}>
                  <Text
                    style={{
                      color: '#38ACFF',
                      fontSize: 17,
                      fontFamily: 'Rubik-Regular',
                    }}>
                    0:01 h
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: 8,
                    }}>
                    <Image
                      source={require('../../assets/images/clock.png')}
                      style={{
                        marginRight: 5,
                        width: 13,
                        height: 15,
                        resizeMode: 'contain',
                      }}
                    />
                    <Text
                      style={{
                        color: '#002138',
                        fontSize: 13,
                        fontFamily: 'Rubik-Regular',
                      }}>
                      Time
                    </Text>
                  </View>
                </View>
              </View>
              <View
                style={{
                  marginTop: 25,
                  marginBottom: 10,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    color: '#000000',
                    fontSize: 16,
                    fontFamily: 'Rubik-Regular',
                  }}>
                  Today's Ranking
                </Text>
                <TouchableOpacity
                  style={{height: 30, width: 60}}
                  onPress={() => bottomSheetRef?.current?.open()}>
                  <Text
                    style={{
                      color: '#38acff',
                      fontSize: 14,
                      textAlign: 'right',
                      fontFamily: 'Rubik-Regular',
                    }}>
                    See All
                  </Text>
                </TouchableOpacity>
              </View>
              {todayRankingList.length === 0 ? (
                <EmptyTodayRankingView />
              ) : (
                <View>
                  <FlatList
                    data={todayRankingList}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={item => {
                      let itemColor = generateColor();
                      return (
                        <View
                          style={{
                            ...styles.cardView,
                            justifyContent: 'center',
                            marginRight: 10,
                            marginVertical: 2,
                            elevation: 3,
                          }}>
                          <View style={{height: 18, width: 18}}>
                            {item.index < 1 && (
                              <Image
                                source={require('../../assets/images/crown.png')}
                                style={{
                                  width: '100%',
                                  height: '100%',
                                  resizeMode: 'contain',
                                }}
                              />
                            )}
                          </View>
                          <View style={{marginBottom: 3}}>
                            <AnimatedCircularProgress
                              rotation={360}
                              size={55}
                              width={2.5}
                              fill={80}
                              // tintColor="#38ACFF"
                              tintColor={itemColor}
                              backgroundColor="#eee">
                              {fill => (
                                <Image
                                  source={item.item.avater}
                                  style={{
                                    marginVertical: 8,
                                    width: 44,
                                    height: 44,
                                  }}
                                />
                              )}
                            </AnimatedCircularProgress>
                          </View>
                          <Text style={styles.cardText}>{item.item.name}</Text>
                          <Text
                            style={{
                              ...styles.cardText,
                              color: itemColor,
                              fontFamily: 'Rubik-Medium',
                            }}>
                            {item.item.steps}
                          </Text>
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}>
                            <Image
                              source={require('../../assets/images/flag1.png')}
                              style={{
                                width: 12,
                                height: 12,
                                marginRight: 3,
                                tintColor: itemColor,
                              }}
                            />
                            <Text
                              style={{
                                color: itemColor,
                                fontFamily: 'Rubik-Medium',
                              }}>
                              {item.item.flag}
                            </Text>
                          </View>
                        </View>
                      );
                    }}
                  />
                </View>
              )}
            </View>
          ) : (
            <View>
              <View
                style={{
                  marginVertical: 30,
                  marginBottom: 10,
                  width: '100%',
                }}>
                {/* tab1  */}
                <SwiperFlatList
                  showPagination
                  style={{paddingBottom: 30}}
                  paginationDefaultColor={'#7cb9e6'}
                  paginationActiveColor={'#003e6b'}
                  paginationStyleItemInactive={{
                    marginHorizontal: 6,
                  }}
                  paginationStyleItemActive={{
                    marginHorizontal: 6,
                  }}
                  paginationStyleItem={{
                    height: 9,
                    width: 9,
                  }}>
                  <View
                    style={{
                      width: SCREEN_WIDTH * 0.9,
                      alignItems: 'center',
                      height: 210,
                    }}>
                    <AnimatedCircularProgress
                      size={200}
                      width={10}
                      fill={0}
                      tintColor="#38ACFF"
                      backgroundColor="#E2E2E2">
                      {fill => (
                        <View style={{alignItems: 'center'}}>
                          <Text
                            style={{
                              color: '#38acff',
                              fontSize: 36,
                              // fontFamily: 'PlusJakartaDisplay-Bold',
                            }}>
                            {fill}
                          </Text>
                          <Text
                            style={{
                              color: '#000305',
                              fontSize: 14.5,
                              fontFamily: 'PlusJakartaDisplay-Regular',
                            }}>
                            Total Amount of Steps
                          </Text>
                        </View>
                      )}
                    </AnimatedCircularProgress>
                  </View>
                  <View
                    style={{
                      width: SCREEN_WIDTH * 0.9,
                      alignItems: 'center',
                    }}>
                    <View style={{}}>
                      <CustomBarChart
                        data={chartData}
                        round={100}
                        unit="k"
                        width={SCREEN_WIDTH - 20}
                        height={180}
                        barWidth={8}
                        barRadius={6}
                        barColor={'#38ACFF'}
                        axisColor={'#838383'}
                        paddingBottom={10}
                        isMiddleLineVisible={false}
                        isPercentageVisible={false}
                      />
                    </View>
                  </View>
                </SwiperFlatList>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <View style={{alignItems: 'center'}}>
                  <Text
                    style={{
                      color: '#38ACFF',
                      fontSize: 17,
                      fontFamily: 'Rubik-Regular',
                    }}>
                    0 kcal
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: 8,
                    }}>
                    <Image
                      source={require('../../assets/images/calories.png')}
                      style={{
                        marginRight: 5,
                        width: 11,
                        height: 15,
                        resizeMode: 'contain',
                      }}
                    />
                    <Text
                      style={{
                        color: '#002138',
                        fontSize: 13,
                        fontSize: 13,
                        fontFamily: 'Rubik-Regular',
                      }}>
                      Calories
                    </Text>
                  </View>
                </View>
                <View style={{alignItems: 'center'}}>
                  <Text
                    style={{
                      color: '#38ACFF',
                      fontSize: 17,
                      fontFamily: 'Rubik-Regular',
                    }}>
                    0 km
                  </Text>

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: 8,
                    }}>
                    <Image
                      source={require('../../assets/images/man-walking.png')}
                      style={{
                        marginRight: 5,
                        width: 12,
                        height: 15,
                        resizeMode: 'contain',
                      }}
                    />
                    <Text
                      style={{
                        color: '#002138',
                        fontSize: 13,
                        fontFamily: 'Rubik-Regular',
                      }}>
                      Distance
                    </Text>
                  </View>
                </View>
                <View style={{alignItems: 'center'}}>
                  <Text
                    style={{
                      color: '#38ACFF',
                      fontSize: 17,
                      fontFamily: 'Rubik-Regular',
                    }}>
                    0:01 h
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: 8,
                    }}>
                    <Image
                      source={require('../../assets/images/clock.png')}
                      style={{
                        marginRight: 5,
                        width: 13,
                        height: 15,
                        resizeMode: 'contain',
                      }}
                    />
                    <Text
                      style={{
                        color: '#002138',
                        fontSize: 13,
                        fontFamily: 'Rubik-Regular',
                      }}>
                      Time
                    </Text>
                  </View>
                </View>
              </View>
              <View
                style={{
                  marginTop: 25,
                  marginBottom: 10,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    color: '#000000',
                    fontSize: 16,
                    fontFamily: 'Rubik-Regular',
                  }}>
                  Week's Ranking
                </Text>
                <TouchableOpacity
                  style={{height: 30, width: 60}}
                  onPress={() => bottomSheetRef?.current?.open()}>
                  <Text
                    style={{
                      color: '#38acff',
                      fontSize: 14,
                      textAlign: 'right',
                      fontFamily: 'Rubik-Regular',
                    }}>
                    See All
                  </Text>
                </TouchableOpacity>
              </View>
              {weekRankingList.length === 0 ? (
                <EmptyWeekRankingView />
              ) : (
                <View>
                  <FlatList
                    data={weekRankingList}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={item => {
                      let itemColor = generateColor();
                      return (
                        <View
                          style={{
                            ...styles.cardView,
                            justifyContent: 'center',
                            marginRight: 10,
                            marginVertical: 2,
                            elevation: 3,
                          }}>
                          <View style={{height: 18, width: 18}}>
                            {item.index < 1 && (
                              <Image
                                source={require('../../assets/images/crown.png')}
                                style={{
                                  width: '100%',
                                  height: '100%',
                                  resizeMode: 'contain',
                                }}
                              />
                            )}
                          </View>
                          <View style={{marginBottom: 3}}>
                            <AnimatedCircularProgress
                              rotation={360}
                              size={55}
                              width={2.5}
                              fill={80}
                              // tintColor="#38ACFF"
                              tintColor={itemColor}
                              backgroundColor="#eee">
                              {fill => (
                                <Image
                                  source={item.item.avater}
                                  style={{
                                    marginVertical: 8,
                                    width: 44,
                                    height: 44,
                                  }}
                                />
                              )}
                            </AnimatedCircularProgress>
                          </View>
                          <Text style={styles.cardText}>{item.item.name}</Text>
                          <Text
                            style={{
                              ...styles.cardText,
                              color: itemColor,
                              fontFamily: 'Rubik-Medium',
                            }}>
                            {item.item.steps}
                          </Text>
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}>
                            <Image
                              source={require('../../assets/images/flag1.png')}
                              style={{
                                width: 12,
                                height: 12,
                                marginRight: 3,
                                tintColor: itemColor,
                              }}
                            />
                            <Text
                              style={{
                                color: itemColor,
                                fontFamily: 'Rubik-Medium',
                              }}>
                              {item.item.flag}
                            </Text>
                          </View>
                        </View>
                      );
                    }}
                  />
                </View>
              )}
            </View>
          )}

          <RBSheet
            ref={bottomSheetRef}
            height={350}
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
              <View style={{flex: 1}}>
                <Text
                  style={{color: '#003e6b', fontSize: 18, textAlign: 'center'}}>
                  Today's Ranking
                </Text>
                <View style={{padding: 10, marginTop: 10, flex: 1}}>
                  {todayRankingList.length == 0 ? (
                    <View style={styles.bootSheetCardView}>
                      <Image
                        source={require('../../assets/images/friend-profile.png')}
                        style={{marginVertical: 8, width: 44, height: 44}}
                      />
                      <Text
                        style={{
                          color: '#040103',
                          fontSize: 12,
                          fontFamily: 'PlusJakartaDisplay-Medium',
                        }}>
                        Me
                      </Text>
                      <Text
                        style={{
                          color: '#38acff',
                          fontSize: 16,
                          fontFamily: 'PlusJakartaDisplay-Bold',
                        }}>
                        0
                      </Text>
                    </View>
                  ) : (
                    <View
                      style={{
                        marginVertical: 15,
                      }}>
                      <FlatList
                        data={todayRankingList}
                        numColumns={3}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={item => {
                          let itemColor = generateColor();
                          return (
                            <TouchableOpacity
                              onPress={() => {
                                navigation.navigate('FriendProfile');
                                bottomSheetRef?.current?.close();
                              }}
                              style={{
                                ...styles.cardView,
                                justifyContent: 'center',
                                marginRight: 10,
                                marginVertical: 2,
                                elevation: 3,
                                height: 120,
                                width: '28.9%',
                                marginBottom: 10,
                              }}>
                              <View style={{height: 18, width: 18}}>
                                {item.index < 1 && (
                                  <Image
                                    source={require('../../assets/images/crown.png')}
                                    style={{
                                      width: '100%',
                                      height: '100%',
                                      resizeMode: 'contain',
                                    }}
                                  />
                                )}
                              </View>
                              <View style={{marginBottom: 3}}>
                                <AnimatedCircularProgress
                                  rotation={360}
                                  size={55}
                                  width={2.5}
                                  fill={80}
                                  // tintColor="#38ACFF"
                                  tintColor={itemColor}
                                  backgroundColor="#eee">
                                  {fill => (
                                    <Image
                                      source={item.item.avater}
                                      style={{
                                        marginVertical: 8,
                                        width: 44,
                                        height: 44,
                                      }}
                                    />
                                  )}
                                </AnimatedCircularProgress>
                              </View>
                              <Text style={styles.cardText}>
                                {item.item.name}
                              </Text>
                              <Text
                                style={{
                                  ...styles.cardText,
                                  color: itemColor,
                                  fontFamily: 'Rubik-Medium',
                                }}>
                                {item.item.steps}
                              </Text>
                            </TouchableOpacity>
                          );
                        }}
                      />
                    </View>
                  )}
                </View>
              </View>
            ) : (
              <View style={{flex: 1}}>
                <Text
                  style={{color: '#003e6b', fontSize: 18, textAlign: 'center'}}>
                  Week's Ranking
                </Text>
                <View style={{padding: 10, marginTop: 10, flex: 1}}>
                  {weekRankingList.length == 0 ? (
                    <View style={styles.bootSheetCardView}>
                      <Image
                        source={require('../../assets/images/friend-profile.png')}
                        style={{marginVertical: 8, width: 44, height: 44}}
                      />
                      <Text
                        style={{
                          color: '#040103',
                          fontSize: 12,
                          fontFamily: 'PlusJakartaDisplay-Medium',
                        }}>
                        Me
                      </Text>
                      <Text
                        style={{
                          color: '#38acff',
                          fontSize: 16,
                          fontFamily: 'PlusJakartaDisplay-Bold',
                        }}>
                        0
                      </Text>
                    </View>
                  ) : (
                    <View
                      style={{
                        marginVertical: 15,
                      }}>
                      <FlatList
                        data={weekRankingList}
                        numColumns={3}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={item => {
                          let itemColor = generateColor();
                          return (
                            <TouchableOpacity
                              onPress={() => {
                                navigation.navigate('FriendProfile');
                                bottomSheetRef?.current?.close();
                              }}
                              style={{
                                ...styles.cardView,
                                justifyContent: 'center',
                                marginRight: 10,
                                marginVertical: 2,
                                elevation: 3,
                                height: 120,
                                width: '28.9%',
                                marginBottom: 10,
                              }}>
                              <View style={{height: 18, width: 18}}>
                                {item.index < 1 && (
                                  <Image
                                    source={require('../../assets/images/crown.png')}
                                    style={{
                                      width: '100%',
                                      height: '100%',
                                      resizeMode: 'contain',
                                    }}
                                  />
                                )}
                              </View>
                              <View style={{marginBottom: 3}}>
                                <AnimatedCircularProgress
                                  rotation={360}
                                  size={55}
                                  width={2.5}
                                  fill={80}
                                  // tintColor="#38ACFF"
                                  tintColor={itemColor}
                                  backgroundColor="#eee">
                                  {fill => (
                                    <Image
                                      source={item.item.avater}
                                      style={{
                                        marginVertical: 8,
                                        width: 44,
                                        height: 44,
                                      }}
                                    />
                                  )}
                                </AnimatedCircularProgress>
                              </View>
                              <Text style={styles.cardText}>
                                {item.item.name}
                              </Text>
                              <Text
                                style={{
                                  ...styles.cardText,
                                  color: itemColor,
                                  fontFamily: 'Rubik-Medium',
                                }}>
                                {item.item.steps}
                              </Text>
                            </TouchableOpacity>
                          );
                        }}
                      />
                    </View>
                  )}
                </View>
              </View>
            )}
          </RBSheet>
        </ScrollView>
      </View>
      {/* footer menu----------------------------- */}
      {/* <View
        style={{
          width: '100%',
          height: 60,
          backgroundColor: '#cdcdcd',
          elevation: 30,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {tabList.map((item, index) => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Chat', {
                  scale,
                  // showMenu,
                  // setShowMenu,
                  moveToRight,
                })
              }
              key={index}
              style={{
                flex: 1,
                marginHorizontal: 5,
              }}>
              <Image
                source={item.icon}
                style={{
                  height: 30,
                  width: 30,
                  alignSelf: 'center',
                  resizeMode: 'contain',
                }}
              />
            </TouchableOpacity>
          );
        })}
      </View> */}
    </Animated.View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 20,
    // paddingBottom: 10,
  },
  headerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
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
    fontSize: 14,
    fontFamily: 'PlusJakartaDisplay-Regular',
  },
  cardView: {
    height: 137,
    width: 101,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 5,
    alignItems: 'center',
    marginHorizontal: 5,
    shadowColor: 'blue',
    elevation: 4,
    shadowOffset: {
      width: 0,
      height: 0.1,
    },
    shadowOpacity: 0.0,
    shadowRadius: 0.1,
  },
  cardText: {
    color: '#040103',
    textAlign: 'center',
    fontSize: 13,
    width: 75,
    fontFamily: 'Rubik-Regular',
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
