import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {sepedaIcon} from '../../assets/Image';
import {moderateScale} from 'react-native-size-matters';

const CustomMarker = ({onPress}) => {
  return (
    <View style={styles.wrap}>
      <TouchableOpacity onPress={onPress}>
        <Image source={sepedaIcon} style={[styles.image]} />
      </TouchableOpacity>
    </View>
  );
};

export default CustomMarker;

const styles = StyleSheet.create({
  wrap: {
    height: moderateScale(50),
    width: moderateScale(50),
    borderRadius: moderateScale(20),
  },
  image: {
    height: moderateScale(50),
    width: moderateScale(50),
    borderRadius: moderateScale(20),
  },
});
