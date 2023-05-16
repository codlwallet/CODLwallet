import { BackHandler, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../../components/common/Header'
import colors from '../../assets/colors'
import FontText from '../../components/common/FontText'
import SvgIcons from '../../assets/SvgIcons'
import { hp, normalize, wp } from '../../helper/responsiveScreen'
import { useTranslation } from 'react-i18next'
import { accountData } from '../../constants/data'
import Button from '../../components/common/Button'
import appConstant from '../../helper/appConstant'
import { extendAccounts, getAccountsData } from "../../storage";
import { useSelector } from 'react-redux'

export default function SelectAccountScreen({ navigation, route }) {
    const name = route?.params?.name
    const WalletId = route?.params?.walletId
    const { t } = useTranslation();
    const wallet_name = route?.params?.walletName
    const [selectIndex, setSelectIndex] = useState()
    const [btnValue, setBtnValue] = useState(t("select"))
    const [isNext, setIsNext] = useState(false)
    const data = !isNext ? accountData.slice(0, 5) : accountData.slice(5, 10)
    const [walletId, setWalletId] = useState()
    const [accounts, setAccounts] = useState([])
    const [page, setPage] = useState(1);
    const [totalAccounts, setTotalAccounts] = useState(0)
    const dispCnt = 5;
    const { selectedNetwork } = useSelector((state) => state.auth)
    const [wallet, setWallet] = useState(null)
    const [createdAccounts, setCreatedAccounts] = useState({})
    const [isHidden, setIsHidden] = useState(false)
    const { passphrase } = useSelector((state) => state.auth)

    useEffect(() => {
        getAccountsData().then(res => {
            if (res.status) {
                setCreatedAccounts(res.created)
                setAccounts(res.data.accounts);
                setIsHidden(res.data.isHidden)
                setTotalAccounts(res.data.accounts.length);
            }
        });
        return () => {
        };
    }, [])

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', backAction);
        return async () => {
            BackHandler.removeEventListener('hardwareBackPress', backAction);
        };
    }, []);

    const backAction = () => {
        navigation.goBack()
        route.params.onGoBack();
        return true;
    };

    const handlePaginationClick = (_page, _isNext = false) => {
        if (_isNext && _page > Math.ceil(totalAccounts / dispCnt)) {
            extendAccounts(isHidden?passphrase:null, _page).then((res) => {
                setAccounts([...accounts, ...res])
                setTotalAccounts(totalAccounts + res.length)
                setPage(_page);
            })
        } else if (_page < 1) {
            _page = 1;
            setPage(_page);
        } else {
            setPage(_page);
        }
        // if (_page > Math.ceil(totalAccounts / dispCnt)) _page = Math.ceil(totalAccounts / dispCnt);
    }
    const handleNextClick = () => {
        setSelectIndex(walletId)
        setWalletId(walletId)
        setIsNext(true)
    }

    const handlePrevClick = () => {
        setIsNext(!isNext)
        setSelectIndex(walletId)
    }

    const handleSelectClick = () => {
        if (wallet) {
            if (wallet_name) wallet.name = wallet_name;
            navigation.navigate(appConstant.createAccount, {
                walletId: walletId,
                wallet: wallet,
                walletName: wallet.name,
                name: name,
                from: appConstant.selectAccount
            })
            route.params.onGoBack();
        }
    }

    return (
        <View style={styles.container}>
            <Header title={t("selectAccount")} showRightIcon RightIcon={'info'} showBackIcon onBackPress={backAction} statusBarcolor={colors.black} />
            <View style={styles.subContainer}>   
            {
                    accounts && accounts?.length > 0 && (
                        accounts?.slice((page - 1) * dispCnt, page * dispCnt).map((item, index) => {
                            let selected = false;
                            let _name = '';
                            let accounts = []
                            if (createdAccounts) {
                                if (!isHidden) {
                                    accounts = createdAccounts.general.filter(account => account.publicKey == item.publicKey)
                                } else {
                                    accounts = createdAccounts.hidden[passphrase] && createdAccounts.hidden[passphrase].filter(account => account.publicKey == item.publicKey)
                                }
                            }

                            if (accounts && accounts.length > 0) {
                                selected = true;
                                _name = accounts[0].name;
                            }

                            return (
                                <TouchableOpacity key={item.publicKey} style={[styles.buttonContainer, { backgroundColor: index + (page - 1) * dispCnt+1 == selectIndex ? colors.white : colors.gray }]} onPress={() => {
                                    if (!selected) {
                                        setSelectIndex(index + (page - 1) * dispCnt+1)
                                        setWallet(item)
                                        setWalletId(index + (page - 1) * dispCnt+1)
                                    }
                                }}>
                                    <View style={[styles.numberContainer, { backgroundColor: index + (page - 1) * dispCnt+1 == selectIndex || selected ? colors.black : colors.white }]}>
                                        <FontText name={"inter-bold"} size={normalize(15)} color={index + (page - 1) * dispCnt+1 == selectIndex || selected ? 'white' : 'black'}>
                                            {index + (page - 1) * dispCnt+1}
                                        </FontText>
                                    </View>
                                    <View>
                                        {_name && <FontText pRight={index + (page - 1) * dispCnt+1 == selectIndex ? wp(16) : wp(26)} name={"inter-bold"} size={normalize(22)} color={index + (page - 1) * dispCnt+1 == selectIndex ? 'black' : 'white'}>
                                            {_name}
                                        </FontText>}
                                        <FontText style={{width:wp(60)}} name={"inter-regular"} size={normalize(selected ? 12 : 15)} color={index + (page - 1) * dispCnt+1 == selectIndex ? 'black' : 'white'}>

                                            {
                                                selected ?
                                                    `${item?.publicKey.replace(item?.publicKey.substring(7, 38), `...`)}`
                                                    :
                                                    item?.publicKey
                                            }

                                        </FontText>
                                    </View>
                                    
                                    {(index + (page - 1) * dispCnt+1 == selectIndex && !selected) && 
                                    <View>
                                        <SvgIcons.BlackCheck height={hp(4)} width={hp(2.5)} />
                                    </View>}
                                </TouchableOpacity>
                            )
                        })
                    )
                }
                {/* {data?.map((item, index) => {
                    return (
                        <TouchableOpacity key={index} style={[styles.buttonContainer, { backgroundColor: item?.id == selectIndex ? colors.white : colors.gray }]} onPress={() => {
                            setSelectIndex(item?.id)
                            setWalletId(item?.id)
                        }}>
                            <View style={[styles.numberContainer, { backgroundColor: item?.id == selectIndex ? colors.black : colors.white }]}>
                                <FontText name={"inter-bold"} size={normalize(15)} color={item?.id == selectIndex ? 'white' : 'black'}>
                                    {item?.id}
                                </FontText>
                            </View>
                            <FontText name={"inter-regular"} size={normalize(22)} color={item?.id == selectIndex ? 'black' : 'white'} pRight={item?.id == selectIndex ? wp(16) : wp(26)} >
                                {item?.name}
                            </FontText>
                            {item?.id == selectIndex && <SvgIcons.BlackCheck height={hp(4)} width={hp(2.5)} />}
                        </TouchableOpacity>
                    )
                })} */}
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: hp(2) }}>
                {page != 1 &&
                    <Button
                        width={page != 1 && page != Math.ceil(totalAccounts / dispCnt) ? wp(43) : wp(90)}
                        bgColor={btnValue === t("prev") ? 'white' : 'gray'}
                        type="highlight"
                        borderRadius={11}
                        height={hp(8.5)}
                        onPress={() => handlePaginationClick(page - 1, false)}
                        style={styles.button}>
                        <FontText name={"inter-medium"} size={normalize(22)} color={btnValue === t("next") ? "red" : 'white'}>
                            {t("prev")}
                        </FontText>
                    </Button>
                }
                {
                    <Button
                        height={hp(8.5)}
                        bgColor={btnValue === t("next") ? 'white' : 'gray'}
                        type="highlight"
                        width={page != 1 && page != Math.ceil(totalAccounts / dispCnt) ? wp(43) : wp(90)}
                        borderRadius={11}
                        onPress={() => handlePaginationClick(page + 1, true)}
                        style={styles.button}>
                        <FontText name={"inter-medium"} size={normalize(22)} color={btnValue === t("next") ? "red" : 'white'}>
                            {t("next")}
                        </FontText>
                    </Button>
                }
                {/* {isNext ?
                    <Button
                        width={wp(90)}
                        bgColor={btnValue === t("prev") ? 'white' : 'gray'}
                        type="highlight"
                        height={hp(8.5)}
                        borderRadius={11}
                        onPress={handlePrevClick}
                    >
                        <FontText name={"inter-medium"} size={normalize(22)} color={btnValue === t("next") ? "red" : 'white'}>
                            {t("prev")}
                        </FontText>
                    </Button>
                    :
                    <Button
                        height={hp(8.5)}
                        bgColor={btnValue === t("next") ? 'white' : 'gray'}
                        type="highlight"
                        width={isNext ? wp(43) : wp(90)}
                        borderRadius={11}
                        onPress={handleNextClick}
                    >
                        <FontText name={"inter-medium"} size={normalize(22)} color={btnValue === t("next") ? "red" : 'white'}>
                            {t("next")}
                        </FontText>
                    </Button>
                } */}
            </View>
            <Button
                flex={null}
                height={hp(8.5)}
                bgColor={btnValue === t("select") ? 'white' : 'gray'}
                type="highlight"
                borderRadius={11}
                width={wp(90)}
                // style={{ marginBottom: hp(2) }}
                onPress={handleSelectClick}
                style={styles.button}>
                <FontText name={"inter-medium"} size={normalize(22)} color={btnValue === t("select") ? "black" : 'white'}>
                    {t("select")}
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
        marginTop: hp(4),
        alignItems: 'center'
    },
    buttonContainer: {
        height: hp(9),
        width: wp(90),
        borderRadius: wp(2),
        alignItems: 'center',
        // justifyContent: 'space-between',
        justifyContent: 'flex-start',
        gap: wp(5),
        flexDirection: 'row',
        paddingHorizontal: wp(5),
        marginTop: hp(2),
    },
    numberContainer: {
        height: hp(3.5),
        width: wp(6.3),
        borderRadius: wp(1),
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        marginBottom: hp(3),
        // backgroundColor: colors.white,
        // height: hp(8.5),
        // alignSelf: 'center'
    },
})