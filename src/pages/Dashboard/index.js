import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {colors, fonts, getData, IMGDashboard} from '../../assets';
import {Button, Carousel} from '../../components';
import VehicleList from './VehicleList';
import IconBadge from 'react-native-icon-badge';

let notification = 6;
const Dashboard = ({navigation}) => {
  const [vehicles, setVehicles] = useState([]);
  const [uid, setUid] = useState('');
  useEffect(() => {
    getData('user').then(response => {
      const data = response;
      setVehicles(data.vehicles);
      setUid(data.uid);
      console.log('dashboard vehicle', vehicles);
    });
  }, []);

  return (
    <View style={styles.page}>
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
          BadgeElement={<Text style={styles.badgeElement}>{notification}</Text>}
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
        <TouchableOpacity>
          <Text style={styles.more}>Lihat Semua</Text>
        </TouchableOpacity>
      </View>
      <VehicleList
        onPress={() => navigation.navigate('VehicleDetail')}
        uid={uid}
        vehicles={vehicles}
      />

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
});
