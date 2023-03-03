import React from 'react';
import {View, StyleSheet, TouchableOpacity, Platform} from 'react-native';
import colors from '../../../assets/colors';
import SvgIcons from '../../../assets/SvgIcons';
import {hp, normalize, wp} from '../../../helper/responsiveScreen';
import FontText from '../FontText';

const Header = props => {
  const {
    onBackPress,
    title,
    titleColor,
    showBackIcon,
    BackIcon,
    pLeft,
    marginLeft,
    style,
    showRightIcon,
    RightIconPress,
    RightIcon,
  } = props;

  return (
    <View style={[styles.container, style]}>
      {showBackIcon && (
        <TouchableOpacity onPress={onBackPress} style={{padding: 5}}>
          <SvgIcons.BackArrow style={styles.arrow} />
        </TouchableOpacity>
      )}
      <View
        style={[
          styles.titleContainer,
          {
            marginLeft: marginLeft,
          },
        ]}>
        {title != null && (
          <FontText
            style={styles.title}
            size={normalize(25)}
            name="inter-regular"
            color={'white'}
            lines={1}
            pLeft={pLeft}>
            {title}
          </FontText>
        )}
      </View>
      {showRightIcon && (
        <TouchableOpacity onPress={RightIconPress} style={{padding: 5}}>
          {RightIcon === 'info' ? (
            <SvgIcons.Info style={styles.arrow} />
          ) : RightIcon === 'false' ? (
            <SvgIcons.False style={styles.arrow} />
          ) : RightIcon === 'menu' ? (
            <SvgIcons.Menu style={styles.arrow} />
          ) : (
            <SvgIcons.Plus style={styles.arrow} />
          )}
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: wp(4),
    paddingTop: Platform.OS === 'android' ? hp(2) : hp(3.5),
    width: wp(100),
  },
  text: {
    fontWeight: 'bold',
  },
  title: {
    fontWeight: '600',
    marginHorizontal: wp(2),
  },
  arrow: {
    height: hp(10),
    width: hp(10),
    marginHorizontal: 5,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Header;
