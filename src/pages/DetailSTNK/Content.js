import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, fonts } from '../../assets';

const Content = ({ title, content }) => {
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
