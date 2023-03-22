import { View, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import colors from '../../assets/colors'
import { hp, normalize, wp } from '../../helper/responsiveScreen'
import Header from '../../components/common/Header'
import Input from '../../components/common/Input'
import SvgIcons from '../../assets/SvgIcons'
import FontText from '../../components/common/FontText'
import Button from '../../components/common/Button'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next'

export default function ConfirmSingingScreen() {
    const nameRef = useRef()
    const enterPinRef = useRef()
    const [name, setName] = useState('')
    const [showPin, setShowPin] = useState(false)
    const [nameFocus, setNameFocus] = useState(false)
    const [enterPin, setEnterPin] = useState('')
    const [enterPinFocus, setEnterPinFocus] = useState(false)
    const [loginData, setLoginData] = useState()
    const { t } = useTranslation();


    useEffect(() => {
        async function getLoginData() {
            const data = await AsyncStorage.getItem('LoginData');
            setLoginData(JSON.parse(data))
            setName(loginData?.name)
        }
        getLoginData()
    }, [])


    const onSubmitEnterPin = () => {
        setEnterPinFocus(false)
    }

    const onSubmitName = () => {
        enterPinRef.current.focus()
    }

    const onFocusName = () => {
        setNameFocus(true)

    }

    const onFocusEnterPin = () => {
        setEnterPinFocus(true)
    }

    const onBlurName = () => {
        setNameFocus(!nameFocus)
    }


    return (
        <View style={styles.container}>
            <Header title={t("confirmSigning")} showRightIcon statusBarcolor={colors.black} style={{ alignSelf: 'center' }} RightIcon={'info'} />
            <View style={styles.subContainer}>
                <Input
                    withRightIcon={name !== '' ? true : false}
                    ref={nameRef}
                    placeholder={t("name")}
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
                    // autoFocus={!from ? true : false}
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
                // onPress={handleProceedBtn}
                buttonStyle={styles.button}
                style={styles.buttonView}
            >
                <FontText name={"inter-medium"} size={normalize(22)} color="black">
                    {t("proceed")}
                </FontText>
            </Button>
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
        bottom: hp(4),
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
    button: {
        backgroundColor: colors.white,
        width: wp(90),
    },
})