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
import DATA from './VehicleData';
import {firebase} from '../../config';
import {useDispatch} from 'react-redux';

const Vehicle = ({
  policeNumber,
  vehicleName,
  vehicleType,
  price,
  onPress,
  dueDate,
}) => (
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
            <Text style={styles.expire}>{dueDate}</Text>
          </View>
        </View>
      </View>
    </View>
  </TouchableWithoutFeedback>
);

const VehicleList = ({onPress, uid, vehicles}) => {
  // const [vehicles, setVehicles] = useState([]);
  const dispatch = useDispatch();
  const [vehiclesList, setVehiclesList] = useState([]);

  useEffect(() => {
    console.log('wkwkwk uid', uid);
    // firebase
    //   .database()
    //   .ref(`users/${uid}/vehicles`)
    //   .once('value')
    //   .then(response => {
    //     if (response.val()) {
    //       const oldData = response.val();
    //       const data = [];
    //       Object.keys(oldData).map(key => {
    //         data.push({
    //           id: key,
    //           data: oldData[key],
    //         });
    //       });
    //       setVehicles(data);
    //     }
    //   });
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
  }, []);

  const renderItem = ({item}) => (
    <Vehicle
      policeNumber={item.policeNumber}
      vehicleName={item.vehicleName}
      vehicleType={item.vehicleType}
      price={item.price}
      onPress={onPress}
      dueDate={item.dueDate}
    />
  );

  return (
    <ScrollView horizontal={true} style={styles.container}>
      {/* <FlatList
        horizontal
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false}
      /> */}
      {vehiclesList.map(vehicle => {
        return (
          <Vehicle
            key={vehicle.id}
            policeNumber={vehicle.data.nomorPolisi}
            vehicleName={vehicle.data.vehicleName}
            vehicleType={vehicle.data.vehicleType}
            price={vehicle.data.price}
            onPress={onPress}
            dueDate={vehicle.data.masaBerlakuSTNK}
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
