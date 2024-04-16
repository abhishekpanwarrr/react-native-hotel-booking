import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {COLORS} from '../../constants/constant';
import DateTimePicker from 'react-native-ui-datepicker';
import dayjs from 'dayjs';

const Room = ({route}: any) => {
  const {hotel} = route.params;
  const [date, setDate] = useState(dayjs());
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
        <View>
          <DateTimePicker
            mode="range"
            date={date}
            onChange={params => setDate(params.date)}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Room;

const styles = StyleSheet.create({});
