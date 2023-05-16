import { View, StyleSheet, TouchableOpacity, Keyboard, BackHandler } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import colors from '../../assets/colors'
import { hp, normalize, wp } from '../../helper/responsiveScreen'
import Header from '../../components/common/Header'
import Input from '../../components/common/Input'
import SvgIcons from '../../assets/SvgIcons'
import FontText from '../../components/common/FontText'
import Button from '../../components/common/Button'
import { useTranslation } from 'react-i18next'
import appConstant from '../../helper/appConstant'
import PopUp from '../../components/common/AlertBox'
import { getUserData } from '../../storage'

export default function ConfirmSingingScreen({ navigation, route }) {
    const walletName = route?.params?.walletName
    const walletAddress = route?.params?.walletAddress
    const showIcon = route?.params?.name
    const nameRef = useRef()
    const enterPinRef = useRef()
    const [name, setName] = useState('')
    const [showPin, setShowPin] = useState(false)
    const [nameFocus, setNameFocus] = useState(false)
    const [enterPin, setEnterPin] = useState('')
    const [enterPinFocus, setEnterPinFocus] = useState(false)
    const [loginData, setLoginData] = useState()
    const [showAlert, setShowAlert] = useState(false)
    const [alertTitle, setAlertTitle] = useState('')
    const [alertMessage, setAlertMessage] = useState('')
    const { t } = useTranslation();

    useEffect(() => {
        getUserData().then(async res => {
            setLoginData(res.user)
        })
    }, [])

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', backAction);
        return async () => {
            BackHandler.removeEventListener('hardwareBackPress', backAction);
        };
    }, []);

    const backAction = () => {
        navigation.navigate(appConstant.accountDetails, {
            walletName: walletName,
            showIcon: showIcon
        })
        return true;
    };

    const onSubmitEnterPin = () => {
        setEnterPinFocus(false)
    }

    const onFocusEnterPin = () => {
        setEnterPinFocus(true)
    }

    const enterBtnValidation = () => {
        let errorStatus = true;
        if (enterPin === '' || enterPin.length < 4 || enterPin.length > 8) {
            setShowAlert(true)
            setAlertTitle(t("enterPIN"))
            setAlertMessage(t("pinErrorMess"))
            errorStatus = false;
        }
        else if (loginData?.pin !== enterPin) {
            setShowAlert(true)
            setAlertTitle(t("error"))
            setAlertMessage(t("wrongPin"))
            errorStatus = false;
        }
        return errorStatus;
    }

    const handleProceedBtn = () => {
        if (enterBtnValidation()) {
            navigation.navigate(appConstant.complateSinging, {
                walletName: walletName,
                walletAddress
            })
        }
    }

    return (
        <View style={styles.container} onStartShouldSetResponder={() => Keyboard.dismiss()}>
            <Header title={t("confirmSigning")} showRightIcon statusBarcolor={colors.black} RightIcon={'info'} />
            <View style={styles.subContainer}>
                <Input
                    ref={nameRef}
                    placeholder={t("name")}
                    editable={false}
                    value={loginData?.name ? loginData?.name : name}
                    maxLength={15}
                    placeholderTextColor={nameFocus ? colors.black : colors.white}
                    onChangeText={setName}
                    keyboardType={'default'}
                    blurOnSubmit={false}
                    returnKeyType={'next'}
                    fontName={'poppins-regular'}
                    fontSize={normalize(22)}
                    inputStyle={styles.textInput}
                    style={styles.textInputContainer}
                    rightIcon={
                        <TouchableOpacity>
                            {nameFocus ?
                                <SvgIcons.BlackCheck height={hp(4)} width={hp(2.5)} /> :
                                <SvgIcons.Check height={hp(4)} width={hp(2.5)} />
                            }
                        </TouchableOpacity>
                    }
                />
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
                    onFocus={onFocusEnterPin}
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
            </View>
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
        paddingHorizontal: wp(3.5),
        alignItems: 'center'
    },
    subContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: hp(20)
    },
    buttonView: {
        position: 'absolute',
        bottom: hp(3),
    },
    textInputContainer: {
        marginTop: hp(2),
        height: hp(8),
        width: wp(90),
        backgroundColor: colors.gray,
    },
    textInput: {
        fontSize: normalize(22),
        padding: 0,
        paddingHorizontal: wp(4),
        color: colors.white
    },
})