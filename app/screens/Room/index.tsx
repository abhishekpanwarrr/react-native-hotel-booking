import {
  Alert,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {COLORS} from '../../constants/constant';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import dayjs from 'dayjs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome5';

const Room = ({route}: any) => {
  const {hotel} = route.params;
  console.log('🚀 ~ Room ~ hotel:', hotel);
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
      return Alert.alert('Start and end dates cannot be the same');
    }
    if (changedStartDateObj.isBefore(currentDate, 'day')) {
      return Alert.alert('Select a date after today for start date');
    }
    if (changedEndDateObj.isBefore(currentDate, 'day')) {
      return Alert.alert('End date cannot be before today');
    }
    if (changedEndDateObj.isBefore(changedStartDateObj, 'day')) {
      return Alert.alert('End date cannot be before start date');
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
        <View
          style={{
            backgroundColor: COLORS.yellow,
            height: 30,
            width: 70,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 30,
            flexDirection: 'row',
            gap: 3,
            top: '65%',
            left: '100%',
          }}>
          <Ionicons name="star-half-outline" size={15} color={'white'} />
          <Text style={{color: 'white'}}>{averageRating}</Text>
        </View>
      </ImageBackground>
      <ScrollView
        style={{
          flex: 1,
          paddingHorizontal: 10,
        }}>
        {/* Hotel name and address */}
        <View
          style={{
            paddingTop: 10,
          }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: '800',
              color: COLORS.darkBlue,
            }}
            numberOfLines={2}
            ellipsizeMode="clip">
            {hotel?.hotelName}
          </Text>
        </View>
        {/* Amenities */}
        <View
          style={{
            marginVertical: 10,
            backgroundColor: '#FAFAFA',
            paddingVertical: 10,
            paddingHorizontal: 5,
            shadowColor: '#000',
            shadowOpacity: 0.1,
            shadowRadius: 30,
            borderRadius: 10,
          }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '700',
              textDecorationLine: 'underline',
              marginBottom: 10,
              textAlign: 'center',
            }}>
            Ameneties
          </Text>
          {hotel?.ameneties?.map(
            (item: {[s: string]: unknown} | ArrayLike<unknown>) => {
              return Object.entries(item).map(([key, value]: any) => {
                return (
                  <View
                    key={key}
                    style={{
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
                    }}>
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
          <Text
            style={{
              fontSize: 16,
              fontWeight: '700',
              marginVertical: 10,
              textDecorationLine: 'underline',
              color: COLORS.darkBlue,
            }}>
            Description
          </Text>
          <Text>{hotel?.description}</Text>
        </View>

        {/* Timiing */}
        <View
          style={{
            backgroundColor: '#fafafa',
            marginVertical: 20,
            paddingHorizontal: 5,
            gap: 5,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={{fontWeight: '600'}}>CheckIn: </Text>
            <Text style={{fontWeight: '400'}}>{hotel?.timing[0]?.checkIn}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={{fontWeight: '600'}}>CheckOut: </Text>
            <Text
              style={{
                fontWeight: '400',
              }}>
              {hotel?.timing[0]?.checkOut}
            </Text>
          </View>
        </View>
        {/* Booking */}
        <View
          style={{
            marginVertical: 10,
            flexDirection: 'row',
            gap: 5,
          }}>
          <TouchableOpacity
            style={{
              backgroundColor: COLORS.yellow,
              height: 30,
              justifyContent: 'center',
              alignItems: 'center',
              width: '50%',
            }}
            onPress={() => setStartPicker(true)}>
            <Text
              style={{
                fontWeight: '700',
                color: 'white',
              }}>
              {changedStartDate || 'From'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: COLORS.darkBlue,
              height: 30,
              justifyContent: 'center',
              alignItems: 'center',
              width: '50%',
            }}
            onPress={() => setEndPicker(true)}>
            <Text
              style={{
                fontWeight: '700',
                color: 'white',
              }}>
              {changedEndDate || 'To'}
            </Text>
          </TouchableOpacity>

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
          style={{
            marginVertical: 20,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: COLORS.yellow,
            padding: 10,
            borderRadius: 20,
          }}
          onPress={handlePress}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: '600',
              color: 'white',
            }}>
            Book Now
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Room;

const styles = StyleSheet.create({});
