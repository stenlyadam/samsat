import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors, fonts, getData } from '../../assets';
import { TopBar } from '../../components';
import Content from './Content';
import moment from 'moment';

const VehiclesList = ({ policeNumber, dueDate, check, image, vehicle, id }) => {
  // const [vehicleCount, setVehicleCount] = useState(0);
  const date = moment(`${dueDate}`, 'DD MMMM YYYY');
  // .format();
  const today = moment();
  const [checkLewat, setCheckLewat] = useState(false);
  const [checkWeek, setCheckWeek] = useState(false);
  const [checkMonth, setCheckMonth] = useState(false);
  const [checkYear, setCheckYear] = useState(false);
  useEffect(() => {
    setCheckLewat(moment(date).isBefore(today));
    setCheckWeek(moment(date).isSame(today, 'week'));
    setCheckMonth(moment(date).isSame(today, 'month'));
    setCheckYear(moment(date).isSame(today, 'year'));
  }, []);
  switch (check) {
    case 'lewat':
      if (checkLewat) {
        return (
          <View>
            <Content
              expired={true}
              policeNumber={policeNumber}
              dueDate={dueDate}
              image={image}
              vehicle={vehicle}
              id={id}
            />
          </View>
        );
      } else {
        return <View />;
      }
    case 'week':
      if (checkWeek && checkLewat === false) {
        return (
          <View>
            <Content
              policeNumber={policeNumber}
              dueDate={dueDate}
              image={image}
              vehicle={vehicle}
              id={id}
            />
          </View>
        );
      } else {
        return <View />;
      }
    case 'month':
      if (checkMonth && checkWeek === false && checkLewat === false) {
        return (
          <View>
            <Content
              policeNumber={policeNumber}
              dueDate={dueDate}
              image={image}
              vehicle={vehicle}
              id={id}
            />
          </View>
        );
      } else {
        return <View />;
      }
    case 'year':
      if (checkYear && checkMonth === false && checkWeek === false) {
        return (
          <View>
            <Content
              policeNumber={policeNumber}
              dueDate={dueDate}
              image={image}
              vehicle={vehicle}
              id={id}
            />
          </View>
        );
      } else {
        return <View />;
      }
    case 'other':
      if (checkYear === false && checkMonth === false && checkWeek === false) {
        return (
          <View>
            <Content
              policeNumber={policeNumber}
              dueDate={dueDate}
              image={image}
              vehicle={vehicle}
              id={id}
            />
          </View>
        );
      } else {
        return <View />;
      }
  }
};

const Notification = ({ navigation }) => {
  const [vehicles, setVehicles] = useState([]);
  const [vehiclesList, setVehiclesList] = useState(vehicles);
  useEffect(() => {
    getData('user').then(data => {
      setVehicles(data.vehicles);
    });
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
  }, [vehicles]);

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

  function checkArray(my_arr) {
    for (var i = 0; i < my_arr.length; i++) {
      if (my_arr[i] === '') return false;
    }
    return my_arr;
  }

  return (
    <ScrollView style={styles.page}>
      <TopBar
        title="Notifikasi"
        onBack={() =>
          navigation.reset({
            index: 0,
            routes: [{ name: 'Dashboard' }],
          })
        }
      />
      <View style={styles.contentContainer}>
        <Text style={styles.timeSectionTitle}>Masa berlaku lewat</Text>
        {vehiclesList.map((vehicle, i) => {
          var selectedMonthName = months[vehicle.data.BULAN_BERLAKU_SD - 1];
          const image = checkArray(vehicle.data.FOTO_KENDARAAN);
          return (
            <VehiclesList
              check="lewat"
              image={image}
              policeNumber={
                vehicle.data.KODE_DAERAH_NOMOR_POLISI +
                ' ' +
                vehicle.data.NOMOR_POLISI +
                ' ' +
                vehicle.data.KODE_LOKASI_NOMOR_POLISI
              }
              dueDate={
                vehicle.data.TANGGAL_BERLAKU_SD +
                ' ' +
                selectedMonthName +
                ' ' +
                vehicle.data.TAHUN_BERLAKU_SD
              }
              vehicle={vehicle}
              id={vehicle.id}
              key={i}
            />
          );
        })}
        <Text style={styles.timeSectionTitle}>Minggu Ini</Text>
        {vehiclesList.map((vehicle, i) => {
          var selectedMonthName = months[vehicle.data.BULAN_BERLAKU_SD - 1];
          const image = checkArray(vehicle.data.FOTO_KENDARAAN);
          return (
            <VehiclesList
              check="week"
              image={image}
              policeNumber={
                vehicle.data.KODE_DAERAH_NOMOR_POLISI +
                ' ' +
                vehicle.data.NOMOR_POLISI +
                ' ' +
                vehicle.data.KODE_LOKASI_NOMOR_POLISI
              }
              dueDate={
                vehicle.data.TANGGAL_BERLAKU_SD +
                ' ' +
                selectedMonthName +
                ' ' +
                vehicle.data.TAHUN_BERLAKU_SD
              }
              vehicle={vehicle}
              id={vehicle.id}
              key={i}
            />
          );
        })}
        <Text style={styles.timeSectionTitle}>Bulan Ini</Text>
        {vehiclesList.map((vehicle, i) => {
          var selectedMonthName = months[vehicle.data.BULAN_BERLAKU_SD - 1];
          const image = checkArray(vehicle.data.FOTO_KENDARAAN);
          return (
            <VehiclesList
              check="month"
              image={image}
              policeNumber={
                vehicle.data.KODE_DAERAH_NOMOR_POLISI +
                ' ' +
                vehicle.data.NOMOR_POLISI +
                ' ' +
                vehicle.data.KODE_LOKASI_NOMOR_POLISI
              }
              dueDate={
                vehicle.data.TANGGAL_BERLAKU_SD +
                ' ' +
                selectedMonthName +
                ' ' +
                vehicle.data.TAHUN_BERLAKU_SD
              }
              vehicle={vehicle}
              id={vehicle.id}
              key={i}
            />
          );
        })}

        <Text style={styles.timeSectionTitle}>Tahun Ini</Text>
        {vehiclesList.map((vehicle, i) => {
          var selectedMonthName = months[vehicle.data.BULAN_BERLAKU_SD - 1];
          const image = checkArray(vehicle.data.FOTO_KENDARAAN);
          return (
            <VehiclesList
              check="year"
              image={image}
              policeNumber={
                vehicle.data.KODE_DAERAH_NOMOR_POLISI +
                ' ' +
                vehicle.data.NOMOR_POLISI +
                ' ' +
                vehicle.data.KODE_LOKASI_NOMOR_POLISI
              }
              dueDate={
                vehicle.data.TANGGAL_BERLAKU_SD +
                ' ' +
                selectedMonthName +
                ' ' +
                vehicle.data.TAHUN_BERLAKU_SD
              }
              vehicle={vehicle}
              id={vehicle.id}
              key={i}
            />
          );
        })}

        <Text style={styles.timeSectionTitle}>Lainnya</Text>
        {vehiclesList.map((vehicle, i) => {
          var selectedMonthName = months[vehicle.data.BULAN_BERLAKU_SD - 1];
          const image = checkArray(vehicle.data.FOTO_KENDARAAN);
          return (
            <VehiclesList
              check="other"
              image={image}
              policeNumber={
                vehicle.data.KODE_DAERAH_NOMOR_POLISI +
                ' ' +
                vehicle.data.NOMOR_POLISI +
                ' ' +
                vehicle.data.KODE_LOKASI_NOMOR_POLISI
              }
              dueDate={
                vehicle.data.TANGGAL_BERLAKU_SD +
                ' ' +
                selectedMonthName +
                ' ' +
                vehicle.data.TAHUN_BERLAKU_SD
              }
              vehicle={vehicle}
              id={vehicle.id}
              key={i}
            />
          );
        })}
      </View>
    </ScrollView>
  );
};
export default Notification;

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  contentContainer: {
    width: '100%',
    backgroundColor: colors.white,
    paddingHorizontal: 25,
    flex: 1,
  },
  timeSectionTitle: {
    fontFamily: fonts.Poppins.medium,
    fontSize: 18,
    color: colors.primaryRed,
    marginBottom: 7,
    marginTop: 14,
  },
});
