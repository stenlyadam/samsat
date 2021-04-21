import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {colors, fonts, IconInfo, IMGKorlantas, IMGVehicle} from '../../assets';
import {Gap, TextInput, CheckBox, Button, TopBar} from '../../components';
import Content from './Content';
import DATA_MINGGU_INI from './DATA_MINGGU_INI';
import DATA_BULAN_INI from './DATA_BULAN_INI';
import DATA_LAINNYA from './DATA_LAINNYA';

const TimeSection = ({type}) => {
  const [selectedId, setSelectedId] = useState(null);

  const renderItem = ({item}) => {
    return <Content item={item} />;
  };
  if (type === 'Minggu Ini') {
    return (
      <View style={styles.timeSectionContainer}>
        <Text style={styles.timeSectionTitle}>{type}</Text>
        <FlatList
          data={DATA_MINGGU_INI}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          extraData={selectedId}
        />
      </View>
    );
  }
  if (type === 'Bulan Ini') {
    return (
      <View style={styles.timeSectionContainer}>
        <Text style={styles.timeSectionTitle}>{type}</Text>
        <FlatList
          data={DATA_BULAN_INI}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          extraData={selectedId}
        />
      </View>
    );
  }
  if (type === 'Lainnya') {
    return (
      <View style={styles.timeSectionContainer}>
        <Text style={styles.timeSectionTitle}>{type}</Text>
        <FlatList
          data={DATA_LAINNYA}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          extraData={selectedId}
        />
      </View>
    );
  }
};

export default TimeSection;

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  timeSectionTitle: {
    fontFamily: fonts.Poppins.medium,
    fontSize: 18,
    color: colors.primaryRed,
    marginBottom: 7,
    marginTop: 14,
  },
});
