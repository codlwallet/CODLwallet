/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable import/no-extraneous-dependencies */
import React, {
  createRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from 'react';
import {View, TextInput, StyleSheet, findNodeHandle} from 'react-native';
import colors from '../../../assets/colors';
import fonts from '../../../assets/fonts';
import {hp, normalize, wp} from '../../../helper/responsiveScreen';
import FontText from '../FontText';

const Input = forwardRef(
  (
    {
      value,
      editable,
      titlecolor,
      height,
      fontSize,
      fontName,
      color,
      placeholder,
      placeholderTextColor,
      blurOnSubmit,
      returnKeyType,
      multiline,
      multilineHeight,
      keyboardType,
      autoCapitalize,
      maxLength,
      secureTextEntry,
      inputStyle,
      children,
      style,
      onFocus,
      onBlur,
      autoFocus,
      textAlign,
      caretHidden,
      contextMenuHidden,
      selectTextOnFocus,
      pointerEvents,
      onSubmit,
      clearOnSubmit,
      willCheckPosition,
      checkPosition,
      onChangeText,
      onEndEditing,
      onKeyPress,
      autoCorrect,
      withTitle,
      title,
      titleSize,
      withLeftIcon,
      leftIcon,
      fontStyle,
      isRequired,
      pTop,
      withRightIcon,
      rightIcon,
      disabled,
    },
    ref,
  ) => {
    const [inputValue, setValue] = useState(value);
    const [inputEditable, setEditable] = useState(editable);
    const [textFocus, SetTextFocus] = useState(false);
    let inputRef = createRef();

    const onChangeTextHandler = text => {
      setValue(text);
      if (typeof onChangeText === 'function') {
        onChangeText(text);
      }
    };

    const onSubmitEditingHandler = () => {
      if (typeof onSubmit === 'function') {
        onSubmit(inputValue);
      }
      if (clearOnSubmit) {
        setValue('');
      }
    };

    const onFocusHandler = () => {
      if (typeof onFocus === 'function') {
        onFocus();
      }
      if (willCheckPosition && typeof checkPosition === 'function') {
        checkPosition(findNodeHandle(inputRef));
      }
    };

    const _inputStyle = {
      height: multiline ? multilineHeight : height,
      fontSize,
      fontFamily: fonts[fontName],
      color: colors[color],
    };

    useImperativeHandle(ref, () => ({
      focus: () => inputRef.focus(),
      blur: () => inputRef.blur(),
      disable: () => setEditable(false),
      enable: () => setEditable(true),
    }));

    return (
      <View>
        {withTitle && (
          <FontText
            name={'poppins-medium'}
            size={titleSize}
            color={titlecolor}
            opacity={0.5}
            pTop={pTop}
            pBottom={hp(0.5)}
            pLeft={wp(2)}
            style={fontStyle}>
            {title}
            {isRequired && (
              <FontText
                name={'default'}
                size={normalize(15)}
                color={'red'}
                pBottom={hp(0.9)}
                style={fontStyle}>
                {'*'}
              </FontText>
            )}
          </FontText>
        )}
        <View style={[styles.wrapper, style]}>
          {withLeftIcon ? leftIcon : null}
          <TextInput
            ref={el => {
              inputRef = el;
            }}
            textContentType="none"
            pointerEvents={pointerEvents}
            editable={inputEditable}
            value={value}
            textAlign={textAlign}
            autoComplete="off"
            autoCorrect={!!(autoCorrect && autoCorrect === true)}
            allowFontScaling={false}
            placeholder={placeholder}
            placeholderTextColor={placeholderTextColor}
            onChangeText={onChangeTextHandler}
            onSubmitEditing={onSubmitEditingHandler}
            blurOnSubmit={multiline ? false : blurOnSubmit}
            returnKeyType={returnKeyType}
            multiline={multiline}
            underlineColorAndroid="transparent"
            keyboardType={keyboardType}
            maxLength={maxLength}
            disabled={disabled}
            autoCapitalize={autoCapitalize}
            secureTextEntry={secureTextEntry}
            onFocus={onFocus}
            onBlur={onBlur}
            onEndEditing={onEndEditing}
            autoFocus={autoFocus}
            caretHidden={caretHidden}
            contextMenuHidden={contextMenuHidden}
            selectTextOnFocus={selectTextOnFocus}
            onKeyPress={onKeyPress}
            style={[
              multiline ? styles.inputMultiline : null,
              styles.input,
              // _inputStyle,
              inputStyle,
            ]}
          />
          {withRightIcon ? rightIcon : null}
          {children}
        </View>
      </View>
    );
  },
);

Input.defaultProps = {
  // height: 46,
  fontSize: normalize(14),
  fontName: 'poppins-regular',
  color: 'black',
  placeholder: 'Type something...',
  placeholderTextColor: '#000',
  defaultValue: '',
  clearOnSubmit: false,
  blurOnSubmit: false,
  returnKeyType: 'default',
  multiline: false,
  multilineHeight: hp(10),
  autoCapitalize: null,
  editable: true,
  keyboardType: 'default',
  maxLength: null,
  secureTextEntry: false,
  onFocus: null,
  onBlur: null,
  autoFocus: false,
  textAlign: null,
  onChangeText: null,
  caretHidden: false,
  contextMenuHidden: false,
  selectTextOnFocus: false,
  willCheckPosition: true,
  withTitle: false,
  titleSize: normalize(16),
  withLeftIcon: false,
  withRightIcon: false,
  isRequired: false,
  // pTop: wp(6),
};

const styles = StyleSheet.create({
  input: {
    flex: 1,
    paddingLeft: 0,
    // paddingRight: 10,
    paddingBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    // height: hp(8),
  },
  inputMultiline: {
    textAlignVertical: 'top',
  },
  wrapper: {
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: wp(3),
    paddingHorizontal: wp(5),
    // paddingVertical: hp(4),
    justifyContent: 'space-between',
    marginHorizontal: wp(4),
    height: hp(8),
  },
});

export default Input;
