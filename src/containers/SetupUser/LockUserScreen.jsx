import { View, StyleSheet, TouchableOpacity, Keyboard, Alert } from 'react-native'
import React, { useRef, useState, useEffect } from 'react'
import colors from '../../assets/colors'
import { hp, normalize } from '../../helper/responsiveScreen'
import Header from '../../components/common/Header'
import appConstant from '../../helper/appConstant'
import Input from '../../components/common/Input'
import SvgIcons from '../../assets/SvgIcons'
import DeviceInfo from 'react-native-device-info';
import { sign } from '../../storage'
import { useDispatch } from 'react-redux'
import { setUser } from '../../redux/slices/authSlice'

export default function LockUserScreen(props) {
    const dispatch = useDispatch()
    const { navigation } = props
    const choosePinRef = useRef()
    const [choosePin, setChoosePin] = useState('')
    const [showPin, setShowPin] = useState(false)
    const [choosePinFocus, setChoosePinFocus] = useState(false)

    const onSubmitConfirmPin = () => {

        if (6 > choosePin.length || choosePin.length > 10) {
            Alert.alert('Pin Required', 'Pin must be greater than 6 and less than 10 characters. ');
            return;
        }
        const uniqueId = DeviceInfo.getUniqueIdSync();

        const data = {
            machineId: uniqueId,
            password: choosePin,
        }

        sign(data).then((res) => {

            console.log(res, "=====")
            if (res.status == true) {
                if (res.isCreated == true) {
                    dispatch(setUser(res.user))
                    navigation.navigate(appConstant.welcomePurchase)
                } else {
                    navigation.navigate(appConstant.setupWallet)
                }
            } else {
                Alert.alert('Error!', 'You have got an error.');
            }

        }).catch((e) => {
            console.log(e);
            Alert.alert('Error!', 'You have got an error.');
        })
    }

    return (
        <View style={styles.container} onStartShouldSetResponder={() => Keyboard.dismiss()}>
            <Header title={appConstant.lockUser} showRightIcon RightIcon={'info'} />
            <View style={styles.subContainer}>

                <Input
                    withRightIcon
                    ref={choosePinRef}
                    placeholder={appConstant.choosePin}
                    value={choosePin}
                    placeholderTextColor={choosePinFocus ? colors.black : colors.white}
                    onChangeText={setChoosePin}
                    keyboardType={'number-pad'}
                    returnKeyType={'next'}
                    secureTextEntry={true}
                    onFocus={() => setChoosePinFocus(true)}
                    onBlur={() => setChoosePinFocus(!choosePinFocus)}
                    // onSubmit={() => confirmPinRef?.current.focus()}
                    onSubmit={onSubmitConfirmPin}
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
        // alignItems: "center",
        justifyContent: "center",
        height: "100%",
        marginTop: hp(-10)
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
        height: 70,
    }
})