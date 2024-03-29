import { BackHandler, StyleSheet, View } from 'react-native'
import React, { useEffect } from 'react'
import AttentionWarningView from '../../components/AttentionWarningView'
import Header from '../../components/common/Header'
import SvgIcons from '../../assets/SvgIcons'
import appConstant from '../../helper/appConstant'
import { hp } from '../../helper/responsiveScreen'
import colors from '../../assets/colors'
import { useTranslation } from 'react-i18next'

export default function RecoveryWarningScreen({ navigation }) {
    const { t } = useTranslation();

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', backAction);
        return async () => {
            BackHandler.removeEventListener('hardwareBackPress', backAction);
        };
    }, []);

    const backAction = () => {
        navigation.goBack()
        return true;
    };

    const handleRecoveryClick = () => {
        navigation.navigate(appConstant.recoveryCheck)
    }

    return (
        <View style={styles.container}>
            <Header showRightIcon RightIcon={'info'} title={t("recoveryCheck")} showBackIcon onBackPress={backAction} />
            <AttentionWarningView title={t("watchSurroundings")}
                mainIcon={<SvgIcons.HideEye height={hp(8)} width={hp(8)} />}
                description={t("attention1Description")}
                showButton1
                firstBtnTitle={t("startRecoveryCheck")}
                firstBtnValue={t("startRecoveryCheck")}
                buttonValue={t("startRecoveryCheck")}
                handleFirstBtnClick={handleRecoveryClick}
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