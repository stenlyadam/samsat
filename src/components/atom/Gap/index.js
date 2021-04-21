import React from 'react';
import {View, StyleSheet} from 'react-native';

const Gap = ({height, width}) => {
  return <View style={styles.container(height, width)} />;
};

export default Gap;

const styles = StyleSheet.create({
  container: (height, width) => ({
    height: height,
    width: width,
  }),
});
