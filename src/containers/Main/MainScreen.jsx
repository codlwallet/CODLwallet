import { BackHandler, Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import colors from '../../assets/colors'
import Header from '../../components/common/Header'
import { mainData, settingData } from '../../constants/data'
import FontText from '../../components/common/FontText'
import { hp, normalize, wp } from '../../helper/responsiveScreen'
import Button from '../../components/common/Button'
import PopUp from '../../components/common/AlertBox'
import appConstant from '../../helper/appConstant'
import SvgIcons from '../../assets/SvgIcons'
import { useTranslation } from 'react-i18next'
import { useFocusEffect } from '@react-navigation/native'
import i18n from '../../constants/i18n'
import { useDispatch, useSelector } from "react-redux";
import { getAccountsData, getNetwork } from "../../storage";
import { selectNetwork } from "../../redux/slices/authSlice";
import { selectAccount } from "../../redux/slices/authSlice";

export default function MainScreen({ navigation, route }) {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [hideMenu, setHideMenu] = useState(false);
    const [accountDetails, setAccountDetails] = useState([])
    const { user, passphrase } = useSelector((state) => state.auth)
    const [networks, setNetworks] = useState([])
    const [accountsData, setAccountsData] = useState({})
    const [createdAccounts, setCreatedAccounts] = useState({})
    const [showAlert, setShowAlert] = useState(false)
    const [alertTitle, setAlertTitle] = useState('')
    const [alertMessage, setAlertMessage] = useState('')
    const [hidden, setIsHidden] = useState(route?.params?.hidden)

    useFocusEffect(
        React.useCallback(() => {
            getAccountsData().then(res => {
                if (res.status) {
                    if (typeof hidden != 'boolean') setIsHidden(res.data.isHidden);
                    setAccountsData(res.data);
                    setCreatedAccounts(res.created);
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

    useFocusEffect(
        React.useCallback(() => {
            loadNetworks();
            return () => { };
        }, []),
    );

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
        if (hidden) {
            navigation.navigate(appConstant.welcome, {
                from: appConstant.welcomePurchase
            })
        } else {
            navigation.goBack()
        }
        return true;
    };

    const lockDevice = () => {
        navigation.navigate(appConstant.welcome, {
            from: appConstant.welcomePurchase
        })
    }
    const handleConnectClick = () => {
        let _createdAccounts = []
        if (!hidden) {
            _createdAccounts = createdAccounts && createdAccounts.general
        } else {
            _createdAccounts = createdAccounts && createdAccounts.hidden[passphrase]
        }
        if (_createdAccounts && _createdAccounts.length > 0) {
            navigation.navigate(appConstant.connectWallet, { passphrase: hidden ? passphrase : null })
        } else {
            setAlertTitle('There is no created Account.')
            setAlertMessage('You must create one account at least to connect Metamask.')
            setShowAlert(true)
        }
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
            navigation.navigate(appConstant.recoveryWarning)
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
        if (!createdAccounts || (accountsData.isHidden === false && createdAccounts.general.length === 0) || (accountsData.isHidden === true && !createdAccounts.hidden[passphrase])) {
            navigation.navigate(appConstant.createAccount, {
                name: item?.value
            })
        } else {
            if (accountsData.isHidden === false) {
                let _accounts = createdAccounts.general;
                if (_accounts) {
                    if (_accounts.length !== 1) {
                        navigation.navigate(appConstant.accountList, {
                            name: item?.value,
                            headerName: item?.value,
                            accountList: _accounts,
                            icon: item.image
                        })
                    } else {
                        dispatch(selectAccount(_accounts[0]))
                        navigation.navigate(appConstant.accountDetails, {
                            name: item?.value,
                            walletName: _accounts[0].name,
                            headerName: item?.value,
                            from: appConstant.main,
                            walletAddress: _accounts[0].publicKey
                        })
                    }
                }
            } else {
                let _accounts = createdAccounts.hidden[passphrase];
                if (_accounts) {
                    if (_accounts.length !== 1) {
                        navigation.navigate(appConstant.accountList, {
                            name: item?.value,
                            headerName: item?.value,
                            accountList: _accounts,
                            icon: item.image
                        })
                    } else {
                        dispatch(selectAccount(_accounts[0]))
                        navigation.navigate(appConstant.accountDetails, {
                            name: item?.value,
                            walletName: _accounts[0].name,
                            headerName: item?.value,
                            from: appConstant.main,
                            walletAddress: _accounts[0].publicKey
                        })
                    }
                }
            }
        }
    }

    const onpressRightIcon = () => {
        setHideMenu(!hideMenu)
    }

    return (
        <View style={styles.container}>
            <Header title={user?.name} showRightIcon RightIcon={!hideMenu ? 'menu' : 'false'} RightIconPress={() => onpressRightIcon()} showHiddenTitle={hidden} />
            <View style={styles.subConatiner}>
                {!hideMenu ?
                    <>
                        {networks.map((item, index) => {
                            return (
                                <TouchableOpacity style={styles.buttonContainer} key={index} onPress={() => handleMainListClick(item)} >
                                    <View>
                                        {item.value === appConstant.ethereum ?
                                            <Image source={item.image} style={{ width: hp(3.5), height: hp(6), }} /> :
                                            item.value === appConstant.avalanche ?
                                                <Image source={item.image} style={{ height: hp(3.7), width: hp(4.4), }} /> :
                                                item.value === appConstant.polygon ?
                                                    <SvgIcons.Poly height={hp(6)} width={hp(4.5)} /> :
                                                    item.value === appConstant.bsc ?
                                                        <Image source={item.image} style={{ height: hp(5.2), width: hp(4.5) }} /> :
                                                        item.value === appConstant.arbitrum ?
                                                            <Image source={item.image} style={{ height: hp(5.6), width: hp(4.9) }} /> :
                                                            item.value === appConstant.optimism ?
                                                                <Image source={item.image} style={{ height: hp(5.09), width: hp(5.1), }} /> :
                                                                <Image source={item.image} style={{ width: hp(5), height: wp(5.5), }} />
                                        }
                                    </View>
                                    <FontText size={normalize(25)} color={'white'} name={'inter-regular'} pLeft={wp(5)} >
                                        {item?.value}
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
                                    <FontText size={normalize(22)} color={item.value === appConstant.deleteEverything ? "red" : 'white'} name={'inter-regular'}  >
                                        {i18n.language === 'tr' ? item?.name : item?.value}
                                    </FontText>
                                </TouchableOpacity>
                            )
                        })
                        }
                    </>
                }
            </View>
            <Button
                height={hp(8.5)}
                width={wp(90)}
                flex={null}
                type="highlight"
                borderRadius={11}
                bgColor="white"
                onPress={!hideMenu ? handleConnectClick : lockDevice}
                style={styles.button}>
                <FontText name={"inter-medium"} size={normalize(22)} color="black">
                    {!hideMenu ? t("connect") : t("lockDevice")}
                </FontText>
            </Button>
            {showAlert && <PopUp
                title={alertTitle}
                message={alertMessage}
                onConfirmPressed={() => {
                    setShowAlert(false)
                }}
            />}
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
        // backgroundColor: colors.white,
        marginBottom: hp(3),
        // width: wp(90),
        // height: hp(8.5)
    }
})