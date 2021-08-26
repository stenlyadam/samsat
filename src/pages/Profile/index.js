import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {
  colors,
  fonts,
  getData,
  IconArrowRight,
  IconMainProfile,
  storeData,
} from '../../assets';
import { Button, Gap, TopBar } from '../../components';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';
import Content from './Content';
import { firebase } from '../../config';
import NotifService from '../../../NotifService';

const ContentHeader = ({ headerTitle, type }) => {
  const [profile, setProfile] = useState({
    namaLengkap: '',
    tanggalLahir: '',
    alamat: '',
    email: '',
  });
  useEffect(() => {
    getData('user').then(response => {
      const data = response;
      setProfile(data);
    });
  }, []);

  const changeText = (key, value) => {
    setProfile({
      ...profile,
      [key]: value,
    });
  };
  const updateProfile = () => {
    const data = profile;
    console.log('data to be updated: ', data);
    firebase
      .database()
      .ref(`users/${profile.uid}/`)
      .update(data)
      .then(() => {
        storeData('user', data);
      });
  };
  if (type === 'edit') {
    return (
      <Collapse style={styles.contentContainer}>
        <CollapseHeader>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>{headerTitle}</Text>
            <IconArrowRight />
          </View>
        </CollapseHeader>
        <CollapseBody style={styles.collapseBody}>
          <Content
            type="edit"
            title="Nama Lengkap:"
            content="namaLengkap"
            profile={profile.namaLengkap}
            value={profile.namaLengkap}
            onChangeText={value => changeText('namaLengkap', value)}
          />
          <Content
            type="edit"
            placeholder="dd/mm/yyyy"
            title="Tanggal Lahir:"
            content="1 Januari 1999"
            profile={profile.tanggalLahir}
            value={profile.tanggalLahir}
            onChangeText={value => changeText('tanggalLahir', value)}
          />
          <Content
            type="edit"
            title="Alamat:"
            content="Airmadidi"
            profile={profile.alamat}
            value={profile.alamat}
            onChangeText={value => changeText('alamat', value)}
          />
          <View style={styles.button}>
            <Button label="Selesai" onPress={updateProfile} />
          </View>
        </CollapseBody>
      </Collapse>
    );
  } else {
    return (
      <Collapse style={styles.contentContainer}>
        <CollapseHeader>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>{headerTitle}</Text>
            <IconArrowRight />
          </View>
        </CollapseHeader>
        <CollapseBody>
          <Content title="Nama Lengkap:" profile={profile.namaLengkap} />
          <Content title="Tanggal Lahir:" profile={profile.tanggalLahir} />
          <Content title="Alamat:" profile={profile.alamat} />
          <Content title="Email:" profile={profile.email} />
        </CollapseBody>
      </Collapse>
    );
  }
};

const Profile = ({ navigation }) => {
  const notif = new NotifService(); //Notification
  const logout = () => {
    storeData('user', null);
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
    notif.cancelAll();
  };
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
        <TouchableOpacity style={styles.header} onPress={logout}>
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
  button: {
    marginTop: 30,
  },
  collapseBody: {
    marginBottom: 30,
  },
});
