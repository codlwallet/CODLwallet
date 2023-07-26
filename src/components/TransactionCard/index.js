import {Image, StyleSheet, View} from 'react-native';
import React from 'react';
import FontText from '../common/FontText';
import {hp, normalize, wp} from '../../helper/responsiveScreen';
import colors from '../../assets/colors';
import {useTranslation} from 'react-i18next';
import {mainData} from '../../constants/data';
import {useSelector} from 'react-redux';

export default function TransactionCard({item, headerTitle}) {
  const {t} = useTranslation();
  const {selectedNetwork} = useSelector(state => state.auth);

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
      <View style={{justifyContent: 'space-between', flex: 1}}>
        <View style={styles.infoView}>
          <View
            style={[
              styles.textConatiner,
              {
                marginTop: hp(2),
                justifyContent: 'space-between',
              },
            ]}>
            <FontText name={'inter-bold'} size={normalize(16)} color="white">
              {t('network')}
            </FontText>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                alignContent: 'flex-end',
                alignSelf: 'flex-end',
              }}>
              {mainData?.map((item, index) => {
                return (
                  <View key={index}>
                    {selectedNetwork === item.value && (
                      <Image source={item?.image} style={styles.image} />
                    )}
                  </View>
                );
              })}
              <FontText
                name={'inter-regular'}
                size={normalize(15)}
                pLeft={wp(2)}
                color="white">
                {item?.network}
              </FontText>
            </View>
          </View>
          <View style={styles.textConatiner}>
            <FontText name={'inter-bold'} size={normalize(16)} color="white">
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
            <FontText name={'inter-bold'} size={normalize(16)} color="white">
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
            <FontText name={'inter-bold'} size={normalize(16)} color="white">
              {t('fees')}
            </FontText>
            <FontText
              name={'inter-regular'}
              size={normalize(15)}
              color="white"
              textAlign={'right'}>
              {item?.fees}
            </FontText>
          </View>
        </View>
        <View
          style={{
            ...styles.textConatiner,
            backgroundColor: colors.lightGrey,
            paddingVertical: hp(2.5),
            bottom: 0,
            borderBottomEndRadius: wp(2),
            borderBottomStartRadius: wp(2),
            flexWrap: 'wrap',
          }}>
          <FontText
            name={'inter-bold'}
            size={normalize(16)}
            color="white"
            style={{width: wp(22)}}>
            {t('amount')}
          </FontText>
          <FontText
            name={'inter-bold'}
            size={normalize(20)}
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
    width: wp(88),
    borderRadius: wp(2),
  },
  infoView: {
    // width: hp(41),
    // backgroundColor: 'red',
  },
  textConatiner: {
    flexDirection: 'row',
    marginTop: hp(5),
    justifyContent: 'space-between',
    paddingHorizontal: wp(5),
  },
  text: {
    width: hp(28),
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
  image: {
    width: hp(3),
    height: hp(3),
  },
});
