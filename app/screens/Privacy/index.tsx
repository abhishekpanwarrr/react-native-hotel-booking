import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import BackButtonContainer from '../../components/BackButtonContainer';

const Privacy = ({navigation}: any) => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <BackButtonContainer navigation={navigation} />
      <View
        style={{
          marginTop: 30,
          marginBottom: 20,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text>Privacy</Text>
      </View>
    </SafeAreaView>
  );
};

export default Privacy;

const styles = StyleSheet.create({});
