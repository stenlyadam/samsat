import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors, fonts, IconPlus} from '../../assets';

const AddPicture = ({text}) => {
  return (
    <View style={styles.addPicture}>
      <IconPlus style={styles.iconPlus} />
      <Text style={styles.addPictureText}>{text}</Text>
    </View>
  );
};

export default AddPicture;

const styles = StyleSheet.create({
  addPicture: {
    height: 100,
    width: 100,
    backgroundColor: colors.lightGrey,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  addPictureText: {
    fontFamily: fonts.Poppins.regular,
    fontSize: 12,
    color: colors.white,
    position: 'absolute',
    bottom: 13,
  },
});
