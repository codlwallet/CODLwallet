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
    const [btnValue, setBtnValue] = useState(appConstant.confirmSeeds)

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', backAction);
        return async () => {
            BackHandler.removeEventListener('hardwareBackPress', backAction);
        };
    }, []);

    const handleConfirmSeedsClick = () => {
        setBtnValue(appConstant.confirmSeeds)
        navigation.navigate(appConstant.confirmSeeds)
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
            {/* <StatusBar
                barStyle={'light-content'}
                translucent
                backgroundColor={colors.black}
            /> */}
            <AttentionWarningView
                title={t("secureSeeds")}
                mainIcon={<SvgIcons.Polygon height={hp(10)} width={hp(10)} />}
                description={t("attention3Description")}
                showButton1
                showButton2
                firstBtnValue={appConstant.confirmSeeds}
                secondBtnValue={appConstant.checkAgain}
                firstBtnTitle={t("confirmSeeds")}
                secondBtnTitle={t("checkAgain")}
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