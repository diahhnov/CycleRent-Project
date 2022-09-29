import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {moderateScale} from 'react-native-size-matters';
import {COLORS} from '../../assets/Colors';
import {kameraPic} from '../../assets/Image';

const ButtonCamera = ({onPress, url, disabled = false}) => {
  if (disabled) {
    return (
      <View style={styles.container}>
        <View style={styles.toButtonCamera}>
          <Image
            source={url ? {uri: url} : kameraPic}
            style={url ? styles.urlCamera : styles.imageCamera}
          />
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.toButtonCamera} onPress={onPress}>
          <Image
            source={url ? {uri: url} : kameraPic}
            style={url ? styles.urlCamera : styles.imageCamera}
          />
        </TouchableOpacity>
      </View>
    );
  }
};

export default ButtonCamera;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  toButtonCamera: {
    padding: moderateScale(5),
    margin: moderateScale(10),
    justifyContent: 'center',
    alignItems: 'center',
    width: moderateScale(120),
    height: moderateScale(120),
    borderRadius: moderateScale(20),
    backgroundColor: COLORS.grayLight,
  },
  imageCamera: {
    width: moderateScale(30),
    height: moderateScale(30),
  },
  urlCamera: {
    width: moderateScale(120),
    height: moderateScale(120),
    borderRadius: moderateScale(20),
  },
});
