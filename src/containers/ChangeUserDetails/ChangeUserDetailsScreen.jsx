import { Keyboard, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import Input from '../../components/common/Input'
import colors from '../../assets/colors'
import { hp, normalize, wp } from '../../helper/responsiveScreen'
import appConstant, { changePIN } from '../../helper/appConstant'
import SvgIcons from '../../assets/SvgIcons'
import Header from '../../components/common/Header'
import Button from '../../components/common/Button'
import AsyncStorage from '@react-native-async-storage/async-storage'
import FontText from '../../components/common/FontText'
import Alert from '../../components/common/Alert'

export default function ChangeUserDetailsScreen({ navigation, route }) {
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

    useEffect(() => {
        async function getLoginData() {
            const data = await AsyncStorage.getItem('LoginData');
            setLoginData(JSON.parse(data))
        }
        getLoginData()
    }, [])

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

    console.log("cfocus", currentPinFocus)


    const checkNameValidation = () => {
        let errorStatus = true;
        if (name === '' || !name.length > 1 || name.length > 15) {
            setShowAlert(true)
            setAlertTitle(appConstant.enterName)
            setAlertMessage(appConstant.nameErrorMess)
            errorStatus = false;
        }
        return errorStatus;
    };

    const handleProceedBtn = async () => {
        // if (checkNameValidation()) {
        // await AsyncStorage.setItem('LoginData', JSON.stringify(data));
        navigation.goBack()
        // }
    }

    return (
        <View style={styles.container}>
            <Header title={from === appConstant.changeName ? appConstant.changeName : changePIN} showRightIcon RightIcon={'info'} statusBarHidden={false} showBackIcon onBackPress={() => navigation.goBack()} />
            <View style={styles.subContainer}>
                {from === appConstant.changeName ?
                    <Input
                        withRightIcon={name !== '' ? true : false}
                        ref={nameRef}
                        // editable={from ? false : true}
                        placeholder={appConstant.name}
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
                            withRightIcon={currentPin !== '' ? true : false}
                            ref={currentPinRef}
                            placeholder={appConstant.currentPin}
                            value={currentPin}
                            placeholderTextColor={currentPinFocus ? colors.black : colors.white}
                            onChangeText={setCurrentPin}
                            keyboardType={'number-pad'}
                            returnKeyType={'next'}
                            maxLength={8}
                            blurOnSubmit
                            // secureTextEntry={!showPin ? true : false}
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
                            withRightIcon={newPin !== '' && newPin === confirmPin ? true : false}
                            ref={newPinRef}
                            placeholder={appConstant.newPin}
                            value={newPin}
                            secureTextEntry={true}
                            maxLength={8}
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
                                <TouchableOpacity>
                                    {newPinFocus ?
                                        <SvgIcons.BlackCheck height={hp(4)} width={hp(2.5)} /> :
                                        <SvgIcons.Check height={hp(4)} width={hp(2.5)} />
                                    }
                                </TouchableOpacity>
                            }
                        />

                        <Input
                            withRightIcon={confirmPin !== '' && newPin === confirmPin ? true : false}
                            ref={confirmPinRef}
                            placeholder={appConstant.confirmPin}
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
                    borderRadius={11}
                    bgColor="white"
                    onPress={handleProceedBtn}
                    buttonStyle={styles.button}
                    style={styles.buttonView}
                >
                    <FontText name={"inter-medium"} size={normalize(22)} color="black">
                        {appConstant.proceed}
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
        // justifyContent: 'center'
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
        bottom: hp(4),
    },
    button: {
        backgroundColor: colors.white,
        width: wp(90),
    },
    alertContainerStyle: {
        backgroundColor: '#3A3A3A',
        width: wp(85)
    },
    alertTextStyle: {
        alignSelf: 'flex-start',
        color: colors.white,
        right: 14,
        fontSize: 19,
        fontWeight: 500
    }
})