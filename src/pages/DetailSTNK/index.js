import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { colors, fonts, getData, IconAddVehicle } from '../../assets';
import { Button, TopBar } from '../../components';
import { showError, showSuccess } from '../../utils';
import Content from './Content';
import { firebase } from '../../config';
import { useDispatch } from 'react-redux';

const DetailSTNK = ({ navigation, route }) => {
  const {
    NOMOR_MESIN,
    TAHUN_BUAT,
    TYPE_KB,
    MEREK_KB,
    PLAT,
    KODE_DAERAH_NOMOR_POLISI,
    NOMOR_POLISI,
    KODE_LOKASI_NOMOR_POLISI,
    TANGGAL_BERLAKU_SD,
    BULAN_BERLAKU_SD,
    TAHUN_BERLAKU_SD,
    FOTO_KENDARAN,
    FOTO_STNK,
    ID,
    PKB_TERKAHIR,
    NOMOR_RANGKA,
    FOTO_KENDARAAN = '',
    NAMA_KENDARAAN = '',
  } = route.params;
  const values = route.params;
  const [vehiclesToDB, setVehiclesToDB] = useState({
    ...values,
    FOTO_KENDARAAN: '',
    NAMA_KENDARAAN: '',
  });
  console.log('vehicle :', vehiclesToDB);

  const [uid, setUid] = useState('');
  const [id, setId] = useState('');

  useEffect(() => {
    getData('user').then(response => {
      const data = response;
      setUid(data.uid);
    });
  }, []);

  const tambahKendaraan = () => {
    // dispatch({type: 'SET_LOADING', value: true});

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
