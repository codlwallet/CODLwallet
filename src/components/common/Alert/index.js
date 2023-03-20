import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AwesomeAlert from 'react-native-awesome-alerts';
import colors from '../../../assets/colors';
import {wp} from '../../../helper/responsiveScreen';
import appConstant from '../../../helper/appConstant';
import {useTranslation} from 'react-i18next';

export default function Alert({show, title, message, onConfirmPressed}) {
  const {t} = useTranslation();
  return (
    <View>
      <AwesomeAlert
        show={show}
        contentContainerStyle={styles.alertContainerStyle}
        title={title}
        message={message}
        closeOnTouchOutside={false}
        alertContainerStyle={{backgroundColor: 'transparent'}}
        closeOnHardwareBackPress={false}
        titleStyle={styles.alertTitleStyle}
        messageStyle={styles.alertMessageText}
        showConfirmButton={true}
        confirmText={t('ok')}
        confirmButtonStyle={styles.button}
        confirmButtonTextStyle={styles.buttonText}
        onConfirmPressed={onConfirmPressed}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  alertContainerStyle: {
    backgroundColor: '#3A3A3A',
    width: wp(85),
  },
  alertTitleStyle: {
    alignSelf: 'flex-start',
    color: colors.white,
    right: 14,
    fontSize: 19,
    fontWeight: 500,
  },
  alertMessageText: {
    alignSelf: 'flex-start',
    color: colors.white,
    fontSize: 15,
  },
  button: {
    backgroundColor: 'transparent',
    left: 100,
  },
  buttonText: {
    color: '#58AFA0',
    fontSize: 16,
    fontWeight: 500,
  },
});
