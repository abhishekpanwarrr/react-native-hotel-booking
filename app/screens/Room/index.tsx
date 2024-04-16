import {
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

const Room = ({route}: any) => {
  const {hotel} = route.params;
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [startPicker, setStartPicker] = useState(false);
  const [endPicker, setEndPicker] = useState(false);
  const changedStartDate = dayjs(startDate).format('DD/MM/YYYY');
  const changedEndDate = dayjs(endDate).format('DD/MM/YYYY');
  const days = dayjs(endDate).diff(startDate);
  const roomforDays = days / (24 * 60 * 60 * 1000);

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <ImageBackground
        source={{uri: hotel?.imageUrl}}
        style={{width: '100%', height: 300}}></ImageBackground>
      <ScrollView
        style={{
          flex: 1,
          paddingHorizontal: 10,
        }}>
        <View
          style={{
            paddingTop: 10,
          }}>
          <Text
            style={{
              fontSize: 14,
              fontWeight: '600',
            }}
            numberOfLines={2}
            ellipsizeMode="clip">
            {hotel?.hotelName}
          </Text>
        </View>

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
      </ScrollView>
    </SafeAreaView>
  );
};

export default Room;

const styles = StyleSheet.create({});
