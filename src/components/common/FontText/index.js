import React from 'react';
import PropTypes from 'prop-types';
import {Text} from 'react-native';
import colors from '../../../assets/colors';
import {normalize} from '../../../helper/responsiveScreen';
import fonts from '../../../assets/fonts';

const FontText = ({
  children,
  style,
  color,
  pureColor,
  size,
  sizeFactor,
  name,
  lineHeightFactor,
  lines,
  opacity,
  pTop,
  textTransform,
  pLeft,
  pRight,
  pBottom,
  textAlign,
  textDecoration,
  pointerEvents,
  onLayout,
  onPress,
}) => {
  const fontSize = size * sizeFactor;
  const textStyle = {
    fontSize,
    fontFamily: fonts[name],
    color: pureColor || colors[color],
    lineHeight: fontSize * lineHeightFactor,
    opacity,
    paddingTop: pTop,
    paddingLeft: pLeft,
    paddingRight: pRight,
    paddingBottom: pBottom,
    textAlign,
    textDecorationLine: textDecoration,
    textDecorationColor: textDecoration ? pureColor || colors[color] : null,
    textDecorationStyle: textDecoration ? 'solid' : null,
    textTransform: textTransform ? textTransform : null,
  };
  return (
    <Text
      allowFontScaling={false}
      numberOfLines={lines}
      onLayout={onLayout}
      onPress={onPress}
      style={[textStyle, style]}>
      {children}
    </Text>
  );
};

FontText.defaultProps = {
  size: normalize(14),
  sizeFactor: 1,
  name: 'default',
  color: 'default',
  lineHeightFactor: 1.2,
  lines: 0,
  opacity: 1,
  textAlign: 'left',
  pTop: 0,
  pLeft: 0,
  pRight: 0,
  pBottom: 0,
  textDecoration: null,
  pointerEvents: 'none',
  textTransform: 'none',
};

FontText.propTypes = {
  style: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.number),
    PropTypes.arrayOf(PropTypes.object),
  ]),
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.arrayOf(PropTypes.node),
  ]),
  size: PropTypes.number,
  sizeFactor: PropTypes.number,
  name: PropTypes.string,
  color: PropTypes.string,
  pureColor: PropTypes.string,
  lineHeightFactor: PropTypes.number,
  numberOfLines: PropTypes.number,
  opacity: PropTypes.number,
  textAlign: PropTypes.string,
  pTop: PropTypes.number,
  pLeft: PropTypes.number,
  pRight: PropTypes.number,
  pBottom: PropTypes.number,
  textDecoration: PropTypes.string,
  textTransform: PropTypes.string,
};

export default FontText;
