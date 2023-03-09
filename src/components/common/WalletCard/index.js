import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import colors from '../../../assets/colors';
import {hp, normalize, wp} from '../../../helper/responsiveScreen';
import FontText from '../FontText';
import appConstant from '../../../helper/appConstant';

export default function WalletCard({
  style,
  headerStyle,
  children,
  titleColor,
  title,
}) {
  return (
    <View style={[styles.container, style]}>
      <View style={[headerStyle, styles.headerContainer]}>
        <FontText
          color={titleColor}
          textTransform={'uppercase'}
          textAlign={'center'}
          name={'inter-bold'}
          size={normalize(11)}>
          {title}
        </FontText>
      </View>
      <View style={styles.numberContainer}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.gray,
    borderRadius: wp(4),
    width: wp(90),
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: hp(2.5),
  },
  headerContainer: {
    backgroundColor: colors.white,
    borderRadius: wp(2),
    top: hp(-1.5),
    position: 'absolute',
    paddingHorizontal: wp(2),
    borderWidth: wp(1.5),
  },
  numberContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
  },
});
