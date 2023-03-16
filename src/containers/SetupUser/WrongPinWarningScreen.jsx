import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import colors from '../../assets/colors'
import SvgIcons from '../../assets/SvgIcons'
import appConstant from '../../helper/appConstant'
import AttentionWarningView from '../../components/AttentionWarningView'
import { hp } from '../../helper/responsiveScreen'

export default function WrongPinWarningScreen({ navigation, route }) {
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
                title={count === 1 ? appConstant.wrongPin : appConstant.lastTry}
                mainIcon={<SvgIcons.Polygon height={hp(8)} width={hp(8)} />}
                description={count === 1 ? `${3} ${appConstant.attemptsLeft}` : `${appConstant.lastTryDescription}`}
                showButton1
                firstBtnTitle={appConstant.tryAgain}
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