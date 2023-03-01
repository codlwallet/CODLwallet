import { View, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useRef, useState } from 'react'
import colors from '../../assets/colors'
import { hp, normalize } from '../../helper/responsiveScreen'
import Header from '../../components/common/Header'
import appConstant from '../../helper/appConstant'
import Input from '../../components/common/Input'
import SvgIcons from '../../assets/SvgIcons'

export default function SetupUserScreen() {
    const nameRef = useRef()
    const choosePinRef = useRef()
    const confirmPinRef = useRef()
    const [name, setName] = useState('')
    const [choosePin, setChoosePin] = useState('')
    const [confirmPin, setConfirmPin] = useState('')
    const [nameFocus, setNameFocus] = useState(true)
    const [choosePinFocus, setChoosePinFocus] = useState(false)
    const [confirmPinFocus, setConfirmPinFocus] = useState(false)

    return (
        <View style={styles.container}>
            <Header title={appConstant.setupUser} showRightIcon RightIcon={'info'} />
            <View style={styles.subContainer}>
                <Input
                    withRightIcon
                    ref={nameRef}
                    placeholder={appConstant.name}
                    value={name}
                    placeholderTextColor={nameFocus == true
                        ? colors.black
                        : colors.white}
                    onChangeText={setName}
                    keyboardType={'default'}
                    returnKeyType={'next'}
                    blurOnSubmit
                    inputStyle={styles.textInput}
                    fontName={'poppins-regular'}
                    fontSize={normalize(22)}
                    color={'black'}
                    style={[styles.textInputContainer,
                    {
                        backgroundColor:
                            nameFocus == true
                                ? colors.white
                                : colors.gray,
                        height: hp(6),
                    }]}
                    rightIcon={
                        <TouchableOpacity>
                            <SvgIcons.Check style={styles.icon} />
                        </TouchableOpacity>
                    }
                />
                <Input
                    withRightIcon
                    ref={choosePinRef}
                    placeholder={appConstant.choosePin}
                    value={name}
                    placeholderTextColor={choosePinFocus == true
                        ? colors.black
                        : colors.white}
                    onChangeText={setChoosePin}
                    keyboardType={'numeric'}
                    returnKeyType={'next'}
                    blurOnSubmit
                    inputStyle={styles.textInput}
                    fontName={'poppins-regular'}
                    fontSize={normalize(22)}
                    color={'black'}
                    style={[styles.textInputContainer, {
                        backgroundColor:
                            choosePinFocus == true
                                ? colors.white
                                : colors.gray,
                        height: hp(6),
                    }]}
                    rightIcon={
                        <TouchableOpacity>
                            <SvgIcons.HideEye />
                        </TouchableOpacity>
                    }
                />
                <Input
                    withRightIcon
                    ref={confirmPinRef}
                    placeholder={appConstant.confirmPin}
                    value={confirmPin}
                    placeholderTextColor={confirmPinFocus == true
                        ? colors.black
                        : colors.white}
                    onChangeText={setConfirmPin}
                    keyboardType={'numeric'}
                    returnKeyType={'done'}
                    blurOnSubmit
                    inputStyle={styles.textInput}
                    fontName={'poppins-regular'}
                    fontSize={normalize(22)}
                    color={'black'}
                    style={[styles.textInputContainer, {
                        backgroundColor:
                            confirmPinFocus == true
                                ? colors.white
                                : colors.gray,
                        height: hp(6),
                    }]}
                    rightIcon={
                        <TouchableOpacity>
                            <SvgIcons.Check />
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
        backgroundColor: colors.white,
        marginTop: hp(4),
    },
    textInput: {
        fontSize: normalize(22)
    }
})