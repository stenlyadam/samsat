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
  IconMainProfile,
  IconProfileBottomTab,
  IMGKorlantas,
} from '../../assets';
import {Gap, TextInput, CheckBox, Button, TopBar} from '../../components';

const Profile = ({navigation}) => {
  return (
    <SafeAreaView style={styles.page}>
      <TopBar title="Akun" />
      <View style={styles.contentContainer}>
        <View style={styles.profilePictureContainer}>
          <IconMainProfile width={80} height={80} />
          <Text style={styles.name}>Samsat Minut</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: 'yellow',
  },
  profilePictureContainer: {
    alignItems: 'center',
    width: '100%',
    marginTop: 40,
  },
  name: {
    fontFamily: fonts.Poppins.medium,
    fontSize: 18,
    marginTop: 20,
  },
});
