import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {ORDERS} from '../../data';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../constants/constant';

const MyTrips = () => {
  return (
    <SafeAreaView style={styles.scrollView}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={ORDERS || []}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => <Order item={item} />}
      />
    </SafeAreaView>
  );
};

export default MyTrips;

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    paddingHorizontal: 10,
  },
});

function Order({item}: any) {
  return (
    <View
      style={{
        backgroundColor: '#fafafa',
        width: '100%',
        height: 200,
        marginBottom: 20,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginVertical: 10,
          borderBottomColor: '#eee',
          borderTopWidth: 0,
          borderLeftWidth: 0,
          borderRightWidth: 0,
          borderWidth: 1,
          paddingBottom: 5,
        }}>
        <Text>Ordre Id: {item.orderId}</Text>
        <Ionicons
          name="ellipsis-vertical-outline"
          size={30}
          color={COLORS.darkBlue}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 5,
        }}>
        <View style={{flexDirection: 'row', gap: 10}}>
          <Image
            source={{
              uri: item.imageUrl,
            }}
            width={40}
            height={40}
            borderRadius={5}
          />
          <View>
            <Text numberOfLines={2} lineBreakMode="clip">
              {item?.hotelName}
            </Text>
          </View>
        </View>
        <Text
          style={{
            backgroundColor: '#ddd',
            paddingVertical: 3,
            paddingHorizontal: 10,
            color: 'green',
            fontSize: 14,
          }}>
          {item?.status}
        </Text>
      </View>

      <View
        style={{
          marginTop: 20,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text style={{fontSize: 16, color: '#333'}}>Plan details</Text>
        <Text style={{fontSize: 16, color: COLORS.darkBlue, fontWeight: '700'}}>
          ₹{item?.price} / night
        </Text>
      </View>

      <TouchableOpacity
        style={{
          backgroundColor: COLORS.darkBlue,
          marginTop: 20,
          height: 40,
          borderRadius: 30,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text
          style={{
            color: 'white',
            fontSize: 16,
          }}>
          See Voucher
        </Text>
      </TouchableOpacity>
    </View>
  );
}
