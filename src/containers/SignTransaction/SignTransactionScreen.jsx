import { BackHandler, Image, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import colors from '../../assets/colors'
import Header from '../../components/common/Header'
import { hp, normalize, wp } from '../../helper/responsiveScreen'
import Button from '../../components/common/Button'
import FontText from '../../components/common/FontText'
import { useTranslation } from 'react-i18next'
import appConstant from '../../helper/appConstant'
import TransactionCard from '../../components/TransactionCard'

export default function SignTransactionScreen({ navigation, route }) {
    const { t } = useTranslation();
    const walletName = route?.params?.walletName
    const [btnValue, setBtnValue] = useState(t("sign"))

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', backAction);
        return async () => {
            BackHandler.removeEventListener('hardwareBackPress', backAction);
        };
    }, []);

    const details = {
        from: '0xa94b3c662eE5602A3308604a3fB9A8FDd5caa710',
        to: '0xa94b3c662eE5602A3308604a3fB9A8FDd5caa710',
        fees: '0.0000315 ETH',
        amount: '0.001 ETH'
    }

    const handleSignClick = () => {
        setBtnValue(t("sign"))
        navigation.navigate(appConstant.confirmSinging, {
            walletName: walletName
        })
    }

    const backAction = () => {
        navigation.navigate(appConstant.accountDetails, {
            walletName: walletName
        })
        return true;
    };

    return (
        <View style={styles.container}>
            <Header title={t("signTransaction")} showRightIcon statusBarcolor={colors.black} RightIcon={'info'} />
            <View style={styles.subContainer}>
                <TransactionCard
                    item={details}
                    headerTitle={t("tokenTransfer")}
                />
            </View>
            <Button
                flex={null}
                type="highlight"
                height={hp(8.5)}
                width={wp(90)}
                borderRadius={11}
                bgColor={btnValue === t("sign") ? "white" : 'gray'}
                onPress={handleSignClick}
                style={[styles.button, { marginBottom: hp(2) }]}>
                <FontText name={"inter-medium"} size={normalize(22)} color={btnValue === t("sign") ? "black" : 'white'}>
                    {t("sign")}
                </FontText>
            </Button>
            <Button
                flex={null}
                type="highlight"
                height={hp(8.5)}
                width={wp(90)}
                borderRadius={11}
                bgColor={btnValue === t("reject") ? "white" : 'gray'}
                onPress={backAction}
                style={styles.button}>
                <FontText name={"inter-medium"} size={normalize(22)} color={btnValue === t("reject") ? "black" : 'white'}>
                    {t("reject")}
                </FontText>
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.black,
        paddingHorizontal: wp(3.5),
        alignItems: 'center'
    },
    subContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        marginBottom: hp(3),
    },

})