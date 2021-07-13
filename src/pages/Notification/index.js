import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { colors, fonts } from '../../assets';
import { TopBar } from '../../components';
import TimeSection from './TimeSection';

const Notification = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.page}>
      <TopBar title="Notifikasi" onBack={() => navigation.goBack()} />
      <View style={styles.contentContainer}>
        <TimeSection
          type="Minggu Ini"
          onPress={() => navigation.navigate('VehicleDetail')}
        />
        <TimeSection
          type="Bulan Ini"
          onPress={() => navigation.navigate('VehicleDetail')}
        />
        <TimeSection
          type="Lainnya"
          onPress={() => navigation.navigate('VehicleDetail')}
        />
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
