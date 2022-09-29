import {StyleSheet, Text} from 'react-native';
import React from 'react';

const Roboto = ({style, children, type = 'Regular', numberOfLines = 0}) => {
  const beStyle = Array.isArray(style) ? Object.assign({}, ...style) : style;
  const styles = StyleSheet.create({
    robotoStyle: {
      fontFamily: `Roboto-${type}`,
    },
  });
  return (
    <Text
      ellipsizeMode="tail"
      numberOfLines={numberOfLines}
      style={[styles.robotoStyle, {...beStyle}]}>
      {children}
    </Text>
  );
};

export default Roboto;
