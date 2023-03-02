import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import colors from '../../../assets/colors';
import {hp, normalize, wp} from '../../../helper/responsiveScreen';
import FontText from '../FontText';
import appConstant from '../../../helper/appConstant';

export default function WalletCard({style, headerStyle, children}) {
  return (
    <View style={[styles.container, style]}>
      <View style={[headerStyle, styles.headerContainer]}>
        <FontText
          textTransform={'uppercase'}
          textAlign={'center'}
          name={'inter-bold'}
          size={normalize(11)}>
          {appConstant.numberOfWords}
        </FontText>
      </View>
      <View style={styles.numberContainer}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.gray,
    borderRadius: wp(2),
    width: wp(90),
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerContainer: {
    backgroundColor: colors.white,
    borderRadius: wp(1),
    top: hp(-2),
    paddingHorizontal: wp(2),
  },
  numberContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
  },
});
