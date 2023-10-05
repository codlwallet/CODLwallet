import { BackHandler, StatusBar, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import colors from '../../assets/colors'
import appConstant from '../../helper/appConstant'
import { hp } from '../../helper/responsiveScreen'
import SvgIcons from '../../assets/SvgIcons'
import AttentionWarningView from '../../components/AttentionWarningView'
import { useTranslation } from 'react-i18next'
import Header from '../../components/common/Header'
import { removeAccount } from '../../storage'

export default function RemoveAccountScreen({ navigation, route }) {
    const { t } = useTranslation();
    const [btnValue, setBtnValue] = useState(appConstant.remove)
    const accountList = route?.params?.accountList
    const walletName = route?.params?.walletName
    const walletAddress = route?.params?.walletAddress
    const hidden = route?.params?.hidden
    const passphrase = route?.params?.passphrase

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', backAction);
        return async () => {
            BackHandler.removeEventListener('hardwareBackPress', backAction);
        };
    }, []);

    const handleProceedClick = () => {
        removeAccount(walletAddress, hidden, passphrase).then(
            res => {
                if (res.status) {
                    navigation.navigate(appConstant.removeSuccessful, {
                        accountList: accountList,
                        hidden,
                        passphrase
                    })
                }
            },
        );
        // navigation.navigate(appConstant.removeSuccessful, {
        //     accountList: accountList
        // })
    }
    const backAction = () => {
        navigation.goBack()
        return true;
    };

    return (
        <View style={styles.container}>
            <Header title={t('remove')} showRightIcon RightIcon={'info'} showBackIcon onBackPress={backAction} />
            <StatusBar
                barStyle={'light-content'}
                translucent
                backgroundColor={colors.black}
            />
            <AttentionWarningView
                title={t("areUSure")}
                mainIcon={<SvgIcons.Polygon height={hp(10)} width={hp(10)} />}
                description={t("removeAccoDes")}
                showButton1
                firstBtnValue={appConstant.remove}
                firstBtnTitle={t("remove")}
                buttonValue={btnValue}
                handleFirstBtnClick={handleProceedClick}
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