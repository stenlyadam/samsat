import React from 'react';
import {View, StyleSheet, Text, TextInput as Input} from 'react-native';
import {colors, fonts} from '../../../assets';

const TextInput = props => {
  const {
    title,
    paddingHorizontal = 55,
    height = 43,
    onChangeText,
    value,
    ...rest
  } = props;
  return (
    <View style={styles.textInputContainer(paddingHorizontal)}>
      <Text style={styles.textInputTitle}>{title}</Text>
      <Input
        style={styles.textInput(height)}
        onChangeText={onChangeText}
        value={value}
        {...rest}
      />
    </View>
  );
};

export default TextInput;

const styles = StyleSheet.create({
  textInputContainer: paddingHorizontal => ({
    width: '100%',
    paddingHorizontal: paddingHorizontal,
  }),
  textInput: height => ({
    borderWidth: 1,
    borderColor: colors.primaryRed,
    borderRadius: 15,
    height: height,
  }),
  textInputTitle: {
    fontFamily: fonts.Poppins.regular,
    fontSize: 14,
    color: colors.primaryBlack,
    marginBottom: 8,
  },
});
