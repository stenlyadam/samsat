import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import {colors, fonts, IconInfo, IMGKorlantas, IMGVehicle} from '../../assets';
import {Gap, TextInput, CheckBox, Button, TopBar} from '../../components';
import Content from './Content';
import TimeSection from './TimeSection';

let x = 1;

const Notification = ({navigation}) => {
  return (
    <SafeAreaView style={styles.page}>
      <TopBar
        title="Notifikasi"
        onBack={() => navigation.navigate('Dashboard')}
      />
      <View style={styles.contentContainer}>
        <TimeSection type="Minggu Ini" />
        <TimeSection type="Bulan Ini" />
        <TimeSection type="Lainnya" />
      </View>
    </SafeAreaView>
  );
};

export default Notification;

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  contentContainer: {
    width: '100%',
    backgroundColor: colors.white,
    paddingHorizontal: 25,
    flex: 1,
  },
  timeSectionTitle: {
    fontFamily: fonts.Poppins.medium,
    fontSize: 18,
    color: colors.primaryRed,
    marginBottom: 7,
  },
});
