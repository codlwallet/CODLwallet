import { BackHandler, Keyboard, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../../components/common/Header'
import colors from '../../assets/colors'
import appConstant from '../../helper/appConstant'
import { hp, normalize, wp } from '../../helper/responsiveScreen'
import FontText from '../../components/common/FontText'
import SvgIcons from '../../assets/SvgIcons'
import Input from '../../components/common/Input'
import Alert from "../../components/common/Alert";
import ToggleSwitch from 'toggle-switch-react-native'
import Button from '../../components/common/Button'
import WalletCard from '../../components/WalletCard'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

export default function WelcomePurchaseScreen({ navigation, route }) {
    const { t } = useTranslation();
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false)
    const [passwordFocus, setPasswordFocus] = useState(false)
    const [isEnabled, setIsEnabled] = useState(false);
    const [keyboardHeight, setKeyboardHeight] = useState(0);

    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const { user } = useSelector((state) => state.auth)
    const [showAlert, setShowAlert] = useState(false);
    const [alertTitle, setAlertTitle] = useState('')
    const [alertMessage, setAlertMessage] = useState('')
    useEffect(() => {
        const showSubscription = Keyboard.addListener('keyboardDidShow', e => setKeyboardHeight(e.endCoordinates.height));
        const hideSubscription = Keyboard.addListener('keyboardWillHide', () => setKeyboardHeight(0));
        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        }
    }, [setKeyboardHeight]);

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', backAction);
        return async () => {
            BackHandler.removeEventListener('hardwareBackPress', backAction);
        };
    }, []);

    const backAction = () => {
        navigation.navigate(appConstant.welcome, {
            from: appConstant.welcomePurchase,
        });
        return true;
    };

    const keyboardShowListener = Keyboard.addListener(
        'keyboardDidShow',
        () => {
            setIsEnabled(true)
        }
    );
    const keyboardHideListener = Keyboard.addListener(
        'keyboardDidHide',
        () => {
            setIsEnabled(false)
        }
    );

    const onSubmitPin = () => {
        Keyboard.dismiss()
        if (user.pin === password) {
            setIsEnabled(false)
            navigation.navigate(appConstant.hiddenWallet)
        } else {
            setAlertTitle(t('passphraseNotMatch'));
            setAlertMessage(t('passphraseMatchErrorMess'));
            setShowAlert(true);
        }
    }

    const handleEnterClick = () => {
        navigation.navigate(appConstant.main, {
            hidden: isEnabled
        })
    }

    return (
        <View style={styles.container}>
            <Header showRightIcon RightIcon={'info'} title={t("welcome")} />
            <View style={[styles.subContainer, { bottom: isEnabled ? wp(18) : 0 }]}>
                <TouchableOpacity style={styles.buttonConatiner} onPress={handleEnterClick}>
                    <FontText size={normalize(22)} color={'white'} name={'inter-regular'}>
                        {user?.name}
                    </FontText>
                    <SvgIcons.RightBackArrow height={hp(3)} width={hp(2)} />
                </TouchableOpacity>
                {isEnabled && <Input
                    withRightIcon
                    autoFocus={true}
                    placeholder={t("enterPassword")}
                    value={password}
                    placeholderTextColor={passwordFocus ? colors.black : colors.white}
                    onChangeText={setPassword}
                    keyboardType={'default'}
                    returnKeyType={'done'}
                    secureTextEntry={!showPassword ? true : false}
                    onFocus={() => setPasswordFocus(true)}
                    onBlur={() => setPasswordFocus(!passwordFocus)}
                    inputStyle={[styles.textInput, { color: colors.black }]}
                    fontName={'poppins-regular'}
                    onSubmit={onSubmitPin}
                    onSubmitEditing={() => { setPasswordFocus(false), Keyboard.dismiss() }}
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
                                <SvgIcons.BlackShowEye height={hp(2.5)} width={hp(2.5)} />
                                :
                                <SvgIcons.BlackHideEye height={hp(2.5)} width={hp(2.5)} />
                            }
                        </TouchableOpacity>
                    }
                />}
            </View>
            <WalletCard style={[styles.walletCardContainer, { bottom: isEnabled ? keyboardHeight - hp(14) : 0 }]}
                title={t("hiddenWallet")}
                headerStyle={{ borderColor: colors.black }}
                titleColor={'black'}
                children={
                    <View style={styles.numberView}>
                        <FontText size={normalize(22)} color={'white'} name={'inter-regular'}>
                            {t("passphrase")}
                        </FontText>
                        <View style={{ flex: 1, alignItems: 'flex-end' }}>
                            <ToggleSwitch
                                isOn={isEnabled}
                                onColor={colors.white}
                                offColor={colors.black}
                                thumbOnStyle={{ borderRadius: 2, height: 15, width: 15, backgroundColor: colors.black, left: 8 }}
                                thumbOffStyle={{ borderRadius: 2, height: 15, width: 15, left: 3 }}
                                trackOnStyle={{ borderRadius: 4, width: 50, padding: 12 }}
                                trackOffStyle={{ borderRadius: 4, width: 50, padding: 12 }}
                                size="small"
                                onToggle={toggleSwitch}
                            />
                        </View>
                    </View>
                }
            />
            <Button
                flex={null}
                height={hp(8.5)}
                width="95%"
                type="highlight"
                borderRadius={11}
                bgColor="white"
                onPress={handleEnterClick}
                style={styles.buttonView}
            >
                <FontText name={"inter-medium"} size={normalize(22)} color="black">
                    {t("enter")}
                </FontText>
            </Button>
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
        flex: 1,
        backgroundColor: colors.black,
        alignItems: 'center',
    },
    subContainer: {
        flex: 0.9,
        justifyContent: 'center',
        alignItems: "center",
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
        width: wp(90),
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: hp(3.5),
        paddingBottom: hp(3)
    },
    buttonView: {
        bottom: hp(-4)
    },
    numberView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: wp(4),
        width: '90%'
    },
})