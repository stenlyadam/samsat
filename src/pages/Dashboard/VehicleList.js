import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native';
import {colors, fonts, IMGVehicle} from '../../assets';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    policeNumber: 'DB 5848 C',
    vehicleName: 'Honda CB150R',
    vehicleType: 'HONDA H5C02R20M1 M/T',
    price: '312.100',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    policeNumber: 'DB 5848 C',
    vehicleName: 'Honda CB150R',
    vehicleType: 'HONDA H5C02R20M1 M/T',
    price: '312.100',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    policeNumber: 'DB 5848 C',
    vehicleName: 'Honda CB150R',
    vehicleType: 'HONDA H5C02R20M1 M/T',
    price: '312.100',
  },
];

const Vehicle = ({policeNumber, vehicleName, vehicleType, price, onPress}) => (
  <TouchableWithoutFeedback onPress={onPress}>
    <View style={styles.vehicleContainer}>
      <View style={styles.pictureContainer}>
        <Image source={IMGVehicle} />
      </View>
      <View style={styles.vehicleText}>
        <Text style={styles.policeNumber}>{policeNumber}</Text>
        <Text style={styles.vehicleName}>
          {vehicleName}
          <Text style={styles.vehicleType}> {vehicleType}</Text>
        </Text>
        <Text style={styles.taxPrice}>
          Rp <Text style={styles.taxPrice}>{price}</Text>
        </Text>

        <View style={styles.expireContainer}>
          <View style={styles.expireTextContainer}>
            <Text style={styles.expire}>Berlaku Sampai</Text>
          </View>
          <View style={styles.expireDateContainer}>
            <Text style={styles.expire}>26 Jan 2020</Text>
          </View>
        </View>
      </View>
    </View>
  </TouchableWithoutFeedback>
);

const VehicleList = ({onPress}) => {
  const renderItem = ({item}) => (
    <Vehicle
      policeNumber={item.policeNumber}
      vehicleName={item.vehicleName}
      vehicleType={item.vehicleType}
      price={item.price}
      onPress={onPress}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        horizontal
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false}
      />
    </SafeAreaView>
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
    backgroundColor: 'yellow',
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

export default VehicleList;
