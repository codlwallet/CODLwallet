import React, {useTransition} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  StatusBar,
} from 'react-native';
import colors from '../../../assets/colors';
import SvgIcons from '../../../assets/SvgIcons';
import {hp, normalize, wp} from '../../../helper/responsiveScreen';
import FontText from '../FontText';
import {useTranslation} from 'react-i18next';

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
    statusBarcolor,
    statusBarHidden,
    showHiddenTitle,
    titleStyle,
    titleWithIcon,
    titleIcon,
    rightIconDisable,
    pRight,
  } = props;
  const {t} = useTranslation();

  return (
    <>
      {/* <StatusBar
        barStyle={'light-content'}
        hidden={statusBarHidden}
        translucent
        backgroundColor={statusBarcolor ? statusBarcolor : colors.black}
      /> */}
      <View style={[styles.container, style]}>
        {showBackIcon && (
          <TouchableOpacity onPress={onBackPress} style={styles.iconContainer}>
            <SvgIcons.BackArrow style={styles.arrow} />
          </TouchableOpacity>
        )}
        <View
          style={[
            titleStyle,
            styles.titleContainer,
            {
              marginLeft: marginLeft,
            },
          ]}>
          {titleWithIcon && titleIcon}
          {title != null && (
            <FontText
              style={styles.title}
              size={normalize(25)}
              name="inter-regular"
              color={'white'}
              lines={1}
              pRight={pRight}
              pLeft={pLeft}>
              {title}
            </FontText>
          )}
          {showHiddenTitle && (
            <View style={styles.hiddenTitleContainer}>
              <FontText
                style={styles.title}
                size={normalize(15)}
                name="inter-bold"
                color={'black'}
                lines={1}
                pLeft={pLeft}>
                {t('hidden')}
              </FontText>
            </View>
          )}
        </View>
        {showRightIcon && (
          <TouchableOpacity
            disabled={rightIconDisable}
            onPress={RightIconPress}
            style={styles.iconContainer}>
            {RightIcon === 'info' ? (
              <SvgIcons.Info />
            ) : RightIcon === 'false' ? (
              <SvgIcons.False />
            ) : RightIcon === 'menu' ? (
              <SvgIcons.Menu />
            ) : (
              <SvgIcons.Plus />
            )}
          </TouchableOpacity>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: wp(4),
    paddingTop: Platform.OS === 'android' ? hp(4.8) : hp(3),
    width: wp(100),
    alignSelf: 'center',
    height: hp(12.5),
  },
  text: {
    fontWeight: 'bold',
  },
  title: {
    fontWeight: '600',
    marginHorizontal: wp(2),
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    paddingHorizontal: wp(2),
    paddingVertical: hp(2),
  },
  hiddenTitleContainer: {
    backgroundColor: colors.white,
    borderRadius: wp(1),
    paddingVertical: hp(0.5),
    paddingHorizontal: wp(0.5),
  },
});

export default Header;
