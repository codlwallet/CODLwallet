import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {hp, normalize, wp} from '../../helper/responsiveScreen';
import FontText from '../common/FontText';
import colors from '../../assets/colors';

export default function WalletCard({
  style,
  headerStyle,
  children,
  titleColor,
  title,
}) {
  return (
    <View style={[styles.container, style]}>
      <View style={[styles.headerContainer, headerStyle]}>
        <FontText
          color={titleColor}
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
  },
  headerContainer: {
    backgroundColor: colors.white,
    borderRadius: wp(2),
    top: hp(-1.5),
    position: 'absolute',
    paddingHorizontal: wp(2),
    borderWidth: wp(1.5),
    alignSelf: 'center',
  },
  numberContainer: {
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    // alignItems: 'center',
    // backgroundColor: 'green',
    // flex: 1,
  },
});
