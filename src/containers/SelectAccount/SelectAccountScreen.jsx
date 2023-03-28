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

export default function SelectAccountScreen({ navigation, route }) {
    const name = route?.params?.name
    const WalletId = route?.params?.walletId
    const { t } = useTranslation();
    const [selectIndex, setSelectIndex] = useState(WalletId ? WalletId : 0)
    const [btnValue, setBtnValue] = useState(t("select"))
    const [walletId, setWalletId] = useState(WalletId ? WalletId : 0)
    const [isNext, setIsNext] = useState(false)
    const data = !isNext ? accountData.slice(0, 5) : accountData.slice(5, 10)

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
        navigation.navigate(appConstant.createAccount, {
            walletId: walletId,
            name: name,
        })
    }

    return (
        <View style={styles.container}>
            <Header title={t("selectAccount")} showRightIcon RightIcon={'info'} showBackIcon onBackPress={backAction} statusBarcolor={colors.black} style={{ alignSelf: 'center' }} />
            <View style={styles.subContainer}>
                {data?.map((item, index) => {
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
                })}
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: hp(2) }}>
                {isNext ?
                    <Button
                        width={wp(90)}
                        bgColor={btnValue === t("prev") ? 'white' : 'gray'}
                        type="highlight"
                        borderRadius={11}
                        onPress={handlePrevClick}
                        buttonStyle={styles.button}>
                        <FontText name={"inter-medium"} size={normalize(22)} color={btnValue === t("next") ? "red" : 'white'}>
                            {t("prev")}
                        </FontText>
                    </Button>
                    :
                    <Button
                        height={hp(8.5)}
                        bgColor={btnValue === t("next") ? 'white' : 'gray'}
                        type="highlight"
                        width={isNext ? wp(43) : wp(95)}
                        borderRadius={11}
                        onPress={handleNextClick}
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
                style={{ marginBottom: hp(3) }}
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
        justifyContent: 'space-between',
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