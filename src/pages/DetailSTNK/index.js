import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import {color} from 'react-native-reanimated';
import {colors, fonts, IconAddVehicle, IMGKorlantas} from '../../assets';
import {Gap, TextInput, CheckBox, Button, TopBar} from '../../components';
import Content from './Content';

const DetailSTNK = ({navigation}) => {
  return (
    <SafeAreaView style={styles.page}>
      <TopBar
        title="Tambah kendaraan"
        onBack={() => navigation.navigate('AddVehicle')}
      />
      <View style={styles.contentWrapper}>
        <View style={styles.contentTitleContainer}>
          <IconAddVehicle width={58} height={39} />
          <Text style={styles.contentTitle}>Rincian Kendaraan</Text>
        </View>
        <Content title="NOMOR MESIN" content="HGAI-7588976" />
        <Content title="TAHUN PEMBUATAN" content="2016" />
        <Content title="TYPE" content="HSGD" />
        <Content title="SERI" content="HGA163" />
        <Content title="NOMOR POLISI" content="DB 5848 C" />
        <Content title="MASA BERLAKU STNK" content="25 MEI 2023" />
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
