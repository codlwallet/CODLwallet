import { StatusBar, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import colors from '../../assets/colors'
import SvgIcons from '../../assets/SvgIcons'
import { hp } from '../../helper/responsiveScreen'
import appConstant from '../../helper/appConstant'
import AttentionWarningView from '../../components/AttentionWarningView'
import { useTranslation } from 'react-i18next'
import { useFocusEffect } from '@react-navigation/native'
import { getAccountsData } from '../../storage'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useSelector } from 'react-redux'

export default function RemoveSuccessfull({ navigation, route }) {
    const { t } = useTranslation();
    const { passphrase } = useSelector((state) => state.auth)
    const accountList = route?.params?.accountList
    // const [accountList, setAccountList] = useState([])

    // useFocusEffect(
    //     React.useCallback(() => {
    //         getAccountsData().then(async res => {
    //             let user = await AsyncStorage.getItem("hidden");
    //             const isHidden = JSON.parse(user)
    //             if (res.status) {
    //                 console.log("res", res)
    //                 if (!isHidden) {
    //                     setAccountList(res.created?.general)
    //                 } else {
    //                     setAccountList(res.created?.hidden[passphrase])
    //                 }
    //             }
    //         })
    //     }, []),
    // );


    useEffect(() => {
        setTimeout(() => {
            if (accountList?.length > 1) {
                navigation.navigate(appConstant.accountList, {
                    accountList: accountList,
                })
            }
            else {
                navigation.navigate(appConstant.main)
            }
        }, 2000);
    },)

    return (
        <View style={styles.container}>
            <StatusBar
                barStyle={'light-content'}
                translucent
                backgroundColor={colors.black}
            />
            <AttentionWarningView
                title={t("successfullyRemoved")}
                mainIcon={<View style={styles.imageContainer}>
                    <SvgIcons.BlackCheck />
                </View>}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.black,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageContainer: {
        backgroundColor: colors.white,
        justifyContent: 'center',
        alignItems: 'center',
        height: hp(8),
        width: hp(8),
        borderRadius: hp(4)
    }
})
