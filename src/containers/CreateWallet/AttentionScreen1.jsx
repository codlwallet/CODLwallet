import { StyleSheet, View } from 'react-native'
import React from 'react'
import colors from '../../assets/colors'
import Header from '../../components/common/Header'
import appConstant from '../../helper/appConstant'
import SvgIcons from '../../assets/SvgIcons'
import { hp, wp } from '../../helper/responsiveScreen'
import AttentionWarningView from '../../components/AttentionWarningView'
import { t } from 'i18next'

export default function AttentionScreen1({ navigation, route }) {
    const { ButtonValue, numberValue } = route.params

    const handleUnderStandBtnClick = () => {
        navigation.navigate(ButtonValue === appConstant.createWallet ? appConstant.createWallet : appConstant.importWallet, {
            numberValue: numberValue,
            ButtonValue: ButtonValue
        })
    }

    return (
        <View style={styles.container}>
            <Header showRightIcon RightIcon={'info'} />
            <AttentionWarningView title={t("watchSurroundings")}
                mainIcon={<SvgIcons.HideEye height={hp(8)} width={hp(8)} />}
                description={t("attention1Description")}
                showButton1
                firstBtnTitle={t("understand")}
                buttonValue={t("understand")}
                handleFirstBtnClick={handleUnderStandBtnClick}
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