import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors, fonts, IconArrowRight} from '../../assets';
import {Button} from '../../components';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';
import Content from './Content';

const ContentHeader = ({headerTitle, type}) => {
  if (type === 'edit') {
    return (
      <Collapse style={styles.contentContainer}>
        <CollapseHeader>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>{headerTitle}</Text>
            <IconArrowRight />
          </View>
        </CollapseHeader>
        <CollapseBody style={styles.collapseBody}>
          <Content type="edit" title="Nama Lengkap:" content="Samsat Minut" />
          <Content
            type="edit"
            title="Tanggal Lahir:"
            content="1 Januari 1999"
          />
          <Content type="edit" title="Alamat:" content="Airmadidi" />
          <Content type="edit" title="Email:" content="samsat@gmail.com" />
          <Content type="edit" title="No. Telepon:" content="0812 3456 7890" />
          <View style={styles.button}>
            <Button label="Selesai" />
          </View>
        </CollapseBody>
      </Collapse>
    );
  } else {
    return (
      <Collapse style={styles.contentContainer}>
        <CollapseHeader>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>{headerTitle}</Text>
            <IconArrowRight />
          </View>
        </CollapseHeader>
        <CollapseBody>
          <Content title="Nama Lengkap:" content="Samsat Minut" />
          <Content title="Tanggal Lahir:" content="1 Januari 1999" />
          <Content title="Alamat:" content="Airmadidi" />
          <Content title="Email:" content="samsat@gmail.com" />
          <Content title="No. Telepon:" content="0812 3456 7890" />
        </CollapseBody>
      </Collapse>
    );
  }
};

export default ContentHeader;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    backgroundColor: 'white',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 50,
    alignItems: 'center',
    marginBottom: 15,
  },
  headerTitle: {
    fontFamily: fonts.Poppins.regular,
    fontSize: 18,
    color: colors.darkGrey,
  },
  button: {
    marginTop: 30,
  },
  collapseBody: {
    marginBottom: 30,
  },
});
