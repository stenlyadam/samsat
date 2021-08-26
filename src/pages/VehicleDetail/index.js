import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { colors, fonts, getData, IconEdit, IconPlus } from '../../assets';
import { Button, TopBar } from '../../components';
import VehicleDetailContent from './VehicleDetailContent';
import { firebase } from '../../config';
import NumberFormat from 'react-number-format';
import { showSuccess } from '../../utils';
import { launchImageLibrary } from 'react-native-image-picker';

const VehicleDetail = ({ route, navigation }) => {
  const values = route.params;
  const vehicle = values.vehicle.data;
  const vehicleId = vehicle.ID;
  const [uid, setUid] = useState('');
  const [database, setDatabase] = useState(vehicle);
  var inputNama = '';
  if (vehicle.NAMA_KENDARAAN === '') {
    inputNama = (
      <TextInput
        placeholder="Berikan nama untuk kendaraan anda"
        value={database.NAMA_KENDARAAN}
        onChangeText={value =>
          setDatabase(prevDatabase => ({
            ...prevDatabase,
            NAMA_KENDARAAN: value,
          }))
        }
      />
    );
  } else {
    inputNama = (
      <TextInput
        placeholder="Berikan nama untuk kendaraan anda"
        value={database.NAMA_KENDARAAN}
        onChangeText={value =>
          setDatabase(prevDatabase => ({
            ...prevDatabase,
            NAMA_KENDARAAN: value,
          }))
        }
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
    firebase.database().ref(`users/${uid}/vehicles/${vehicle.ID}`).update({
      NAMA_KENDARAAN: database.NAMA_KENDARAAN,
      FOTO_KENDARAAN: database.FOTO_KENDARAAN,
    });

    showSuccess('Kendaraan berhasil disimpan');
  };
  const DeleteVehicle = () => {
    console.log('delete vehicle clicked!', vehicleId);
    Alert.alert('Anda yakin menghapus kendaraan ini?', 'Pilihan', [
      {
        text: 'Batalkan',
        onPress: () => console.log('Batalkan'),
      },
      {
        text: 'Yakin',
        onPress: () =>
          firebase
            .database()
            .ref(`users/${uid}/vehicles/${vehicle.ID}`)
            .remove()
            .then(res => {
              navigation.reset({
                index: 0,
                routes: [{ name: 'Dashboard' }],
              });
            }),
      },
    ]);
  };
  const options = {
    includeBase64: true,
    quality: 0.3,
  };
  const [kendaraan, setKendaraan] = useState({
    vehicle,
  });
  useEffect(() => {
    getData('user').then(response => {
      const data = response;
      setUid(data.uid);
      const item = { vehicle: data.vehicles[vehicle.ID] };
      setKendaraan(item);
    });
  }, [vehicle.ID]);

  const AddPicture = ({ count, text }) => {
    const openLibrary = () => {
      launchImageLibrary(options, response => {
        if (response.didCancel || response.error) {
          console.log('Launch Image Library Error');
        } else {
          const imageBase64 = JSON.stringify(response.assets[0].base64);
          setKendaraan(prevKendaraan => ({
            ...prevKendaraan,
            vehicle: {
              ...prevKendaraan.vehicle,
              FOTO_KENDARAAN: {
                ...prevKendaraan.vehicle.FOTO_KENDARAAN,
                [count]: imageBase64,
              },
            },
          }));
          setDatabase(prevDatabase => ({
            ...prevDatabase,
            FOTO_KENDARAAN: {
              ...prevDatabase.FOTO_KENDARAAN,
              [count]: imageBase64,
            },
          }));
        }
      });
    };
    const deletePicture = () => {
      setKendaraan(prevKendaraan => ({
        ...prevKendaraan,
        vehicle: {
          ...prevKendaraan.vehicle,
          FOTO_KENDARAAN: {
            ...prevKendaraan.vehicle.FOTO_KENDARAAN,
            [count]: false,
          },
        },
      }));
      setDatabase(prevDatabase => ({
        ...prevDatabase,
        FOTO_KENDARAAN: {
          ...prevDatabase.FOTO_KENDARAAN,
          [count]: '',
        },
      }));
    };
    if (kendaraan.vehicle.FOTO_KENDARAAN[count]) {
      return (
        <View style={styles.addPicture}>
          <TouchableOpacity style={styles.addPicture} onPress={openLibrary}>
            <Image
              source={{
                uri: `data:image/jpg;base64,${kendaraan.vehicle.FOTO_KENDARAAN[count]}`,
              }}
              style={styles.image}
            />
          </TouchableOpacity>
          <View style={styles.deletePictureButton}>
            <Button
              type="icon-only"
              icon="icon-delete-cross"
              width={25}
              height={25}
              onPress={deletePicture}
            />
          </View>
        </View>
      );
    } else {
      return (
        <View>
          <TouchableOpacity style={styles.addPicture} onPress={openLibrary}>
            <IconPlus style={styles.iconPlus} />
            <Text style={styles.addPictureText}>{text}</Text>
          </TouchableOpacity>
        </View>
      );
    }
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

  var selectedMonthName = months[vehicle.BULAN_BERLAKU_SD - 1];
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
        trash={true}
        trashOnPress={DeleteVehicle}
      />
      <View style={styles.contentContainer}>
        <View style={styles.pictureWrapper}>
          <Text style={styles.title}>Foto Kendaraan</Text>
          <View style={styles.pictureContainer}>
            <AddPicture count={0} text="Foto Pertama" />
            <AddPicture count={1} text="Foto Kedua" />
            <AddPicture count={2} text="Foto Ketiga" />
          </View>

          <View style={styles.taxInformationContainer}>
            <View style={styles.paymentContainerLine}>
              <View style={styles.paymentTitleContainer}>
                <Text style={styles.paymentTitle}>
                  JUMLAH YANG HARUS DIBAYAR
                </Text>
              </View>
              <View style={styles.paymentTotalContainer}>
                <Text style={styles.paymentTotal}>Rp</Text>
                <NumberFormat
                  value={vehicle.PKB_TERAKHIR}
                  displayType={'text'}
                  thousandSeparator="."
                  decimalSeparator=","
                  renderText={value => (
                    <Text style={styles.paymentTotal}>{value}</Text>
                  )}
                />
              </View>
              <View style={styles.paymentDueDateContainer}>
                <Text style={styles.paymentDueText}>Pembayaran sebelum : </Text>
                <Text style={styles.paymentDueText}>
                  {vehicle.TANGGAL_BERLAKU_SD +
                    ' ' +
                    selectedMonthName +
                    ' ' +
                    vehicle.TAHUN_BERLAKU_SD}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.vehicleDetailContainer}>
            <Text style={styles.title}>Nama Kendaraan</Text>
            <View>
              <View style={styles.textInputContainer}>
                {inputNama}
                <IconEdit />
              </View>
              <View style={styles.vehicleDetailSubContainer}>
                <View style={styles.column}>
                  <VehicleDetailContent
                    title="NOMOR MESIN"
                    content={vehicle.NOMOR_MESIN}
                  />
                  <VehicleDetailContent
                    title="TAHUN PEMBUATAN"
                    content={vehicle.TAHUN_BUAT}
                  />
                  <VehicleDetailContent
                    title="TYPE"
                    content={vehicle.TYPE_KB}
                  />
                </View>
                <View style={styles.column}>
                  <VehicleDetailContent
                    title="NOMOR POLISI"
                    content={
                      vehicle.KODE_DAERAH_NOMOR_POLISI +
                      ' ' +
                      vehicle.NOMOR_POLISI +
                      ' ' +
                      vehicle.KODE_LOKASI_NOMOR_POLISI
                    }
                  />
                  <VehicleDetailContent
                    title="MASA BERLAKU STNK"
                    content={
                      vehicle.TANGGAL_BERLAKU_SD +
                      ' ' +
                      selectedMonthName +
                      ' ' +
                      vehicle.TAHUN_BERLAKU_SD
                    }
                  />
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
    paddingHorizontal: 20,
  },
  paymentTotal: {
    fontSize: 18,
    fontFamily: fonts.Poppins.medium,
    color: colors.darkGrey,
  },
  paymentDueDateContainer: {
    width: '100%',
    flex: 1,
    borderBottomRightRadius: 8,
    borderTopColor: colors.white,
    borderTopWidth: 4,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
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
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  deletePictureButton: {
    position: 'absolute',
    bottom: -8,
    right: -8,
  },
});
