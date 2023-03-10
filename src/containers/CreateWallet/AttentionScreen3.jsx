import { StatusBar, StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import colors from '../../assets/colors'
import appConstant from '../../helper/appConstant'
import { hp } from '../../helper/responsiveScreen'
import SvgIcons from '../../assets/SvgIcons'
import AttentionWarningView from '../../components/AttentionWarningView'

export default function AttentionScreen2({ navigation, route }) {
    const { ButtonValue, numberValue } = route.params
    const [btnValue, setBtnValue] = useState(appConstant.confirmSeeds)

    const handleConfirmSeedsClick = () => {
        setBtnValue(appConstant.confirmSeeds)
        navigation.navigate(appConstant.confirmSeeds)
    }

    const handleCheckAgainClick = () => {
        setBtnValue(appConstant.checkAgain)
        navigation.navigate(appConstant.createWallet, {
            numberValue: numberValue,
            ButtonValue: ButtonValue
        })
    }

    // useEffect(() => {
    //     BackHandler.addEventListener('hardwareBackPress', backAction);
    //     return async () => {
    //         BackHandler.removeEventListener('hardwareBackPress', backAction);
    //     };
    // }, []);

    // const backAction = () => {
    //     navigation.navigate(appConstant.createWallet, {
    //         numberValue: numberValue,
    //         ButtonValue: ButtonValue
    //     })
    //     return true;
    // };

    return (
        <View style={styles.container}>
            <StatusBar
                barStyle={'light-content'}
                translucent
                backgroundColor={colors.black}
            />
            <AttentionWarningView
                title={appConstant.secureSeeds}
                mainIcon={<SvgIcons.Polygon height={hp(8)} width={hp(8)} />}
                description={appConstant.attention3Description}
                showButton1
                showButton2
                firstBtnTitle={appConstant.confirmSeeds}
                secondBtnTitle={appConstant.checkAgain}
                buttonValue={btnValue}
                handleFirstBtnClick={handleConfirmSeedsClick}
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