import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {TextInput} from 'react-native-paper';
import {normalize, hp, wp, isX} from '../../helper/responsiveScreen';
import colors from '../../assets/colors';

const InputWithIcon = props => {
  return (
    <View>
      <TextInput
        style={[styles.input, props.style]}
        placeholder={props.placeholder}
        label={props.label}
        onSubmitEditing={props.onSubmitEditing}
        returnKeyType={props.returnKeyType}
        ref={props.refName}
        autoFocus={true}
        right={<TextInput.Icon name={props.right} onPress={props.iconClick} />}
        mode={props.mode}
        secureTextEntry={props.secureTextEntry}
        value={props.value}
        onChangeText={props.onChangeText}
        theme={{colors: {primary: colors.black, underlineColor: 'transparent'}}}
      />
    </View>
  );
};

export default InputWithIcon;

const styles = StyleSheet.create({
  input: {
    backgroundColor: colors.white,
    color: colors.black,
    fontFamily: 'Poppins-Regular',
    fontSize: normalize(20),
  },
});
