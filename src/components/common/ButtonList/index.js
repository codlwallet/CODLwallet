import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import colors from '../../../assets/colors';
import {hp, normalize, wp} from '../../../helper/responsiveScreen';
import FontText from '../FontText';
import SvgIcons from '../../../assets/SvgIcons';
import i18n from '../../../constants/i18n';

export default function ButtonView({
  style,
  listItem,
  showRightIcon,
  index,
  buttonIndex,
  from,
}) {
  return (
    <View
      key={index}
      style={[
        style,
        styles.buttonContainer,
        {backgroundColor: index === buttonIndex ? colors.white : colors.gray},
      ]}>
      {/* {showLeftIcon ? leftIcon : null} */}
      <FontText
        color={index === buttonIndex ? 'black' : 'white'}
        size={normalize(22)}
        pRight={wp(20)}
        name={'inter-regular'}>
        {from == true || i18n.language === 'tr'
          ? listItem.name
          : listItem?.value}
      </FontText>
      {showRightIcon && index === buttonIndex && (
        <SvgIcons.BlackCheck height={hp(4)} width={wp(4)} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    height: hp(8),
    width: wp(90),
    borderRadius: wp(2),
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: wp(4),
    marginTop: hp(2),
  },
});
