import { BackHandler, FlatList, Keyboard, StyleSheet, View } from 'react-native'
import React, { useEffect, useRef, useState, useLayoutEffect } from 'react'
import colors from '../../assets/colors'
import Header from '../../components/common/Header'
import appConstant from '../../helper/appConstant'
import { hp, isIOS, normalize, wp } from '../../helper/responsiveScreen'
import Button from '../../components/common/Button'
import FontText from '../../components/common/FontText'
import { importWalletData } from '../../constants/data'
import Input from '../../components/common/Input'
import WalletCard from '../../components/WalletCard'

export default function ImportWalletScreen({ navigation, route }) {
    const { numberValue, ButtonValue } = route.params
    const cardRef = useRef([])
    const [btnValue, setBtnValue] = useState(appConstant.edit)
    const [walletData, setWalletData] = useState(importWalletData)
    const [isEdit, setIsEdit] = useState(true)
    const [textIndex, setTextIndex] = useState(0)
    const [showNameError, setShowNameError] = useState(true)
    const [showConfirm, setShowConfirm] = useState(false)

    useEffect(() => {
        cardRef.current = cardRef.current.slice(0, walletData.length);
    }, [walletData]);

    useLayoutEffect(() => {
        setTimeout(() => {
            cardRef.current[0].focus();
        }, 1000);

    }, []);

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', backAction);
        return async () => {
            BackHandler.removeEventListener('hardwareBackPress', backAction);
        };
    }, []);

    // const keyboardShowListener = Keyboard.addListener(
    //     'keyboardDidShow',
    //     () => {
    //         setIsEdit(true)
    //     }
    // );
    // const keyboardHideListener = Keyboard.addListener(
    //     'keyboardDidHide',
    //     () => {
    //         setIsEdit(false)
    //     }
    // );

    const isValidate = () => {
        (numberValue && walletData.slice(0, numberValue)).forEach(item => {
            if (item.name === '') {
                setShowNameError(false);
            }
        });
        return showNameError;
    };



    const handleConfirmClick = () => {
        setBtnValue(appConstant.confirm)
        navigation.navigate(appConstant.complateSeeds)
    }

    const handleProceedClick = () => {
        if (isValidate()) {
            setBtnValue(appConstant.edit)
            setShowConfirm(true)
        }
    }

    const handleEditClick = () => {
        cardRef.current[0].focus()
        setIsEdit(true)
        setBtnValue(appConstant.proceed)
        setShowConfirm(false)
    }

    const backAction = () => {
        navigation.navigate(appConstant.attentionScreen2, {
            ButtonValue: ButtonValue,
            numberValue: numberValue,
            from: appConstant.importWallet

        });
        return true;
    };

    const renderWalletData = (item, index) => {
        return (
            <View >
                <Input
                    autoFocus={isEdit}
                    withLeftIcon
                    ref={el => cardRef.current[index] = el}
                    leftIcon={
                        <View style={[styles.numberContainer, { backgroundColor: item.name === '' ? colors.white : colors.red }]}>
                            <FontText name={"inter-bold"} size={normalize(12)} color={item.name === '' ? 'red' : 'white'}>
                                {item?.id}
                            </FontText>
                        </View>
                    }
                    placeholder={''}
                    value={item?.name}
                    autoCapitalize={'none'}
                    secureTextEntry={index == textIndex ? false : true}
                    onSubmit={() => { walletData[index].name !== '' && index !== walletData.slice(0, numberValue).length - 1 ? cardRef.current[index + 1].focus() : Keyboard.dismiss() }}
                    // editable={isEdit ? true : false}
                    onFocus={() => { cardRef.current[index].focus(), setTextIndex(index) }}
                    multiline={false}
                    autoCorrect={false}
                    inputStyle={[styles.textInput, { color: item.name == '' ? colors.white : colors.red }]}
                    onChangeText={text => {
                        walletData[index].name = text.toLowerCase();
                        setWalletData([...walletData]);
                    }}
                    keyboardType={'default'}
                    returnKeyType={'next'}
                    style={[styles.inputContainer, { backgroundColor: item.name == '' ? colors.red : colors.white }]}
                />
            </View>
        )
    }

    return (
        <View style={styles.container} >
            <Header title={appConstant.importWallet} showRightIcon RightIcon={'info'} showBackIcon onBackPress={backAction} statusBarcolor={colors.red} style={{ alignSelf: 'center' }} />
            <View style={styles.subContainer}>
                <WalletCard style={styles.walletCardContainer}
                    titleColor={'red'}
                    title={appConstant.recoverySeeds}
                    headerStyle={{ borderColor: colors.red }}
                    children={
                        <FlatList
                            data={numberValue && walletData.slice(0, numberValue)}
                            numColumns={3}
                            columnWrapperStyle={{ justifyContent: 'space-between' }}
                            keyExtractor={(item) => {
                                return item.id;
                            }}
                            renderItem={({ item, index }) => renderWalletData(item, index)}
                        />
                    }
                />
            </View>

            {showConfirm && <FontText name={"inter-regular"} size={22} color={'white'} style={{ width: wp(90) }} pBottom={hp(2)} textAlign={'center'} >
                {appConstant.enterSeedsCorrectly}
            </FontText>}
            {!showConfirm && <Button
                flex={null}
                // disabled={showNameError ? true : false}
                height={hp(8.5)}
                bgColor={showNameError && btnValue === appConstant.proceed ? 'white' : ['red-open']}
                type="highlight"
                borderRadius={11}
                style={{ marginBottom: hp(2) }}
                onPress={handleProceedClick}
                buttonStyle={styles.button}>
                <FontText name={"inter-medium"} size={normalize(18)} color={showNameError && btnValue === appConstant.proceed ? "red" : 'white'}>
                    {appConstant.proceed}
                </FontText>
            </Button>
            }
            {showConfirm &&
                <>
                    <Button
                        flex={null}
                        // disabled={showNameError ? true : false}
                        height={hp(8.5)}
                        bgColor={btnValue === appConstant.confirm ? 'white' : ['red-open']}
                        type="highlight"
                        borderRadius={11}
                        style={{ marginBottom: hp(2) }}
                        onPress={handleConfirmClick}
                        buttonStyle={styles.button}>
                        <FontText name={"inter-medium"} size={normalize(18)} color={btnValue === appConstant.confirm ? "red" : 'white'}>
                            {appConstant.confirm}
                        </FontText>
                    </Button>
                    <Button
                        flex={null}
                        height={hp(8.5)}
                        bgColor={btnValue === appConstant.edit ? 'white' : ['red-open']}
                        type="highlight"
                        borderRadius={11}
                        style={{ marginBottom: hp(4) }}
                        onPress={handleEditClick}
                        buttonStyle={styles.button}>
                        <FontText name={"inter-medium"} size={normalize(18)} color={btnValue === appConstant.edit ? "red" : 'white'}>
                            {appConstant.edit}
                        </FontText>
                    </Button>
                </>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.red,
        paddingHorizontal: wp(3.5),
    },
    subContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    button: {
        width: wp(90),
        alignItems: 'center',
    },
    walletCardContainer: {
        backgroundColor: colors['red-open'],
        paddingTop: isIOS ? hp(2.5) : hp(3),
        paddingBottom: isIOS ? hp(1) : hp(1),
        paddingHorizontal: isIOS ? wp(4.5) : wp(3.5),
    },
    inputContainer: {
        backgroundColor: colors.white,
        borderRadius: wp(2),
        width: wp(26),
        height: hp(4),
        flexDirection: 'row',
        marginBottom: hp(1),
        padding: 0,
        paddingHorizontal: wp(1.5),
        marginHorizontal: wp(1),
        paddingVertical: 0,
    },
    textInput: {
        fontSize: normalize(14),
        padding: 0,
        fontFamily: 'inter-regular',
        flex: 1,
    },
    numberContainer: {
        backgroundColor: colors.white,
        borderRadius: wp(1),
        height: hp(2.5),
        width: hp(2.5),
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: wp(1)
    },
})