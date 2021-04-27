import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {colors, fonts, IconInfo, IMGVehicle} from '../../assets';

const Content = ({item}) => {
  return (
    <View style={styles.timeSectionContentContainer}>
      <Image source={IMGVehicle} style={styles.image} />
      <Text style={styles.informationText}>
        <Text style={styles.bold}>{item.days}</Text> lagi batas pembayaran pajak
        kendaraan dengan nomor polisi{' '}
        <Text style={styles.bold}>{item.policeNumber}</Text>
      </Text>
      <View style={styles.iconInfoContainer}>
        <IconInfo />
      </View>
    </View>
  );
};

export default Content;

const styles = StyleSheet.create({
  timeSectionContentContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    marginVertical: 7,
  },
  image: {
    width: 47,
    height: 47,
    borderRadius: 18,
  },
  informationText: {
    fontFamily: fonts.Poppins.regular,
    fontSize: 12,
    color: colors.primaryBlack,
    width: 269,
    marginLeft: 15,
  },
  bold: {
    fontFamily: fonts.Poppins.bold,
  },
  iconInfoContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
});
