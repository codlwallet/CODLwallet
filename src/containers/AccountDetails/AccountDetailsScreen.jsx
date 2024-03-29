import { BackHandler, Image, LogBox, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import colors from '../../assets/colors'
import Header from '../../components/common/Header'
import { hp, normalize, wp } from '../../helper/responsiveScreen'
import Button from '../../components/common/Button'
import FontText from '../../components/common/FontText'
import { useTranslation } from 'react-i18next'
import QRCode from 'react-native-qrcode-svg'
import appConstant from '../../helper/appConstant'
import { mainData } from '../../constants/data'
import { getAccountsData } from '../../storage'
import { useFocusEffect } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'

LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
]);
export default function AccountDetailsScreen({ navigation, route }) {
    const { t } = useTranslation();
    const walletName = route?.params?.walletName
    const walletAddress = route?.params?.walletAddress
    const name = route?.params?.name
    const from = route?.params?.from
    const hidden = route?.params?.hidden
    const headerName = route?.params?.headerName
    const passphrase = route?.params?.passphrase
    // const { passphrase } = useSelector((state) => state.auth)
    const { selectedNetwork } = useSelector(state => state.auth)
    const [accountList, setAccountList] = useState({})
    const [walletIcon, setWalletIcon] = useState()
    const [showRightIcon, setShowRightIcon] = useState(from === appConstant.main || from === appConstant.createAccount ? true : false)

    useFocusEffect(
        React.useCallback(() => {
            getAccountsData().then(async res => {
                if (res.status) {
                    if (!hidden) {
                        setAccountList(res.created?.general)
                    } else {
                        setAccountList(res.created?.hidden[passphrase])
                    }
                }
            })
        }, []),
    );

    useEffect(() => {
        mainData?.map((item, index) => {
            if (name === item.value) {
                setWalletIcon(item?.image)
            }
        })
    }, []);

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', onBackClick);
        return async () => {
            BackHandler.removeEventListener('hardwareBackPress', onBackClick);
        };
    }, [accountList]);

    useEffect(() => {
        setShowRightIcon(from === appConstant.main || from === appConstant.createAccount ? true : false)
    }, []);


    const onBackClick = () => {
        console.log(accountList?.length, from === appConstant.accountList, from, "========================")
        if (accountList?.length >= 1 || from === appConstant.accountList || from === appConstant.main) {
            navigation.navigate(appConstant.accountList, {
                name: name,
                headerName: headerName,
                from: appConstant?.accountDetails,
                accountList: accountList,
                hidden: hidden,
                passphrase: passphrase,
                icon: walletIcon
            })
        }
        else if (from === appConstant.createAccount || from === appConstant.main) {
            navigation.navigate(appConstant.main)
        }
        else {
            navigation.goBack()
        }
        return true;
    }

    const handleSignClick = () => {
        navigation.navigate(appConstant.scanQr, {
            walletName: walletName,
            showIcon: showRightIcon,
            walletAddress: walletAddress
        })
    }

    const RightIconPress = () => {
        // if (accountList?.length > 1) {
        //     navigation.navigate(appConstant.accountList, {
        //         name: name,
        //         headerName: headerName,
        //         from: appConstant?.accountDetails,
        //         accountList: accountList,
        //         icon: walletIcon,
        //         showList: false
        //     })
        // }
        // else {
        //     navigation.navigate(appConstant.createAccount, {
        //         name: name,
        //     })
        // }
        navigation.navigate(appConstant.accountOptions, {
            walletName: walletName,
            name: name,
            accountList: accountList,
            walletAddress: walletAddress,
            hidden: hidden,
            passphrase
        })
    }

    return (
        <View style={styles.container}>
            <Header RightIcon={'menu'} title={walletName} showRightIcon={from === appConstant.main || from === appConstant.createAccount || from === appConstant.accountList || showRightIcon ? true : false} showBackIcon onBackPress={onBackClick} statusBarcolor={colors.black} RightIconPress={RightIconPress} titleStyle={{ right: from === appConstant.main || from === appConstant.createAccount || from === appConstant.accountList || showRightIcon ? 0 : wp(13), width: wp(65) }} />
            <View style={styles.subContainer}>
                <View style={styles.scannerContainer}>
                    <View style={styles.walletHeaderView}>
                        <FontText name={"inter-bold"} size={normalize(11)} color="black">
                            {t("publicAddress")}
                        </FontText>
                    </View>
                    <View style={{ marginTop: hp(-3) }}>
                        <QRCode
                            value={walletAddress}
                            logo={require('../../assets/images/BlackAppLogo.png')}
                            logoSize={50}
                            size={hp(36)}
                            logoMargin={10}
                            logoBackgroundColor='white'
                        />
                    </View>
                </View>
            </View>
            <View style={styles.bottomView}>
                {mainData?.map((item, index) => {
                    return (
                        <View key={index}>
                            {selectedNetwork === item.value &&
                                <Image source={item?.image} style={styles.image} />
                            }
                        </View>
                    )
                })}
                <FontText name={"inter-regular"} size={normalize(19)} color="white" pLeft={wp(4)} style={{ width: wp(75) }}>
                    {walletAddress}
                    {/* {walletAddress.replace(walletAddress.substring(7, 38), `...`)} */}
                </FontText>
            </View>
            <Button
                flex={null}
                type="highlight"
                borderRadius={11}
                bgColor="white"
                onPress={handleSignClick}
                style={styles.button}>
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
        // backgroundColor: colors.white,
        marginBottom: hp(3),
        // height: hp(8.5),
        // width: wp(90),
    },
    scannerContainer: {
        backgroundColor: colors.white,
        height: hp(40),
        width: hp(40),
        borderRadius: wp(2),
        alignItems: 'center',
        justifyContent: 'center'
    },
    walletHeaderView: {
        backgroundColor: colors.white,
        borderRadius: wp(1.5),
        paddingHorizontal: wp(2),
        paddingVertical: hp(0.3),
        top: hp(-4),
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
        width: hp(5),
        height: hp(6),
    },
})