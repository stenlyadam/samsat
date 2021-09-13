import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
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
import { SET_LOADING } from '../../redux/counter/loadingSlice';
import { remember } from '../../redux/counter/rememberSlice';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const Login = ({ navigation }) => {
  //login logic
  const [ingat, setIngat] = useState(true);
  const [form, setForm] = useForm({
    email: '',
    password: '',
  });

  const dispatch = useDispatch(); //redux

  useEffect(() => {
    getData('email').then(data => {
      setForm('email', data);
    });
    getData('user').then(data => {
      if (data != null) {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Dashboard' }],
        });
      }
    });
  }, []);

  //Push Notification
  const notif = new NotifService();

  const onContinue = () => {
    dispatch(SET_LOADING(true));
    firebase
      .auth()
      .signInWithEmailAndPassword(form.email, form.password)
      .then(response => {
        dispatch(SET_LOADING(false));
        firebase
          .database()
          .ref(`users/${response.user.uid}/`)
          .once('value')
          .then(responseDB => {
            if (responseDB.val()) {
              storeData('user', responseDB.val()); //asyncstorage user data
              if (ingat) {
                //login logic
                storeData('email', form.email);
              } else {
                storeData('email', null);
              }
              navigation.navigate('Dashboard', {
                screen: 'Dashboard',
              }); //Navigate to dashboard
            }
          });
        if (ingat) {
          setForm('password', null);
        } else {
          setForm('reset');
        }
      })
      .catch(error => {
        dispatch(SET_LOADING(false));
        console.log(error.message);
        showError(error.message);
      });
  };
  return (
    <SafeAreaView style={styles.page}>
      <Gap height={hp('2%')} />
      <Image source={IMGBapenda} style={styles.bapenda} />
      <Gap height={30} />
      <Text style={styles.mainTitle}>SELAMAT DATANG</Text>
      <Text style={styles.subTitle}>Aplikasi Pengingat Pembayaran Pajak</Text>
      <Gap height={hp('1%')} />
      <TextInput
        title="Email"
        paddingHorizontal={'13%'}
        value={form.email}
        onChangeText={value => {
          setForm('email', value);
        }}
      />
      <Gap height={hp('2%')} />
      <TextInput
        title="Password"
        paddingHorizontal={'13%'}
        value={form.password}
        onChangeText={value => setForm('password', value)}
        secureTextEntry={true}
      />
      <Gap height={hp('1%')} />
      <View style={styles.passwordExtrasContainer}>
        <View style={styles.checkBoxContainer}>
          <CheckBox
            label="Ingat"
            value={ingat}
            onValueChange={value => {
              dispatch(remember(value));
              setIngat(value);
            }}
          />
        </View>
      </View>
      <Gap height={hp('5%')} />
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
      <Gap height={hp('2%')} />
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
