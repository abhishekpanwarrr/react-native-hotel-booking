import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {User} from '../Profile';
import {getUserFromLocalStorage} from '../../hooks/useStorage';
import {COLORS} from '../../constants/constant';

const Personal = () => {
  const [user, setUser] = useState<User>({} as User);

  useEffect(() => {
    (async () => {
      const user = await getUserFromLocalStorage('userInfo');
      if (user) {
        setUser(user);
      }
    })();
  }, []);
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <View
        style={{
          marginTop: 30,
          marginBottom: 20,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={{
            uri: 'https://images.pexels.com/photos/1906157/pexels-photo-1906157.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          }}
          width={80}
          height={80}
          borderRadius={100}
        />
        <Text style={{fontSize: 15, fontWeight: '800', marginTop: 10}}>
          {user?.fullName}
        </Text>
        <Text style={{fontSize: 13, fontWeight: '300'}}>{user?.email}</Text>
      </View>
      <View
        style={{
          marginVertical: 20,
          paddingHorizontal: 20,
          gap: 10,
        }}>
        <View
          style={{
            height: 48,
            backgroundColor: '#EAECCC',
            padding: 5,
            borderRadius: 5,
            gap: 5,
            paddingLeft: 10,
          }}>
          <Text
            style={{
              fontSize: 10,
              color: '#333',
            }}>
            Full Name
          </Text>
          <Text
            style={{
              fontSize: 15,
              fontWeight: '600',
              color: COLORS.darkBlue,
            }}>
            {user?.fullName}
          </Text>
        </View>

        <View
          style={{
            height: 48,
            backgroundColor: '#FFEFE8',
            padding: 5,
            borderRadius: 5,
            gap: 5,
            paddingLeft: 10,
          }}>
          <Text
            style={{
              fontSize: 10,
              color: '#333',
            }}>
            Email
          </Text>
          <Text
            style={{
              fontSize: 15,
              fontWeight: '600',
              color: COLORS.darkBlue,
            }}>
            {user?.email}
          </Text>
        </View>
        <View
          style={{
            height: 48,
            backgroundColor: '#FAEED1',
            padding: 5,
            borderRadius: 5,
            gap: 5,
            paddingLeft: 10,
          }}>
          <Text
            style={{
              fontSize: 10,
              color: '#333',
            }}>
            Address
          </Text>
          <Text
            style={{
              fontSize: 15,
              fontWeight: '600',
              color: COLORS.darkBlue,
            }}>
            {user?.address}
          </Text>
        </View>
        <View
          style={{
            height: 48,
            backgroundColor: '#F9E8D9',
            padding: 5,
            borderRadius: 5,
            gap: 5,
            paddingLeft: 10,
          }}>
          <Text
            style={{
              fontSize: 10,
              color: '#333',
            }}>
            User Id
          </Text>
          <Text
            style={{
              fontSize: 15,
              fontWeight: '600',
              color: COLORS.darkBlue,
            }}>
            {user?._id}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Personal;

const styles = StyleSheet.create({});
