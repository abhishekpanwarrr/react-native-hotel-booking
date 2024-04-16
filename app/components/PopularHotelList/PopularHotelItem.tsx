import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../constants/constant';
import {useNavigation} from '@react-navigation/native';

const PopularHotelItem = ({hotel}: any) => {
  const navigation = useNavigation();
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

  return (
    <TouchableOpacity
    // @ts-ignore
      onPress={() => navigation.navigate('Room',{hotel})}
      style={{
        width: 200,
        height: 260,
        marginRight: 10,
        backgroundColor: '#fafafe',
        borderRadius: 10,
      }}>
      <Image
        source={{
          uri: hotel?.imageUrl,
        }}
        alt="Hotel Image"
        width={200}
        height={150}
      />
      {/* Hotel name and address */}
      <View
        style={{
          paddingHorizontal: 5,
        }}>
        <Text
          style={{
            color: 'black',
            fontSize: 15,
            marginVertical: 3,
            fontWeight: '600',
          }}
          numberOfLines={2}>
          {hotel?.hotelName}
        </Text>
        <Text
          style={{color: 'black', fontSize: 12, marginTop: 7}}
          lineBreakMode="clip"
          numberOfLines={1}>
          {hotel?.address}
        </Text>
      </View>
      {/* Price and ratings */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 10,
          paddingHorizontal: 5,
        }}>
        <Text>{hotel?.roomType[0]?.deluxe} /night</Text>
        <Text>
          <Ionicons name="star-half-outline" color={COLORS.yellow} />{' '}
          {averageRating}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default PopularHotelItem;

const styles = StyleSheet.create({});
