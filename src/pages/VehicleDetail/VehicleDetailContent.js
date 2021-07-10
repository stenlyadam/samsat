import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, fonts } from '../../assets';
const VehicleDetailContent = ({ title, content }) => {
  return (
    <View style={styles.vehicleDetail}>
      <Text style={styles.vehicleDetailTitle}>{title}</Text>
      <Text style={styles.vehicleDetailContent}>{content}</Text>
    </View>
  );
};

export default VehicleDetailContent;

const styles = StyleSheet.create({
  vehicleDetail: {
    width: 166,
    borderBottomColor: colors.lightGrey,
    borderBottomWidth: 2,
    marginVertical: 10,
  },
  vehicleDetailTitle: {
    fontFamily: fonts.Poppins.medium,
    fontSize: 12,
    color: colors.darkGrey,
  },
  vehicleDetailContent: {
    fontFamily: fonts.Poppins.medium,
    fontSize: 15,
    color: colors.darkGrey,
  },
});
