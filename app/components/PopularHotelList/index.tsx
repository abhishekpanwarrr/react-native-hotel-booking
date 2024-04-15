import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {useQuery} from '@tanstack/react-query';
import {handleFetchHotel} from '../../utils/util';
import {COLORS} from '../../constants/constant';
import PopularHotelItem from './PopularHotelItem';

const PopularHotelList = () => {
  const {data, isLoading, isError} = useQuery({
    queryKey: ['popularHotels'],
    queryFn: handleFetchHotel,
  });
  
  if (isLoading) {
    return <ActivityIndicator size={'large'} color={COLORS.darkBlue} />;
  }
  if (isError) {
    return <Text style={{textAlign: 'center'}}>Something went wrong!</Text>;
  }
  return (
    <View>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={data?.hotels || []}
        keyExtractor={item => item._id}
        renderItem={({item}) => <PopularHotelItem hotel={item} />}
      />
    </View>
  );
};

export default PopularHotelList;

const styles = StyleSheet.create({});
