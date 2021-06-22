import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {colors, fonts, getData, IconAddVehicle} from '../../assets';
import {Button, TopBar} from '../../components';
import {showError, showSuccess} from '../../utils';
import Content from './Content';
import {firebase} from '../../config';
import {useDispatch} from 'react-redux';

const DetailSTNK = ({navigation, route}) => {
  const {
    nomorMesin,
    tahunPembuatan,
    type,
    seri,
    nomorPolisi,
    masaBerlakuSTNK,
  } = route.params;

  const [uid, setUid] = useState('');
  const [id, setId] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    getData('user').then(response => {
      const data = response;
      setUid(data.uid);
    });
  }, []);

  const tambahKendaraan = () => {
    // dispatch({type: 'SET_LOADING', value: true});

    axios.get('http://10.0.2.2:3004/vehicles/' + nomorMesin).then(response => {
      // setVehicle(response.data);
      console.log('searchVehicle response: ', response.data);
      firebase
        .database()
        .ref(`users/${uid}/vehicles`)
        .child(response.data.id)
        .set(response.data)
        .catch(error => {
          // dispatch({type: 'SET_LOADING', value: false});
          console.log(error.message);
          showError(error.message);
        });
      // .then(snap => {
      //   console.log('unique vehicle id', snap.key);
      // });
      // dispatch({type: 'SET_LOADING', value: false});

      showSuccess('Kendaraan berhasil ditambahkan');
    });
  };

  return (
    <SafeAreaView style={styles.page}>
      <TopBar title="Tambah kendaraan" onBack={() => navigation.goBack()} />
      <View style={styles.contentWrapper}>
        <View style={styles.contentTitleContainer}>
          <IconAddVehicle width={58} height={39} />
          <Text style={styles.contentTitle}>Rincian Kendaraan</Text>
        </View>
        <Content title="NOMOR MESIN" content={nomorMesin} />
        <Content title="TAHUN PEMBUATAN" content={tahunPembuatan} />
        <Content title="TYPE" content={type} />
        <Content title="SERI" content={seri} />
        <Content title="NOMOR POLISI" content={nomorPolisi} />
        <Content title="MASA BERLAKU STNK" content={masaBerlakuSTNK} />
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
