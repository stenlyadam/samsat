import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {colors, fonts, IconMainProfile} from '../../assets';
import {Gap, TopBar} from '../../components';
import ContentHeader from './ContentHeader';

const Profile = ({navigation}) => {
  return (
    <ScrollView style={styles.page}>
      <TopBar title="Akun" onBack={() => navigation.goBack()} />
      <View style={styles.contentWrapper}>
        <View style={styles.profilePictureContainer}>
          <IconMainProfile width={80} height={80} />
          <Text style={styles.name}>Samsat Minut</Text>
        </View>
        <ContentHeader type="detail" headerTitle="Detail Profil" />
        <ContentHeader type="edit" headerTitle="Edit Profil" />
        <TouchableOpacity style={styles.header}>
          <Text style={styles.headerTitle}>Logout</Text>
        </TouchableOpacity>
      </View>
      <Gap height={50} />
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.white,
  },
  contentWrapper: {
    flex: 1,
    backgroundColor: colors.white,
  },
  profilePictureContainer: {
    alignItems: 'center',
    width: '100%',
    marginTop: 40,
    marginBottom: 50,
  },
  name: {
    fontFamily: fonts.Poppins.medium,
    fontSize: 18,
    marginTop: 20,
  },
  header: {
    flexDirection: 'row',
    backgroundColor: 'white',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 50,
    alignItems: 'center',
    marginBottom: 15,
  },
  headerTitle: {
    fontFamily: fonts.Poppins.regular,
    fontSize: 18,
    color: 'red',
  },
});
