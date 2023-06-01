import { BackHandler, StyleSheet, View } from 'react-native'
import React, { useEffect } from 'react'
import colors from '../../assets/colors'
import appConstant from '../../helper/appConstant'
import SvgIcons from '../../assets/SvgIcons'
import { hp } from '../../helper/responsiveScreen'
import AttentionWarningView from '../../components/AttentionWarningView'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { setPassphrase } from '../../redux/slices/authSlice'

export default function HiddenWalletWarningScreen({ navigation, route }) {
    const { t } = useTranslation();
    const dispatch=useDispatch()
    const {passphrase}=route?.params;
    const { loading } = useSelector((state) => state.auth)
    const handleUnderStandBtnClick = () => {
        if(!loading){
            dispatch(setPassphrase(passphrase));
            navigation.navigate(appConstant.main, {
                hidden: true
            })
        }
    }
    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', backAction);
        return async () => {
            BackHandler.removeEventListener('hardwareBackPress', backAction);
        };
    }, []);

    const backAction = () => {
        navigation.navigate(appConstant.welcomePurchase, {
            from: appConstant.hiddenWallet,
        });
        return true;
    };
    return (
        <View style={styles.container}>
            <AttentionWarningView title={t("warning")}
                mainIcon={<SvgIcons.HideEye height={hp(8)} width={hp(8)} />}
                description={t("hiddenWalletWarning")}
                showButton1
                firstBtnTitle={t("understand")}
                firstBtnValue={t("understand")}
                buttonValue={t("understand")}
                loading={loading}
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