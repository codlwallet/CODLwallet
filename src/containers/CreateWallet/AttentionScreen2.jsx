import { BackHandler, StatusBar, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import colors from '../../assets/colors'
import appConstant from '../../helper/appConstant'
import { hp } from '../../helper/responsiveScreen'
import SvgIcons from '../../assets/SvgIcons'
import AttentionWarningView from '../../components/AttentionWarningView'
import { useTranslation } from 'react-i18next'

export default function AttentionScreen2({ navigation, route }) {
    const { t } = useTranslation();
    const [btnValue, setBtnValue] = useState(appConstant.proceed)

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', backAction);
        return async () => {
            BackHandler.removeEventListener('hardwareBackPress', backAction);
        };
    }, []);

    const handleProceedClick = () => {
        setBtnValue(appConstant.proceed)
        navigation.navigate(appConstant.setupWallet)
    }

    const handleCheckAgainClick = () => {
        setBtnValue(appConstant.checkAgain)
        backAction()
    }

    const backAction = () => {
        navigation.goBack()
        return true;
    };

    return (
        <View style={styles.container}>
            <StatusBar
                barStyle={'light-content'}
                translucent
                backgroundColor={colors.red}
            />
            <AttentionWarningView
                title={t("areUSure")}
                mainIcon={<SvgIcons.Polygon height={hp(8)} width={hp(8)} />}
                description={t("attention2Description")}
                showButton1
                showButton2
                firstBtnTitle={t("proceed")}
                secondBtnTitle={t("checkAgain")}
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