import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, fonts } from '../../../assets';
import { Button } from '../../../components';

const TopBar = ({ title, onBack, trash, trashOnPress }) => {
  return (
    <View style={styles.topBarContainer}>
      <Button type="icon-only" icon="icon-left-arrow" onPress={onBack} />
      <Text style={styles.topBarTitle}>{title}</Text>
      {trash && (
        <View style={styles.trashContainer}>
          <Button
            type="icon-only"
            icon="icon-trash"
            style={styles.trash}
            onPress={trashOnPress}
          />
        </View>
      )}
    </View>
  );
};

export default TopBar;

const styles = StyleSheet.create({
  trashContainer: {
    flex: 1,
    alignItems: 'flex-end',
    paddingRight: 16,
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
});
