import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { colors, fonts, getData, IconAddVehicle } from '../../assets';
import { Button, TopBar } from '../../components';
import { showError, showSuccess } from '../../utils';
import Content from './Content';
import { firebase } from '../../config';
import PushNotification from 'react-native-push-notification';

const DetailSTNK = ({ navigation, route }) => {
  const {
    NOMOR_MESIN,
    TAHUN_BUAT,
    TYPE_KB,
    PLAT,
    KODE_DAERAH_NOMOR_POLISI,
    NOMOR_POLISI,
    TAHUN_BERLAKU_SD,
    NOMOR_RANGKA,
  } = route.params;
  const values = route.params;
  const vehiclesToDB = {
    ...values,
    FOTO_KENDARAAN: {
      [0]: '',
    },
    NAMA_KENDARAAN: '',
  };
  console.log('vehicle :', vehiclesToDB);

  const [uid, setUid] = useState('');

  useEffect(() => {
    getData('user').then(response => {
      const data = response;
      setUid(data.uid);
    });
  }, []);

  const tambahKendaraan = () => {
    console.log('searchVehicle response: ', values);
    firebase
      .database()
      .ref(`users/${uid}/vehicles`)
      .child(values.ID)
      .set(vehiclesToDB)
      .catch(error => {
        console.log(error.message);
        showError(error.message);
      });
    PushNotification.localNotificationSchedule({
      //... You can use all the options from localNotifications
      message: 'Kendaraan anda perlu bayar pajak', // (required)
      date: new Date(Date.now() + 5 * 1000), // in 60 secs
      allowWhileIdle: false, // (optional) set notification to work while on doze, default: false

      /* Android Only Properties */
      repeatTime: 1, // (optional) Increment of configured repeatType. Check 'Repeating Notifications' section for more info.
      // channelId: "your-channel-id"
    });
    showSuccess('Kendaraan berhasil ditambahkan');
  };

  return (
    <SafeAreaView style={styles.page}>
      <TopBar title="Tambah kendaraan" onBack={() => navigation.goBack()} />
      <View style={styles.contentWrapper}>
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
          content={KODE_DAERAH_NOMOR_POLISI + ' ' + NOMOR_POLISI + ' ' + PLAT}
        />
        <Content title="MASA BERLAKU STNK" content={TAHUN_BERLAKU_SD} />
        <Content title="TAMBHAKAN FOTO STNK" content="STNK" />
        <View style={styles.buttonContainer}>
          <Button
            label="Tambah"
            paddingHorizontal={0}
            height={43}
            onPress={() => tambahKendaraan()}
          />
        </View>
      </View>
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
