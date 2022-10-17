import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  Platform,
  Dimensions,
} from 'react-native';
import moment from 'moment/moment';
import Header from '../../Reuseable Components/Header';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';

const CreateChallenges = ({navigation, route}) => {
  const [membersList, setMembersList] = useState([
    {
      id: 0,
      group_name: 'Naomi',
    },
    {
      id: 1,
      group_name: 'Naomi',
    },
    {
      id: 2,
      group_name: 'Naomi',
    },
    {
      id: 3,
      group_name: 'Naomi',
    },
    {
      id: 4,
      group_name: 'Naomi',
    },
    {
      id: 5,
      group_name: 'Naomi',
    },
    {
      id: 6,
      group_name: 'Naomi',
    },
    {
      id: 7,
      group_name: 'Naomi',
    },
  ]);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Apple', value: 'apple'},
    {label: 'Banana', value: 'banana'},
  ]);
  // challenges list
  const [isTypeOpen, setIsTypeOpen] = useState(false);
  const [challengeTypes, setChallengeTypes] = useState([
    {label: 'Individual Challenge', value: 'Individual Challenge'},
    {label: 'Group Challenge', value: 'Group Challenge'},
  ]);
  const [selectedChallengeType, setSelectedChallengeType] = useState(
    challengeTypes[0].value,
  );

  //challenges visibility
  const [isVisibilityOpen, setIsVisibilityOpen] = useState(false);
  const [challengeVisibilities, setChallengeVisibilities] = useState([
    {label: 'Public', value: 'Public'},
    {label: 'Private', value: 'Private'},
  ]);
  const [selectedVisibility, setSelectedVisibility] = useState(
    challengeVisibilities[0].value,
  );

  //challenges entry
  const [isEntryOpen, setIsEntryOpen] = useState(false);
  const [entriesList, setEntriesList] = useState([
    {label: 'Anyone can join', value: 'Anyone can join'},
    {label: 'Permission Required', value: 'Permission Required'},
  ]);
  const [selectedEntry, setSelectedEntry] = useState(entriesList[0]?.value);

  //setps list
  const [isMetricopen, setIsMetricopen] = useState(false);
  const [metricList, setMetricList] = useState([
    {label: 'Total Steps', value: 'Total Steps'},
  ]);

  const [selectedMetric, setselectedMetric] = useState(metricList[0]?.value);

  const [isStartDatePickerShow, setIsStartDatePickerShow] = useState(false);
  const [isEndDatePickerShow, setIsEndDatePickerShow] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const onStartDateChange = (event, value) => {
    setStartDate(value);
    setIsStartDatePickerShow(false);
  };
  const onEndDateChange = (event, value) => {
    setEndDate(value);
    setIsEndDatePickerShow(false);
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
        <Header title={'Create Challenge'} navigation={navigation} />
        <View style={{marginVertical: 10, alignItems: 'center'}}>
          <View style={{}}>
            <Image
              source={require('../../../assets/images/Challenge.png')}
              style={{
                marginVertical: 10,
                height: 123,
                width: 123,
              }}
            />
            <Image
              source={require('../../../assets/images/camera.png')}
              style={{
                width: 30,
                height: 28,
                resizeMode: 'contain',
                position: 'absolute',
                right: 0,
                top: 20,
              }}
            />
          </View>

          <Text style={{color: '#000000', fontSize: 17}}>Challenge image</Text>
        </View>
        {/* ----------------------------------Create Challenge Form Start---------------------------------------- */}
        <View>
          <View style={styles.textInputView}>
            <Text style={styles.textInputHeading}>Challenge Name</Text>
            <TextInput
              style={styles.textInput}
              placeholder={'Enter Challenge Name'}
            />
          </View>
          <View style={styles.textInputView}>
            <Text style={styles.textInputHeading}>Challenge Type</Text>
            <DropDownPicker
              zIndex={isTypeOpen ? 999 : 0}
              open={isTypeOpen}
              value={selectedChallengeType}
              items={challengeTypes}
              setOpen={setIsTypeOpen}
              setValue={setSelectedChallengeType}
              setItems={setChallengeTypes}
              containerStyle={{
                width: '100%',
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
              }}
              style={{
                borderRadius: 4,
                borderWidth: 1,
                borderColor: '#ccc',
                alignSelf: 'center',
                justifyContent: 'center',
              }}
            />
            {/* <TextInput
              style={styles.textInput}
              placeholder={'Enter Challenge Name'}
            /> */}
          </View>
          <View style={styles.textInputView}>
            <Text style={styles.textInputHeading}>Challenge Visibility</Text>
            <DropDownPicker
              zIndex={isVisibilityOpen ? 999 : 0}
              open={isVisibilityOpen}
              value={selectedVisibility}
              items={challengeVisibilities}
              setOpen={setIsVisibilityOpen}
              setValue={setSelectedVisibility}
              setItems={setChallengeVisibilities}
              containerStyle={{
                width: '100%',
              }}
              dropDownContainerStyle={{
                padding: 0,
                alignSelf: 'center',
                borderWidth: 1,
                borderColor: '#ccc',
                borderRadius: 4,
              }}
              showTickIcon={false}
              selectedItemContainerStyle={{
                backgroundColor: '#0496ff',
                marginHorizontal: 5,
              }}
              selectedItemLabelStyle={{
                color: '#FFF',
              }}
              labelStyle={{
                fontSize: 14,
                textAlign: 'left',
                paddingLeft: 5,
              }}
              style={{
                borderRadius: 4,
                borderWidth: 1,
                borderColor: '#ccc',
                alignSelf: 'center',
                justifyContent: 'center',
              }}
            />
            {/* <TextInput
              style={styles.textInput}
              placeholder={'Enter Challenge Name'}
            /> */}
          </View>
          {/* <View style={styles.textInputView}>
            <Text style={styles.textInputHeading}>Challenge Visibility</Text>
            <TextInput
              style={styles.textInput}
              placeholder={'Enter Challenge Name'}
            />
          </View> */}

          <View style={styles.textInputView}>
            <Text style={styles.textInputHeading}>Challenge Entry</Text>
            <DropDownPicker
              zIndex={isEntryOpen ? 999 : 0}
              open={isEntryOpen}
              value={selectedEntry}
              items={entriesList}
              setOpen={setIsEntryOpen}
              setValue={setSelectedEntry}
              setItems={setEntriesList}
              containerStyle={{
                width: '100%',
              }}
              dropDownContainerStyle={{
                padding: 0,
                alignSelf: 'center',
                borderWidth: 1,
                borderColor: '#ccc',
                borderRadius: 4,
              }}
              showTickIcon={false}
              selectedItemContainerStyle={{
                backgroundColor: '#0496ff',
                marginHorizontal: 5,
              }}
              selectedItemLabelStyle={{
                color: '#FFF',
              }}
              labelStyle={{
                fontSize: 14,
                textAlign: 'left',
                paddingLeft: 5,
              }}
              style={{
                borderRadius: 4,
                borderWidth: 1,
                borderColor: '#ccc',
                alignSelf: 'center',
                justifyContent: 'center',
              }}
            />
          </View>

          {/* <View style={styles.textInputView}>
            <Text style={styles.textInputHeading}>Challenge Entry</Text>
            <TextInput
              style={styles.textInput}
              placeholder={'Enter Challenge Name'}
            />
          </View> */}
          <View style={styles.textInputView}>
            <Text style={styles.textInputHeading}>Start Date</Text>
            <View style={{justifyContent: 'center'}}>
              <TextInput
                style={{...styles.textInput, paddingRight: 40}}
                placeholder={'mm/dd/yyyy'}
                value={moment(new Date(startDate)).format('MM/DD/yyyy')}
              />
              <TouchableOpacity
                onPress={() => setIsStartDatePickerShow(true)}
                style={{
                  position: 'absolute',
                  right: 0,
                  padding: 10,
                }}>
                <Image
                  source={require('../../../assets/images/calender.png')}
                  style={{width: 15, height: 17}}
                />
              </TouchableOpacity>
              {isStartDatePickerShow === true && (
                <DateTimePicker
                  value={startDate}
                  mode={'date'}
                  display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                  is24Hour={true}
                  onChange={onStartDateChange}
                  style={styles.datePicker}
                />
              )}
            </View>
          </View>
          <View style={styles.textInputView}>
            <Text style={styles.textInputHeading}>End Date</Text>
            <View style={{justifyContent: 'center'}}>
              <TextInput
                style={{...styles.textInput, paddingRight: 40}}
                placeholder={'mm/dd/yyyy'}
                value={moment(new Date(endDate)).format('MM/DD/yyyy')}
              />
              <TouchableOpacity
                onPress={() => setIsEndDatePickerShow(true)}
                style={{
                  position: 'absolute',
                  right: 0,
                  padding: 10,
                }}>
                <Image
                  source={require('../../../assets/images/calender.png')}
                  style={{width: 15, height: 17}}
                />
              </TouchableOpacity>
              {isEndDatePickerShow === true && (
                <DateTimePicker
                  value={endDate}
                  mode={'date'}
                  display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                  is24Hour={true}
                  onChange={onEndDateChange}
                  style={styles.datePicker}
                />
              )}
            </View>
          </View>

          <View style={styles.textInputView}>
            <Text style={styles.textInputHeading}>Challenge Metric</Text>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <TextInput
                style={{...styles.textInput, flex: 1, marginRight: 20}}
                placeholder={'Number'}
              />
              {/* <TextInput
                style={{...styles.textInput, flex: 1}}
                placeholder={'Total steps'}
              /> */}
              <DropDownPicker
                zIndex={999}
                open={isMetricopen}
                value={selectedMetric}
                items={metricList}
                setOpen={setIsMetricopen}
                setValue={setselectedMetric}
                setItems={setMetricList}
                containerStyle={{
                  // width: '100%',
                  flex: 1.4,
                }}
                dropDownContainerStyle={{
                  padding: 0,
                  alignSelf: 'center',
                  borderWidth: 1,
                  borderColor: '#ccc',
                  borderRadius: 4,
                }}
                showTickIcon={false}
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
                }}
                style={{
                  borderRadius: 4,
                  borderWidth: 1,
                  borderColor: '#ccc',
                  alignSelf: 'center',
                  justifyContent: 'center',
                }}
              />
            </View>
          </View>
        </View>
        {/* ----------------------------------Create Challenge Form END------------------------------------------ */}
        <View>
          <Text style={{color: '#000000', fontSize: 17}}>Add Members</Text>
          <View
            style={{
              marginVertical: 15,
              paddingBottom: 10,
              alignSelf: 'center',
            }}>
            <FlatList
              data={membersList}
              numColumns={3}
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              renderItem={item => {
                return (
                  <View
                    style={{
                      ...styles.cardView,
                      justifyContent: 'center',
                      // flex: 1 / 3,
                      width: '28.5%',
                      // width: Dimensions.get('window').width / 4,
                    }}>
                    <Image
                      source={require('../../../assets/images/friend-profile.png')}
                      style={{marginVertical: 8, width: 44, height: 44}}
                    />
                    <Text style={styles.cardText}>{item.item.group_name}</Text>
                  </View>
                );
              }}
            />
          </View>
        </View>
        <TouchableOpacity style={styles.btn}>
          <Text style={styles.btnText}>Create Group</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default CreateChallenges;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  textInputView: {
    marginVertical: 12,
  },
  textInputHeading: {
    color: '#000000',
    fontSize: 17,
    marginVertical: 5,
    marginBottom: 15,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 9,
    paddingHorizontal: 17,
    borderRadius: 5,
  },
  cardView: {
    height: 110,
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
    color: '#040103',
    textAlign: 'center',
    fontSize: 13,
  },

  btn: {
    backgroundColor: '#38acff',
    marginTop: 30,
    marginBottom: 40,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  btnText: {color: '#ffffff', fontSize: 17},
});
