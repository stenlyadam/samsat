import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {
  colors,
  fonts,
  getData,
  IMGBapenda,
  IMGFik,
  IMGJasaRaharja,
  IMGPemprov,
  IMGSatlantas,
  IMGUnklab,
  storeData,
  windowHeight,
} from '../../assets';
import { useForm } from '../../assets/useForm';
import { Gap, TextInput, CheckBox, Button } from '../../components';
import { firebase } from '../../config';
import { useDispatch } from 'react-redux';
import { showError } from '../../utils';
import moment from 'moment-timezone';
import NotifService from '../../../NotifService';

const Login = ({ navigation }) => {
  const [form, setForm] = useForm({
    email: '',
    password: '',
  });

  const dispatch = useDispatch();

  useEffect(() => {
    getData('user').then(data => {
      // console.log('wkwkwk', data);
      // if (data != null || data != undefined) {
      //   navigation.reset({
      //     index: 0,
      //     routes: [{ name: 'Dashboard' }],
      //   });
      // }
    });
  }, []);

  //Push Notification
  const [registerToken, setRegisterToken] = useState('');
  const [fcmRegistered, setFcmRegistered] = useState(false);

  const onRegister = token => {
    setRegisterToken(token.token);
    setFcmRegistered(true);
  };

  const onNotif = notif => {
    Alert.alert(notif.title, notif.message);
  };

  //Push Notification

  const onContinue = () => {
    console.log('onContinue', form);
    dispatch({ type: 'SET_LOADING', value: true });
    firebase
      .auth()
      .signInWithEmailAndPassword(form.email, form.password)
      .then(response => {
        dispatch({ type: 'SET_LOADING', value: false });
        firebase
          .database()
          .ref(`users/${response.user.uid}/`)
          .once('value')
          .then(responseDB => {
            // const vehicles = responseDB.val().vehicles;
            // console.log('Response :', responseDB.val());
            // console.log('hehehehe :', vehicles);
            if (responseDB.val()) {
              storeData('user', responseDB.val());
              navigation.navigate('Dashboard');
            }
            getData('user').then(dataRes => {
              const oldData = dataRes.vehicles;
              const data = [];
              Object.keys(oldData).map(key => {
                data.push({
                  id: key,
                  data: oldData[key],
                });
              });
              data.map((vehicle, i) => {
                const notif = new NotifService(onNotif);
                const date = moment(
                  `${vehicle.data.TANGGAL_BERLAKU_SD}/${vehicle.data.BULAN_BERLAKU_SD}/${vehicle.data.TAHUN_BERLAKU_SD}/8`,
                  'DD/MM/YYYY/h',
                )
                  .tz('Asia/Makassar')
                  .format();
                const notifTitle =
                  'Notifikasi batas pemberlakuan surat pajak kendaraan anda dengan nomor polisi : ';

                const bigText = `${vehicle.data.KODE_DAERAH_NOMOR_POLISI} ${vehicle.data.NOMOR_POLISI} ${vehicle.data.PLAT} sebesar Rp.${vehicle.data.PKB_TERAKHIR}`;
                const scheduledFor = date;

                notif.scheduleNotif(bigText, notifTitle, scheduledFor);
                console.log('vehicle one by one :', bigText);
              });
            });
          });
        setForm('reset');
      })
      .catch(error => {
        dispatch({ type: 'SET_LOADING', value: false });
        console.log(error.message);
        showError(error.message);
      });
  };

  return (
    <SafeAreaView style={styles.page}>
      <Gap height={'2%'} />

      <Image source={IMGBapenda} style={styles.bapenda} />
      <Gap height={30} />
      <Text style={styles.mainTitle}>SELAMAT DATANG</Text>
      <Text style={styles.subTitle}>Aplikasi Pengingat Pembayaran Pajak</Text>
      <Gap height={windowHeight / 40} />
      <TextInput
        title="Email"
        paddingHorizontal={'13%'}
        value={form.email}
        onChangeText={value => setForm('email', value)}
      />
      <Gap height={'2%'} />
      <TextInput
        title="Password"
        paddingHorizontal={'13%'}
        value={form.password}
        onChangeText={value => setForm('password', value)}
        secureTextEntry={true}
      />
      <Gap height={'1%'} />
      <View style={styles.passwordExtrasContainer}>
        <View style={styles.checkBoxContainer}>
          <CheckBox label="Ingat" />
        </View>
        <TouchableOpacity>
          <Text style={styles.forgetPasswordText}>Lupa Password?</Text>
        </TouchableOpacity>
      </View>
      <Gap height={'5%'} />
      <Button label="Masuk" onPress={onContinue} />
      <Gap height={10} />
      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>Belum memiliki akun? </Text>
        <TouchableOpacity
          style={styles.registerButton}
          onPress={() => navigation.navigate('Register')}>
          <Text style={styles.registerButtonText}>Daftar</Text>
        </TouchableOpacity>
      </View>
      <Gap height={'2%'} />
      <View style={styles.logoContainer}>
        <Image source={IMGFik} style={styles.fik} />
        <Image source={IMGSatlantas} style={styles.satlantas} />
        <Image source={IMGPemprov} style={styles.pemprov} />
        <Image source={IMGJasaRaharja} style={styles.jasaraharja} />
        <Image source={IMGUnklab} style={styles.unklab} />
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  bapenda: {
    width: 250,
    height: 77.63,
  },
  logoContainer: {
    // position: 'absolute',
    // bottom: '8%',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingBottom: '8%',
    flex: 1,
  },
  satlantas: {
    width: 48,
    height: 43,
  },
  pemprov: {
    width: 45,
    height: 43,
  },
  jasaraharja: {
    height: 47,
    width: 43,
  },
  fik: {
    height: 43,
    width: 34,
  },
  unklab: {
    height: 43,
    width: 43,
  },
  mainTitle: {
    fontSize: 36,
    color: colors.primaryRed,
    fontFamily: fonts.Poppins.semibold,
  },
  subTitle: {
    fontSize: 17,
    color: colors.primaryRed,
    fontFamily: fonts.Poppins.regular,
    top: -15,
  },
  passwordExtrasContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 66,
  },
  checkBoxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkBoxLabel: {
    fontFamily: fonts.Poppins.regular,
    fontSize: 12,
    color: colors.primaryBlack,
  },
  forgetPasswordText: {
    fontFamily: fonts.Poppins.regular,
    fontSize: 12,
    color: colors.primaryBlack,
  },
  registerContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  registerText: {
    fontFamily: fonts.Poppins.regular,
    fontSize: 14,
    color: colors.primaryBlack,
  },
  registerButton: {
    justifyContent: 'center',
  },
  registerButtonText: {
    fontFamily: fonts.Poppins.bold,
    fontSize: 14,
    color: colors.primaryBlack,
  },
});
