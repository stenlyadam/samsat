import React, { useEffect, useState, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  RefreshControl,
  ScrollView,
} from 'react-native';
import { colors, fonts, getData, IMGDashboard, storeData } from '../../assets';
import { Button, Carousel } from '../../components';
import IconBadge from 'react-native-icon-badge';
import { firebase } from '../../config';
import Vehicle from './Vehicle';
import { useNavigation } from '@react-navigation/native';

let notification = 6;

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

const VehicleList = () => {
  const [vehicles, setVehicles] = useState([]);
  const [uid, setUid] = useState('');
  const [vehiclesList, setVehiclesList] = useState(vehicles);
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getData('user').then(response => {
        const data = response;
        console.log('get DATA', data);
        setVehicles(data.vehicles);
        setUid(data.uid);
        firebase
          .database()
          .ref(`users/${response.uid}/`)
          .on('value', res => {
            if (res.val()) {
              storeData('user', res.val());
            }
          });
      });
    });
    return unsubscribe;
  }, [navigation]);

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
  }, [uid]);

  return (
    <ScrollView horizontal={true} style={styles.container}>
      {vehiclesList.map((vehicle, i) => {
        return (
          <Vehicle
            policeNumber={vehicle.data.nomorPolisi}
            vehicleName={vehicle.data.vehicleName}
            vehicleType={vehicle.data.vehicleType}
            price={vehicle.data.price}
            dueDate={vehicle.data.masaBerlakuSTNK}
            fotoKendaraan={vehicle.data.fotoKendaraan[0]}
            vehicle={vehicle}
            id={vehicle.id}
            key={i}
          />
        );
      })}
    </ScrollView>
  );
};

const Dashboard = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  var date = new Date().getDate(); //Current Date
  console.log(date);
  return (
    <View style={styles.page}>
      <ScrollView
        scrollEnabled={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <Image source={IMGDashboard} style={styles.backgroundImage} />
        <View style={styles.topIconContainer}>
          <Button type="icon-only" icon="icon-help" />

          <IconBadge
            MainElement={
              <Button
                type="icon-only"
                icon="icon-notification"
                onPress={() => navigation.navigate('Notification')}
              />
            }
            BadgeElement={
              <Text style={styles.badgeElement}>{notification}</Text>
            }
            IconBadgeStyle={styles.iconBadgeStyle}
            Hidden={notification === 0}
          />
        </View>
        <View style={styles.titleContainer}>
          <Button
            type="icon-only"
            icon="icon-main-profile"
            style={styles.iconMainProfile}
            onPress={() => navigation.navigate('Profile')}
          />
          <Text style={styles.title}>SAMSAT Minahasa Utara</Text>
        </View>
        <Carousel style={styles.carousel} />
        <View style={styles.listTitleContainer}>
          <Text style={styles.listTitle}>Daftar Kendaraan</Text>
          <TouchableOpacity onPress={() => navigation.navigate('VehicleList')}>
            <Text style={styles.more}>Lihat Semua</Text>
          </TouchableOpacity>
        </View>
        <VehicleList />
      </ScrollView>
      <View style={styles.bottomTabContainer}>
        <Button
          type="icon-only"
          icon="icon-vehicle"
          onPress={() => navigation.navigate('VehicleList')}
        />
        <View style={styles.add}>
          <Button
            type="icon-only"
            icon="icon-add"
            onPress={() => navigation.navigate('AddVehicle')}
          />
        </View>
        <Button
          type="icon-only"
          icon="icon-profile"
          onPress={() => navigation.navigate('Profile')}
        />
      </View>
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.white,
  },
  backgroundImage: {
    position: 'absolute',
  },
  topIconContainer: {
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 16,
    marginTop: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -25,
  },
  title: {
    color: colors.white,
    fontFamily: fonts.Poppins.regular,
    fontSize: 20,
    marginTop: 4,
  },
  listTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 40,
    alignItems: 'center',
    marginTop: 5,
  },
  listTitle: {
    fontFamily: fonts.Poppins.semibold,
    fontSize: 20,
    color: colors.primaryBlack,
  },
  more: {
    fontFamily: fonts.Poppins.regular,
    fontSize: 12,
    color: colors.darkGrey,
  },
  bottomTabContainer: {
    width: '100%',
    height: 58,
    backgroundColor: colors.primaryRed,
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingBottom: 10,
    paddingHorizontal: 60,
  },
  add: {
    marginBottom: 15,
    left: -5,
  },
  iconBadgeStyle: {
    width: 20,
    height: 20,
    backgroundColor: 'red',
    top: -0,
    right: -10,
  },
  badgeElement: {
    color: 'white',
  },

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
