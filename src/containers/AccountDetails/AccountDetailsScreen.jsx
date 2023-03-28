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

export default function AccountDetailsScreen({ navigation, route }) {
    const { t } = useTranslation();
    const walletName = route?.params?.walletName
    const name = route?.params?.name
    const from = route?.params?.from

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', backAction);
        return async () => {
            BackHandler.removeEventListener('hardwareBackPress', backAction);
        };
    }, []);

    const backAction = () => {
        if (from === appConstant.createAccount || from === appConstant.main) {
            navigation.navigate(appConstant.main)
        }
        else if (from === appConstant.accountList) {
            navigation.goBack()
            route?.params?.onGoBack()
        }
        else {
            navigation.goBack()
        }
        return true;
    };

    const handleSignClick = () => {
        navigation.navigate(appConstant.scanQr, {
            walletName: walletName
        })
    }

    return (
        <View style={styles.container}>
            <Header title={walletName} showRightIcon={from === appConstant.main || from === appConstant.createAccount ? true : false} showBackIcon onBackPress={backAction} statusBarcolor={colors.black} style={{ alignSelf: 'center' }} RightIconPress={() => navigation.navigate(appConstant.createAccount, {
                name: name
            })} titleStyle={{ right: from === appConstant.main || from === appConstant.createAccount ? 0 : wp(40) }} />
            <View style={styles.subContainer}>
                <View style={styles.scannerContainer}>
                    <View style={styles.walletHeaderView}>
                        <FontText name={"inter-bold"} size={normalize(11)} color="black" textTransform={'uppercase'}>
                            {t("publicAddress")}
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
                <Image source={require('../../assets/images/EV.png')} style={styles.image} />
                <FontText name={"inter-regular"} size={normalize(22)} color="white" pLeft={wp(4)} style={{ width: wp(75) }}>
                    {'0x9b4545d9214097DBE61c984EB2AB83C6e86'}
                </FontText>
            </View>
            <Button
                flex={null}
                type="highlight"
                borderRadius={11}
                bgColor="white"
                onPress={handleSignClick}
                buttonStyle={styles.button}>
                <FontText name={"inter-medium"} size={normalize(22)} color="black">
                    {t("sign")}
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
        paddingHorizontal: wp(4)
    },
    image: {
        width: hp(3.5),
        height: hp(5.5),
    },
})