import {StyleSheet, View} from 'react-native';
import React from 'react';
import {hp, normalize, wp} from '../../helper/responsiveScreen';
import FontText from '../common/FontText';
import colors from '../../assets/colors';
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
}) {
  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        {mainIcon}
        <FontText
          color={'white'}
          size={normalize(40)}
          name={'inter-regular'}
          textAlign={'center'}
          pTop={hp(3)}>
          {title}
        </FontText>
        <FontText
          color={'white'}
          size={normalize(22)}
          name={'inter-regular'}
          textAlign={'center'}
          pTop={hp(2)}>
          {description}
        </FontText>
      </View>
      {showButton1 && (
        <Button
          flex={null}
          bgColor={buttonValue === firstBtnTitle ? 'white' : 'gray'}
          height={hp(8.5)}
          type="highlight"
          borderRadius={11}
          onPress={handleFirstBtnClick}
          style={{marginBottom: hp(2)}}
          buttonStyle={[styles.button]}>
          <FontText
            name={'inter-medium'}
            size={22}
            color={buttonValue === firstBtnTitle ? 'black' : 'white'}>
            {firstBtnTitle}
          </FontText>
        </Button>
      )}
      {showButton2 && (
        <Button
          flex={null}
          bgColor={buttonValue === secondBtnTitle ? 'white' : 'gray'}
          height={hp(8.5)}
          type="highlight"
          borderRadius={11}
          onPress={handleSecondBtnClick}
          style={{marginBottom: hp(2)}}
          buttonStyle={[styles.button]}>
          <FontText
            name={'inter-medium'}
            size={22}
            color={buttonValue === secondBtnTitle ? 'black' : 'white'}>
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
    backgroundColor: colors.black,
    alignItems: 'center',
  },
  subContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: wp(6),
  },
  button: {
    alignItems: 'center',
    width: wp(90),
    marginBottom: hp(8),
    height: hp(8.5),
  },
});
