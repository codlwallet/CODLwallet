import { BackHandler, Keyboard, StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import colors from '../../assets/colors'
import appConstant from '../../helper/appConstant'
import { hp, normalize, wp } from '../../helper/responsiveScreen'
import SvgIcons from '../../assets/SvgIcons'
import AttentionWarningView from '../../components/AttentionWarningView'
import Header from '../../components/common/Header'
import Input from '../../components/common/Input'
import Button from '../../components/common/Button'
import FontText from '../../components/common/FontText'
import Alert from '../../components/common/Alert'
import { useTranslation } from 'react-i18next'
import { getUserData, initial } from '../../storage'

export default function DeleteEverythingScreen({ navigation }) {
    const { t } = useTranslation();
    const enterPinRef = useRef()
    const [btnValue, setBtnValue] = useState(appConstant.deleteEverything)
    const [isDone, setIsDone] = useState(false)
    const [enterPin, setEnterPin] = useState('')
    const [enterPinFocus, setEnterPinFocus] = useState(false)
    const [showPin, setShowPin] = useState(false)
    const [showAlert, setShowAlert] = useState(false)
    const [alertTitle, setAlertTitle] = useState('')
    const [alertMessage, setAlertMessage] = useState('')
    const [isConfirm, setIsConfirm] = useState(false)
    const [loginData, setLoginData] = useState()

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

    useEffect(() => {
        getUserData().then(async res => {
            setLoginData(res.user)
        })
    }, [])


    const onSubmitEnterPin = () => {
        setEnterPinFocus(false)
    }

    const onFocusEnterPin = () => {
        setEnterPinFocus(true)
    }

    const onBlurEnterPin = () => {
        setEnterPinFocus(false)
    }

    const handleCheckRecoveryClick = () => {
        setBtnValue(appConstant.recoveryCheck)
        navigation.navigate(appConstant.recoveryWarning)
    }

    const handleDeleteEverythingClick = () => {
        setBtnValue(appConstant.deleteEverything)
        setIsDone(true)
    }

    const enterBtnValidation = () => {
        let errorStatus = true;
        if (enterPin === '' || enterPin.length < 4 || enterPin.length > 8) {
            setShowAlert(true)
            setAlertTitle(appConstant.enterPIN)
            setAlertMessage(appConstant.pinErrorMess)
            errorStatus = false;
        }
        else if (loginData?.pin !== enterPin) {
            setShowAlert(true)
            setAlertTitle(appConstant.error)
            setAlertMessage(appConstant.wrongPin)
            errorStatus = false;
        }
        return errorStatus;
    }

    const hndleDoneClick = () => {
        if (enterBtnValidation()) {
            setIsDone(false)
            setIsConfirm(true)
            setBtnValue(appConstant.confirmDelete)
        }
    }

    const handleConfirmDeleteClick = () => {
        initial().then(() => {
            navigation.navigate(appConstant.welcome)
        })
    }

    const handleCancelClick = () => {
        navigation.goBack()
    }

    return (
        <View style={styles.container}>
            {!isConfirm && <Header showRightIcon title={t("deleteEverything")} RightIcon={'info'} onBackPress={backAction} showBackIcon statusBarcolor={colors.red} />}
            {
                !isDone ?
                    <AttentionWarningView
                        isBgRed
                        title={isConfirm ? t("sureDeleteTitle") : t("deleteEverythingTitle")}
                        mainIcon={<SvgIcons.RedPolygon height={hp(11)} width={hp(11)} />}
                        description={t("deleteEverythingDes")}
                        showButton1
                        showButton2
                        firstBtnTitle={isConfirm ? t("confirmDelete") : t("checkRecovery")}
                        secondBtnTitle={isConfirm ? t("cancel") : t("deleteEverything")}
                        buttonValue={btnValue}
                        handleFirstBtnClick={isConfirm ? handleConfirmDeleteClick : handleCheckRecoveryClick}
                        handleSecondBtnClick={isConfirm ? handleCancelClick : handleDeleteEverythingClick}
                    />
                    :
                    <View style={styles.subContainer}>
                        <Input
                            withRightIcon
                            ref={enterPinRef}
                            // autoFocus={!from ? true : false}
                            placeholder={t("enterPin")}
                            value={enterPin}
                            placeholderTextColor={enterPinFocus ? colors.red : colors.white}
                            onChangeText={setEnterPin}
                            keyboardType={'default'}
                            returnKeyType={'done'}
                            blurOnSubmit
                            maxLength={8}
                            secureTextEntry={!showPin ? true : false}
                            onBlur={onBlurEnterPin}
                            onFocus={onFocusEnterPin}
                            onSubmitEditing={onSubmitEnterPin}
                            onSubmit={onSubmitEnterPin}
                            inputStyle={[styles.textInput, {
                                color: enterPinFocus == true
                                    ? colors.red
                                    : colors.white
                            }]}
                            fontName={'poppins-regular'}
                            fontSize={normalize(22)}
                            style={[styles.textInputContainer, {
                                backgroundColor:
                                    enterPinFocus == true
                                        ? colors.white
                                        : colors['red-open'],
                            }]}
                            rightIcon={
                                <TouchableOpacity onPress={() => setShowPin(!showPin)}>
                                    {showPin ?
                                        <>
                                            {!enterPinFocus ? <SvgIcons.ShowEye height={hp(3.2)} width={hp(2.2)} /> : <SvgIcons.RedShowEye height={hp(3)} width={hp(2.5)} />}
                                        </>
                                        :
                                        <>
                                            {!enterPinFocus ? <SvgIcons.HideEye height={hp(3.5)} width={hp(2.5)} /> : <SvgIcons.RedHideEye height={hp(3.5)} width={hp(2.5)} />}
                                        </>
                                    }
                                </TouchableOpacity>
                            }
                        />
                        <Button
                            flex={null}
                            height={hp(8.5)}
                            type="highlight"
                            borderRadius={11}
                            bgColor="white"
                            onPress={hndleDoneClick}
                            buttonStyle={styles.button}
                            style={styles.buttonView}>
                            <FontText name={"inter-medium"} size={normalize(22)} color="red">
                                {t("done")}
                            </FontText>
                        </Button>
                    </View>
            }
            <Alert
                show={showAlert}
                title={alertTitle}
                message={alertMessage}
                onConfirmPressed={() => {
                    setShowAlert(false)
                }}
            />
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.red,
    },
    subContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonView: {
        position: 'absolute',
        bottom: hp(2),
        alignSelf: 'center'
    },
    button: {
        backgroundColor: colors.white,
        width: wp(90),
    },
    textInputContainer: {
        marginTop: hp(-20),
        height: hp(8),
        width: wp(90),
    },
    textInput: {
        fontSize: normalize(22),
        padding: 0,
        paddingHorizontal: wp(4)
    },
})