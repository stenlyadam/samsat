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
import { colors, fonts, getData, IMGDashboard, storeData } from '../../assets';
import { Button, Carousel } from '../../components';
import IconBadge from 'react-native-icon-badge';
import { firebase } from '../../config';
import Vehicle from './Vehicle';
import { useNavigation } from '@react-navigation/native';
import NotifService from '../../../NotifService';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import * as GLOBAL from '../../components/globalState';
// import moment from 'moment';

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
        // console.log('get DATA', data);
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
  console.log('testing kalau ada kendaraan', vehiclesList);
  return (
    <ScrollView horizontal={true} style={styles.vehicleListContainer}>
      {vehiclesList.map((vehicle, i) => {
        // console.log(
        //   'vehicle one by one :',
        //   vehicle.data.TANGGAL_BERLAKU_SD +
        //     ' ' +
        //     vehicle.data.BULAN_BERLAKU_SD +
        //     ' ' +
        //     vehicle.data.TAHUN_BERLAKU_SD,
        // );
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
        // console.log('Pengaturan tanggal :', selectedMonthName);
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
    setNotification(Object.keys(data.vehicles).length);
  });
  const [refreshing, setRefreshing] = useState(false);
  //Push Notification
  // const [registerToken, setRegisterToken] = useState(''); //not used
  // const [fcmRegistered, setFcmRegistered] = useState(false); //not used

  // const onRegister = token => { //not used
  // setRegisterToken(token.token);
  // setFcmRegistered(true);
  // };

  const onNotif = notif => {
    Alert.alert(notif.title, notif.message);
  };

  const notif = new NotifService(
    // onRegister,// not used
    onNotif,
  );

  // const handlePerm = perms => {
  //   Alert.alert('Permissions', JSON.stringify(perms));
  // };
  //Push Notification

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const onDebug = () => {
    var moment = require('moment-timezone');
    // var date = new Date().getDate(); //Current Date

    // const date = moment().format(); //Time Stamp Now
    // const date = moment().tz('Asia/Makassar').format('MMMM Do YYYY, h:mm:ss a');
    // const date = moment('31/7/2021', 'DD/MM/YYYY')
    //   .tz('Asia/Makassar')
    //   .fromNow();
    // const scheduledDate = new Date(
    //   moment('2/8/2021/8/9', 'DD/MM/YYYY/h/m').tz('Asia/Makassar').format(),
    // );
    const date = new Date(Date.now() + 5 * 1000);
    const bigText = `THIS IS BIG TEXT + ${date}`;
    const title = 'This Is The Title';
    // const date = scheduledDate;
    // const date = moment().format();
    // notif.cancelAll();
    // notif.scheduleNotif(bigText, title, date);
    // notif.localNotif(bigText, title);
    notif.getScheduledLocalNotifications(notifs => console.log(notifs));

    // console.log(date);
  };

  return (
    <View style={styles.page}>
      <ScrollView
        scrollEnabled={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <Image source={IMGDashboard} style={styles.backgroundImage} />
        <View style={styles.topIconContainer}>
          <View style={{ width: 30, height: '100%' }}>
            <Button
              // height={40}
              // width={40}
              type="icon-only"
              icon="icon-help"
              onPress={() => {
                onDebug();
              }}
              // notif.localNotif(bigText, notifTitle);
            />
          </View>

          <IconBadge
            MainElement={
              <View
                style={{
                  // backgroundColor: 'yellow',
                  width: 30,
                  height: '100%',
                }}>
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
          <View style={{ width: 53, height: '50%' }}>
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
    // height: '100%',
    aspectRatio: 1,
    // backgroundColor: 'yellow',
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
    // paddingHorizontal: 16,
    // marginTop: 16,
    paddingHorizontal: '5%',
    marginTop: '4%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -25,
    height: hp('15%'),
    // backgroundColor: 'blue',
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
    // height: 58,
    height: hp('7%'),
    backgroundColor: colors.primaryRed,
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // paddingBottom: 10,
    paddingHorizontal: 60,
    paddingVertical: '1%',
  },
  add: {
    width: hp('12%'),
    height: hp('12%'),
    // backgroundColor: 'blue',
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
    // height: 350,
    height: hp('55%'),
    flexDirection: 'row',
    // backgroundColor: 'yellow',
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
