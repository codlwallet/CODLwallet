import { BackHandler, StatusBar, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import colors from '../../assets/colors'
import appConstant from '../../helper/appConstant'
import { hp } from '../../helper/responsiveScreen'
import SvgIcons from '../../assets/SvgIcons'
import AttentionWarningView from '../../components/AttentionWarningView'

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
            <StatusBar
                barStyle={'light-content'}
                translucent
                backgroundColor={colors.black}
            />
            <AttentionWarningView
                title={appConstant.watchSurroundings}
                mainIcon={<SvgIcons.Polygon height={hp(8)} width={hp(8)} />}
                description={appConstant.attention1Description}
                showButton1
                showButton2
                firstBtnTitle={appConstant.proceed}
                secondBtnTitle={appConstant.checkAgain}
                buttonValue={btnValue}
                handleFirstBtnClick={handleProceedClick}
                handleSecondBtnClick={handleCheckAgainClick}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.black,
        alignItems: 'center',
    },
})