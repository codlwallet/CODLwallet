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
    const { user, } = useSelector((state) => state.auth)
    const [networks, setNetworks] = useState([])
    const [accountsData, setAccountsData] = useState({})
    const [createdAccounts, setCreatedAccounts] = useState({})
    const [showAlert, setShowAlert] = useState(false)
    const [alertTitle, setAlertTitle] = useState('')
    const [alertMessage, setAlertMessage] = useState('')
    const [hidden, setIsHidden] = useState(route?.params?.hidden)
    const passphrase = route?.params?.passphrase
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
    }, [hideMenu]);

    const backAction = () => {
        if (hideMenu) {
            // navigation.navigate(appConstant.welcome, {
            //     from: appConstant.welcomePurchase
            // })
            setHideMenu(false)

        } else {
            navigation.goBack()
        }
        return true;
    };

    const onpressRightIcon = () => {
        setHideMenu(!hideMenu)
    }

    const lockDevice = () => {
        navigation.navigate(appConstant.welcome, {
            from: appConstant.welcomePurchase
        })
    }

    const handleConnectClick = () => {
        try {
            let _createdAccounts = []
            if (!hidden) {
                _createdAccounts = createdAccounts && createdAccounts.general
            } else {
                _createdAccounts = createdAccounts && createdAccounts?.hidden?.[passphrase]
            }
            if (_createdAccounts && _createdAccounts?.length > 0) {
                navigation.navigate(appConstant.connectWallet, { passphrase: hidden ? passphrase : null })
            } else {
                setAlertTitle('There is no created Account.')
                setAlertMessage('You must create one account at least to connect Metamask.')
                setShowAlert(true)
            }

        } catch (error) {
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


        if (hidden === false) {

            if (!createdAccounts || !createdAccounts?.general) {
                navigation.navigate(appConstant.createAccount, {
                    name: item?.value,
                    passphrase: passphrase,
                    hidden: false,
                })
                return;
            }

            let _accounts = createdAccounts?.general;
            if (_accounts) {
                if (_accounts.length !== 1) {
                    navigation.navigate(appConstant.accountList, {
                        name: item?.value,
                        headerName: item?.value,
                        accountList: _accounts,
                        hidden: false,
                        passphrase: "",
                        createdAccounts: createdAccounts,
                        icon: item.image
                    })
                } else {
                    dispatch(selectAccount(_accounts[0]))
                    navigation.navigate(appConstant.accountDetails, {
                        name: item?.value,
                        walletName: _accounts[0].name,
                        headerName: item?.value,
                        from: appConstant.main,
                        passphrase: passphrase,
                        hidden: false,
                        walletAddress: _accounts[0].publicKey
                    })
                }
            }
        } else {

            if (hidden === true && !createdAccounts?.hidden?.[passphrase]) {
                navigation.navigate(appConstant.createAccount, {
                    name: item?.value,
                    passphrase: passphrase,
                    hidden: true,
                })
                return;
            }

            let _accounts = createdAccounts?.hidden?.[passphrase];
            if (_accounts) {
                if (_accounts.length !== 1) {
                    navigation.navigate(appConstant.accountList, {
                        name: item?.value,
                        headerName: item?.value,
                        accountList: _accounts ? _accounts : [],
                        from: appConstant.main,
                        hidden: true,
                        passphrase: passphrase,
                        createdAccounts: createdAccounts,
                        icon: item.image
                    })
                } else {
                    dispatch(selectAccount(_accounts[0]))
                    navigation.navigate(appConstant.accountDetails, {
                        name: item?.value,
                        walletName: _accounts[0].name,
                        headerName: item?.value,
                        from: appConstant.main,
                        passphrase: passphrase,
                        hidden: true,
                        walletAddress: _accounts[0].publicKey
                    })
                }
            }
        }

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
                                            <Image source={item.image} style={styles.icons} /> :
                                            item.value === appConstant.avalanche ?
                                                <Image source={item.image} style={styles.icons} /> :
                                                item.value === appConstant.polygon ?
                                                    <Image source={item.image} style={styles.icons} /> :
                                                    item.value === appConstant.bsc ?
                                                        <Image source={item.image} style={styles.icons} /> :
                                                        item.value === appConstant.arbitrum ?
                                                            <Image source={item.image} style={styles.icons} /> :
                                                            item.value === appConstant.optimism ?
                                                                <Image source={item.image} style={styles.icons} /> :
                                                                <Image source={item.image} style={styles.icons} />
                                        }
                                    </View>
                                    <FontText size={25} color={'white'} name={'inter-regular'} pLeft={wp(5)} >
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
        // height: hp(8)
    },
    icons: {
        width: hp(4.6),
        height: hp(5.5)
    }
})