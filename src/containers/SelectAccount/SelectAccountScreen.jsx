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
import { getAccountsData } from "../../storage";
import { useSelector } from 'react-redux'

export default function SelectAccountScreen({ navigation, route }) {
    const name = route?.params?.name
    const { t } = useTranslation();
    const [selectIndex, setSelectIndex] = useState()
    const [btnValue, setBtnValue] = useState(t("select"))
    const [walletId, setWalletId] = useState()
    const [accounts, setAccounts] = useState([])
    const [page, setPage] = useState(1);
    const [totalAccounts, setTotalAccounts] = useState(0)
    const dispCnt = 5;
    const { selectedNetwork } = useSelector((state) => state.auth)

    const [createdAccounts, setCreatedAccounts] = useState({})

    useEffect(() => {
        getAccountsData().then(res => {
            if (res.status) {
                setAccounts(res.data.accounts);
                setCreatedAccounts(res.data.createdAccounts);
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

    const handlePaginationClick = (_page) => {
        if (_page < 1) _page = 1;
        if (_page > Math.ceil(totalAccounts / dispCnt)) _page = Math.ceil(totalAccounts / dispCnt);
        setPage(_page);
    }

    const handleSelectClick = () => {
        navigation.navigate(appConstant.createAccount, {
            walletId: walletId,
            name: selectedNetwork,
        })
        route.params.onGoBack();
    }

    return (
        <View style={styles.container}>
            <Header title={t("selectAccount")} showRightIcon RightIcon={'info'} showBackIcon onBackPress={backAction} statusBarcolor={colors.black} style={{ alignSelf: 'center' }} />
            <View style={styles.subContainer}>
                {accounts.slice((page - 1) * dispCnt, page * dispCnt).map((item, index) => {
                    return (
                        <TouchableOpacity key={item.publicKey} style={[styles.buttonContainer, { backgroundColor: index + (page - 1) * dispCnt == selectIndex ? colors.white : colors.gray }]} onPress={() => {
                            if (createdAccounts[selectedNetwork]?.indexOf(item.publicKey) < 0) {
                                setSelectIndex(index + (page - 1) * dispCnt)
                                setWalletId(index + (page - 1) * dispCnt)
                            }
                        }}>
                            <View style={[styles.numberContainer, { backgroundColor: index + (page - 1) * dispCnt == selectIndex||createdAccounts[selectedNetwork]?.indexOf(item.publicKey)>=0 ? colors.black : colors.white }]}>
                                <FontText name={"inter-bold"} size={normalize(15)} color={index + (page - 1) * dispCnt == selectIndex||createdAccounts[selectedNetwork]?.indexOf(item.publicKey)>=0 ? 'white' : 'black'}>
                                    {index + 1 + (page - 1) * dispCnt}
                                </FontText>
                            </View>
                            <View>
                                {item.name && <FontText name={"inter-bold"} size={normalize(22)} color={index + (page - 1) * dispCnt == selectIndex ? 'black' : 'white'} pRight={index + (page - 1) * dispCnt == selectIndex ? wp(16) : wp(26)}>
                                    {item.name}
                                </FontText>}
                                <FontText name={"inter-regular"} size={normalize(item.name?15:22)} color={index + (page - 1) * dispCnt == selectIndex ? 'black' : 'white'} pRight={index + (page - 1) * dispCnt == selectIndex ? wp(16) : wp(26)}>
                                    {item?.publicKey}
                                </FontText>
                            </View>
                            {(index + (page - 1) * dispCnt == selectIndex&&createdAccounts[selectedNetwork]?.indexOf(item.publicKey)<0) && <SvgIcons.BlackCheck height={hp(4)} width={hp(2.5)} />}
                        </TouchableOpacity>
                    )
                })}
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: hp(2) }}>
                {page != 1 &&
                    <Button
                        width={page != 1 && page != Math.ceil(totalAccounts / dispCnt) ? wp(43) : wp(90)}
                        bgColor={btnValue === t("prev") ? 'white' : 'gray'}
                        type="highlight"
                        borderRadius={11}
                        onPress={() => handlePaginationClick(page - 1)}
                        buttonStyle={styles.button}>
                        <FontText name={"inter-medium"} size={normalize(22)} color={btnValue === t("next") ? "red" : 'white'}>
                            {t("prev")}
                        </FontText>
                    </Button>
                }
                {
                    (page * dispCnt) < totalAccounts && <Button
                        height={hp(8.5)}
                        bgColor={btnValue === t("next") ? 'white' : 'gray'}
                        type="highlight"
                        width={page != 1 && page != Math.ceil(totalAccounts / dispCnt) ? wp(43) : wp(90)}
                        borderRadius={11}
                        onPress={() => handlePaginationClick(page + 1)}
                        buttonStyle={styles.button}>
                        <FontText name={"inter-medium"} size={normalize(22)} color={btnValue === t("next") ? "red" : 'white'}>
                            {t("next")}
                        </FontText>
                    </Button>
                }
            </View>
            <Button
                flex={null}
                height={hp(8.5)}
                bgColor={btnValue === t("select") ? 'white' : 'gray'}
                type="highlight"
                borderRadius={11}
                width={wp(90)}
                style={{ marginBottom: hp(2) }}
                onPress={handleSelectClick}
                buttonStyle={styles.button}>
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
        justifyContent: 'flex-start',
        gap:wp(5),
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
        backgroundColor: colors.white,
        height: hp(8.5),
        alignSelf: 'center'
    },
})