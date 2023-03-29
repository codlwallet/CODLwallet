import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import colors from '../../assets/colors'
import SvgIcons from '../../assets/SvgIcons'
import appConstant from '../../helper/appConstant'
import AttentionWarningView from '../../components/AttentionWarningView'
import { hp } from '../../helper/responsiveScreen'
import { useTranslation } from 'react-i18next'
import Header from '../../components/common/Header'

export default function WrongPinWarningScreen({ navigation, route }) {
    const { t } = useTranslation();
    const { count } = route?.params

    const handleTryAgainClick = () => {
        navigation.goBack()
    }

    return (
        <View style={styles.container}>
            {/* <StatusBar
                barStyle={'light-content'}
                translucent
                backgroundColor={colors.black}
            /> */}
            <Header showRightIcon RightIconPress={handleTryAgainClick} statusBarcolor={colors.black} RightIcon={'false'} />
            <AttentionWarningView
                title={count === 1 ? t("wrongPin") : t("lastTry")}
                mainIcon={<SvgIcons.Polygon height={hp(10)} width={hp(10)} />}
                description={count === 1 ? `${3} ${t("attemptsLeft")}` : `${t("lastTryDescription")}`}
                showButton1
                firstBtnTitle={t("tryAgain")}
                firstBtnValue={t("tryAgain")}
                buttonValue={t("tryAgain")}
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