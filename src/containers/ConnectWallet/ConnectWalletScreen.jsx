import { BackHandler, Image, StyleSheet, View } from 'react-native'
import React, { useEffect } from 'react'
import colors from '../../assets/colors'
import Header from '../../components/common/Header'
import { hp, normalize, wp } from '../../helper/responsiveScreen'
import Button from '../../components/common/Button'
import FontText from '../../components/common/FontText'
import { useTranslation } from 'react-i18next'
import QRCode from 'react-native-qrcode-svg'
import appConstant from '../../helper/appConstant'
import SvgIcons from '../../assets/SvgIcons'

export default function ConnectWalletScreen({ navigation, route }) {
    const { t } = useTranslation();
    // const { walletName } = route?.params

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



    return (
        <View style={styles.container}>
            <Header title={t("connectWallet")} showRightIcon RightIcon={'info'} statusBarcolor={colors.black} style={{ alignSelf: 'center' }} RightIconPress={() => navigation.navigate(appConstant.createAccount)} />
            <View style={styles.subContainer}>
                <View style={styles.scannerContainer}>
                    <View style={styles.walletHeaderView}>
                        <FontText name={"inter-bold"} size={normalize(11)} color="black" textTransform={'uppercase'}>
                            {t("watchOnly")}
                        </FontText>
                    </View>
                    <View style={{ marginTop: hp(-3) }}>
                        <QRCode
                            // value="Just some string value"
                            logo={require('../../assets/images/BlackAppLogo.png')}
                            logoSize={50}
                            size={hp(39)}
                            logoMargin={10}
                            logoBackgroundColor='white'
                        />
                    </View>
                </View>
            </View>
            <View style={styles.bottomView}>
                <FontText name={"inter-regular"} size={normalize(22)} color="white"  >
                    {'Metamask Wallet'}
                </FontText>
                <SvgIcons.Dog />
            </View>
            <Button
                flex={null}
                type="highlight"
                borderRadius={11}
                bgColor="white"
                onPress={backAction}
                buttonStyle={styles.button}>
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
        backgroundColor: colors.white,
        marginBottom: hp(3),
        height: hp(8.5),
        width: wp(90),
    },
    scannerContainer: {
        backgroundColor: colors.white,
        height: hp(45),
        width: hp(45),
        borderRadius: wp(2),
        alignItems: 'center',
        justifyContent: 'center'
    },
    walletHeaderView: {
        backgroundColor: colors.white,
        borderRadius: wp(1.5),
        paddingHorizontal: wp(2),
        paddingVertical: hp(0.5),
        top: hp(-5),
        borderWidth: wp(1),
        borderColor: colors.black,
    },
    bottomView: {
        backgroundColor: colors.gray,
        height: hp(11),
        width: wp(90),
        marginBottom: hp(2),
        borderRadius: wp(2),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between",
        paddingHorizontal: wp(5)
    },
})