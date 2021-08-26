import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors, fonts, getData, IconAddVehicle } from '../../assets';
import { Button, TopBar } from '../../components';
import { showError, showSuccess } from '../../utils';
import Content from './Content';
import { firebase } from '../../config';
import NotifService from '../../../NotifService';
import moment from 'moment-timezone';

const notif = new NotifService();

const DetailSTNK = ({ navigation, route }) => {
  const {
    NOMOR_MESIN,
    TAHUN_BUAT,
    TYPE_KB,
    KODE_LOKASI_NOMOR_POLISI,
    KODE_DAERAH_NOMOR_POLISI,
    NOMOR_POLISI,
    NOMOR_RANGKA,
    TANGGAL_BERLAKU_SD,
    BULAN_BERLAKU_SD,
    TAHUN_BERLAKU_SD,
    PKB_TERAKHIR,
  } = route.params;
  const values = route.params;
  const vehiclesToDB = {
    ...values,
    FOTO_KENDARAAN: {
      [0]: '',
    },
    NAMA_KENDARAAN: '',
  };

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

  var selectedMonthName = months[BULAN_BERLAKU_SD - 1].toUpperCase();

  const [uid, setUid] = useState('');

  useEffect(() => {
    getData('user').then(response => {
      const data = response;
      setUid(data.uid);
    });
  }, []);

  //NOTIFICATION
  const date = moment(
    `${TANGGAL_BERLAKU_SD}/${BULAN_BERLAKU_SD}/${TAHUN_BERLAKU_SD}/8`,
    'D/M/YYYY/H',
  ).format();

  const notifTitle = 'Surat pajak kendaraan';
  const total = PKB_TERAKHIR.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&.');
  const bigText = `${KODE_DAERAH_NOMOR_POLISI} ${NOMOR_POLISI} ${KODE_LOKASI_NOMOR_POLISI} sebesar Rp.${total}`;
  const scheduledFor = date;
  const message = `${KODE_DAERAH_NOMOR_POLISI} ${NOMOR_POLISI} ${KODE_LOKASI_NOMOR_POLISI}`;
  //NOTIFICATION

  const tambahKendaraan = () => {
    firebase
      .database()
      .ref(`users/${uid}/vehicles`)
      .child(values.ID)
      .set(vehiclesToDB)
      .then(res => {
        setTimeout(() => {
          const today = moment();
          if (moment(date).isBefore(today)) {
            notif.localNotif(bigText, notifTitle, message);
          } else {
            notif.scheduleNotif(bigText, notifTitle, scheduledFor, message);
          }
          navigation.reset({
            index: 0,
            routes: [{ name: 'Dashboard' }],
          });
        }, 1000);
      })
      .catch(error => {
        console.log(error.message);
        showError(error.message);
      });
    showSuccess('Kendaraan berhasil ditambahkan');
  };

  return (
    <SafeAreaView style={styles.page}>
      <TopBar title="Tambah kendaraan" onBack={() => navigation.goBack()} />
      <ScrollView style={styles.contentWrapper}>
        <View style={styles.contentTitleContainer}>
          <IconAddVehicle width={58} height={39} />
          <Text style={styles.contentTitle}>Rincian Kendaraan</Text>
        </View>
        <Content title="NOMOR MESIN" content={NOMOR_MESIN} />
        <Content title="TAHUN PEMBUATAN" content={TAHUN_BUAT} />
        <Content title="TYPE" content={TYPE_KB} />
        <Content title="NOMOR RANGKA" content={NOMOR_RANGKA} />
        <Content
          title="NOMOR POLISI"
          content={
            KODE_DAERAH_NOMOR_POLISI +
            ' ' +
            NOMOR_POLISI +
            ' ' +
            KODE_LOKASI_NOMOR_POLISI
          }
        />
        <Content
          title="MASA BERLAKU STNK"
          content={
            TANGGAL_BERLAKU_SD +
            ' ' +
            selectedMonthName +
            ' ' +
            TAHUN_BERLAKU_SD
          }
        />
        <View style={styles.buttonContainer}>
          <Button
            label="Tambah"
            paddingHorizontal={0}
            height={43}
            onPress={() => tambahKendaraan()}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DetailSTNK;

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  contentWrapper: {
    flex: 1,
    paddingHorizontal: 36,
    paddingVertical: 27,
  },
  contentTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 21,
  },
  contentTitle: {
    fontSize: 14,
    fontFamily: fonts.Poppins.medium,
    color: colors.primaryRed,
    marginLeft: 16,
  },
  buttonContainer: {
    justifyContent: 'flex-end',
    flex: 1,
  },
});
