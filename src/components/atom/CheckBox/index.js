import Check from '@react-native-community/checkbox';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, fonts } from '../../../assets';

const CheckBox = ({ label, value, onValueChange }) => {
  return (
    <View style={styles.container}>
      <Check disabled={false} value={value} onValueChange={onValueChange} />
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

export default CheckBox;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontFamily: fonts.Poppins.regular,
    fontSize: 12,
    color: colors.primaryBlack,
  },
});
