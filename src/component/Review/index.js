import {StyleSheet, Image, View} from 'react-native';
import React from 'react';
import {moderateScale} from 'react-native-size-matters';
import {Rating} from 'react-native-ratings';
import Roboto from '../Roboto';
import {COLORS} from '../../assets/Colors';

const Review = ({image, review, rating, fullname}) => {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Image
          source={
            image
              ? image
              : {
                  uri: 'https://w7.pngwing.com/pngs/416/62/png-transparent-anonymous-person-login-google-account-computer-icons-user-activity-miscellaneous-computer-monochrome.png',
                }
          }
          style={styles.image}
        />
        <View style={styles.wrapperReview}>
          <View style={styles.wrapperNameRat}>
            <Roboto type="Medium" style={styles.name}>
              {fullname}****
            </Roboto>
            <View style={styles.rating}>
              <Rating
                type="star"
                ratingCount={5}
                imageSize={moderateScale(14)}
                startingValue={rating}
              />
            </View>
            <Roboto>{review}</Roboto>
          </View>
        </View>
      </View>
    </View>
  );
};
export default Review;

const styles = StyleSheet.create({
  container: {
    borderRadius: moderateScale(4),
    padding: moderateScale(10),
    marginTop: moderateScale(10),
    borderWidth: 0.5,
    borderColor: '#00000026',
    backgroundColor: COLORS.white,
    elevation: 5,
  },
  wrapper: {
    flexDirection: 'row',
    paddingHorizontal: moderateScale(10),
  },
  image: {
    borderRadius: moderateScale(10),
    height: moderateScale(30),
    width: moderateScale(30),
  },
  wrapperReview: {
    paddingHorizontal: moderateScale(5),
    marginHorizontal: moderateScale(5),
  },
  wrapperNameRat: {
    marginStart: moderateScale(15),
  },
  name: {
    fontSize: moderateScale(14),
    color: COLORS.black,
  },
  rating: {alignItems: 'flex-start'},
});
