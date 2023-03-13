import { View, StyleSheet, TouchableOpacity, Keyboard, Alert } from 'react-native'
import React, { useRef, useState } from 'react'
import colors from '../../assets/colors'
import { hp, normalize, wp } from '../../helper/responsiveScreen'
import Header from '../../components/common/Header'
import appConstant from '../../helper/appConstant'
import Input from '../../components/common/Input'
import SvgIcons from '../../assets/SvgIcons'
import FontText from '../../components/common/FontText'
import Button from '../../components/common/Button'

export default function SetupUserScreen(props) {
    const { navigation } = props
    const nameRef = useRef()
    const choosePinRef = useRef()
    const confirmPinRef = useRef()
    const [name, setName] = useState('')
    const [choosePin, setChoosePin] = useState('')
    const [confirmPin, setConfirmPin] = useState('')
    const [showPin, setShowPin] = useState(false)
    const [nameFocus, setNameFocus] = useState(true)
    const [choosePinFocus, setChoosePinFocus] = useState(false)
    const [confirmPinFocus, setConfirmPinFocus] = useState(false)
    const [nameError, setnameError] = useState(false)
    const [choosePassError, setChoosePassError] = useState(false)
    const [confirmPassError, setConfirmPassError] = useState(false)
    const [matchPinError, setMatchPinError] = useState(false)

    const onSubmitConfirmPin = () => {
        if (confirmPin === '') {
            setConfirmPassError(true)
            setMatchPinError(false)
        }
        else if (confirmPin !== choosePin) {
            setMatchPinError(true)
        }
        else {
            navigation.navigate(appConstant.createdUser)
        }
    }

    const onSubmitName = () => {
        if (name === '' || !name.length > 1 || name.length > 15) {
            setnameError(true)
            Alert.alert(
                (appConstant.enterName),
                'Name must be greater than 1 and less than 15 characters.',
                [
                    {
                        text: 'OK',
                        style: 'ok',
                    },
                ],
            );
        }
        else {
            choosePinRef.current.focus()
        }
    }

    const onSubmitChoosepin = () => {
        if (choosePin === '' || choosePin.length < 4 || choosePin.length > 8) {
            setChoosePassError(true)
            Alert.alert(
                (appConstant.enterPIN),
                'PIN must be greater than 4 and less than 8 characters.',
                [
                    {
                        text: 'OK',
                        style: 'ok',
                    },
                ],
            );
        }
        else {
            confirmPinRef.current.focus()
        }
    }

    const onFocusName = () => {
        setNameFocus(true)
        setChoosePinFocus(false)
        setConfirmPinFocus(false)
        setChoosePassError(false)
    }

    const onBlurName = () => {
        if (name === '' || !name.length > 1 || name.length > 15) {
            setnameError(true)
            Alert.alert(
                (appConstant.enterName),
                'Name must be greater than 1 and less than 15 characters.',
                [
                    {
                        text: 'OK',
                        style: 'ok',
                    },
                ],
            );
        }
        else {
            setNameFocus(!nameFocus)
        }
    }

    const onFocusChoosePin = () => {
        setNameFocus(false)
        setChoosePinFocus(true)
        setConfirmPinFocus(false)
    }

    const onBlurChoosePin = () => {
        if (choosePin === '' || choosePin.length < 4 || choosePin.length > 8) {
            setChoosePassError(true)
            Alert.alert(
                (appConstant.enterPIN),
                'PIN must be greater than 4 and less than 8 characters.',
                [
                    {
                        text: 'OK',
                        style: 'ok',
                    },
                ],
            );
        }
        else {
            setChoosePinFocus(!choosePinFocus)
        }
    }

    const onBlurConfirmPin = () => {
        if (confirmPin !== choosePin) {
            setConfirmPassError(true)
            Alert.alert(
                (appConstant.matchedPIN),
                'Confirm pin is not correct.',
                [
                    {
                        text: 'OK',
                        style: 'ok',
                    },
                ],
            );
        }
        else {
            setConfirmPinFocus(!confirmPinFocus)
        }
    }

    const onFocusConfirmPin = () => {
        setNameFocus(false)
        setChoosePinFocus(false)
        setConfirmPinFocus(true)
    }

    const checkValidation = () => {
        let errorStatus = true;
        if (name === '' || !name.length > 1 || name.length > 15) {
            setnameError(true);
            Alert.alert(
                (appConstant.enterName),
                'Name must be greater than 1 and less than 15 characters.',
                [
                    {
                        text: 'OK',
                        style: 'ok',
                    },
                ],
            );
            errorStatus = false;
        } else if (choosePin === '' || choosePin.length < 4 || choosePin.length > 8) {
            setChoosePassError(true);
            Alert.alert(
                (appConstant.enterPIN),
                'PIN must be greater than 4 and less than 8 characters.',
                [
                    {
                        text: 'OK',
                        style: 'ok',
                    },
                ],
            );
            errorStatus = false;
        } else if (confirmPin !== choosePin) {
            setConfirmPassError(true);
            Alert.alert(
                (appConstant.matchedPIN),
                'Confirm pin is not correct.',
                [
                    {
                        text: 'OK',
                        style: 'ok',
                    },
                ],
            );
            errorStatus = false;
        }
        return errorStatus;
    };

    const handleProceedBtn = () => {
        if (checkValidation()) {
            navigation.navigate(appConstant.createdUser)
        }
    }

    return (
        <View style={styles.container} onStartShouldSetResponder={() => Keyboard.dismiss()}>
            <Header title={appConstant.setupUser} showRightIcon RightIcon={'info'} />
            <View style={styles.subContainer}>
                <Input
                    withRightIcon={name !== '' && !nameFocus ? true : false}
                    ref={nameRef}
                    autoFocus={nameFocus ? true : false}
                    placeholder={appConstant.name}
                    value={name}
                    maxLength={15}
                    placeholderTextColor={nameFocus ? colors.black : colors.white}
                    onChangeText={setName}
                    keyboardType={'default'}
                    blurOnSubmit={false}
                    returnKeyType={'next'}
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
                            <SvgIcons.Check height={hp(4)} width={hp(2.5)} />
                        </TouchableOpacity>
                    }
                />
                {/* {nameError && name === '' &&
                    <FontText
                        color={"white"}
                        pTop={hp(1)}
                        textAlign={'center'}
                        name={'inter-regular'}
                        size={normalize(14)}>
                        {appConstant.enterName}
                    </FontText>
                } */}
                <Input
                    editable={name !== '' ? true : false}
                    withRightIcon
                    ref={choosePinRef}
                    placeholder={appConstant.choosePin}
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
                {/* {choosePassError && choosePin === '' &&
                    <FontText
                        color={"white"}
                        pTop={hp(1)}
                        name={'inter-regular'}
                        textAlign={'center'}
                        size={normalize(14)}>
                        {appConstant.enterPIN}
                    </FontText>
                } */}
                <Input
                    editable={choosePin !== '' ? true : false}
                    withRightIcon={confirmPin !== '' && choosePin === confirmPin ? true : false}
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
                {/* {confirmPassError && confirmPin === '' && !matchPinError &&
                    <FontText
                        color={"white"}
                        pTop={hp(1)}
                        textAlign={'center'}
                        name={'inter-regular'}
                        size={normalize(14)}>
                        {appConstant.enterPIN}
                    </FontText>
                }
                {matchPinError && confirmPin !== choosePin &&
                    <FontText
                        color={"white"}
                        pTop={hp(1)}
                        textAlign={'center'}
                        name={'inter-regular'}
                        size={normalize(14)}>
                        {appConstant.matchedPIN}
                    </FontText>
                } */}
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
            {/* <View style={styles.button}> */}

            {/* </View> */}

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
        bottom: hp(4),
    },
    button: {
        backgroundColor: colors.white,
        width: wp(90),
    }
})