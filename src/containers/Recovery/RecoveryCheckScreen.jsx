import { BackHandler, FlatList, Keyboard, StyleSheet, View } from 'react-native'
import React, { useEffect, useRef, useState, useLayoutEffect } from 'react'
import colors from '../../assets/colors'
import Header from '../../components/common/Header'
import appConstant from '../../helper/appConstant'
import { importWalletData } from '../../constants/data'
import { hp, isIOS, normalize, wp } from '../../helper/responsiveScreen'
import Button from '../../components/common/Button'
import FontText from '../../components/common/FontText'
import Input from '../../components/common/Input'
import WalletCard from '../../components/WalletCard'
import { useTranslation } from 'react-i18next'
import { getWalletData } from "../../storage";
import PopUp from '../../components/common/AlertBox'

export default function RecoveryCheckScreen({ navigation }) {
    const { t } = useTranslation();
    const cardRef = useRef([])
    const [btnValue, setBtnValue] = useState(appConstant.edit)
    const [walletData, setWalletData] = useState(importWalletData)
    const [nemonic, setNemonic] = useState()
    const [isEdit, setIsEdit] = useState(false)
    const [textIndex, setTextIndex] = useState(-1)
    const [showKeyboard, setShowKeyboard] = useState(true)
    const [numberValue, setNumberValue] = useState(0)
    const walletcardData = numberValue && walletData.slice(0, numberValue)
    const reg = (/^[a-z]+$/);
    const [showAlert, setShowAlert] = useState(false)
    const [alertTitle, setAlertTitle] = useState('')
    const [alertMessage, setAlertMessage] = useState('')

    useEffect(() => {
        cardRef.current = cardRef?.current?.slice(0, walletData?.length);
    }, [walletData]);

    useLayoutEffect(() => {
        setTimeout(() => {
            cardRef.current[0].focus();
        }, 100);
    }, []);

    useEffect(() => {
        const walletdata = walletData.map(item => {
            return {
                id: item?.id,
                name: '',
                number: item?.number
            };
        });
        setWalletData(walletdata)
    }, [])

    useEffect(() => {
        getWalletData().then(res => {
            if (res.status) {
                // const _walletData = walletData.slice(0, res.words.length);
                // setWalletData(_walletData)
                setNumberValue(res.words.length)
                setNemonic(res.words)
                // cardRef.current = cardRef?.current?.slice(0, res.words.length);
            }
        })
    }, []);

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', backAction);
        return async () => {
            BackHandler.removeEventListener('hardwareBackPress', backAction);
        };
    }, []);

    const keyboardShowListener = Keyboard.addListener(
        'keyboardDidShow',
        () => {
            setIsEdit(true)
            setShowKeyboard(true)
        }
    );

    const keyboardHideListener = Keyboard.addListener(
        'keyboardDidHide',
        () => {
            if (!walletData?.slice(0, numberValue).some((item) => !item.name)) {
                setBtnValue(appConstant.confirm)
                setIsEdit(false)
            }
            else {
                setBtnValue(appConstant.edit)
                setIsEdit(true)
                setShowKeyboard(false)
                setTextIndex(-1)
            }
        }
    );

    const handleConfirmClick = async () => {
        let _flag = true;
        for (const key in nemonic) {
            if (walletData[key].name != nemonic[key].name) {
                _flag = false;
                break;
            }
        }
        if (_flag) {
            setAlertTitle(t('successRecovery'))
            setAlertMessage(t('successRecoveryMess'))
            setShowAlert(true)
            // navigation.navigate(appConstant.main)
        } else {
            setAlertTitle(t('failRecoveryCheck'))
            setAlertMessage(t('recoveryCheckError'))
            setShowAlert(true)
        }
    }

    const onConfirmAlert = () => {
        let _flag = true;
        for (const key in nemonic) {
            if (walletData[key].name != nemonic[key].name) {
                _flag = false;
                break;
            }
        }
        if (_flag) {
            setShowAlert(false)
            navigation.navigate(appConstant.main)
        } else {
            setShowAlert(false)
        }
    }



    const handleEditClick = () => {
        setIsEdit(true)
        cardRef.current[0].focus();
        setBtnValue(appConstant.edit)
    }

    const backAction = () => {
        navigation.goBack()
        return true;
    };

    const renderWalletData = (item, index) => {
        return (
            <View >
                <Input
                    autoFocus={true}
                    withLeftIcon
                    maxLength={8}
                    // editable={!isEdit ? false : true}
                    ref={el => cardRef.current[index] = el}
                    leftIcon={
                        <View style={[styles.numberContainer, { backgroundColor: item.name === '' ? colors.white : colors.red }]}>
                            <FontText name={"inter-bold"} size={normalize(12)} color={item.name === '' ? 'red' : 'white'}>
                                {item?.id}
                            </FontText>
                        </View>
                    }
                    placeholder={''}
                    value={item?.name}
                    autoCapitalize={'none'}
                    // secureTextEntry={index == textIndex ? false : true}
                    onSubmit={() => { walletData[index].name !== '' && index !== numberValue - 1 ? cardRef.current[index + 1].focus() : Keyboard.dismiss() }}
                    onFocus={() => { cardRef.current[index].focus(), setTextIndex(index) }}
                    multiline={false}
                    autoCorrect={false}
                    inputStyle={[styles.textInput, { color: item.name == '' ? colors.white : colors.red }]}
                    onChangeText={text => {
                        if (text === '' || reg.test(text)) {
                            walletData[index].name = text.toLowerCase()
                            setWalletData([...walletData]);
                        }
                    }}
                    keyboardType={'default'}
                    returnKeyType={'next'}
                    style={[styles.inputContainer, { backgroundColor: item.name == '' ? colors.red : colors.white }]}
                />
            </View>
        )
    }

    return (
        <View style={styles.container} >
            <Header title={t("recoveryCheck")} showRightIcon RightIcon={'info'} showBackIcon onBackPress={backAction} statusBarcolor={colors.red} />
            {numberValue > 0 && <View style={[styles.subContainer, { bottom: showKeyboard ? hp(4) : 0 }]}>
                <WalletCard style={styles.walletCardContainer}
                    titleColor={'red'}
                    title={t("recoverySeeds")}
                    headerStyle={{ borderColor: colors.red }}
                    children={
                        <FlatList
                            data={walletcardData}
                            numColumns={3}
                            columnWrapperStyle={{ justifyContent: 'space-between' }}
                            keyExtractor={(item) => {
                                return item.id;
                            }}
                            renderItem={({ item, index }) => renderWalletData(item, index)}
                        />
                    }
                />
            </View>}
            <>
                <Button
                    flex={null}
                    bgColor={!walletData?.slice(0, numberValue).some((item) => !item.name) && btnValue === appConstant.confirm ? 'white' : 'red-open'}
                    type="highlight"
                    borderRadius={11}
                    disabled={walletData?.slice(0, numberValue).some((item) => !item.name)}
                    style={[styles.button, { bottom: hp(14) }]}
                    onPress={handleConfirmClick}
                >
                    <FontText name={"inter-medium"} size={normalize(22)} color={!walletData?.slice(0, numberValue)?.some((item) => !item.name) && btnValue === appConstant.confirm ? "red" : 'white'}>
                        {t("done")}
                    </FontText>
                </Button>
                <Button
                    flex={null}
                    bgColor={btnValue === appConstant.edit ? 'white' : 'red-open'}
                    type="highlight"
                    borderRadius={11}
                    style={styles.button}
                    onPress={handleEditClick}
                >
                    <FontText name={"inter-medium"} size={normalize(22)} color={btnValue === appConstant.edit ? "red" : 'white'}>
                        {t("edit")}
                    </FontText>
                </Button>
            </>
            {showAlert && <PopUp
                title={alertTitle}
                message={alertMessage}
                onConfirmPressed={onConfirmAlert}
            />}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.red,
        paddingHorizontal: wp(3.5),
    },
    subContainer: {
        justifyContent: 'center',
        marginTop: hp(15)
    },
    button: {
        alignSelf: 'center',
        position: 'absolute',
        bottom: hp(3)
    },
    walletCardContainer: {
        backgroundColor: colors['red-open'],
        paddingTop: isIOS ? hp(2.5) : hp(3),
        paddingBottom: isIOS ? hp(1) : hp(1),
        paddingHorizontal: isIOS ? wp(4.5) : wp(3.5),
    },
    inputContainer: {
        backgroundColor: colors.white,
        borderRadius: wp(2),
        width: wp(26),
        height: hp(4),
        flexDirection: 'row',
        marginBottom: hp(1),
        padding: 0,
        paddingHorizontal: wp(1.5),
        marginHorizontal: wp(1),
        paddingVertical: 0,
    },
    textInput: {
        fontSize: normalize(14),
        padding: 0,
        fontFamily: 'inter-regular',
        flex: 1,
    },
    numberContainer: {
        backgroundColor: colors.white,
        borderRadius: wp(1),
        height: hp(2.5),
        width: hp(2.5),
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: wp(1)
    },
})