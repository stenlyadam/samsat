import React from 'react';
import {View, StyleSheet} from 'react-native';

const Gap = ({height, width, color}) => {
  return <View style={styles.container(height, width, color)} />;
};

export default Gap;

const styles = StyleSheet.create({
  container: (height, width, color) => ({
    height: height,
    width: width,
    backgroundColor: color,
  }),
});
