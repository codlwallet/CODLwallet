import { Keyboard, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Header from '../../components/common/Header'
import colors from '../../assets/colors'
import appConstant from '../../helper/appConstant'
import { hp, normalize, wp } from '../../helper/responsiveScreen'
import FontText from '../../components/common/FontText'
import SvgIcons from '../../assets/SvgIcons'
import Input from '../../components/common/Input'
import WalletCard from '../../components/common/WalletCard'
import ToggleSwitch from 'toggle-switch-react-native'
import Button from '../../components/common/Button'

export default function WelcomePurchaseScreen() {
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false)
    const [passwordFocus, setPasswordFocus] = useState(false)
    const [isEnabled, setIsEnabled] = useState(false);

    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const keyboardShowListener = Keyboard.addListener(
        'keyboardDidShow',
        () => {
            // alert('Keyboard is open')
        }
    );
    const keyboardHideListener = Keyboard.addListener(
        'keyboardDidHide',
        () => {
            setIsEnabled(false)

        }
    );

    return (
        <View style={styles.container} onStartShouldSetResponder={() => Keyboard.dismiss()}>
            <Header showRightIcon RightIcon={'info'} title={appConstant.welcome} />
            <View style={styles.subContainer}>
                <TouchableOpacity style={styles.buttonConatiner}>
                    <FontText size={normalize(22)} color={'white'} name={'inter-regular'}>
                        {'Alice’s Crypto'}
                    </FontText>
                    <SvgIcons.RightBackArrow height={hp(3)} width={hp(2)} />
                </TouchableOpacity>
                {isEnabled && <Input
                    withRightIcon
                    autoFocus={true}
                    placeholder={appConstant.enterPassword}
                    value={password}
                    placeholderTextColor={passwordFocus ? colors.black : colors.white}
                    onChangeText={setPassword}
                    keyboardType={'number-pad'}
                    returnKeyType={'next'}
                    secureTextEntry={!showPassword ? true : false}
                    onFocus={() => setPasswordFocus(true)}
                    onBlur={() => setPasswordFocus(!passwordFocus)}
                    inputStyle={[styles.textInput, {
                        color: passwordFocus == true
                            ? colors.black
                            : colors.white
                    }]}
                    fontName={'poppins-regular'}
                    fontSize={normalize(22)}
                    style={[styles.textInputContainer, {
                        backgroundColor:
                            passwordFocus == true
                                ? colors.white
                                : colors.gray,
                    }]}
                    rightIcon={
                        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                            {showPassword ?
                                <>
                                    {!passwordFocus ? <SvgIcons.HideEye /> : <SvgIcons.BlackHideEye />}
                                </>
                                :
                                <>
                                    {!passwordFocus ? <SvgIcons.HideEye /> : <SvgIcons.BlackHideEye />}
                                </>
                            }
                        </TouchableOpacity>
                    }
                />}
            </View>

            <WalletCard style={[styles.walletCardContainer, { bottom: isEnabled ? hp(22) : 0 }]}
                title={appConstant.numberOfWords}
                titleColor={'black'}
                children={
                    <>
                        <FontText size={normalize(22)} color={'white'} name={'inter-regular'}>
                            {appConstant.passphrase}
                        </FontText>
                        <ToggleSwitch
                            isOn={isEnabled}
                            onColor={colors.white}
                            offColor={colors.black}
                            thumbOnStyle={{ borderRadius: 2, height: 17, width: 15, backgroundColor: colors.black, left: 12 }}
                            thumbOffStyle={{ borderRadius: 2, height: 17, width: 15 }}
                            trackOnStyle={{ borderRadius: 2, width: 50, padding: 12 }}
                            trackOffStyle={{ borderRadius: 2, width: 50, padding: 12 }}
                            size="small"
                            onToggle={toggleSwitch}
                        />
                    </>
                }
            />
            <Button
                flex={null}
                height={hp(6.5)}
                width="90%"
                type="highlight"
                borderRadius={11}
                bgColor="white"
                // onPress={handleUnderStandBtnClick}
                style={styles.button}>
                <FontText name={"inter-medium"} size={normalize(16)} color="black">
                    {appConstant.enter}
                </FontText>
            </Button>



        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.black,
        alignItems: 'center',
    },
    subContainer: {
        justifyContent: 'center',
        alignItems: "center",
        height: hp(70),
    },
    buttonConatiner: {
        backgroundColor: colors.gray,
        height: hp(8),
        width: wp(90),
        borderRadius: wp(2),
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: "center",
        paddingHorizontal: wp(4)
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
    walletCardContainer: {
        backgroundColor: colors.gray,
        width: wp(95),
        paddingBottom: hp(2.5),
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        backgroundColor: colors.white,
        bottom: hp(4),
        alignItems: 'center',
        position: 'absolute',
    }

})