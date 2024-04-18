import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../constants/constant';
import PopularHotelList from '../../components/PopularHotelList';

const HomeScreen = () => {
  const [search, setSearch] = useState('');
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <ScrollView
        style={{
          flex: 1,
          paddingHorizontal: 10,
          paddingTop: 5,
        }}>
        {/* User Box */}
        <View style={styles.userBox}>
          <View
            style={{
              flexDirection: 'row',
              gap: 10,
            }}>
            <Image
              source={{
                uri: 'https://images.pexels.com/photos/1906157/pexels-photo-1906157.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
              }}
              style={styles.userImage}
            />
            <View style={styles.userDetails}>
              <Text style={{fontSize: 12, fontWeight: '400'}}>HELLO THERE</Text>
              <Text style={{fontSize: 14, fontWeight: '600'}}>
                {' '}
                Abhishek Panwar{' '}
              </Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => {}}>
            <Ionicons name="person-outline" color={COLORS.yellow} size={30} />
          </TouchableOpacity>
        </View>
        {/* Search bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={25} color={COLORS.yellow} />
          <TextInput
            placeholderTextColor={COLORS.blue}
            style={styles.searchInput}
            onChangeText={value => setSearch(value)}
            placeholder="Search..."
            value={search}
          />
        </View>
        {/* Popular hotels */}
        <Text
          style={{
            marginVertical: 15,
            fontSize: 18,
            fontWeight: '700',
            textDecorationLine: 'underline',
            textDecorationStyle: 'solid',
          }}>
          Popular Hotel list{' '}
        </Text>
        <PopularHotelList />
        {/* Newly added hotels */}
        <Text
          style={{
            marginVertical: 15,
            fontSize: 18,
            fontWeight: '700',
            textDecorationLine: 'underline',
            textDecorationStyle: 'double',
          }}>
          New added hotel{' '}
        </Text>
        <PopularHotelList />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  searchContainer: {
    display: 'flex',
    flexDirection: 'row',
    borderWidth: 1,
    alignItems: 'center',
    paddingLeft: 5,
    marginVertical: 20,
    borderRadius: 5,
    borderColor: '#999',
  },
  searchInput: {
    color: COLORS.darkBlue,
    height: 40,
    paddingLeft: 1,
    width: 90,
  },
  userDetails: {
    display: 'flex',
    gap: 1,
    justifyContent: 'center',
  },
  userBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    gap: 10,
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 30,
  },
});
