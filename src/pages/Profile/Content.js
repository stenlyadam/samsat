import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { colors, fonts } from '../../assets';

const Content = ({
  title,
  value,
  type,
  profile,
  onChangeText,
  placeholder,
}) => {
  const placeholderText = placeholder ? placeholder : 'edit';
  if (type === 'edit') {
    return (
      <View style={styles.content}>
        <Text style={styles.contentText}>{title}</Text>
        <TextInput
          style={styles.textInput}
          placeholder={profile ? profile : placeholderText}
          value={value}
          onChangeText={onChangeText}
        />
      </View>
    );
  }
  return (
    <View style={styles.content}>
      <Text style={styles.contentText}>{title}</Text>
      <Text style={styles.contentText}>{profile}</Text>
    </View>
  );
};

export default Content;

const styles = StyleSheet.create({
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 60,
    marginVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.grey,
    paddingBottom: 8,
  },
  contentText: {
    fontFamily: fonts.Poppins.regular,
    fontSize: 14,
    color: colors.darkGrey,
  },
  textInput: {
    textAlign: 'right',
  },
});
