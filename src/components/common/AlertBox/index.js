import React from 'react';
import {
  View,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  TouchableNativeFeedback,
} from 'react-native';
import colors from '../../../assets/colors';
import {hp, normalize, wp} from '../../../helper/responsiveScreen';
import FontText from '../FontText';

const PopUp = ({message, title, onConfirmPressed}) => (
  <Modal
    transparent={true}
    animationType={'none'}
    visible={true}
    onRequestClose={() => {}}>
    <View style={styles.background}>
      <View style={[styles.container]}>
        <FontText color={'white'} size={normalize(19)}>
          {title}
        </FontText>
        <FontText color={'white'} size={normalize(14)} pTop={hp(2)}>
          {message}
        </FontText>
        <View style={{alignItems: 'flex-end'}}>
          <TouchableOpacity
            onPress={onConfirmPressed}
            style={styles.buttonContainer}>
            <FontText
              color={'green'}
              size={normalize(16)}
              name={'inter-semiBold'}>
              {'OK'}
            </FontText>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.5)',
  },
  container: {
    backgroundColor: colors['gray-open'],
    paddingVertical: hp(2),
    paddingHorizontal: wp(6),
    borderRadius: 5,
    width: wp(80),
    shadowColor: colors.dialogboxShadow,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 5,
  },
  buttonContainer: {
    marginTop: hp(5),
    paddingHorizontal: wp(3),
    paddingVertical: hp(0.8),
  },
});

export default PopUp;
