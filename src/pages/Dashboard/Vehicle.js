import React, { useCallback, useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import { colors, fonts, getData, IMGVehicle, storeData } from '../../assets';
import NumberFormat from 'react-number-format';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { firebase } from '../../config';

const Vehicle = ({
  policeNumber,
  vehicleName,
  vehicleType,
  price,
  dueDate,
  vehicle,
  id,
  fotoKendaraan,
}) => {
  const navigation = useNavigation();
  return (
    <TouchableWithoutFeedback
      onPress={() => navigation.navigate('VehicleDetail', { vehicle, id })}>
      <View style={styles.vehicleContainer}>
        <View style={styles.pictureContainer}>
          <Image
            source={{ uri: `data:image/png;base64,${fotoKendaraan}` }}
            style={styles.fotoKendaraan}
          />
        </View>
        <View style={styles.vehicleText}>
          <Text style={styles.policeNumber}>{policeNumber}</Text>
          <Text style={styles.vehicleName}>
            {vehicleName}
            <Text style={styles.vehicleType}> {vehicleType}</Text>
          </Text>
          <Text style={styles.taxPrice}>
            Rp
            <NumberFormat
              value={price}
              displayType={'text'}
              thousandSeparator="."
              decimalSeparator=","
              renderText={value => <Text style={styles.taxPrice}>{value}</Text>}
            />
          </Text>

          <View style={styles.expireContainer}>
            <View style={styles.expireTextContainer}>
              <Text style={styles.expire}>Berlaku Sampai</Text>
            </View>
            <View style={styles.expireDateContainer}>
              <Text style={styles.expire}>{dueDate}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 350,
    flexDirection: 'row',
  },
  pictureContainer: {
    height: 160,
    width: 160,
    borderRadius: 18,
    marginTop: -60,
  },
  fotoKendaraan: {
    height: 160,
    width: 160,
  },
  vehicleContainer: {
    height: 228,
    width: 200,
    backgroundColor: colors.white,
    borderRadius: 20,
    elevation: 10,
    alignItems: 'center',
    marginTop: 75,
    marginHorizontal: 15,
  },
  policeNumber: {
    fontFamily: fonts.Poppins.medium,
    fontSize: 18,
    color: colors.primaryBlack,
  },
  vehicleName: {
    fontFamily: fonts.Poppins.medium,
    fontSize: 12,
  },
  vehicleType: {
    width: 160,
    fontFamily: fonts.Poppins.regular,
    fontSize: 10,
    color: colors.darkGrey,
  },
  taxPrice: {
    fontFamily: fonts.Poppins.medium,
    fontSize: 18,
    color: colors.primaryBlack,
  },
  vehicleText: {
    width: '100%',
    paddingHorizontal: 20,
  },
  expireContainer: {
    width: 160,
    height: 18,
    flexDirection: 'row',
  },
  expireTextContainer: {
    flex: 2,
    backgroundColor: colors.primaryBlack,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 3,
    borderBottomLeftRadius: 3,
  },
  expireDateContainer: {
    flex: 2,
    backgroundColor: colors.darkGrey,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopEndRadius: 3,
    borderBottomEndRadius: 3,
  },
  expire: {
    fontFamily: fonts.Poppins.regular,
    fontSize: 8,
    color: colors.white,
  },
});

export default Vehicle;
