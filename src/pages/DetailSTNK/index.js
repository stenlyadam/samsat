import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {colors, fonts, IconAddVehicle} from '../../assets';
import {Button, TopBar} from '../../components';
import Content from './Content';

const DetailSTNK = ({navigation, route}) => {
  const {
    nomorMesin,
    tahunPembuatan,
    type,
    seri,
    nomorPolisi,
    masaBerlakuSTNK,
  } = route.params;
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
          <Button label="Tambah" paddingHorizontal={0} height={43} />
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
