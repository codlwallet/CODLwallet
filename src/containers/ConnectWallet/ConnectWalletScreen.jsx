import { ActivityIndicator, BackHandler, Image, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import colors from '../../assets/colors'
import Header from '../../components/common/Header'
import { hp, normalize, wp } from '../../helper/responsiveScreen'
import Button from '../../components/common/Button'
import FontText from '../../components/common/FontText'
import { useTranslation } from 'react-i18next'
import QRCode from 'react-native-qrcode-svg'
import SvgIcons from '../../assets/SvgIcons'
import { generateHDKey } from '../../storage'

export default function ConnectWalletScreen({ navigation, route }) {
    const { t } = useTranslation();
    const { passphrase } = route?.params
    const [HDKey, setHDKey] = useState('')
    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', backAction);
        return async () => {
            BackHandler.removeEventListener('hardwareBackPress', backAction);
        };
    }, []);

    useEffect(() => {
        (async () => {
            let hdkey = await generateHDKey(passphrase && passphrase)
            setHDKey(hdkey)
        })()
    }, [])
    const backAction = () => {
        if (HDKey) {
            navigation.goBack()
            return true;
        } else {
            return false;
        }
    };

    return (
        <View style={styles.container}>
            <Header title={t("connectWallet")} showRightIcon RightIcon={'info'} statusBarcolor={colors.black} />
            <View style={styles.subContainer}>
                {HDKey ? <View style={styles.scannerContainer}>
                    <View style={[styles.walletHeaderView, { top: hp(-3.5) }]}>
                        <FontText name={"inter-bold"} size={normalize(11)} color="black" textTransform={'uppercase'}>
                            {t("watchOnly")}
                        </FontText>
                    </View>
                    <View style={{ marginTop: hp(-3) }}>
                        <QRCode
                            value={HDKey}
                            logo={require('../../assets/images/BlackAppLogo.png')}
                            logoSize={50}
                            size={hp(37)}
                            logoMargin={10}
                            logoBackgroundColor='white'
                        />
                    </View>
                </View> : <ActivityIndicator animating={!HDKey} size="large" color="#ffffff" />}
            </View>
            <View style={styles.bottomView}>
                <View style={styles.walletHeaderView}>
                    <FontText name={"inter-bold"} size={normalize(11)} color="black">
                        {t("connectWith")}
                    </FontText>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: wp(80) }}>
                    <FontText name={"inter-regular"} size={normalize(22)} color="white"  >
                        {'Metamask Wallet'}
                    </FontText>
                    <SvgIcons.Dog />
                </View>
            </View>
            <Button
                flex={null}
                type="highlight"
                borderRadius={11}
                bgColor="white"
                defaultOpacity={!HDKey ? 0.5 : 1}
                disabled={!HDKey}
                onPress={backAction}
                style={styles.button}>
                <FontText name={"inter-medium"} size={normalize(22)} color="black">
                    {t("done")}
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
        // backgroundColor: colors.white,
        marginBottom: hp(3),
        // height: hp(8.5),
        // width: wp(90),
    },
    scannerContainer: {
        backgroundColor: colors.white,
        height: hp(41),
        width: hp(41),
        borderRadius: wp(2),
        alignItems: 'center',
        justifyContent: 'center'
    },
    walletHeaderView: {
        backgroundColor: colors.white,
        borderRadius: wp(2),
        paddingHorizontal: wp(5),
        paddingVertical: hp(0.5),
        top: hp(-2),
        borderWidth: wp(1),
        borderColor: colors.black,
    },
    bottomView: {
        backgroundColor: colors.gray,
        height: hp(11),
        width: wp(90),
        marginBottom: hp(2),
        borderRadius: wp(2),
        // flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: "space-between",
        paddingHorizontal: wp(5),

    },
})