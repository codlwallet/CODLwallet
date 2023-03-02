import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import colors from '../../assets/colors'
import SvgIcons from '../../assets/SvgIcons'
import FontText from '../../components/common/FontText'
import { hp, normalize } from '../../helper/responsiveScreen'
import appConstant from '../../helper/appConstant'

export default function CreatedUserScreen(props) {
  const { navigation } = props
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate(appConstant.setupWallet)
    }, 3000);
  }, [])


  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <SvgIcons.BlackCheck />
      </View>
      <FontText size={normalize(40)} name={'inter-regular'} color={'white'} pTop={hp(4)} >
        {appConstant.userCreated}
      </FontText>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.black,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    height: hp(8),
    width: hp(8),
    borderRadius: hp(4)
  }
})