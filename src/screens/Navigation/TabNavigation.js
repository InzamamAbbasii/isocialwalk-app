import * as React from 'react';
import {Text, View, Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Home from '../Home';
import Friends from '../Friends';
import Groups from '../Groups/Groups';
import Challenges from '../Challenges/Challenges';

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#ffffff',
          height: 70,
          borderTopWidth: 0,
          elevation: 24,
          shadowColor: 'blue',
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarLabel: '',
          tabBarIcon: ({focused}) =>
            focused ? (
              <Image
                source={require('../../../assets/images/home.png')}
                style={{
                  height: 36,
                  width: 25,
                  position: 'relative',
                  top: 5,
                }}
                resizeMode={'stretch'}
              />
            ) : (
              <Image
                source={require('../../../assets/images/home-inactive1.png')}
                style={{
                  height: 25,
                  width: 25,
                  position: 'relative',
                  top: 5,
                }}
                resizeMode={'stretch'}
              />
            ),
        }}
      />

      <Tab.Screen
        name="Friends"
        component={Friends}
        options={{
          headerShown: false,
          tabBarLabel: '',
          tabBarIcon: ({focused}) =>
            focused ? (
              <Image
                source={require('../../../assets/images/friend-active.png')}
                style={{
                  height: 36,
                  width: 29,
                  position: 'relative',
                  top: 5,
                }}
                resizeMode={'stretch'}
              />
            ) : (
              <Image
                source={require('../../../assets/images/friends-dark.png')}
                style={{
                  height: 25,
                  width: 29,
                  position: 'relative',
                  top: 5,
                }}
                resizeMode={'stretch'}
              />
            ),
        }}
      />

      <Tab.Screen
        name="Groups"
        component={Groups}
        options={{
          headerShown: false,
          tabBarLabel: '',
          tabBarIcon: ({focused}) =>
            focused ? (
              <Image
                source={require('../../../assets/images/group.png')}
                style={{
                  height: 36,
                  width: 29,
                  position: 'relative',
                  top: 5,
                }}
                resizeMode={'stretch'}
              />
            ) : (
              <Image
                source={require('../../../assets/images/group-dark.png')}
                style={{
                  height: 25,
                  width: 29,
                  position: 'relative',
                  top: 5,
                }}
                resizeMode={'stretch'}
              />
            ),
        }}
      />

      <Tab.Screen
        name="Challenges"
        component={Challenges}
        options={{
          headerShown: false,
          tabBarLabel: '',
          tabBarIcon: ({focused}) =>
            focused ? (
              <View
                style={{
                  alignItems: 'center',
                  height: 32,
                  // backgroundColor: 'red',
                  justifyContent: 'space-between',
                }}>
                <Image
                  source={require('../../../assets/images/trophy-light.png')}
                  style={{
                    height: 25,
                    width: 25,
                  }}
                  // resizeMode={'contain'}
                />
                <Image
                  source={require('../../../assets/images/Line3.png')}
                  style={{
                    height: 4,
                    width: 8,
                  }}
                  // resizeMode={'contain'}
                />
              </View>
            ) : (
              <Image
                source={require('../../../assets/images/trophy-dark.png')}
                style={{
                  height: 25,
                  width: 29,
                  position: 'relative',
                  top: 5,
                }}
                resizeMode={'stretch'}
              />
            ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
