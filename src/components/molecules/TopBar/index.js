import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors, fonts} from '../../../assets';
import {Button} from '../../../components';

const TopBar = ({title, onBack}) => {
  return (
    <View style={styles.topBarContainer}>
      <Button type="icon-only" icon="icon-left-arrow" onPress={onBack} />
      <Text style={styles.topBarTitle}>{title}</Text>
    </View>
  );
};

export default TopBar;

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
