import { BackHandler, Keyboard, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import Input from '../../components/common/Input'
import colors from '../../assets/colors'
import { hp, normalize, wp } from '../../helper/responsiveScreen'
import appConstant from '../../helper/appConstant'
import SvgIcons from '../../assets/SvgIcons'
import Header from '../../components/common/Header'
import Button from '../../components/common/Button'
import FontText from '../../components/common/FontText'
import { useTranslation } from 'react-i18next'
import PopUp from '../../components/common/AlertBox'
import { useDispatch } from 'react-redux'
import { changeUserData, getUserData, renameAccount } from "../../storage";
import { setUser } from "../../redux/slices/authSlice";

export default function RenameAccountScreen({ navigation, route }) {
    const { t } = useTranslation();
    const walletName = route?.params?.walletName
    const accountList = route?.params?.accountList
    const nameRef = useRef()
    const dispatch = useDispatch()
    const [name, setName] = useState(walletName || '')
    const [nameFocus, setNameFocus] = useState(false)
    const [showAlert, setShowAlert] = useState(false)
    const [alertTitle, setAlertTitle] = useState('')
    const [alertMessage, setAlertMessage] = useState('')
    const walletAddress = route?.params?.walletAddress

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

    const onFocusName = () => {
        setNameFocus(true)
    }

    const onBlurName = () => {
        setNameFocus(false)
    }

    const onSubmitName = () => {
        setNameFocus(false)
    }

    const checkNameValidation = () => {
        let errorStatus = true;
        if (name === '' || !name.length > 1 || name.length > 15) {
            setShowAlert(true)
            setAlertTitle(t("enterName"))
            setAlertMessage(t("nameErrorMess"))
            errorStatus = false;
        }
        return errorStatus;
    };


    const handleDoneBtn = async () => {
        // if (accountList?.length > 1) {
        renameAccount(walletAddress, name).then(
            res => {
                if (res.status) {
                    navigation.navigate(appConstant.accountList, {
                        accountList: accountList,
                    })
                }
            },
        );
        // }
        // else {
        //     navigation.navigate(appConstant.main)
        // }
    }

    return (
        <View style={styles.container}>
            <Header title={t("rename")} statusBarHidden={false} showBackIcon onBackPress={backAction} titleStyle={{ marginRight: wp(30) }} />
            <View style={styles.subContainer}>
                <Input
                    withRightIcon
                    ref={nameRef}
                    // editable={from ? false : true}
                    autoFocus={true}
                    placeholder={t("name")}
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
                <Button
                    flex={null}
                    type="highlight"
                    borderRadius={11}
                    bgColor="white"
                    onPress={handleDoneBtn}
                    style={styles.buttonView}
                >
                    <FontText name={"inter-medium"} size={normalize(22)} color="black">
                        {t("done")}
                    </FontText>
                </Button>
            </View>
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
        backgroundColor: colors.black,
        flex: 1,
    },
    subContainer: {
        flex: 1,
        alignItems: 'center',
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
        bottom: hp(3),
    },
})