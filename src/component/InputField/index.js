import {View, TouchableOpacity, TextInput, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {COLORS} from '../../assets/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {moderateScale} from 'react-native-size-matters';

const InputField = ({
  label,
  icon,
  inputType,
  keyboardType,
  onChangeText,
  onBlur,
  value,
  password = false,
  secureTextEntry = false,
}) => {
  const [seen, setSeen] = useState(false);
  const seenPassword = () => {
    if (seen) {
      setSeen(false);
    } else {
      setSeen(true);
    }
  };

  return (
    <View style={stylesInputField.contain}>
      {icon}
      {inputType === 'password' ? (
        <TextInput
          placeholder={label}
          keyboardType={keyboardType}
          style={stylesInputField.input}
          secureTextEntry={secureTextEntry && !seen ? true : false}
          onChangeText={onChangeText}
          onBlur={onBlur}
          value={value}
        />
      ) : (
        <TextInput
          placeholder={label}
          keyboardType={keyboardType}
          style={stylesInputField.input}
          onChangeText={onChangeText}
          onBlur={onBlur}
          value={value}
        />
      )}
      {password ? (
        <TouchableOpacity onPress={seenPassword}>
          <AntDesign
            name={seen ? 'eye' : 'eyeo'}
            color={COLORS.gray}
            size={20}
            style={stylesInputField.eyeIcon}
          />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default InputField;

const stylesInputField = StyleSheet.create({
  contain: {
    flexDirection: 'row',
    borderBottomColor: COLORS.gray,
    borderBottomWidth: moderateScale(1),
    paddingBottom: moderateScale(8),
    marginBottom: moderateScale(25),
  },
  input: {flex: 1, paddingVertical: 0},
  eyeIcon: {
    marginHorizontal: moderateScale(10),
  },
});
