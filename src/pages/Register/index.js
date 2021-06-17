import React from 'react';
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
  IMGBapenda,
  IMGJasaRaharja,
  IMGPemprov,
  IMGSatlantas,
} from '../../assets';
import {useForm} from '../../assets/useForm';
import {Gap, TextInput, CheckBox, Button} from '../../components';
import {firebase} from '../../config';

const Login = ({navigation}) => {
  const [form, setForm] = useForm({
    email: '',
    password: '',
  });

  const onContinue = () => {
    console.log(form);

    firebase
      .auth()
      .createUserWithEmailAndPassword(form.email, form.password)
      .then(response => {
        firebase.database().ref(`users/${response.user.uid}/`);
        setForm('reset');
        navigation.navigate('Login');
      })
      .catch(error => {
        console.log(error.message);
      });
  };

  return (
    <SafeAreaView style={styles.page}>
      <Gap height={20} />

      <Image source={IMGBapenda} style={styles.bapenda} />
      <Gap height={30} />
      <Text style={styles.mainTitle}>SELAMAT DATANG</Text>
      <Text style={styles.subTitle}>Aplikasi Pengingat Pembayaran Pajak</Text>
      <Gap height={45} />
      <TextInput
        title="No. Ponsel atau Email"
        paddingHorizontal={55}
        value={form.email}
        onChangeText={value => setForm('email', value)}
      />
      <Gap height={26} />
      <TextInput
        title="Password"
        paddingHorizontal={55}
        value={form.password}
        onChangeText={value => setForm('password', value)}
        secureTextEntry={true}
      />
      <Gap height={10} />
      <View style={styles.passwordExtrasContainer}>
        {/* <View style={styles.checkBoxContainer}>
          <CheckBox label="Ingat" />
        </View>
        <TouchableOpacity>
          <Text style={styles.forgetPasswordText}>Lupa Password?</Text>
        </TouchableOpacity> */}
      </View>
      <Gap height={40} />
      <Button label="Daftar" onPress={onContinue} />
      <Gap height={10} />
      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>Sudah memiliki akun? </Text>
        <TouchableOpacity
          style={styles.registerButton}
          onPress={() => navigation.navigate('Login')}>
          <Text style={styles.registerButtonText}>Login</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.logoContainer}>
        <Image source={IMGSatlantas} style={styles.satlantas} />
        <Image source={IMGPemprov} style={styles.pemprov} />
        <Image source={IMGJasaRaharja} style={styles.jasaraharja} />
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
    width: 209,
    justifyContent: 'space-between',
    marginTop: 35,
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
