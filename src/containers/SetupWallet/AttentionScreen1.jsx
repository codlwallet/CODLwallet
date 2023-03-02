import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import colors from '../../assets/colors'
import Header from '../../components/common/Header'
import appConstant from '../../helper/appConstant'
import SvgIcons from '../../assets/SvgIcons'
import { hp, normalize, wp } from '../../helper/responsiveScreen'
import FontText from '../../components/common/FontText'
import Button from '../../components/common/Button'

export default function AttentionScreen1() {
    return (
        <View style={styles.container}>
            <Header showRightIcon RightIcon={'info'} />
            <View style={styles.subContainer}>
                <SvgIcons.HideEye height={hp(8)} width={hp(8)} />
                <FontText color={'white'} size={normalize(40)} name={'inter-regular'} textAlign={'center'} pTop={hp(3)}>
                    {appConstant.watchSurroundings}
                </FontText>
                <FontText color={'white'} size={normalize(22)} name={'inter-regular'} textAlign={'center'} pTop={hp(2)}>
                    {appConstant.attention1Description}
                </FontText>
            </View>
            <Button
                flex={null}
                height={hp(6.5)}
                width="90%"
                type="highlight"
                borderRadius={11}
                bgColor="white"
                // onPress={handleProceedClick}
                style={styles.button}>
                <FontText name={"inter-medium"} size={normalize(16)} color="black">
                    {appConstant.understand}
                </FontText>
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.black,
        alignItems: 'center',
    },
    subContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: wp(6)
    },
    button: {
        backgroundColor: colors.white,
        position: 'absolute',
        bottom: hp(4),
        alignItems: 'center'
    }
})