import { BackHandler, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import colors from '../../assets/colors'
import appConstant from '../../helper/appConstant'
import { hp, normalize, wp } from '../../helper/responsiveScreen'
import Header from '../../components/common/Header'
import SvgIcons from '../../assets/SvgIcons'
import FontText from '../../components/common/FontText'
import Button from '../../components/common/Button'

export default function AttentionScreen2({ navigation, route }) {
    const { ButtonValue, numberValue, from } = route.params
    const [btnValue, setBtnValue] = useState(appConstant.proceed)

    const handleProceedClick = () => {
        setBtnValue(appConstant.proceed)
        navigation.navigate(appConstant.setupWallet)
    }

    const handleCheckAgainClick = () => {
        setBtnValue(appConstant.checkAgain)
        navigation.navigate(ButtonValue === appConstant.createWallet ? appConstant.createWallet : appConstant.importWallet, {
            numberValue: numberValue,
            ButtonValue: ButtonValue
        })
    }


    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', backAction);
        return async () => {
            BackHandler.removeEventListener('hardwareBackPress', backAction);
        };
    }, []);

    const backAction = () => {
        navigation.navigate(from === appConstant.createWallet ? appConstant.createWallet : appConstant.importWallet, {
            numberValue: numberValue,
            ButtonValue: ButtonValue
        })
        return true;
    };

    return (
        <View style={styles.container}>
            <Header showRightIcon RightIcon={'info'} />
            <View style={styles.subContainer}>
                <SvgIcons.Polygon height={hp(8)} width={hp(8)} />
                <FontText color={'white'} size={normalize(40)} name={'inter-regular'} textAlign={'center'} pTop={hp(3)}>
                    {appConstant.areUSure}
                </FontText>
                <FontText color={'white'} size={normalize(22)} name={'inter-regular'} textAlign={'center'} pTop={hp(2)}>
                    {appConstant.attention2Description}
                </FontText>
            </View>
            <Button
                flex={null}
                height={hp(6.5)}
                width="90%"
                type="highlight"
                borderRadius={11}
                onPress={handleProceedClick}
                style={[styles.button, { backgroundColor: btnValue === appConstant.proceed ? colors.white : colors.gray }]}>
                <FontText name={"inter-medium"} size={normalize(16)} color={btnValue === appConstant.proceed ? "black" : 'white'}>
                    {appConstant.proceed}
                </FontText>
            </Button>
            <Button
                flex={null}
                height={hp(6.5)}
                width="90%"
                type="highlight"
                borderRadius={11}
                onPress={handleCheckAgainClick}
                style={[styles.button, { backgroundColor: btnValue === appConstant.checkAgain ? colors.white : colors.gray }]}>
                <FontText name={"inter-medium"} size={normalize(16)} color={btnValue === appConstant.checkAgain ? "black" : 'white'}>
                    {appConstant.checkAgain}
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
        bottom: hp(2),
        alignItems: 'center',
        marginTop: hp(2)
    }
})