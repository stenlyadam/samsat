import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {colors, fonts, IconAddVehicle} from '../../assets';
import {TopBar} from '../../components';

const AddVehicle = ({navigation}) => {
  return (
    <SafeAreaView style={styles.page}>
      <TopBar
        title="Tambah Kendaraan"
        onBack={() => navigation.navigate('Dashboard')}
      />
      <View style={styles.contentContainer}>
        <IconAddVehicle />
        <Text style={styles.text}>
          Masukkan <Text style={styles.boldText}>nomor mesin</Text> yang ada di
          bagian bawah STNK anda
        </Text>
        <View style={styles.engineNumberInputContainer}>
          <TextInput
            style={styles.engineNumberInput}
            placeholder="Nomor Mesin"
            textAlign="center"
          />
          <TouchableOpacity
            style={styles.engineNumberInputButton}
            onPress={() => navigation.navigate('DetailSTNK')}>
            <Text style={styles.buttonTitle}>Cari Nomor Mesin</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AddVehicle;

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  topBarContainer: {
    width: '100%',
    height: 70,
    backgroundColor: colors.primaryRed,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    paddingLeft: 16,
  },
  topBarTitle: {
    color: colors.white,
    fontFamily: fonts.Poppins.medium,
    fontSize: 18,
    marginLeft: 16,
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: colors.white,
    paddingBottom: 100,
  },
  text: {
    fontSize: 14,
    fontFamily: fonts.Poppins.regular,
    textAlign: 'center',
    width: 240,
  },
  boldText: {
    fontFamily: fonts.Poppins.bold,
  },

  engineNumberInputContainer: {
    paddingHorizontal: 52,
    width: '100%',
    height: 85,
    marginTop: 20,
  },
  engineNumberInput: {
    width: '100%',
    height: 46,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: colors.white,
    elevation: 10,
  },
  engineNumberInputButton: {
    flex: 1,
    backgroundColor: colors.primaryRed,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
  },
  buttonTitle: {
    fontFamily: fonts.Poppins.medium,
    fontSize: 14,
    color: colors.white,
  },
});
