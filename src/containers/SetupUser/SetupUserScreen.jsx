import { View, StyleSheet, TouchableOpacity, Keyboard } from 'react-native'
import React, { useRef, useState } from 'react'
import colors from '../../assets/colors'
import { hp, normalize } from '../../helper/responsiveScreen'
import Header from '../../components/common/Header'
import appConstant from '../../helper/appConstant'
import Input from '../../components/common/Input'
import SvgIcons from '../../assets/SvgIcons'

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

    const onSubmitConfirmPin = () => {
        navigation.navigate(appConstant.createdUser)
    }

    return (
        <View style={styles.container} onStartShouldSetResponder={() => Keyboard.dismiss()}>
            <Header title={appConstant.setupUser} showRightIcon RightIcon={'info'} />
            <View style={styles.subContainer}>
                <Input
                    withRightIcon
                    ref={nameRef}
                    autoFocus={nameFocus ? true : false}
                    placeholder={appConstant.name}
                    value={name}
                    placeholderTextColor={nameFocus ? colors.black : colors.white}
                    onChangeText={setName}
                    keyboardType={'default'}
                    returnKeyType={'next'}
                    onFocus={() => setNameFocus(true)}
                    onBlur={() => setNameFocus(false)}
                    onSubmit={() => choosePinRef?.current.focus()}
                    fontName={'poppins-regular'}
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
                            <SvgIcons.Check />
                        </TouchableOpacity>
                    }
                />
                <Input
                    withRightIcon
                    ref={choosePinRef}
                    placeholder={appConstant.choosePin}
                    value={choosePin}
                    placeholderTextColor={choosePinFocus ? colors.black : colors.white}
                    onChangeText={setChoosePin}
                    keyboardType={'number-pad'}
                    returnKeyType={'next'}
                    secureTextEntry={!showPin ? true : false}
                    onFocus={() => setChoosePinFocus(true)}
                    onBlur={() => setChoosePinFocus(!choosePinFocus)}
                    onSubmit={() => confirmPinRef?.current.focus()}
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
                                    {!choosePinFocus ? <SvgIcons.HideEye /> : <SvgIcons.BlackHideEye />}
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
                    withRightIcon={confirmPinFocus ? true : false}
                    ref={confirmPinRef}
                    placeholder={appConstant.confirmPin}
                    value={confirmPin}
                    secureTextEntry={true}
                    placeholderTextColor={confirmPinFocus ? colors.black : colors.white}
                    onChangeText={setConfirmPin}
                    keyboardType={'number-pad'}
                    returnKeyType={'done'}
                    blurOnSubmit
                    onFocus={() => setConfirmPinFocus(true)}
                    onBlur={() => setConfirmPinFocus(!confirmPinFocus)}
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
                            <SvgIcons.BlackCheck height={hp(4)} width={hp(2.5)} />
                        </TouchableOpacity>
                    }
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.black,
        flex: 1
    },
    subContainer: {
        marginTop: hp(10)
    },
    image: {
        marginTop: hp(4)
    },
    button: {
        backgroundColor: colors.white,
        position: 'absolute',
        bottom: hp(4),
        alignItems: 'center'
    },
    icon: {
        height: hp(10),
        width: hp(10)
    },
    textInputContainer: {
        marginTop: hp(2),
    },
    textInput: {
        fontSize: normalize(22),
        padding: 0,
    }
})