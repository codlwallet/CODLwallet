import { ActivityIndicator, StyleSheet, View} from 'react-native';
import React from 'react';
import {hp, normalize, wp} from '../../helper/responsiveScreen';
import FontText from '../common/FontText';
import Button from '../common/Button';

export default function AttentionWarningView({
  title,
  description,
  mainIcon,
  showButton1,
  showButton2,
  firstBtnTitle,
  secondBtnTitle,
  handleFirstBtnClick,
  handleSecondBtnClick,
  buttonValue,
  isBgRed,
  firstBtnValue,
  secondBtnValue,
  loading
}) {
  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        {mainIcon}
        <FontText
          color={'white'}
          size={40}
          name={'inter-regular'}
          textAlign={'center'}
          pTop={hp(3)}>
          {title}
        </FontText>
        <FontText
          color={'white'}
          size={20}
          name={'inter-regular'}
          textAlign={'center'}
          pTop={hp(2)}>
          {description}
        </FontText>
      </View>
      {showButton1 && (
        <Button
          flex={null}
          width={wp(90)}
          bgColor={
            buttonValue === firstBtnValue
              ? 'white'
              : isBgRed
              ? 'red-open'
              : 'gray'
          }
          height={hp(8.5)}
          type="highlight"
          borderRadius={11}
          onPress={handleFirstBtnClick}
          style={[styles.button, {marginBottom: showButton2 ? hp(2) : hp(3)}]}>
          {loading?<ActivityIndicator animating={loading} size="large" color="black" />:<FontText
            name={'inter-medium'}
            size={normalize(22)}
            color={
              buttonValue !== firstBtnValue
                ? 'white'
                : isBgRed
                ? 'red'
                : 'black'
            }>
            {firstBtnTitle}
          </FontText>}
        </Button>
      )}
      {showButton2 && (
        <Button
          flex={null}
          bgColor={
            buttonValue === secondBtnValue
              ? 'white'
              : isBgRed
              ? 'red-open'
              : 'gray'
          }
          height={hp(8.5)}
          type="highlight"
          borderRadius={11}
          width={wp(90)}
          onPress={handleSecondBtnClick}
          style={styles.button}>
          <FontText
            name={'inter-medium'}
            size={normalize(22)}
            color={
              buttonValue !== secondBtnValue
                ? 'white'
                : isBgRed
                ? 'red'
                : 'black'
            }>
            {secondBtnTitle}
          </FontText>
        </Button>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: wp(3),
  },
  button: {
    alignSelf: 'center',
    marginBottom: hp(3),
  },
});
