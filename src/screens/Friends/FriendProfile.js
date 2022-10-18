import React, {useState, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Pressable,
} from 'react-native';
import Header from '../../Reuseable Components/Header';
import DropDownPicker from 'react-native-dropdown-picker';

import {LineChart} from 'react-native-chart-kit';

const FriendProfile = ({navigation}) => {
  const [commonGroupsList, setCommonGroupsList] = useState([
    {
      id: 0,
      name: 'Carnage Coverage',
      avatar: require('../../../assets/images/friend-profile.png'),
    },
    {
      id: 1,
      name: 'GhostRunners',
      avatar: require('../../../assets/images/friend-profile.png'),
    },
  ]);

  const [isTypeOpen, setIsTypeOpen] = useState(false);
  const [performanceTypes, setPerformanceTypes] = useState([
    {label: 'This Day', value: 'Day'},
    {label: 'This Week', value: 'Week'},
    {label: 'This Month', value: 'Month'},
  ]);
  const [selectedType, setSelectedType] = useState(performanceTypes[0]?.value);

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
        showsVerticalScrollIndicator={false}>
        <Header title={'Saffa'} navigation={navigation} />
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: 20,
            paddingLeft: 30,
          }}>
          <Image
            source={require('../../../assets/images/user1.png')}
            style={{width: 110, height: 110, resizeMode: 'contain'}}
          />
          <Text
            style={{
              color: '#000000',
              fontSize: 18,
              marginVertical: 10,
              fontWeight: '700',
            }}>
            Saffa Waller
          </Text>
          <Text style={{color: '#4C7897', fontSize: 16}}>
            Daily Goal: 8,500 Steps
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              color: '#000000',
              fontSize: 18,
            }}>
            {selectedType} Performance
          </Text>
          <DropDownPicker
            zIndex={999}
            open={isTypeOpen}
            value={selectedType}
            items={performanceTypes}
            setOpen={setIsTypeOpen}
            setValue={setSelectedType}
            setItems={setPerformanceTypes}
            arrowIconStyle={{
              tintColor: 'white',
            }}
            containerStyle={{
              width: '38%',
            }}
            dropDownContainerStyle={{
              padding: 0,
              alignSelf: 'center',
              borderWidth: 1,
              borderColor: '#ccc',
              borderRadius: 4,
              zIndex: 999,
            }}
            showTickIcon={false}
            iconContainerStyle={{
              color: '#fff',
            }}
            selectedItemContainerStyle={{
              backgroundColor: '#0496ff',
              marginHorizontal: 5,
            }}
            selectedItemLabelStyle={{
              color: '#FFF',
            }}
            scrollViewProps={{
              showsVerticalScrollIndicator: false,
              showsHorizontalScrollIndicator: false,
            }}
            labelStyle={{
              fontSize: 14,
              textAlign: 'left',
              paddingLeft: 5,
              color: '#fff',
            }}
            style={{
              height: 35,
              paddingHorizontal: 10,
              borderRadius: 5,
              backgroundColor: '#003E6B',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          />
        </View>
        {/* -------------------------Performace Graph------------------------------------ */}
        <View style={styles.performanceCard}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'flex-end',
                justifyContent: 'flex-end',
                height: 80,
              }}>
              <View>
                <Image
                  source={require('../../../assets/images/friend-profile.png')}
                  style={{width: 60, height: 60}}
                />
              </View>
              <View
                style={{
                  marginLeft: 5,
                  marginBottom: 10,
                }}>
                <Text
                  style={{color: '#38ACFF', fontSize: 16, fontWeight: '500'}}>
                  39,283
                </Text>
                <Text style={{color: '#38ACFF', fontSize: 14}}>Me</Text>
              </View>
            </View>
            <Text style={{color: '#000000', fontSize: 14}}>vs</Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'flex-end',
                height: 80,
              }}>
              <View style={{marginRight: 5, marginBottom: 10}}>
                <Text
                  style={{color: '#003E6B', fontSize: 16, fontWeight: '500'}}>
                  94,434
                </Text>
                <Text style={{color: '#003E6B', fontSize: 14}}>Saffa</Text>
              </View>
              <View>
                <Image
                  source={require('../../../assets/images/crown.png')}
                  style={{
                    width: 20,
                    height: 20,
                    resizeMode: 'contain',
                    alignSelf: 'center',
                  }}
                />
                <Image
                  source={require('../../../assets/images/user1.png')}
                  style={{width: 60, height: 60}}
                />
              </View>
            </View>
          </View>

          {/* ------------------------------------graph------------------------------------------- */}

          <View style={{}}>
            <LineChart
              data={{
                labels: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
                datasets: [
                  {
                    data: [10, 20, 5, 15, 45, 30, 20, 9],
                    color: (opacity = 1) => `#38ACFF`, // optional
                    strokeWidth: 2,
                  },
                  {
                    data: [15, 10, 20, 8, 30, 3, 50, 25],
                    color: (opacity = 1) => `#003E6B`, // optional
                    strokeWidth: 2,
                  },
                ],
              }}
              width={Dimensions.get('window').width - 80} // from react-native
              height={160}
              withDots={true}
              withInnerLines={false}
              withOuterLines={false}
              withVerticalLabels={true}
              withHorizontalLabels={false}
              withShadow={false}
              chartConfig={{
                backgroundColor: '#fff',
                backgroundGradientFrom: '#fff',
                backgroundGradientTo: '#fff',
                labelColor: (opacity = 1) => `#878484`,
                decimalPlaces: 2,
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
              }}
              //   bezier
              style={{
                paddingRight: 13,
                paddingLeft: 15,
                marginTop: 15,
              }}
            />
          </View>
          {/* ------------------------------------graph------------------------------------------- */}
        </View>
        {/* -----------------------------Common Groups------------------------------------------ */}
        <View style={{flex: 1}}>
          <Text
            style={{
              color: '#000000',
              fontSize: 18,
            }}>
            Groups in Common
          </Text>
          {commonGroupsList.length === 0 ? (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: '#000000',
                  fontSize: 14,
                }}>
                No Groups in common
              </Text>
            </View>
          ) : (
            <FlatList
              key={'_'}
              data={commonGroupsList}
              numColumns={3}
              keyExtractor={(item, index) => '_' + index.toString()}
              renderItem={(item, index) => {
                return (
                  <TouchableOpacity
                    style={{
                      ...styles.cardView,
                      justifyContent: 'center',
                      height: 125,
                      width: '28.9%',
                    }}>
                    <Image
                      source={item.item.avatar}
                      style={{marginVertical: 8, width: 50, height: 50}}
                    />
                    <Text style={styles.cardText}>{item.item.name}</Text>
                  </TouchableOpacity>
                );
              }}
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default FriendProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
  },
  cardView: {
    height: 137,
    width: 92,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    shadowColor: 'blue',
    elevation: 5,
    padding: 5,
    alignItems: 'center',
    marginHorizontal: 8,
    marginVertical: 10,
    overflow: 'hidden',
  },
  cardText: {
    color: '#000000',
    textAlign: 'center',
    fontSize: 13,
    fontWeight: '500',
    width: 85,
  },
  performanceCard: {
    zIndex: -1,
    height: 295,
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    shadowColor: 'blue',
    elevation: 5,
    marginHorizontal: 4,
    marginVertical: 20,
    overflow: 'hidden',
  },
  performanceCardImage: {},
});
