import { StyleSheet, View } from 'react-native'
import React from 'react'
import colors from '../../assets/colors'
import appConstant from '../../helper/appConstant'
import SvgIcons from '../../assets/SvgIcons'
import { hp } from '../../helper/responsiveScreen'
import AttentionWarningView from '../../components/AttentionWarningView'
import { useTranslation } from 'react-i18next'

export default function HiddenWalletWarningScreen({ navigation, route }) {
    const { t } = useTranslation();

    const handleUnderStandBtnClick = () => {
        navigation.navigate(appConstant.main, {
            hidden: true
        })
    }

    return (
        <View style={styles.container}>
            <AttentionWarningView title={t("warning")}
                mainIcon={<SvgIcons.HideEye height={hp(8)} width={hp(8)} />}
                description={t("hiddenWalletWarning")}
                showButton1
                firstBtnTitle={t("understand")}
                firstBtnValue={t("understand")}
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