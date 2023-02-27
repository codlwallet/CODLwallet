import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, TextInput, StyleSheet, findNodeHandle} from 'react-native';
import colors from '../../assets/colors';
import fonts from '../../assets/fonts';
import {hp, wp, normalize, isX} from '../../helper/responsiveScreen';

class Input extends Component {
  static defaultProps = {
    height: isX ? hp(5) : hp(5.5),
    fontSize: 16,
    fontName: 'opensans-regular',
    color: 'default',
    placeholder: 'Type something...',
    placeholderTextColor: 'default',
    defaultValue: '',
    clearOnSubmit: false,
    blurOnSubmit: false,
    returnKeyType: 'default',
    multiline: false,
    multilineHeight: 120,
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
  };

  static propTypes = {
    height: PropTypes.number,
    fontSize: PropTypes.number,
    fontName: PropTypes.string,
    color: PropTypes.string,
    placeholder: PropTypes.string,
    placeholderTextColor: PropTypes.string,
    defaultValue: PropTypes.string,
    clearOnSubmit: PropTypes.bool,
    blurOnSubmit: PropTypes.bool,
    returnKeyType: PropTypes.string,
    multiline: PropTypes.bool,
    multilineHeight: PropTypes.number,
    autoCapitalize: PropTypes.string,
    editable: PropTypes.bool,
    keyboardType: PropTypes.string,
    maxLength: PropTypes.number,
    secureTextEntry: PropTypes.bool,
    style: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.object,
      PropTypes.arrayOf(PropTypes.number),
      PropTypes.arrayOf(PropTypes.object),
    ]),
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    autoFocus: PropTypes.bool,
    textAlign: PropTypes.string,
    onChangeText: PropTypes.func,
    caretHidden: PropTypes.bool,
    contextMenuHidden: PropTypes.bool,
    selectTextOnFocus: PropTypes.bool,
    willCheckPosition: PropTypes.bool,
  };

  constructor(props) {
    super(props);

    this.state = {
      defaultValue: props.defaultValue,
      value: props.defaultValue,
      editable: props.editable,
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.editable !== state.editable) {
      return {editable: props.editable};
    }
    if (props.defaultValue !== state.defaultValue) {
      return {value: props.defaultValue, defaultValue: props.defaultValue};
    }
    return null;
  }

  onChangeTextHandler = text => {
    const {onChangeText} = this.props;
    this.setState({value: text});
    if (typeof onChangeText === 'function') {
      onChangeText(text);
    }
  };

  onSubmitEditingHandler = () => {
    const {onSubmit, clearOnSubmit} = this.props;
    const {value} = this.state;
    if (typeof onSubmit === 'function') {
      onSubmit(value);
    }
    if (clearOnSubmit) {
      this.setState({value: ''});
    }
  };

  onFocusHandler = () => {
    const {willCheckPosition, onFocus, checkPosition} = this.props;
    if (typeof onFocus === 'function') {
      onFocus();
    }
    if (willCheckPosition && typeof checkPosition === 'function') {
      checkPosition(findNodeHandle(this.input));
    }
  };

  disable = () => this.setState({editable: false});

  enable = () => this.setState({editable: true});

  getValue = () => this.state.value;

  focus = () => this.input && this.input.focus();

  blur = () => this.input && this.input.blur();

  render() {
    const {
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
      ...restInput
    } = this.props;
    const {value, editable} = this.state;
    const _inputStyle = {
      height: multiline ? multilineHeight : height,
      fontSize: fontSize,
      fontFamily: fonts[fontName],
      color: colors[color],
    };

    return (
      <View style={[styles.wrapper, style]}>
        <TextInput
          ref={r => (this.input = r)}
          textContentType="none"
          pointerEvents={pointerEvents}
          editable={editable}
          value={value}
          autoCorrect={false}
          autoComplete="off"
          allowFontScaling={false}
          placeholder={placeholder}
          placeholderTextColor={
            colors[placeholderTextColor]
              ? colors[placeholderTextColor] + '4d'
              : ''
          }
          onChangeText={this.onChangeTextHandler}
          onSubmitEditing={this.onSubmitEditingHandler}
          blurOnSubmit={multiline ? false : blurOnSubmit}
          returnKeyType={returnKeyType}
          multiline={multiline}
          textContentType="none"
          underlineColorAndroid="transparent"
          keyboardType={keyboardType}
          maxLength={maxLength}
          autoCapitalize={autoCapitalize}
          secureTextEntry={secureTextEntry}
          onFocus={this.onFocusHandler}
          onBlur={onBlur}
          autoFocus={autoFocus}
          caretHidden={caretHidden}
          contextMenuHidden={contextMenuHidden}
          selectTextOnFocus={selectTextOnFocus}
          textAlign={textAlign}
          style={[
            multiline ? styles.inputMultiline : null,
            styles.input,
            _inputStyle,
            inputStyle,
          ]}
          {...restInput}
        />
        {children}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: colors.white,
    paddingTop: 0,
    paddingBottom: 0,
    marginLeft: 0,
    marginRight: 0,
  },
  inputMultiline: {
    textAlignVertical: 'top',
  },
  wrapper: {
    justifyContent: 'center',
  },
});

export default Input;
