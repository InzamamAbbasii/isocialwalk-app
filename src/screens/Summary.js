import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import Share from 'react-native-share';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import CustomBarChart from '../Reuseable Components/CustomBarChart';
const SCREEN_WIDTH = Dimensions.get('window').width;

const Summary = ({navigation}) => {
  const data = [
    {label: 'MON', percentage: '135.75%', value: 5430},
    {label: 'TUE', percentage: '155.95%', value: 6238},
    {label: 'WED', percentage: '153.20%', value: 6128},
    {label: 'THU', percentage: '221.22%', value: 8849},
    {label: 'FRI', percentage: '253.25%', value: 10130},
    {label: 'SAT', percentage: '223.57%', value: 8943},
    {label: 'SUN', percentage: '57.85%', value: 2314},
  ];
  const handleShare = () => {
    const shareOptions = {
      title: 'Share via',
      message: 'React Doc Url',
      url: 'https://reactjs.org/docs/getting-started.html',
    };

    Share.open(shareOptions)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        err && console.log(err);
      });
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerView}>
        <TouchableOpacity
          style={{padding: 10, paddingLeft: 0}}
          onPress={() => navigation?.goBack()}>
          <Image
            source={require('../../assets/images/left-arrow.png')}
            style={{width: 14, height: 22}}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleShare()}>
          <Image
            source={require('../../assets/images/sharing.png')}
            style={{width: 25, height: 25, resizeMode: 'contain'}}
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>Summary</Text>
      <View style={{flex: 1}}>
        <View style={styles.rowView}>
          <Text style={styles.text}>Sun Feb 9-Sat Feb 15 ,2022</Text>
          <Text
            style={{
              ...styles.text,
              color: '#38ACFF',
              fontSize: 15,
              fontFamily: 'Rubik-Medium',
            }}>
            16189 Steps
          </Text>
        </View>
        {/* google map */}
        {/* <MapView
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={{height: 250, width: '100%'}}
          region={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}></MapView> */}

        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: 20,
          }}>
          <AnimatedCircularProgress
            rotation={360}
            size={150}
            width={6}
            fill={80}
            tintColor="#38ACFF"
            backgroundColor="#eee">
            {fill => (
              <View style={{alignItems: 'center'}}>
                <Text
                  style={{
                    color: '#38acff',
                    fontSize: 16,
                    fontFamily: 'PlusJakartaDisplay-Bold',
                  }}>
                  16189
                </Text>
                <Text
                  style={{
                    color: '#000305',
                    fontSize: 11,
                    fontFamily: 'PlusJakartaDisplay-Regular',
                  }}>
                  Total amount of steps
                </Text>
              </View>
            )}
          </AnimatedCircularProgress>
        </View>
        <View>
          <View style={styles.SummaryCardView}>
            <View style={{alignItems: 'center'}}>
              <Text style={styles.textBlue}>29293 kcal</Text>
              <View style={styles.rowView1}>
                <Image
                  source={require('../../assets/images/calories.png')}
                  style={{
                    marginRight: 5,
                    width: 11,
                    height: 15,
                    resizeMode: 'contain',
                  }}
                />
                <Text style={styles.rowView1Text}>Calories</Text>
              </View>
            </View>
            <View style={{alignItems: 'center'}}>
              <Text style={styles.textBlue}>102.2 km</Text>

              <View style={styles.rowView1}>
                <Image
                  source={require('../../assets/images/man-walking.png')}
                  style={{
                    marginRight: 5,
                    width: 12,
                    height: 15,
                    resizeMode: 'contain',
                  }}
                />
                <Text style={styles.rowView1Text}>Distance</Text>
              </View>
            </View>
            <View style={{alignItems: 'center'}}>
              <Text style={styles.textBlue}>34:56 h</Text>
              <View style={styles.rowView1}>
                <Image
                  source={require('../../assets/images/clock.png')}
                  style={{
                    marginRight: 5,
                    width: 13,
                    height: 15,
                    resizeMode: 'contain',
                  }}
                />
                <Text style={styles.rowView1Text}>Time</Text>
              </View>
            </View>
          </View>
          <View style={styles.SummaryCardView}>
            <View style={{alignItems: 'center'}}>
              <Text style={styles.textBlue}>29293 kcal</Text>
              <View style={styles.rowView1}>
                <Image
                  source={require('../../assets/images/calories.png')}
                  style={{
                    marginRight: 5,
                    width: 11,
                    height: 15,
                    resizeMode: 'contain',
                  }}
                />
                <Text style={styles.rowView1Text}>Calories</Text>
              </View>
            </View>
            <View style={{alignItems: 'center'}}>
              <Text style={styles.textBlue}>102.2 km</Text>

              <View style={styles.rowView1}>
                <Image
                  source={require('../../assets/images/man-walking.png')}
                  style={{
                    marginRight: 5,
                    width: 12,
                    height: 15,
                    resizeMode: 'contain',
                  }}
                />
                <Text style={styles.rowView1Text}>Distance</Text>
              </View>
            </View>
            <View style={{alignItems: 'center'}}>
              <Text style={styles.textBlue}>34:56 h</Text>
              <View style={styles.rowView1}>
                <Image
                  source={require('../../assets/images/clock.png')}
                  style={{
                    marginRight: 5,
                    width: 13,
                    height: 15,
                    resizeMode: 'contain',
                  }}
                />
                <Text style={styles.rowView1Text}>Time</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={{}}>
          <CustomBarChart
            data={data}
            round={100}
            unit="k"
            width={SCREEN_WIDTH - 20}
            height={250}
            barWidth={8}
            barRadius={6}
            barColor={'#38ACFF'}
            axisColor={'#838383'}
            paddingBottom={40}
            isMiddleLineVisible={true}
            isPercentageVisible={true}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default Summary;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // paddingHorizontal: 20,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  headerView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  title: {
    color: '#000000',
    fontSize: 23,
    marginTop: 10,
    fontFamily: 'Rubik-Bold',
    paddingHorizontal: 20,
  },
  rowView: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  SummaryCardView: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 15,
  },
  rowView1: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 8,
  },
  textBlue: {
    color: '#38ACFF',
    fontSize: 16,
    fontFamily: 'Rubik-Medium',
  },
  rowView1Text: {
    color: '#002138',
    fontSize: 10,
    fontFamily: 'Rubik-Regular',
  },
  text: {color: '#000', fontFamily: 'Rubik-Regular'},
});

// import React, {Component} from 'react';
// import {StyleSheet, View} from 'react-native';
// import {
//   LineChart,
//   BarChart,
//   AreaChart,
//   XAxis,
//   Grid,
// } from 'react-native-svg-charts';
// import {Svg, G, Line, Rect, Text} from 'react-native-svg';
// // import BarChart from '../Reuseable Components/BarChart';

// export default class Summary extends Component {
//   render() {
//     const data = [
//       {label: 'Jan', value: 500},
//       {label: 'Feb', value: 312},
//       {label: 'Mar', value: 424},
//       {label: 'Apr', value: 745},
//       {label: 'May', value: 89},
//       {label: 'Jun', value: 434},
//       {label: 'Jul', value: 650},
//       {label: 'Aug', value: 980},
//       {label: 'Sep', value: 123},
//       {label: 'Oct', value: 186},
//       {label: 'Nov', value: 689},
//       {label: 'Dec', value: 643},
//     ];
//     const data1 = [50, 10, 40, 95, 4, 24, 85, 91, 35, 53, 24, 50];
//     const data2 = [50, 10, 40, 95, 4, 35, 53, 24, 50];
//     const fill = 'rgb(134, 65, 244)';
//     return (
//       <View
//         style={{
//           // height: 200,
//           padding: 20,
//           flex: 1,
//           backgroundColor: 'pink',
//           justifyContent: 'center',
//         }}>
//         {/* <LineChart
//           style={{flex: 1}}
//           data={data1}
//           gridMin={0}
//           contentInset={{top: 10, bottom: 10}}
//           svg={{stroke: 'rgb(134, 65, 244)'}}>
//           <Grid />
//         </LineChart> */}
//         <BarChart
//           style={{height: 200, width: '100%'}}
//           data={data1}
//           svg={{fill: 'red', rx: 2}}
//           fill={'red'}
//           bandwidth={2}
//           animate={false}
//           cornerRadius={45}
//           spacingInner={0.8}
//           // yAccessor={({item}) => item.value}
//           // xAccessor={({item}) => 'item'}
//           stroke-linecap="round"
//           // contentInset={{top: 30, bottom: 30}}
//         >
//           <Grid />
//         </BarChart>
//         {/* <XAxis
//           // style={{marginHorizontal: -10}}
//           data={data1}
//           formatLabel={(value, index) => index}
//           contentInset={{left: 10, right: 10}}
//           svg={{fontSize: 10, fill: 'black'}}
//         /> */}
//         {/* <XAxis
//           style={{marginHorizontal: -10}}
//           data={data1}
//           formatLabel={(value, index) => index}
//           contentInset={{left: 10, right: 10}}
//           svg={{fontSize: 10, fill: 'black'}}
//         />
//         <XAxis
//           style={{marginHorizontal: -10}}
//           data={data1}
//           formatLabel={(value, index) => index}
//           contentInset={{left: 10, right: 10}}
//           svg={{fontSize: 10, fill: 'black'}}
//         />
//         <XAxis
//           style={{marginHorizontal: -10}}
//           data={data1}
//           formatLabel={(value, index) => index}
//           contentInset={{left: 10, right: 10}}
//           svg={{fontSize: 10, fill: 'black'}}
//         /> */}
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });
