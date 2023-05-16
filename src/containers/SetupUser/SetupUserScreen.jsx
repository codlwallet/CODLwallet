import { View, StyleSheet, TouchableOpacity, Keyboard, StatusBar } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import colors from '../../assets/colors'
import { hp, normalize, wp } from '../../helper/responsiveScreen'
import Header from '../../components/common/Header'
import appConstant from '../../helper/appConstant'
import Input from '../../components/common/Input'
import SvgIcons from '../../assets/SvgIcons'
import DeviceInfo from 'react-native-device-info';
import { initial, signup } from '../../storage'
import { useDispatch } from 'react-redux'
import { setUser } from '../../redux/slices/authSlice'
import FontText from '../../components/common/FontText'
import Button from '../../components/common/Button'
import { useFocusEffect } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import PopUp from '../../components/common/AlertBox'
import { getUserData } from "../../storage";

export default function SetupUserScreen({ navigation, route }) {
    const { from } = route?.params
    const dispatch = useDispatch()
    const nameRef = useRef()
    const choosePinRef = useRef()
    const confirmPinRef = useRef()
    const enterPinRef = useRef()
    const [name, setName] = useState('')
    const [choosePin, setChoosePin] = useState('')
    const [confirmPin, setConfirmPin] = useState('')
    const [showPin, setShowPin] = useState(false)
    const [nameFocus, setNameFocus] = useState(false)
    const [choosePinFocus, setChoosePinFocus] = useState(false)
    const [confirmPinFocus, setConfirmPinFocus] = useState(false)
    const [enterPin, setEnterPin] = useState('')
    const [enterPinFocus, setEnterPinFocus] = useState(false)
    const [loginData, setLoginData] = useState()
    const [showAlert, setShowAlert] = useState(false)
    const [alertTitle, setAlertTitle] = useState('')
    const [alertMessage, setAlertMessage] = useState('')
    const [warningCount, setWarningCount] = useState(0)
    const { t } = useTranslation();

    useEffect(() => {
        getUserData().then(async res => {
            setLoginData(res.user)
        })
    }, [])

    useFocusEffect(
        React.useCallback(() => {
            setEnterPin('')
        }, []),
    );
    const onSubmitConfirmpin = () => {
        setConfirmPinFocus(false)
    }
    const onSubmitEnterPin = () => {
        setEnterPinFocus(false)
    }

    const onSubmitName = () => {
        choosePinRef.current.focus()
    }

    const onSubmitChoosepin = () => {
        confirmPinRef.current.focus()
    }


    const onFocusName = () => {
        setNameFocus(true)
        setChoosePinFocus(false)
        setConfirmPinFocus(false)
    }

    const onEnterPinName = () => {
        setNameFocus(false)
        setEnterPinFocus(true)
    }

    const onBlurName = () => {
        setNameFocus(!nameFocus)
    }

    const onFocusChoosePin = () => {
        setNameFocus(false)
        setChoosePinFocus(true)
        setConfirmPinFocus(false)
    }

    const onBlurChoosePin = () => {
        setChoosePinFocus(!choosePinFocus)
    }

    const onBlurConfirmPin = () => {
        setConfirmPinFocus(false)
    }

    const onFocusConfirmPin = () => {
        setNameFocus(false)
        setChoosePinFocus(false)
        setConfirmPinFocus(true)
    }

    const checkValidation = () => {
        let errorStatus = true;
        if (name === '' || !name.length > 1 || name.length > 15) {
            setShowAlert(true)
            setAlertTitle(t("enterName"))
            setAlertMessage(t("nameErrorMess"))
            errorStatus = false;

        } else if (choosePin === '' || choosePin.length < 4 || choosePin.length > 8) {
            setShowAlert(true)
            setAlertTitle(t("enterPIN"))
            setAlertMessage(t("pinErrorMess"))
            errorStatus = false;

        } else if (confirmPin !== choosePin) {
            setShowAlert(true)
            setAlertTitle(t("matchedPIN"))
            setAlertMessage(t("pinMatchError"))
            errorStatus = false;
        }
        return errorStatus;
    };

    const enterBtnValidation = () => {
        let errorStatus = true;
        if (enterPin === '' || enterPin.length < 4 || enterPin.length > 8) {
            setShowAlert(true)
            setAlertTitle(t("enterPIN"))
            setAlertMessage(t("pinErrorMess"))
            errorStatus = false;
        }
        else if (loginData?.pin !== enterPin) {
            setWarningCount(warningCount + 1)
            if (warningCount === 1 || warningCount === 3) {
                navigation.navigate(appConstant.wrongPin, {
                    count: warningCount
                })
            }
            else if (warningCount === 4) {
                initial().then((res) => {
                    navigation.navigate(appConstant.welcome, { from: "" })
                })
            }
            else {
                setShowAlert(true)
                setAlertTitle(t("error"))
                setAlertMessage(t("wrongPin"))
            }
            errorStatus = false;
        }
        return errorStatus;
    }

    const handleProceedBtn = async () => {
        const uniqueId = DeviceInfo.getUniqueIdSync();
        const data = {
            machineId: uniqueId,
            pin: choosePin,
            name: name,
            isCreated: false
        }

        if (from) {
            if (enterBtnValidation()) {
                navigation.navigate(from)
            }
        }
        else {
            if (checkValidation()) {
                signup(data).then(async (res) => {
                    if (res.status) {
                        dispatch(setUser(res.user))
                        navigation.navigate(appConstant.createdUser)
                    } else {
                        // navigation.navigate(appConstant.lockUser)
                    }
                }).catch((e) => {
                    // navigation.navigate(appConstant.lockUser)
                })
            }
        }
    }

    return (
        <>
            <View style={styles.container} onStartShouldSetResponder={() => Keyboard.dismiss()}>
                <StatusBar translucent hidden backgroundColor='transparent' />
                <Header title={from ? t("unlock") : t("setupUser")} showRightIcon RightIcon={'info'} statusBarHidden={true} />
                <View style={styles.subContainer}>
                    <Input
                        withRightIcon={name !== '' ? true : false}
                        ref={nameRef}
                        autoFocus={true}
                        editable={from ? false : true}
                        placeholder={t("name")}
                        value={from ? loginData?.name : name}
                        maxLength={15}
                        placeholderTextColor={nameFocus ? colors.black : colors.white}
                        onChangeText={setName}
                        keyboardType={'default'}
                        blurOnSubmit={false}
                        returnKeyType={'next'}
                        onFocus={onFocusName}
                        onBlur={onBlurName}
                        onSubmit={onSubmitConfirmpin}
                        fontName={'poppins-regular'}
                        onSubmitEditing={onSubmitName}
                        fontSize={normalize(22)}
                        inputStyle={[styles.textInput, {
                            color: nameFocus == true
                                ? colors.black
                                : colors.white
                        }]}
                        style={[styles.textInputContainer,
                        {
                            backgroundColor:
                                nameFocus == true
                                    ? colors.white
                                    : colors.gray,

                        }]}
                        rightIcon={
                            <TouchableOpacity>
                                {nameFocus ?
                                    <SvgIcons.BlackCheck height={hp(4)} width={hp(2.5)} /> :
                                    <SvgIcons.Check height={hp(4)} width={hp(2.5)} />
                                }
                            </TouchableOpacity>
                        }
                    />
                    {!from ?
                        <>
                            <Input
                                withRightIcon
                                ref={choosePinRef}
                                placeholder={t("choosePin")}
                                value={choosePin}
                                placeholderTextColor={choosePinFocus ? colors.black : colors.white}
                                onChangeText={setChoosePin}
                                keyboardType={'number-pad'}
                                returnKeyType={'next'}
                                maxLength={8}
                                secureTextEntry={!showPin ? true : false}
                                onFocus={onFocusChoosePin}
                                onBlur={onBlurChoosePin}
                                onSubmitEditing={onSubmitChoosepin}
                                onSubmit={onSubmitChoosepin}
                                inputStyle={[styles.textInput, {
                                    color: choosePinFocus == true
                                        ? colors.black
                                        : colors.white
                                }]}
                                fontName={'poppins-regular'}
                                fontSize={normalize(22)}
                                style={[styles.textInputContainer, {
                                    backgroundColor:
                                        choosePinFocus == true
                                            ? colors.white
                                            : colors.gray,
                                }]}
                                rightIcon={
                                    <TouchableOpacity onPress={() => setShowPin(!showPin)}>
                                        {showPin ?
                                            <>
                                                {!choosePinFocus ? <SvgIcons.ShowEye height={hp(3.5)} width={hp(2.5)} /> : <SvgIcons.BlackShowEye height={hp(3.5)} width={hp(2.5)} />}
                                            </>
                                            :
                                            <>
                                                {!choosePinFocus ? <SvgIcons.HideEye /> : <SvgIcons.BlackHideEye />}
                                            </>
                                        }
                                    </TouchableOpacity>
                                }
                            />
                            <Input
                                withRightIcon={confirmPin !== '' && choosePin === confirmPin ? true : false}
                                ref={confirmPinRef}
                                placeholder={t("confirmPin")}
                                value={confirmPin}
                                secureTextEntry={true}
                                maxLength={8}
                                placeholderTextColor={confirmPinFocus ? colors.black : colors.white}
                                onChangeText={setConfirmPin}
                                keyboardType={'numeric'}
                                returnKeyType={'done'}
                                blurOnSubmit
                                onFocus={onFocusConfirmPin}
                                onBlur={onBlurConfirmPin}
                                onSubmit={onSubmitConfirmpin}
                                onSubmitEditing={onSubmitConfirmpin}
                                inputStyle={[styles.textInput, {
                                    color: confirmPinFocus == true
                                        ? colors.black
                                        : colors.white
                                }]}
                                fontName={'poppins-regular'}
                                fontSize={normalize(22)}
                                style={[styles.textInputContainer, {
                                    backgroundColor:
                                        confirmPinFocus == true
                                            ? colors.white
                                            : colors.gray,
                                }]}
                                rightIcon={
                                    <TouchableOpacity>
                                        {confirmPinFocus ?
                                            <SvgIcons.BlackCheck height={hp(4)} width={hp(2.5)} /> :
                                            <SvgIcons.Check height={hp(4)} width={hp(2.5)} />
                                        }
                                    </TouchableOpacity>
                                }
                            />
                        </>
                        :
                        <Input
                            withRightIcon
                            ref={enterPinRef}
                            autoFocus={true}
                            placeholder={t("enterPin")}
                            value={enterPin}
                            placeholderTextColor={enterPinFocus ? colors.black : colors.white}
                            onChangeText={setEnterPin}
                            keyboardType={'number-pad'}
                            returnKeyType={'done'}
                            maxLength={8}
                            secureTextEntry={!showPin ? true : false}
                            onBlur={onSubmitEnterPin}
                            onFocus={onEnterPinName}
                            onSubmitEditing={onSubmitEnterPin}
                            onSubmit={onSubmitEnterPin}
                            inputStyle={[styles.textInput, {
                                color: enterPinFocus == true
                                    ? colors.black
                                    : colors.white
                            }]}
                            fontName={'poppins-regular'}
                            fontSize={normalize(22)}
                            blurOnSubmit
                            style={[styles.textInputContainer, {
                                backgroundColor:
                                    enterPinFocus == true
                                        ? colors.white
                                        : colors.gray,
                            }]}
                            rightIcon={
                                <TouchableOpacity onPress={() => setShowPin(!showPin)}>
                                    {showPin ?
                                        <>
                                            {!enterPinFocus ? <SvgIcons.ShowEye height={hp(3.5)} width={hp(2.5)} /> : <SvgIcons.BlackShowEye height={hp(3.5)} width={hp(2.5)} />}
                                        </>
                                        :
                                        <>
                                            {!enterPinFocus ? <SvgIcons.HideEye height={hp(3.5)} width={hp(2.5)} /> : <SvgIcons.BlackHideEye height={hp(3.5)} width={hp(2.5)} />}
                                        </>
                                    }
                                </TouchableOpacity>
                            }
                        />
                    }
                    <Button
                        flex={null}
                        height={hp(8.5)}
                        type="highlight"
                        borderRadius={11}
                        bgColor="white"
                        width={wp(90)}
                        onPress={handleProceedBtn}
                        style={styles.buttonView}>
                        <FontText name={"inter-medium"} size={normalize(22)} color="black">
                            {t("proceed")}
                        </FontText>
                    </Button>
                </View>
                {showAlert && <PopUp
                    title={alertTitle}
                    message={alertMessage}
                    onConfirmPressed={() => {
                        setShowAlert(false)
                    }}
                />}
            </View>
        </>

    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.black,
        flex: 1,
    },
    subContainer: {
        flex: 1,
        alignItems: 'center',
        marginTop: hp(10)
    },
    textInputContainer: {
        marginTop: hp(2),
        height: hp(8),
        width: wp(90)
    },
    textInput: {
        fontSize: normalize(22),
        padding: 0,
        paddingHorizontal: wp(4)
    },
    buttonView: {
        position: 'absolute',
        bottom: hp(3),
    },
    // button: {
    //     backgroundColor: colors.white,
    //     width: wp(90),
    // },
    // alertContainerStyle: {
    //     backgroundColor: '#3A3A3A',
    //     width: wp(85)
    // },
    // alertTextStyle: {
    //     alignSelf: 'flex-start',
    //     color: colors.white,
    //     right: 14,
    //     fontSize: 19,
    //     fontWeight: 500
    // }
})