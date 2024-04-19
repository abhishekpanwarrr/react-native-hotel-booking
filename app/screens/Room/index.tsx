import {
  Alert,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
import {COLORS} from '../../constants/constant';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import dayjs from 'dayjs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome5';
import BackButtonContainer from '../../components/BackButtonContainer';

const Room = ({route, navigation}: any) => {
  const {hotel} = route.params;
  // console.log('🚀 ~ Room ~ hotel:', hotel);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [startPicker, setStartPicker] = useState(false);
  const [endPicker, setEndPicker] = useState(false);
  const changedStartDate = dayjs(startDate).format('DD/MM/YYYY');
  const changedEndDate = dayjs(endDate).format('DD/MM/YYYY');
  const days = dayjs(endDate).diff(startDate);
  const roomforDays = days / (24 * 60 * 60 * 1000);

  const calculateAverageRating = () => {
    let sum = 0;
    let totalCount = 0;

    hotel?.ratings.forEach((ratingObj: any) => {
      const ratingValue = parseInt(Object.keys(ratingObj)[0]);
      const count = ratingObj[ratingValue];
      sum += ratingValue * count;
      totalCount += count;
    });
    const averageRating = sum / totalCount;
    return averageRating.toFixed(2);
  };
  const averageRating = calculateAverageRating();
  const handlePress = () => {
    const currentDate = dayjs();
    const changedStartDateObj = dayjs(startDate);
    const changedEndDateObj = dayjs(endDate);
    if (changedStartDateObj.isSame(changedEndDateObj, 'day')) {
      return Alert.alert('Check in and check out dates cannot be the same');
    }
    if (changedStartDateObj.isBefore(currentDate, 'day')) {
      return Alert.alert('Select a date after today for check in date');
    }
    if (changedEndDateObj.isBefore(currentDate, 'day')) {
      return Alert.alert('Check out date cannot be before today');
    }
    if (changedEndDateObj.isBefore(changedStartDateObj, 'day')) {
      return Alert.alert('Check out date cannot be before check in date');
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <ImageBackground
        source={{uri: hotel?.imageUrl}}
        style={{width: '100%', height: 300}}>
        <BackButtonContainer navigation={navigation} iconText="room" />
        <View style={styles.priceContainer}>
          <View style={styles.hotelPrice}>
            <Text
              style={{
                color: 'white',
                fontSize: 15,
              }}>
              ₹ {hotel?.roomType[0]?.deluxe}
            </Text>
          </View>
          <View style={styles.rating}>
            <Ionicons name="star-half-outline" size={15} color={'white'} />
            <Text style={{color: 'white'}}>{averageRating}</Text>
          </View>
        </View>
      </ImageBackground>
      <ScrollView style={styles.scrollView}>
        {/* Hotel name and address */}
        <View style={styles.hotelNameContainer}>
          <Text style={styles.hotelName} numberOfLines={2} ellipsizeMode="clip">
            {hotel?.hotelName}
          </Text>
        </View>
        {/* Timiing */}
        <View style={styles.timingContainer}>
          <View style={styles.checkInContainer}>
            <Text style={styles.checkText}>CheckIn: </Text>
            <Text style={styles.checkTextValue}>
              {hotel?.timing[0]?.checkIn}
            </Text>
          </View>
          <View style={styles.checkOutContainer}>
            <Text style={styles.checkText}>CheckOut: </Text>
            <Text style={styles.checkTextValue}>
              {hotel?.timing[0]?.checkOut}
            </Text>
          </View>
        </View>
        {/* Amenities */}
        <View style={styles.amenitiesContainer}>
          <Text style={styles.amenitiesText}>Ameneties</Text>
          {hotel?.ameneties?.map(
            (item: {[s: string]: unknown} | ArrayLike<unknown>) => {
              return Object.entries(item).map(([key, value]: any) => {
                return (
                  <View key={key} style={styles.amenitiesItem}>
                    <Text style={{fontWeight: '700', fontSize: 14}}>{key}</Text>
                    <Text
                      style={{
                        color: COLORS.yellow,
                      }}>
                      {value === 'TbAirConditioning' ? (
                        <Icon name="fan" size={20} />
                      ) : value === 'MdOutlineWifi' ? (
                        <Icon name="wifi" size={20} />
                      ) : value === 'PiTelevisionLight' ? (
                        <Icon name="tv" size={20} />
                      ) : value === 'FaHotTub' ? (
                        <Icon name="hot-tub" size={20} />
                      ) : value === 'ImPowerCord' ? (
                        <Icon name="car-battery" size={20} />
                      ) : value === 'LuCheckCircle' ? (
                        <Icon name="door-closed" size={20} />
                      ) : null}
                    </Text>
                  </View>
                );
              });
            },
          )}
        </View>
        {/* Description of hoterl */}
        <View>
          <Text style={styles.descriptionTitle}>Description</Text>
          <Text>{hotel?.description}</Text>
        </View>
        {/* Hotel Policies */}
        <View style={styles.policiesContainer}>
          <Text style={styles.policiesTitle}>Hotel Policies:</Text>
          {hotel?.policies.map((policy: string, index: number) => (
            <Text key={index} style={{marginVertical: 3}}>
              📌 {policy}
            </Text>
          ))}
        </View>
        {/* Booking */}
        <View style={styles.buttonContainer}>
          <View
            style={{
              flex: 1,
            }}>
            <Text style={styles.checkButtonTitle}>Check In Date</Text>
            <TouchableOpacity
              style={styles.startButton}
              onPress={() => setStartPicker(true)}>
              <Text style={styles.checkButtonText}>
                {changedStartDate || 'From'}
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 1,
            }}>
            <Text style={styles.checkButtonTitle}>Check Out Date:</Text>
            <TouchableOpacity
              style={styles.endButton}
              onPress={() => setEndPicker(true)}>
              <Text style={styles.checkButtonText}>
                {changedEndDate || 'To'}
              </Text>
            </TouchableOpacity>
          </View>

          <DateTimePickerModal
            isVisible={startPicker}
            mode="date"
            onConfirm={(date: any) => {
              setStartDate(date);
              setStartPicker(false);
            }}
            onCancel={() => setStartPicker(false)}
          />
          <DateTimePickerModal
            isVisible={endPicker}
            mode="date"
            onConfirm={(date: any) => {
              setEndDate(date);
              setEndPicker(false);
            }}
            onCancel={() => setEndPicker(false)}
          />
        </View>
        {/* Book button */}
        <TouchableOpacity
          style={styles.bookButtonWrapper}
          onPress={handlePress}>
          <Text style={styles.bookButtonText}>Book Now</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Room;

const styles = StyleSheet.create({
  bookButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
  bookButtonWrapper: {
    marginVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.yellow,
    padding: 10,
    borderRadius: 20,
  },
  checkButtonTitle: {fontWeight: '600', marginVertical: 3},
  checkButtonText: {
    fontWeight: '700',
    color: 'white',
  },
  endButton: {
    backgroundColor: COLORS.darkBlue,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  startButton: {
    backgroundColor: COLORS.darkBlue,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 5,
  },
  policiesTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 10,
    textDecorationLine: 'underline',
  },
  policiesContainer: {
    backgroundColor: '#fafafa',
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderRadius: 8,
    marginTop: 30,
  },
  descriptionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginVertical: 10,
    textDecorationLine: 'underline',
    color: COLORS.darkBlue,
  },
  amenitiesItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
    borderBottomWidth: 1,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
    paddingVertical: 5,
    borderColor: '#eee',
  },
  amenitiesText: {
    fontSize: 16,
    fontWeight: '700',
    textDecorationLine: 'underline',
    marginBottom: 10,
  },
  amenitiesContainer: {
    marginVertical: 10,
    backgroundColor: '#FAFAFA',
    paddingVertical: 10,
    paddingHorizontal: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 30,
    borderRadius: 10,
  },
  checkTextValue: {fontWeight: '400'},
  checkText: {fontWeight: '700', fontSize: 16},
  checkOutContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  checkInContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timingContainer: {
    backgroundColor: '#fafafa',
    marginTop: 20,
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    gap: 5,
    borderRadius: 10,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 10,
  },
  hotelNameContainer: {
    paddingTop: 10,
  },
  hotelName: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.darkBlue,
  },
  rating: {
    backgroundColor: COLORS.yellow,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 30,
    flexDirection: 'row',
    height: 30,
    gap: 3,
    width: 70,
    paddingHorizontal: 10,
    marginRight: 8,
  },
  hotelPrice: {
    backgroundColor: COLORS.darkBlue,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 30,
  },
  priceContainer: {
    position: 'absolute',
    bottom: -50,
    left: 0,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    top: Platform.OS === 'android' ? '60%' : '65%',
    marginHorizontal: 5,
  },
});
