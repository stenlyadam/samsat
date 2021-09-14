import React, { useEffect, useState, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  RefreshControl,
  ScrollView,
  Alert,
} from 'react-native';
import IconBadge from 'react-native-icon-badge';
import Vehicle from './Vehicle';
import NotifService from '../../../NotifService';
import { useNavigation } from '@react-navigation/native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { colors, fonts, getData, IMGDashboard, storeData } from '../../assets';
import { Button, Carousel } from '../../components';
import { firebase } from '../../config';
import moment from 'moment';

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};
const notif = new NotifService();

const sendAllNotification = () => {
  getData('user').then(dataRes => {
    if (dataRes.vehicles) {
      const oldData = dataRes.vehicles;
      const data = [];
      Object.keys(oldData).map(key => {
        data.push({
          id: key,
          data: oldData[key],
        });
      });
      data.map((vehicle, i) => {
        const today = moment();
        const date = moment(
          `${vehicle.data.TANGGAL_BERLAKU_SD}/${vehicle.data.BULAN_BERLAKU_SD}/${vehicle.data.TAHUN_BERLAKU_SD}/8`,
          'D/M/YYYY/H',
        ).format();
        const kemarin = moment(date).subtract(1, 'days').format();
        const mingguLalu = moment(date).subtract(7, 'days').format();
        const bulanLalu = moment(date).subtract(30, 'days').format();
        const notifTitle = 'Surat pajak kendaraan';
        const pkbNumber = parseInt(vehicle.data.PKB_TERAKHIR);
        const total = pkbNumber.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&.');
        console.log('total : ', total);
        const message = `${vehicle.data.KODE_DAERAH_NOMOR_POLISI} ${vehicle.data.NOMOR_POLISI} ${vehicle.data.KODE_LOKASI_NOMOR_POLISI}`;
        const scheduledFor = date;
        if (moment(date).isBefore(today) === false) {
          const bigText = `${vehicle.data.KODE_DAERAH_NOMOR_POLISI} ${vehicle.data.NOMOR_POLISI} ${vehicle.data.KODE_LOKASI_NOMOR_POLISI} sebesar Rp.${total}`;
          notif.scheduleNotif(bigText, notifTitle, scheduledFor, message);
        }
        if (moment(kemarin).isBefore(today) === false) {
          const bigText = `${vehicle.data.KODE_DAERAH_NOMOR_POLISI} ${vehicle.data.NOMOR_POLISI} ${vehicle.data.KODE_LOKASI_NOMOR_POLISI} sebesar Rp.${total} besok`;
          notif.scheduleNotif(bigText, notifTitle, kemarin, message);
        }
        if (moment(mingguLalu).isBefore(today) === false) {
          const bigText = `${vehicle.data.KODE_DAERAH_NOMOR_POLISI} ${vehicle.data.NOMOR_POLISI} ${vehicle.data.KODE_LOKASI_NOMOR_POLISI} sebesar Rp.${total} minggu depan`;
          notif.scheduleNotif(bigText, notifTitle, mingguLalu, message);
        }
        if (moment(bulanLalu).isBefore(today) === false) {
          const bigText = `${vehicle.data.KODE_DAERAH_NOMOR_POLISI} ${vehicle.data.NOMOR_POLISI} ${vehicle.data.KODE_LOKASI_NOMOR_POLISI} sebesar Rp.${total} bulan depan`;
          notif.scheduleNotif(bigText, notifTitle, bulanLalu, message);
        }
      });
    }
  });
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
  }, [uid, vehicles]);
  return (
    <ScrollView horizontal={true} style={styles.vehicleListContainer}>
      {vehiclesList.map((vehicle, i) => {
        const months = [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December',
        ];

        var selectedMonthName = months[vehicle.data.BULAN_BERLAKU_SD - 1];

        return (
          <Vehicle
            policeNumber={
              vehicle.data.KODE_DAERAH_NOMOR_POLISI +
              ' ' +
              vehicle.data.NOMOR_POLISI +
              ' ' +
              vehicle.data.KODE_LOKASI_NOMOR_POLISI
            }
            vehicleName={vehicle.data.NAMA_KENDARAAN}
            vehicleType={vehicle.data.TYPE_KB}
            price={vehicle.data.PKB_TERAKHIR}
            dueDate={
              vehicle.data.TANGGAL_BERLAKU_SD +
              ' ' +
              selectedMonthName +
              ' ' +
              vehicle.data.TAHUN_BERLAKU_SD
            }
            fotoKendaraan={vehicle.data.FOTO_KENDARAAN[0]}
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
  const [notification, setNotification] = useState(0);
  getData('user').then(data => {
    if (data.vehicles) {
      setNotification(Object.keys(data.vehicles).length);
    }
  });
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    notif.cancelAll();
    sendAllNotification();
  }, []);
  return (
    <View style={styles.page}>
      <ScrollView
        scrollEnabled={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <Image source={IMGDashboard} style={styles.backgroundImage} />
        <View style={styles.topIconContainer}>
          <View style={styles.helpButtonContainer}>
            <Button
              type="icon-only"
              icon="icon-help"
              // onPress={() => {
              //   //USED FOR DEBUGGING
              //   notif.getScheduledLocalNotifications(res => {
              //     Object.keys(res).map(i => {
              //       console.log(
              //         'scheduled for ' +
              //           res[i].message +
              //           'date : ' +
              //           res[i].date,
              //       );
              //       // console.log('date : ', res[i].date);
              //       Alert.alert(`${res[i].message}`);
              //     });
              //   });
              // }}
            />
          </View>

          <IconBadge
            MainElement={
              <View style={styles.notificationButtonContainer}>
                <Button
                  type="icon-only"
                  icon="icon-notification"
                  onPress={() => navigation.navigate('Notification')}
                />
              </View>
            }
            BadgeElement={
              <Text style={styles.badgeElement}>{notification}</Text>
            }
            IconBadgeStyle={styles.iconBadgeStyle}
            Hidden={notification === 0}
          />
        </View>
        <View style={styles.titleContainer}>
          <View style={styles.topProfileButtonContainer}>
            <Button
              type="icon-only"
              icon="icon-main-profile"
              style={styles.iconMainProfile}
              onPress={() => navigation.navigate('Profile')}
            />
          </View>
          <Text style={styles.title}>SAMSAT Minahasa Utara</Text>
        </View>
        <Carousel />
        <View style={styles.listTitleContainer}>
          <Text style={styles.listTitle}>Daftar Kendaraan</Text>
          <TouchableOpacity onPress={() => navigation.navigate('VehicleList')}>
            <Text style={styles.more}>Lihat Semua</Text>
          </TouchableOpacity>
        </View>
        <VehicleList />
      </ScrollView>
      <View style={styles.bottomTabContainer}>
        <View style={styles.buttonLeftRight}>
          <Button
            type="icon-only"
            icon="icon-vehicle"
            onPress={() => navigation.navigate('VehicleList')}
          />
        </View>
        <View style={styles.add}>
          <Button
            type="icon-only"
            icon="icon-add"
            onPress={() => navigation.navigate('AddVehicle')}
          />
        </View>
        <View style={styles.buttonLeftRight}>
          <Button
            type="icon-only"
            icon="icon-profile"
            onPress={() => navigation.navigate('Profile')}
          />
        </View>
      </View>
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  buttonLeftRight: {
    width: '13%',
    aspectRatio: 1,
  },
  page: {
    flex: 1,
    backgroundColor: colors.white,
  },
  backgroundImage: {
    position: 'absolute',
    resizeMode: 'cover',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  topIconContainer: {
    flexDirection: 'row',
    width: '100%',
    height: '4%',
    paddingHorizontal: '5%',
    marginTop: '4%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  helpButtonContainer: { width: 30, height: '100%' },
  notificationButtonContainer: {
    width: 30,
    height: '100%',
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -25,
    height: hp('15%'),
  },
  topProfileButtonContainer: {
    width: 53,
    height: '50%',
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
    marginTop: hp('0.5%'),
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
    height: hp('7%'),
    backgroundColor: colors.primaryRed,
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 60,
    paddingVertical: '1%',
  },
  add: {
    width: hp('12%'),
    height: hp('12%'),
    top: hp('-3%'),
  },
  iconBadgeStyle: {
    width: 20,
    height: 20,
    backgroundColor: 'red',
    top: -5,
    right: -3,
  },
  badgeElement: {
    color: 'white',
  },

  vehicleListContainer: {
    height: hp('55%'),
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
