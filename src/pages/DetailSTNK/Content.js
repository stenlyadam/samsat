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

const Content = ({title, content}) => {
  return (
    <View style={styles.contentContainer}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.content}>{content}</Text>
    </View>
  );
};

export default Content;

const styles = StyleSheet.create({
  contentContainer: {
    marginVertical: 10,
  },
  title: {
    fontFamily: fonts.Poppins.medium,
    fontSize: 12,
    color: colors.darkGrey,
  },
  content: {
    fontSize: 15,
    fontFamily: fonts.Poppins.medium,
    color: colors.darkGrey,
  },
});
