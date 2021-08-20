import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { colors, fonts, IconInfo, IMGVehicleDummy } from '../../assets';

const Content = ({ expired, policeNumber, dueDate, image, vehicle, id }) => {
  const navigation = useNavigation();
  const thisDay = moment();
  const days = moment(dueDate, 'DD MMMM YYYY').diff(thisDay, 'days');
  return (
    <TouchableOpacity
      style={styles.timeSectionContentContainer}
      onPress={() => navigation.navigate('VehicleDetail', { vehicle, id })}>
      {image ? (
        <Image
          source={{ uri: `data:image/png;base64,${image}` }}
          style={styles.image}
        />
      ) : (
        <Image source={IMGVehicleDummy} style={styles.image} />
      )}
      {expired ? (
        <Text style={styles.informationText}>
          Pajak kendaraan anda dengan nomor polisi{' '}
          <Text style={styles.bold}>{policeNumber}</Text> sudah melewati masa
          batas berlaku selama{' '}
          <Text style={styles.bold}>{Math.abs(days)} hari</Text>{' '}
        </Text>
      ) : (
        <Text style={styles.informationText}>
          <Text style={styles.bold}>{days} hari</Text> lagi batas pembayaran
          pajak kendaraan dengan nomor polisi{' '}
          <Text style={styles.bold}>{policeNumber}</Text>
        </Text>
      )}
      <View style={styles.iconInfoContainer}>
        <IconInfo />
      </View>
    </TouchableOpacity>
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
    borderRadius: 10,
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
