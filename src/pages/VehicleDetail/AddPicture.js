import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { colors, fonts, getData, IconPlus, storeData } from '../../assets';
import { firebase } from '../../config';
import { launchImageLibrary } from 'react-native-image-picker';
import { showError } from '../../utils';

const AddPicture = ({ text, count, vehicle }) => {
  const options = {
    includeBase64: true,
    quality: 0.3,
  };
  const [uid, setUid] = useState('');
  const [image, setImage] = useState('');
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
  }, []);

  const openLibrary = () => {
    launchImageLibrary(options, response => {
      if (response.didCancel || response.error) {
        console.log('Launch Image Library Error');
      } else {
        const imageBase64 = JSON.stringify(response.assets[0].base64);
        console.log('response launch image library', response.assets);
        firebase
          .database()
          .ref(`users/${uid}/vehicles/${vehicle.ID}/FOTO_KENDARAAN`)
          .update({ [count]: imageBase64 })
          .then(res => {
            firebase
              .database()
              .ref(`users/${uid}`)
              .get()
              .then(responseDB => {
                setImage(responseDB.val().vehicles[vehicle.ID].FOTO_KENDARAAN);
                storeData('user', responseDB.val());
              });
          })
          .catch(error => {
            console.log(error.message);
            showError(error.message);
          });
      }
    });
  };
  // return <Text>wkwkwkwk</Text>;
  if (kendaraan.vehicle.FOTO_KENDARAAN[count] || image[count]) {
    // console.log('foto kendaraan: ', kendaraan.vehicle.fotoKendaraan[count]);
    return (
      <View>
        <TouchableOpacity style={styles.addPicture} onPress={openLibrary}>
          <Image
            source={{
              uri: image
                ? `data:image/jpg;base64,${image[count]}`
                : `data:image/jpg;base64,${kendaraan.vehicle.FOTO_KENDARAAN[count]}`,
            }}
            style={{ width: 100, height: 100 }}
          />
        </TouchableOpacity>
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

export default AddPicture;

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
});
