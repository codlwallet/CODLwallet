import {StyleSheet, View} from 'react-native';
import React from 'react';
import FontText from '../common/FontText';
import {hp, normalize, wp} from '../../helper/responsiveScreen';
import colors from '../../assets/colors';
import {useTranslation} from 'react-i18next';

export default function TransactionCard({item, headerTitle}) {
  const {t} = useTranslation();

  return (
    <View style={styles.detailsContainer}>
      <View style={{alignItems: 'center'}}>
        <View style={styles.detailsHeaderView}>
          <FontText
            name={'inter-bold'}
            size={normalize(11)}
            color="black"
            textTransform={'uppercase'}>
            {headerTitle}
          </FontText>
        </View>
      </View>
      <View style={styles.infoView}>
        <View style={styles.textConatiner}>
          <FontText name={'inter-bold'} size={normalize(19)} color="white">
            {t('network')}
          </FontText>
          <FontText
            name={'inter-regular'}
            size={normalize(19)}
            color="white"
            textAlign={'right'}>
            {item?.network}
          </FontText>
        </View>
        <View style={styles.textConatiner}>
          <FontText name={'inter-bold'} size={normalize(19)} color="white">
            {t('from')}
          </FontText>
          <FontText
            name={'inter-regular'}
            size={normalize(15)}
            color="white"
            style={styles.text}>
            {item?.from}
          </FontText>
        </View>
        <View style={styles.textConatiner}>
          <FontText name={'inter-bold'} size={normalize(19)} color="white">
            {t('to')}
          </FontText>
          <FontText
            name={'inter-regular'}
            size={normalize(15)}
            color="white"
            style={styles.text}>
            {item?.to}
          </FontText>
        </View>
        <View style={styles.textConatiner}>
          <FontText name={'inter-bold'} size={normalize(19)} color="white">
            {t('fees')}
          </FontText>
          <FontText
            name={'inter-regular'}
            size={normalize(19)}
            color="white"
            textAlign={'right'}>
            {item?.fees}
          </FontText>
        </View>
        <View
          style={{
            ...styles.textConatiner,
            backgroundColor: '#2D2D2D',
            paddingVertical: hp(2),
          }}>
          <FontText name={'inter-bold'} size={normalize(19)} color="white">
            {t('amount')}
          </FontText>
          <FontText
            name={'inter-bold'}
            size={normalize(19)}
            color="white"
            textAlign={'right'}>
            {item?.amount}
          </FontText>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  detailsContainer: {
    backgroundColor: colors.gray,
    height: hp(45),
    width: wp(90),
    borderRadius: wp(2),
  },
  infoView: {
    // width: hp(41),
  },
  textConatiner: {
    flexDirection: 'row',
    marginTop: hp(2.5),
    justifyContent: 'space-between',
    paddingHorizontal: wp(5),
    // alignItems: 'center',
  },
  text: {
    width: hp(30),
  },
  detailsHeaderView: {
    backgroundColor: colors.white,
    borderRadius: 10,
    paddingHorizontal: wp(2),
    paddingVertical: hp(0.5),
    top: hp(-2),
    borderWidth: wp(1.5),
    borderColor: colors.black,
  },
});
