import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
type Props = {
  navigation: any;
  iconText?: string;
};
const BackButtonContainer = ({navigation, iconText}: Props) => {
  return (
    <View style={styles.backButtonContainer}>
      <TouchableOpacity
        style={styles.imageButton}
        onPressIn={() => navigation.goBack()}>
        <Icon size={20} name="chevron-left" color={'#F6995C'} />
      </TouchableOpacity>
      {iconText && (
        <TouchableOpacity style={styles.imageButton} onPress={() => {}}>
          <Icon
            name="heart"
            size={20}
            style={{
              color: '#F6995C',
            }}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default BackButtonContainer;

const styles = StyleSheet.create({
  backButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    marginHorizontal: 10,
  },
  imageButton: {
    width: 40,
    height: 40,
    backgroundColor: '#ddd',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    borderRadius: 30,
  },
});
