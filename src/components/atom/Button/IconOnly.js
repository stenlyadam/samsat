import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import {
  IconHelp,
  IconMainProfile,
  IconNotification,
  IconProfileBottomTab,
  IconVehicle,
  IconAdd,
  IconLeftArrow,
  IconAddVehicle,
  IconDeleteCross,
  IconTrash,
} from '../../../assets';

const IconOnly = ({ icon, onPress }) => {
  const Icon = () => {
    if (icon === 'icon-trash') {
      return (
        <View style={styles.iconContainer}>
          <IconTrash />
        </View>
      );
    }
    if (icon === 'icon-delete-cross') {
      return (
        <View style={styles.iconContainer}>
          <IconDeleteCross />
        </View>
      );
    }
    if (icon === 'icon-help') {
      return (
        <View style={styles.iconContainer}>
          <IconHelp />
        </View>
      );
    }
    if (icon === 'icon-notification') {
      return (
        <View style={styles.iconContainer}>
          <IconNotification />
        </View>
      );
    }
    if (icon === 'icon-main-profile') {
      return (
        <View style={styles.iconContainer}>
          <IconMainProfile />
        </View>
      );
    }
    if (icon === 'icon-vehicle') {
      return (
        <View style={styles.iconContainer}>
          <IconVehicle />
        </View>
      );
    }
    if (icon === 'icon-add') {
      return (
        <View style={styles.iconContainer}>
          <IconAdd />
        </View>
      );
    }
    if (icon === 'icon-profile') {
      return (
        <View style={styles.iconContainer}>
          <IconProfileBottomTab />
        </View>
      );
    }
    if (icon === 'icon-left-arrow') {
      return (
        <View style={styles.iconContainer}>
          <IconLeftArrow />
        </View>
      );
    }
    if (icon === 'icon-add-vehicle') {
      return (
        <View style={styles.iconContainer}>
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
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    aspectRatio: 1,
  },
});
