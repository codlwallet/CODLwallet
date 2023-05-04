import { BackHandler, Image, StyleSheet, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import colors from '../../assets/colors'
import Header from '../../components/common/Header'
import { hp, normalize, wp } from '../../helper/responsiveScreen'
import Button from '../../components/common/Button'
import FontText from '../../components/common/FontText'
import { useTranslation } from 'react-i18next'
import appConstant from '../../helper/appConstant'
import TransactionCard from '../../components/TransactionCard'
import { useDispatch, useSelector } from 'react-redux'
import { setSignData } from '../../redux/slices/authSlice'
import { useFocusEffect } from '@react-navigation/native'
import CautionIcon from "../../assets/images/caution.png";
import { ScrollView } from 'react-native-gesture-handler'

export default function SignTransactionScreen({ navigation, route }) {
    const { t } = useTranslation();
    const walletName = route?.params?.walletName
    const showIcon = route?.params?.namewalletName
    const walletAddress = route?.params?.walletAddress
    const tx = route?.params?.tx
    const chain = route?.params?.chain
    const serialized = route?.params?.encodedSignData
    const [btnValue, setBtnValue] = useState(t("sign"))
    const dispatch = useDispatch()
    const { selectedNetwork } = useSelector(state => state.auth)
    const [isNetworkMatch, setisNetworkMatch] = useState(true)
    const [isSignWalletMatch, setIsSignWalletMatch] = useState(walletAddress == tx?.payload.publicKey)

    console.log('isSignWalletMatch', isSignWalletMatch,tx?.payload.publicKey)
    useFocusEffect(useCallback(() => {
        if (selectedNetwork) {
            let regx = new RegExp(selectedNetwork, 'i');
            setIsSignWalletMatch(walletAddress == tx?.payload.publicKey)
            if ((chain.chain && regx.test(chain.chain)) || (chain.name && regx.test(chain.name)) || (chain.title && regx.test(chain.title))) {
                setisNetworkMatch(true)
            } else {
                setisNetworkMatch(false)
            }
        }
    }, []));
    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', backAction);
        return async () => {
            BackHandler.removeEventListener('hardwareBackPress', backAction);
        };
    }, []);

    const details = {
        from: tx?.payload?.publicKey,
        to: tx?.payload?.transaction?.to,
        fees: `${tx?.fee} ${chain?.nativeCurrency?.symbol}`,
        amount: `${tx?.payload?.transaction?.value && (parseInt(tx?.payload?.transaction?.value) / (10 ** 18)).toPrecision(7)} ${chain?.nativeCurrency?.symbol}`
    }

    const handleSignClick = () => {
        setBtnValue(t("sign"))
        dispatch(setSignData({ tx, chain, serialized }))
        navigation.navigate(appConstant.confirmSinging, {
            walletName: walletName,
            tx,
            chain,
            walletAddress
        })
    }

    const backAction = () => {
        navigation.navigate(appConstant.accountDetails, {
            walletName: walletName,
            showIcon: showIcon,
            walletAddress
        })
        return true;
    };

    return (
        <View style={styles.container}>
            <Header title={t("signTransaction")} showRightIcon statusBarcolor={colors.black} RightIcon={'info'} />
            <View style={styles.subContainer}>
                <View style={{marginBottom:hp(5)}}>
                    {!isNetworkMatch &&
                        <View style={{ ...styles.warningContainer, marginTop: hp(10) }}>
                            <Image source={CautionIcon} style={{ width: hp(5), height: hp(4), }} />
                            <FontText style={{ color: colors.yellow }}>
                                Please note that this is not {selectedNetwork} Mainnet Transaction.
                                This is from {chain.name}.
                            </FontText>
                        </View>
                    }
                    {!isSignWalletMatch &&
                        <View style={styles.warningContainer}>
                            <Image source={CautionIcon} style={{ width: hp(5), height: hp(4), }} />
                            <FontText style={{ color: colors.yellow }}>
                                {t('wrongAccountSignTrying')}
                            </FontText>
                        </View>
                    }
                </View>
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
                disabled={!isSignWalletMatch}
                defaultOpacity={!isSignWalletMatch ? 0.7 : 1}
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
        // backgroundColor: colors.white,
        marginBottom: hp(3),
        // height: hp(8.5),
        // width: wp(90),
    },
    detailsContainer: {
        backgroundColor: colors.gray,
        height: hp(45),
        width: hp(45),
        borderRadius: wp(2),
        alignItems: 'center',
    },
    infoView: {
        width: hp(40)
    },
    textConatiner: {
        flexDirection: 'row',
        marginTop: hp(3)
    },
    text: {
        width: hp(30)
    },

    detailsHeaderView: {
        backgroundColor: colors.white,
        borderRadius: wp(1.5),
        paddingHorizontal: wp(2),
        paddingVertical: hp(0.5),
        top: hp(-2),
        borderWidth: wp(1),
        borderColor: colors.black,
    },

    warningContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
        alignItems: 'center',
        columnGap: wp(1),
        borderWidth: wp(0.3),
        borderColor: colors.yellow,
        padding: wp(2),
        marginBottom: hp(1)
    }
})