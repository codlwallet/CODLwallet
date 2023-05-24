import { BackHandler, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { hp, normalize, wp } from '../../helper/responsiveScreen'
import colors from '../../assets/colors'
import appConstant from '../../helper/appConstant'
import FontText from '../../components/common/FontText'
import Button from '../../components/common/Button'
import Header from '../../components/common/Header'
import PopUp from '../../components/common/AlertBox'
import WalletCard from '../../components/WalletCard'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { completeUserSignup, getWalletData } from '../../storage'
import { setConfirmData as setNemonicConfirmData } from "../../redux/slices/authSlice";

export default function ConfirmSeedsScreen(props) {
    const { t } = useTranslation();
    const { navigation } = props
    const [_confirm_data, _setConfirmData] = useState({})
    const { confirmData } = useSelector((state) => state.auth)
    const [showAlert, setShowAlert] = useState(false);
    const [alertTitle, setAlertTitle] = useState('')
    const [alertMessage, setAlertMessage] = useState('')
    const dispatch = useDispatch()
    const [words, setWords] = useState([])
    useEffect(() => {
        getWalletData().then(res => {
            setWords(res.words.map(v => v.name))
        })

        return () => {
        }
    }, [])

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', handleBackClick);
        return async () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackClick);
        };
    }, []);

    const setConfirmData = (index, number) => {
        _setConfirmData({ ..._confirm_data, [index]: number });
    }
    const handleConfirmClick = () => {
        let confirmed = Object.keys(_confirm_data)
        if (confirmed.length < 3) {
            setAlertTitle(t('selectConfirmWordsAll'));
            setAlertMessage(t('confirmWordsErrorMess'));
            setShowAlert(true);
        } else {
            let confirmFlag = true;
            for (const key of confirmed) {
                if (Number(key) !== _confirm_data[key]) {
                    confirmFlag = false;
                    break;
                }
            }
            if (!confirmFlag) {
                setAlertTitle(t('confirmWordsNotMatch'));
                setAlertMessage(t('confirmWordsErrorMess'));
                setShowAlert(true);
            } else {
                completeUserSignup();
                navigation.navigate(appConstant.complateSeeds)
            }
        }
    }
    const resetConfirmData = () => {
        dispatch(setNemonicConfirmData(words));
        _setConfirmData({})
        setShowAlert(false)
    }
    const handleBackClick = () => {
        // navigation.goBack()
        navigation.navigate(appConstant.createWallet, {
            numberValue: words.length,
            ButtonValue: appConstant.createWallet
        });
        return true;
    }

    return (
        <View style={styles.container}>
            <Header title={t("confirmSeeds")} showRightIcon RightIcon={'info'} showBackIcon onBackPress={handleBackClick} />
            <View style={styles.subContainer}>
                {confirmData && confirmData?.map((confirmItem) =>
                    <WalletCard key={confirmItem?.index} style={styles.walletCardContainer}
                        title={t(`${confirmItem?.index}TH SEED`)}
                        headerStyle={{ borderColor: colors.black, top: hp(-3) }}
                        titleColor={'black'}
                        children={
                            <View style={styles.walletInnerContainer}>
                                <View style={styles.numberWiew}>
                                    <FontText name={"inter-bold"} size={normalize(22)} color={'black'}>
                                        {confirmItem?.index}
                                    </FontText>
                                </View>
                                {confirmItem?.words?.map((item) => {
                                    return (
                                        <View key={item?.number} style={styles.seedsView}>
                                            <TouchableOpacity style={[styles.numberContainer, { backgroundColor: (confirmItem?.index in _confirm_data) && item.number === _confirm_data[confirmItem?.index] ? colors.white : colors.black }]}
                                                onPress={() => setConfirmData(confirmItem.index, item.number)}>
                                                <FontText name={"inter-regular"} size={normalize(16)} color={(confirmItem?.index in _confirm_data) && item.number === _confirm_data[confirmItem?.index] ? "black" : 'white'}>
                                                    {item?.name}
                                                </FontText>
                                            </TouchableOpacity>
                                        </View>
                                    )
                                })}
                            </View>
                        }
                    />
                )
                }
            </View>
            <Button
                flex={null}
                width="95%"
                type="highlight"
                borderRadius={11}
                bgColor="white"
                onPress={handleConfirmClick}
                style={styles.button}>
                <FontText name={"inter-medium"} size={normalize(22)} color="black">
                    {t("confirm")}
                </FontText>
            </Button>
            {showAlert && <PopUp
                title={alertTitle}
                message={alertMessage}
                onConfirmPressed={resetConfirmData}
            />}
        </View >
    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.black,
        flex: 1,
        alignItems: 'center',
    },
    subContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        alignSelf: 'center',
        marginVertical: hp(15),
        marginTop: hp(13)
    },
    button: {
        marginBottom: hp(3)
    },
    walletCardContainer: {
        backgroundColor: colors.gray,
        bottom: hp(1.5),
        width: wp(95),
        paddingBottom: hp(5),
        paddingTop: hp(5),
        paddingHorizontal: wp(4)
    },
    walletInnerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    numberWiew: {
        backgroundColor: colors.white,
        height: hp(6),
        width: hp(6),
        borderRadius: wp(2),
        justifyContent: 'center',
        alignItems: 'center',
    },
    numberContainer: {
        backgroundColor: colors.black,
        borderRadius: wp(2),
        height: hp(6),
        width: wp(22),
        justifyContent: 'center',
        alignItems: 'center',
    },
    seedsView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
        marginTop: hp(3),
    }
})