import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { colors, fonts, getData, IconEdit, IMGStnk } from '../../assets';
import { Button, TopBar } from '../../components';
import AddPicture from './AddPicture';
import VehicleDetailContent from './VehicleDetailContent';
import { firebase } from '../../config';
import NumberFormat from 'react-number-format';
import { launchImageLibrary } from 'react-native-image-picker';
import { showError } from '../../utils';

const VehicleDetail = ({ route, navigation }) => {
  const values = route.params;
  const vehicle = values.vehicle.data;
  const [namaKendaraan, setNamaKendaraan] = useState('');
  const [uid, setUid] = useState('');
  var inputNama = '';
  if (vehicle.vehicleName === '') {
    inputNama = (
      <TextInput
        placeholder="Berikan nama untuk kendaraan anda"
        value={namaKendaraan}
        onChangeText={value => setNamaKendaraan(value)}
      />
    );
  } else {
    inputNama = (
      <TextInput
        placeholder={vehicle.vehicleName}
        value={namaKendaraan}
        onChangeText={value => setNamaKendaraan(value)}
      />
    );
  }

  useEffect(() => {
    getData('user').then(response => {
      const data = response;
      setUid(data.uid);
    });
  }, []);

  const Simpan = () => {
    console.log('Simpan Clicked!', uid);
    firebase
      .database()
      .ref(`users/${uid}/vehicles/${vehicle.id}`)
      .update({ vehicleName: namaKendaraan });
  };
  return (
    <ScrollView style={styles.page}>
      <TopBar
        title="Rincian Kendaraan"
        onBack={() =>
          navigation.reset({
            index: 0,
            routes: [{ name: 'Dashboard' }],
          })
        }
      />
      <View style={styles.contentContainer}>
        <View style={styles.pictureWrapper}>
          <Text style={styles.title}>Foto Kendaraan</Text>
          <View style={styles.pictureContainer}>
            <AddPicture text="Foto Pertama" count={0} vehicle={vehicle} />
            <AddPicture text="Foto Kedua" count={1} vehicle={vehicle} />
            <AddPicture text="Foto Ketiga" count={2} vehicle={vehicle} />
          </View>

          <View style={styles.taxInformationContainer}>
            <View>
              <View style={styles.documentPictureContainer}>
                <Text style={styles.doucmentPictureTitle}>Foto STNK</Text>
                <Image source={IMGStnk} />
              </View>
              <View style={styles.paymentDueTitleContainer}>
                <Text style={styles.paymentDueText}>Pembayaran Sebelum</Text>
              </View>
            </View>
            <View style={styles.paymentContainerLine}>
              <View style={styles.paymentTitleContainer}>
                <Text style={styles.paymentTitle}>
                  JUMLAH YANG HARUS DIBAYAR
                </Text>
              </View>
              <View style={styles.paymentTotalContainer}>
                <Text style={styles.paymentTotal}>Rp</Text>
                <NumberFormat
                  value={vehicle.price}
                  displayType={'text'}
                  thousandSeparator="."
                  decimalSeparator=","
                  renderText={value => (
                    <Text style={styles.paymentTotal}>{value}</Text>
                  )}
                />
              </View>
              <View style={styles.paymentDueDateContainer}>
                <Text style={styles.paymentDueText}>
                  {vehicle.masaBerlakuSTNK}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.vehicleDetailContainer}>
            <Text style={styles.title}>Nama Kendaraan</Text>
            <View>
              <View style={styles.textInputContainer}>
                {inputNama}
                {/* { {
                <TextInput placeholder={vehicle.vehicleName} />

                }else{

                <TextInput placeholder="Berikan nama untuk kendaraan anda" />
                }} */}
                <IconEdit />
              </View>
              <View style={styles.vehicleDetailSubContainer}>
                <View style={styles.column}>
                  <VehicleDetailContent
                    title="NOMOR MESIN"
                    content={vehicle.nomorMesin}
                  />
                  <VehicleDetailContent
                    title="TAHUN PEMBUATAN"
                    content={vehicle.tahunPembuatan}
                  />
                  <VehicleDetailContent title="TYPE" content={vehicle.type} />
                </View>
                <View style={styles.column}>
                  <VehicleDetailContent
                    title="NOMOR POLISI"
                    content={vehicle.nomorPolisi}
                  />
                  <VehicleDetailContent
                    title="MASA BERLAKU STNK"
                    content={vehicle.masaBerlakuSTNK}
                  />
                  <VehicleDetailContent title="SERI" content={vehicle.seri} />
                </View>
              </View>
              <Button label="Simpan" onPress={Simpan} />
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default VehicleDetail;

const styles = StyleSheet.create({
  addPicture: {
    height: 100,
    width: 100,
    backgroundColor: colors.lightGrey,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  addPictureText: {
    fontFamily: fonts.Poppins.regular,
    fontSize: 12,
    color: colors.white,
    position: 'absolute',
    bottom: 13,
  },
  page: {
    flex: 1,
    backgroundColor: colors.white,
  },
  pictureWrapper: {
    width: '100%',
    paddingHorizontal: 24,
    marginTop: 24,
  },
  title: {
    fontSize: 18,
    fontFamily: fonts.Poppins.medium,
    color: colors.darkGrey,
    marginBottom: 15,
  },
  pictureContainer: {
    flexDirection: 'row',
  },
  image: {
    height: 100,
    width: 100,
    marginRight: 10,
  },
  taxInformationContainer: {
    backgroundColor: colors.lightGrey,
    width: '100%',
    height: 110,
    marginTop: 44,
    borderRadius: 8,
    flexDirection: 'row',
  },
  documentPictureContainer: {
    height: 85,
    width: 117,
    backgroundColor: colors.lightGrey,
    borderTopLeftRadius: 8,
    borderRightWidth: 4,
    borderColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  doucmentPictureTitle: {
    fontSize: 12,
    fontFamily: fonts.Poppins.medium,
    color: colors.darkGrey,
  },
  paymentDueTitleContainer: {
    backgroundColor: colors.lightGrey,
    flex: 1,
    width: 117,
    borderBottomLeftRadius: 8,
    borderRightWidth: 4,
    borderTopWidth: 4,
    borderColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  paymentDueText: {
    fontFamily: fonts.Poppins.medium,
    fontSize: 9,
    color: colors.darkGrey,
  },
  paymentTitleContainer: {
    height: 85 / 2,
    width: '100%',
    borderTopRightRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  paymentContainerLine: {
    flex: 1,
  },
  paymentTitle: {
    fontFamily: fonts.Poppins.medium,
    fontSize: 14,
    color: colors.darkGrey,
  },
  paymentTotalContainer: {
    height: 85 / 2,
    width: '100%',
    borderTopColor: colors.white,
    borderTopWidth: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 7,
  },
  paymentTotal: {
    fontSize: 18,
    fontFamily: fonts.Poppins.medium,
    color: colors.darkGrey,
  },
  paymentDueDateContainer: {
    width: 246,
    flex: 1,
    borderBottomRightRadius: 8,
    borderTopColor: colors.white,
    borderTopWidth: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },

  textInputContainer: {
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderBottomColor: colors.lightGrey,
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  vehicleDetailSubContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
});
