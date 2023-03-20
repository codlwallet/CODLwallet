import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import colors from '../../assets/colors'
import SvgIcons from '../../assets/SvgIcons'
import appConstant from '../../helper/appConstant'
import AttentionWarningView from '../../components/AttentionWarningView'
import { hp } from '../../helper/responsiveScreen'
import { useTranslation } from 'react-i18next'

export default function WrongPinWarningScreen({ navigation, route }) {
    const { t } = useTranslation();
    const { count } = route?.params

    const handleTryAgainClick = () => {
        navigation.goBack()
    }

    return (
        <View style={styles.container}>
            <StatusBar
                barStyle={'light-content'}
                translucent
                backgroundColor={colors.black}
            />
            <AttentionWarningView
                title={count === 1 ? t("wrongPin") : t("lastTry")}
                mainIcon={<SvgIcons.Polygon height={hp(8)} width={hp(8)} />}
                description={count === 1 ? `${3} ${t("attemptsLeft")}` : `${t("lastTryDescription")}`}
                showButton1
                firstBtnTitle={t("tryAgain")}
                buttonValue={appConstant.tryAgain}
                handleFirstBtnClick={handleTryAgainClick}
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