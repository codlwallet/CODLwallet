import { BackHandler, Keyboard, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import Input from '../../components/common/Input'
import colors from '../../assets/colors'
import { hp, normalize, wp } from '../../helper/responsiveScreen'
import appConstant from '../../helper/appConstant'
import SvgIcons from '../../assets/SvgIcons'
import Header from '../../components/common/Header'
import Button from '../../components/common/Button'
import AsyncStorage from '@react-native-async-storage/async-storage'
import FontText from '../../components/common/FontText'
import Alert from '../../components/common/Alert'
import { useTranslation } from 'react-i18next'

export default function ChangeUserDetailsScreen({ navigation, route }) {
    const { t } = useTranslation();
    const nameRef = useRef()
    const currentPinRef = useRef()
    const newPinRef = useRef()
    const confirmPinRef = useRef()
    const from = route?.params?.from
    const [name, setName] = useState('')
    const [currentPin, setCurrentPin] = useState('')
    const [newPin, setNewPin] = useState('')
    const [confirmPin, setConfirmPin] = useState('')
    const [nameFocus, setNameFocus] = useState(false)
    const [confirmPinFocus, setConfirmPinFocus] = useState(false)
    const [currentPinFocus, setCurrentPinFocus] = useState(false)
    const [newPinFocus, setNewPinFocus] = useState(false)
    const [showAlert, setShowAlert] = useState(false)
    const [alertTitle, setAlertTitle] = useState('')
    const [alertMessage, setAlertMessage] = useState('')
    const [loginData, setLoginData] = useState()
    const [showPin, setShowPin] = useState(false)

    useEffect(() => {
        async function getLoginData() {
            const data = await AsyncStorage.getItem('LoginData');
            setLoginData(JSON.parse(data))
        }
        getLoginData()
    }, [])

    useEffect(() => {
        setName(loginData?.name)
    }, [loginData]);

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

    const onFocusName = () => {
        setNameFocus(true)
    }

    const onBlurName = () => {
        setNameFocus(false)
    }

    const onSubmitName = () => {
        setNameFocus(false)
    }

    const onFocusCurrentPin = () => {
        setCurrentPinFocus(true)
    }

    const onBlurCurrentPin = () => {
        setCurrentPinFocus(!currentPinFocus)
    }

    const onSubmitCurrentPin = () => {
        newPinRef.current.focus()
    }

    const onFocusNewPin = () => {
        setNewPinFocus(true)
    }

    const onBlurNewPin = () => {
        setNewPinFocus(false)
    }

    const onSubmitNewPin = () => {
        confirmPinRef.current.focus()
    }

    const onBlurConfirmPin = () => {
        setConfirmPinFocus(false)
    }

    const onFocusConfirmPin = () => {
        setConfirmPinFocus(true)
    }

    const onSubmitConfirmPin = () => {
        Keyboard.dismiss()
        setConfirmPinFocus(false)
    }


    const checkNameValidation = () => {
        let errorStatus = true;
        if (name === '' || !name.length > 1 || name.length > 15) {
            setShowAlert(true)
            setAlertTitle(t("enterName"))
            setAlertMessage(t("nameErrorMess"))
            errorStatus = false;
        }
        return errorStatus;
    };


    const checkPinValidation = () => {
        let errorStatus = true;
        if (currentPin === '' || currentPin.length < 4 || currentPin.length > 8) {
            setShowAlert(true)
            setAlertTitle(t("enterPIN"))
            setAlertMessage(t("pinErrorMess"))
            errorStatus = false;
        } else if (currentPin !== loginData?.pin) {
            setShowAlert(true)
            setAlertTitle(t("matchedPIN"))
            setAlertMessage(t("currentPinMatchError"))
            errorStatus = false;
        } else if (newPin === '' || newPin.length < 4 || newPin.length > 8) {
            setShowAlert(true)
            setAlertTitle(t("enterPIN"))
            setAlertMessage(t("pinErrorMess"))
            errorStatus = false;
        } else if (newPin !== confirmPin) {
            setShowAlert(true)
            setAlertTitle(t("matchedPIN"))
            setAlertMessage(t("pinMatchError"))
            errorStatus = false;
        } else if (newPin === loginData?.pin) {
            setShowAlert(true)
            setAlertTitle(t("newPinRequired"))
            setAlertMessage(t("newPinError"))
            errorStatus = false;
        }
        return errorStatus;
    };



    const handleDoneBtn = async () => {
        data = {
            name: name,
            pin: from === appConstant?.changeName ? loginData?.pin : confirmPin
        }

        if (from === appConstant.changeName) {
            if (checkNameValidation()) {
                await AsyncStorage.setItem('LoginData', JSON.stringify(data));
                navigation.goBack()
            }
        }
        else {
            if (checkPinValidation()) {
                await AsyncStorage.setItem('LoginData', JSON.stringify(data));
                navigation.navigate(appConstant.complateSeeds, {
                    from: appConstant.changePIN
                })
            }
        }
    }

    return (
        <View style={styles.container}>
            <Header title={from === appConstant.changeName ? t("changeName") : t("changePIN")} showRightIcon RightIcon={'info'} statusBarHidden={false} showBackIcon onBackPress={backAction} />
            <View style={styles.subContainer}>
                {from === appConstant.changeName ?
                    <Input
                        withRightIcon
                        ref={nameRef}
                        // editable={from ? false : true}
                        placeholder={t("name")}
                        value={name}
                        maxLength={15}
                        placeholderTextColor={nameFocus ? colors.black : colors.white}
                        onChangeText={setName}
                        keyboardType={'default'}
                        blurOnSubmit
                        returnKeyType={'done'}
                        onFocus={onFocusName}
                        onBlur={onBlurName}
                        onSubmit={onSubmitName}
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
                    :
                    <>
                        <Input
                            withRightIcon={currentPin == loginData?.pin ? true : false}
                            ref={currentPinRef}
                            placeholder={t("currentPin")}
                            value={currentPin}
                            placeholderTextColor={currentPinFocus ? colors.black : colors.white}
                            onChangeText={setCurrentPin}
                            keyboardType={'number-pad'}
                            returnKeyType={'next'}
                            maxLength={8}
                            blurOnSubmit
                            onFocus={onFocusCurrentPin}
                            onBlur={onBlurCurrentPin}
                            onSubmitEditing={onSubmitCurrentPin}
                            onSubmit={onSubmitCurrentPin}
                            inputStyle={[styles.textInput, {
                                color: currentPinFocus == true
                                    ? colors.black
                                    : colors.white
                            }]}
                            fontName={'poppins-regular'}
                            fontSize={normalize(22)}
                            style={[styles.textInputContainer, {
                                backgroundColor:
                                    currentPinFocus == true
                                        ? colors.white
                                        : colors.gray,
                            }]}
                            rightIcon={
                                <TouchableOpacity onPress={() => setShowPin(!showPin)}>
                                    {currentPinFocus ?
                                        <SvgIcons.BlackCheck height={hp(4)} width={hp(2.5)} /> :
                                        <SvgIcons.Check height={hp(4)} width={hp(2.5)} />
                                    }
                                </TouchableOpacity>
                            }
                        />
                        <Input
                            withRightIcon
                            ref={newPinRef}
                            placeholder={t("newPin")}
                            value={newPin}
                            maxLength={8}
                            secureTextEntry={!showPin ? true : false}
                            placeholderTextColor={newPinFocus ? colors.black : colors.white}
                            onChangeText={setNewPin}
                            keyboardType={'numeric'}
                            returnKeyType={'next'}
                            blurOnSubmit
                            onFocus={onFocusNewPin}
                            onBlur={onBlurNewPin}
                            onSubmit={onSubmitNewPin}
                            onSubmitEditing={onSubmitNewPin}
                            inputStyle={[styles.textInput, {
                                color: newPinFocus == true
                                    ? colors.black
                                    : colors.white
                            }]}
                            fontName={'poppins-regular'}
                            fontSize={normalize(22)}
                            style={[styles.textInputContainer, {
                                backgroundColor:
                                    newPinFocus == true
                                        ? colors.white
                                        : colors.gray,
                            }]}
                            rightIcon={
                                <TouchableOpacity onPress={() => setShowPin(!showPin)}>
                                    {showPin ?
                                        <>
                                            {!newPinFocus ? <SvgIcons.ShowEye height={hp(3.5)} width={hp(2.5)} /> : <SvgIcons.BlackShowEye height={hp(3.5)} width={hp(2.5)} />}
                                        </>
                                        :
                                        <>
                                            {!newPinFocus ? <SvgIcons.HideEye /> : <SvgIcons.BlackHideEye />}
                                        </>
                                    }
                                </TouchableOpacity>
                            }
                        />

                        <Input
                            withRightIcon={confirmPin !== '' && newPin === confirmPin ? true : false}
                            ref={confirmPinRef}
                            placeholder={t("confirmNewPin")}
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
                            onSubmit={onSubmitConfirmPin}
                            onSubmitEditing={onSubmitConfirmPin}
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

                }
                <Button
                    flex={null}
                    height={hp(8.5)}
                    type="highlight"
                    width={wp(90)}
                    borderRadius={11}
                    bgColor="white"
                    onPress={handleDoneBtn}
                    style={styles.buttonView}
                >
                    <FontText name={"inter-medium"} size={normalize(22)} color="black">
                        {t("done")}
                    </FontText>
                </Button>
            </View>
            <Alert
                show={showAlert}
                title={alertTitle}
                message={alertMessage}
                onConfirmPressed={() => {
                    setShowAlert(false)
                }}
            />
        </View>
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
        marginTop: hp(20)
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
})