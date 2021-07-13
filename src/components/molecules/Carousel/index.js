import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { IMGCarousel } from '../../../assets';
import Swiper from 'react-native-swiper';

const Carousel = () => {
  return (
    <View style={styles.carouselContainer}>
      <Swiper
        showsPagination={false}
        style={styles.carouselWrapper}
        showsButtons={true}>
        <View style={styles.slide}>
          <Image source={IMGCarousel} style={styles.carouselPicture} />
        </View>
        <View style={styles.slide}>
          <Image source={IMGCarousel} style={styles.carouselPicture} />
        </View>
        <View style={styles.slide}>
          <Image source={IMGCarousel} style={styles.carouselPicture} />
        </View>
      </Swiper>
    </View>
  );
};

export default Carousel;

const styles = StyleSheet.create({
  carouselContainer: {
    height: 200,
  },
  carouselWrapper: {
    height: 180,
    marginTop: 20,
  },
  slide: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  carouselPicture: {
    height: 180,
    width: 360,
    borderRadius: 8,
  },
});
