import {
  SafeAreaView,
  StyleSheet,
  Switch,
  Text,
  View,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
import {COLORS} from '../../constants/constant';
import BackButtonContainer from '../../components/BackButtonContainer';

const Notification = ({navigation}: any) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  return (
    <SafeAreaView>
      <View
        style={{
          padding: 10,
        }}>
        {Platform.OS === 'android' && (
          <BackButtonContainer navigation={navigation} />
        )}
        <Text
          style={{
            fontSize: 18,
            textAlign: 'center',
            fontWeight: '700',
            marginBottom: 10,
            color: COLORS.darkBlue,
          }}>
          Notification
        </Text>
        {/* TIPS */}
        <View style={{marginTop: 20}}>
          <Text
            style={{
              fontSize: 12,
              fontWeight: '300',
              marginBottom: 10,
            }}>
            SPECIAL TIPS AND OFFERS
          </Text>
          <View
            style={{
              borderBottomWidth: 1,
              borderTopWidth: 0,
              borderLeftWidth: 0,
              borderRightWidth: 0,
              gap: 10,
              paddingHorizontal: 2,
              borderColor: '#ddd',
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text>Push Notification</Text>
              <Switch
                trackColor={{false: '#767577', true: '#81b0ff'}}
                thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                onValueChange={toggleSwitch}
                value={isEnabled}
                style={{transform: [{scaleX: 0.7}, {scaleY: 0.7}]}}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text>Email</Text>
              <Switch
                trackColor={{false: '#767577', true: '#81b0ff'}}
                thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                onValueChange={toggleSwitch}
                value={isEnabled}
                style={{transform: [{scaleX: 0.7}, {scaleY: 0.7}]}}
              />
            </View>
          </View>
        </View>
        {/* Activity */}
        <View style={{marginTop: 20}}>
          <Text
            style={{
              fontSize: 12,
              fontWeight: '300',
              marginBottom: 10,
            }}>
            ACTIVITY
          </Text>
          <View
            style={{
              borderBottomWidth: 1,
              borderTopWidth: 0,
              borderLeftWidth: 0,
              borderRightWidth: 0,
              gap: 10,
              paddingHorizontal: 2,
              borderColor: '#ddd',
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text>Push Notification</Text>
              <Switch
                trackColor={{false: '#767577', true: '#81b0ff'}}
                thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                onValueChange={toggleSwitch}
                value={isEnabled}
                style={{transform: [{scaleX: 0.7}, {scaleY: 0.7}]}}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text>Email</Text>
              <Switch
                trackColor={{false: '#767577', true: '#81b0ff'}}
                thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                onValueChange={toggleSwitch}
                value={isEnabled}
                style={{transform: [{scaleX: 0.7}, {scaleY: 0.7}]}}
              />
            </View>
          </View>
        </View>
        {/* REMINDERS */}
        <View style={{marginTop: 20}}>
          <Text
            style={{
              fontSize: 12,
              fontWeight: '300',
              marginBottom: 10,
            }}>
            REMINDERS
          </Text>
          <View
            style={{
              borderBottomWidth: 1,
              borderTopWidth: 0,
              borderLeftWidth: 0,
              borderRightWidth: 0,
              gap: 10,
              paddingHorizontal: 2,
              borderColor: '#ddd',
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text>Push Notification</Text>
              <Switch
                trackColor={{false: '#767577', true: '#81b0ff'}}
                thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                onValueChange={toggleSwitch}
                value={isEnabled}
                style={{transform: [{scaleX: 0.7}, {scaleY: 0.7}]}}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text>Email</Text>
              <Switch
                trackColor={{false: '#767577', true: '#81b0ff'}}
                thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                onValueChange={toggleSwitch}
                value={isEnabled}
                style={{transform: [{scaleX: 0.7}, {scaleY: 0.7}]}}
              />
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Notification;

const styles = StyleSheet.create({});
