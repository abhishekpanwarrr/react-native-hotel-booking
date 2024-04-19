import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {getUserFromLocalStorage} from '../../hooks/useStorage';
import {useEffect, useState} from 'react';
import {COLORS, USER_PROFILE_ITEMS} from '../../constants/constant';
import Ionicons from 'react-native-vector-icons/Ionicons';

export interface User {
  __v: number;
  _id: string;
  address: string;
  createdAt: string;
  email: string;
  fullName: string;
  likedHotel: [];
  updatedAt: string;
}

const Profile = ({navigation}: any) => {
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
      <View style={styles.imageWrapper}>
        <Image
          source={{
            uri: 'https://images.pexels.com/photos/1906157/pexels-photo-1906157.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          }}
          width={80}
          height={80}
          borderRadius={100}
        />
        <Text style={{fontSize: 16, fontWeight: '800', marginTop: 10}}>
          {user?.fullName}
        </Text>
        <Text style={{fontSize: 13, fontWeight: '300'}}>{user?.email}</Text>
      </View>
      {/* All Links */}
      {USER_PROFILE_ITEMS?.map(profile => (
        <TouchableOpacity
          key={profile.id}
          onPress={() => navigation.navigate(profile?.route)}
          style={styles.profileItemButton}>
          <View style={styles.profileItemButtonIconTextWrapper}>
            <Ionicons
              name={profile.icon}
              size={30}
              color={profile.title === 'Logout' ? 'red' : COLORS.darkBlue}
            />
            <Text
              style={[
                styles.buttonText,
                {color: profile.title === 'Logout' ? 'red' : COLORS.darkBlue},
              ]}>
              {profile.title}
            </Text>
          </View>
          <View>
            <Ionicons
              name="chevron-forward-outline"
              size={20}
              color={COLORS.darkBlue}
            />
          </View>
        </TouchableOpacity>
      ))}
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  imageWrapper: {
    marginTop: 30,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: '600',
  },
  profileItemButtonIconTextWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
  },
  profileItemButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    marginTop: 10,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    paddingBottom: 5,
    paddingHorizontal: 10,
  },
});
