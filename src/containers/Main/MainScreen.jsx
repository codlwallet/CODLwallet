import { BackHandler, Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import colors from '../../assets/colors'
import Header from '../../components/common/Header'
import { mainData, settingData } from '../../constants/data'
import FontText from '../../components/common/FontText'
import { hp, normalize, wp } from '../../helper/responsiveScreen'
import Button from '../../components/common/Button'
import appConstant from '../../helper/appConstant'
import SvgIcons from '../../assets/SvgIcons'
import { useTranslation } from 'react-i18next'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native'
import { useDispatch, useSelector } from "react-redux";
import { getAccountsData, getNetwork } from "../../storage";
import { selectNetwork } from "../../redux/slices/authSlice";

export default function MainScreen({ navigation, route }) {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const hidden = route?.params?.hidden
    const [hideMenu, setHideMenu] = useState(false);
    const [accountDetails, setAccountDetails] = useState([])
    const { user } = useSelector((state) => state.auth)
    const [networks, setNetworks] = useState([])
    const [accountsData, setAccountsData] = useState({})

    useFocusEffect(
        React.useCallback(() => {
            getAccountsData().then(res => {
                if (res.status) {
                    console.log('res.data', res.data)
                    setAccountsData(res.data);
                }
            })
        }, []),
    );

    const loadNetworks = () => {
        getNetwork().then(res => {
            if (res.status) {
                let _networks = mainData.filter(data => res.networks.indexOf(data.value) >= 0)
                setNetworks(_networks);
            }
        })
    }

    useEffect(() => {
        loadNetworks();
        return () => { };
    }, [])

    const settingMenuAction = () => {
        if (hideMenu) loadNetworks();
        setHideMenu(!hideMenu);
    }

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

    const handleConnectClick = () => {

        navigation.navigate(appConstant.connectWallet)
    }

    const handleMenuListClick = (item) => {
        if (item.value === appConstant.changeName) {
            navigation.navigate(appConstant.changeUserDetails, {
                from: appConstant.changeName
            })
        }
        else if (item.value === appConstant.changePIN) {
            navigation.navigate(appConstant.changeUserDetails, {
                from: appConstant.changePIN
            })
        }
        else if (item.value === appConstant.language) {
            navigation.navigate(appConstant.language)
        }
        else if (item.value === appConstant.AboutCODL) {
            navigation.navigate(appConstant.AboutCODL)
        }
        else if (item.value === appConstant.recoveryCheck) {
            navigation.navigate(appConstant.recoveryCheck)
        }
        else if (item.value === appConstant.networks) {
            navigation.navigate(appConstant.networks)
        }
        else if (item.value === appConstant.deleteEverything) {
            navigation.navigate(appConstant.deleteEverything)
        }
    }

    const handleMainListClick = (item) => {
        dispatch(selectNetwork(item.value));
        // if (accountsData.createdAccounts[item.value].length === 0 || !accountsData.createdAccounts[item.value]) {
        if (accountsData.accounts.length === 0 ) {
            navigation.navigate(appConstant.createAccount, {
                name: item?.value
            })
        }
        else {
            let _created = accountsData.createdAccounts[item.value];
            // let _accounts = accountsData.accounts.filter(item => _created?.indexOf(item.publicKey) >= 0);
            let _accounts = accountsData.accounts;
            if (_accounts) {
                if (_accounts.length !== 1) {
                    navigation.navigate(appConstant.accountList, {
                        name: item.value,
                        accountList: _accounts
                    })
                } else {
                    navigation.navigate(appConstant.accountDetails, {
                        walletName: _accounts[0].name,
                        walletAddress: _accounts[0].publicKey
                    })
                }
            }

            // if (accountDetails.some((i) => i.value === item.value)) {
            //     accountDetails.map((i) => {
            //         if (i?.name === item.name) {
            //             if (i?.accountDetails.length !== 1) {

            //             }
            //             else {
            //                 i?.accountDetails.map((itm) => {
            //                     navigation.navigate(appConstant?.accountDetails, {
            //                         walletName: itm?.walletName,
            //                         name: item?.name
            //                     })
            //                 })
            //             }
            //         }
            //     })

            // }
            // else {
            //     navigation.navigate(appConstant.createAccount, {
            //         name: item?.value
            //     })
            // }
        }
    }

    return (
        <View style={styles.container}>
            <Header title={user?.name} showRightIcon RightIcon={!hideMenu ? 'menu' : 'false'} RightIconPress={settingMenuAction} style={{ height: hp(10) }} showHiddenTitle={hidden} />
            <View style={styles.subConatiner}>
                {!hideMenu ?
                    <>
                        {networks.map((item, index) => {
                            return (
                                <TouchableOpacity style={styles.buttonContainer} key={index} onPress={() => handleMainListClick(item)} >
                                    <View>
                                        {item.value === appConstant.bitcoin ?
                                            <SvgIcons.Bitcoin height={hp(6)} width={hp(4)} /> :
                                            item.value === appConstant.ethereum ?
                                                <Image source={item.image} style={{ width: hp(4), height: hp(6.5), }} /> :
                                                item.value === appConstant.solana ?
                                                    <SvgIcons.Solana height={hp(6)} width={hp(4)} /> :
                                                    item.value === appConstant.avalanche ?
                                                        <View style={{ backgroundColor: colors.gray }}>
                                                            <Image source={item.image} style={{ height: hp(7), width: hp(7), right: wp(2.5) }} />
                                                        </View> :
                                                        <SvgIcons.Poly height={hp(6)} width={hp(4.5)} />
                                        }
                                    </View>
                                    <FontText size={normalize(25)} color={'white'} name={'inter-regular'} pLeft={wp(5)} style={{ right: item.name === appConstant.avalanche ? wp(6) : 0 }}>
                                        {item?.name}
                                    </FontText>
                                </TouchableOpacity>
                            )
                        })
                        }
                    </>
                    :
                    <>
                        {settingData.map((item, index) => {
                            return (
                                <TouchableOpacity style={[styles.buttonContainer, { height: hp(7) }]} key={index} onPress={() => handleMenuListClick(item)}>
                                    <FontText size={normalize(22)} color={item.name === t("deleteEverything") ? "red" : 'white'} name={'inter-regular'}  >
                                        {item?.name}
                                    </FontText>
                                </TouchableOpacity>
                            )
                        })
                        }
                    </>
                }
            </View>
            <Button
                flex={null}
                type="highlight"
                borderRadius={11}
                bgColor="white"
                onPress={!hideMenu ? handleConnectClick : backAction}
                buttonStyle={styles.button}>
                <FontText name={"inter-medium"} size={normalize(22)} color="black">
                    {!hideMenu ? t("connect") : t("lockDevice")}
                </FontText>
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.black,
        alignItems: 'center'
    },
    subConatiner: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    buttonContainer: {
        backgroundColor: colors.gray,
        alignItems: 'center',
        flexDirection: 'row',
        width: wp(90),
        borderRadius: wp(2),
        marginVertical: hp(1),
        paddingHorizontal: wp(4),
        height: hp(9)
    },
    button: {
        backgroundColor: colors.white,
        marginBottom: hp(3),
        width: wp(90),
        height: hp(8.5)
    }
})