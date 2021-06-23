import React, {useEffect, useState} from 'react';
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
import {colors, fonts, getData, IMGVehicle} from '../../assets';
import NumberFormat from 'react-number-format';
import {useNavigation} from '@react-navigation/native';

const Vehicle = ({
  policeNumber,
  vehicleName,
  vehicleType,
  price,
  dueDate,
  keyId,
}) => {
  const navigation = useNavigation();
  return (
    <TouchableWithoutFeedback
      onPress={() => navigation.navigate('VehicleDetail', {keyId})}>
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

const VehicleList = ({navigation}) => {
  const [vehicles, setVehicles] = useState([]);
  const [uid, setUid] = useState('');
  const [vehiclesList, setVehiclesList] = useState(vehicles);

  useEffect(() => {
    getData('user').then(response => {
      const data = response;
      setVehicles(data.vehicles);
      setUid(data.uid);
      console.log('get DATA', data);
    });

    console.log('wkwkwk uid', uid);
  }, []);

  useEffect(() => {
    if (vehicles) {
      const oldData = vehicles;
      const data = [];
      Object.keys(oldData).map(key => {
        data.push({
          id: key,
          data: oldData[key],
        });
      });
      setVehiclesList(data);
    }
    console.log('vehicles ', vehicles);
  }, [uid]);

  return (
    <ScrollView horizontal={true} style={styles.container}>
      {vehiclesList.map(vehicle => {
        return (
          <Vehicle
            policeNumber={vehicle.data.nomorPolisi}
            vehicleName={vehicle.data.vehicleName}
            vehicleType={vehicle.data.vehicleType}
            price={vehicle.data.price}
            dueDate={vehicle.data.masaBerlakuSTNK}
            keyId={vehicle.id}
          />
        );
      })}
    </ScrollView>
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
