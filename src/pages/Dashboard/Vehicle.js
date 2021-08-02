import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import { colors, fonts, IMGVehicleDummy } from '../../assets';
import { Gap } from '../../components';
import NumberFormat from 'react-number-format';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

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
  // const dateTime = moment(dueDate).diff(Date(), 'days');
  // console.log('wkwkw: ', dateTime);
  return (
    <TouchableWithoutFeedback
      onPress={() => navigation.navigate('VehicleDetail', { vehicle, id })}>
      <View style={styles.vehicleContainer}>
        <View style={styles.pictureContainer}>
          {fotoKendaraan ? (
            <Image
              source={{ uri: `data:image/png;base64,${fotoKendaraan}` }}
              style={styles.fotoKendaraan}
            />
          ) : (
            <Image source={IMGVehicleDummy} style={styles.image} />
          )}
        </View>
        <Gap height={3} />
        <View style={styles.vehicleText}>
          <Text style={styles.policeNumber}>{policeNumber}</Text>
          <Text style={styles.vehicleName} numberOfLines={2}>
            {vehicleName ? `${vehicleName} ` : vehicleName}
            <Text style={styles.vehicleType}>{vehicleType}</Text>
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
        </View>
        <View style={styles.expireContainer}>
          <View style={styles.expireTextContainer}>
            <Text style={styles.expire}>Berlaku Sampai</Text>
          </View>
          <View style={styles.expireDateContainer}>
            <Text style={styles.expire}>{dueDate}</Text>
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
    // height: 160,
    // width: 160,
    height: hp('20%'),
    width: hp('20%'),
    borderRadius: 18,
    marginTop: -70,
    backgroundColor: colors.white,
    // backgroundColor: 'blue',
    elevation: 5,
  },
  fotoKendaraan: {
    // height: 160,
    // width: 160,
    height: hp('20%'),
    // borderRadius: 18,
    borderRadius: hp('2%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  vehicleContainer: {
    // height: 228,
    height: hp('25%'),
    width: wp('45%'),
    backgroundColor: colors.white,
    borderRadius: 20,
    elevation: 10,
    alignItems: 'center',
    marginTop: hp('11%'),
    marginHorizontal: 15,
  },
  policeNumber: {
    fontFamily: fonts.Poppins.medium,
    // fontSize: 18,
    fontSize: wp('3.5%'),
    color: colors.primaryBlack,
  },
  vehicleName: {
    top: '-5%',
    fontFamily: fonts.Poppins.medium,
    // fontSize: 12,
    fontSize: wp('3%'),
  },
  vehicleType: {
    width: 160,
    fontFamily: fonts.Poppins.regular,
    fontSize: wp('2.5%'),
    lineHeight: 15,
    color: colors.darkGrey,
  },
  taxPrice: {
    fontFamily: fonts.Poppins.medium,
    // fontSize: 18,
    fontSize: wp('3.5%'),
    color: colors.primaryBlack,
    position: 'absolute',
    bottom: '33%',
    width: '100%',
    left: '13%',
  },
  vehicleText: {
    width: '100%',
    paddingHorizontal: 20,
    flex: 1,
  },
  expireContainer: {
    // width: 160,
    // height: 18,
    width: '100%',
    height: '10%',
    paddingHorizontal: '10%',
    flexDirection: 'row',
    position: 'absolute',
    bottom: '8%',
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
    // fontSize: 8,
    fontSize: wp('1.9%'),
    color: colors.white,
  },
});

export default Vehicle;
