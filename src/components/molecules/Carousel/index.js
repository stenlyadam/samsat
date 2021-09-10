import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { IMGCarousel, IMGCarousel2, IMGCarousel3 } from '../../../assets';
import Swiper from 'react-native-swiper';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

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
          <Image source={IMGCarousel2} style={styles.carouselPicture} />
        </View>
        <View style={styles.slide}>
          <Image source={IMGCarousel3} style={styles.carouselPicture} />
        </View>
      </Swiper>
    </View>
  );
};

export default Carousel;

const styles = StyleSheet.create({
  carouselContainer: {
    height: hp('25%'),
  },
  carouselWrapper: {
    height: '100%',
  },
  slide: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  carouselPicture: {
    height: hp('25%'),
    resizeMode: 'contain',
    borderRadius: 8,
  },
});
