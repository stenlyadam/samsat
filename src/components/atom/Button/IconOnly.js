import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  IconHelp,
  IconMainProfile,
  IconNotification,
  IconProfileBottomTab,
  IconVehicle,
  IconAdd,
  IconLeftArrow,
  IconAddVehicle,
} from '../../../assets';
import {colors} from '../../../assets';

const IconOnly = ({icon, onPress, width, height}) => {
  const Icon = () => {
    if (icon === 'icon-help') {
      return (
        <View style={styles.iconContainer(width, height, colors.primaryBlack)}>
          <IconHelp />
        </View>
      );
    }
    if (icon === 'icon-notification') {
      return (
        <View style={styles.iconContainer(width, height, colors.primaryBlack)}>
          <IconNotification />
        </View>
      );
    }
    if (icon === 'icon-main-profile') {
      return (
        <View style={styles.iconContainer(width, height, colors.primaryBlack)}>
          <IconMainProfile />
        </View>
      );
    }
    if (icon === 'icon-vehicle') {
      return (
        <View style={styles.iconContainer(width, height, colors.primaryBlack)}>
          <IconVehicle />
        </View>
      );
    }
    if (icon === 'icon-add') {
      return (
        <View style={styles.iconContainer(width, height, colors.primaryBlack)}>
          <IconAdd />
        </View>
      );
    }
    if (icon === 'icon-profile') {
      return (
        <View style={styles.iconContainer(width, height, colors.primaryBlack)}>
          <IconProfileBottomTab />
        </View>
      );
    }
    if (icon === 'icon-left-arrow') {
      return (
        <View style={styles.iconContainer(width, height, colors.primaryBlack)}>
          <IconLeftArrow />
        </View>
      );
    }
    if (icon === 'icon-add-vehicle') {
      return (
        <View style={styles.iconContainer(width, height, colors.primaryBlack)}>
          <IconAddVehicle />
        </View>
      );
    }
    return <IconHelp />;
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Icon />
    </TouchableOpacity>
  );
};

export default IconOnly;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: (width, height, color) => ({
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    width: width,
    height: height,
  }),
});
