import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {
  colors,
  fonts,
  getData,
  IconEdit,
  IconPlus,
  IMGStnk,
  IMGVehicle,
  storeData,
} from '../../assets';
import { TopBar } from '../../components';
import VehicleDetailContent from './VehicleDetailContent';
import { firebase } from '../../config';
import NumberFormat from 'react-number-format';
import { launchImageLibrary } from 'react-native-image-picker';
import { showError } from '../../utils';

const AddPicture = ({ text, count, vehicle }) => {
  const options = {
    includeBase64: true,
    quality: 0.3,
  };
  const [uid, setUid] = useState('');
  const [image, setImage] = useState('');
  useEffect(() => {
    getData('user').then(response => {
      const data = response;
      setUid(data.uid);
    });
  }, []);
  useEffect(() => {
    console.log('Get data uid : ', uid);
  }, [uid]);

  const openLibrary = () => {
    launchImageLibrary(options, response => {
      if (response.didCancel === true) {
      } else {
        const imageBase64 = JSON.stringify(response.assets[0].base64);
        // setImage(imageBase64);
        console.log('response launch image library', response.assets);
        firebase
          .database()
          .ref(`users/${uid}/vehicles/${vehicle.id}/fotoMotor`)
          .update({ [count]: imageBase64 })
          .then(res => {
            firebase
              .database()
              .ref(`users/${uid}/vehicles/${vehicle.id}`)
              .get()
              .then(responseDB => {
                setImage(responseDB.val().fotoMotor);
                console.log('wkwkwkwk', responseDB.val());
                if (responseDB.val()) {
                  storeData('user', responseDB.val());
                }
              });
          })
          .catch(error => {
            console.log(error.message);
            showError(error.message);
          });
      }
    });
  };
  console.log('Key sent : ', vehicle);
  if (vehicle.fotoMotor[count] || image[count]) {
    return (
      <View>
        <TouchableOpacity style={styles.addPicture} onPress={openLibrary}>
          <Image
            source={{
              uri: image
                ? `data:image/jpg;base64,${image[count]}`
                : `data:image/jpg;base64,${vehicle.fotoMotor[count]}`,
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
