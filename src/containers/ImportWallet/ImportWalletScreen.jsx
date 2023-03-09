import { BackHandler, FlatList, Keyboard, StyleSheet, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import colors from '../../assets/colors'
import Header from '../../components/common/Header'
import appConstant from '../../helper/appConstant'
import { hp, normalize, wp } from '../../helper/responsiveScreen'
import Button from '../../components/common/Button'
import FontText from '../../components/common/FontText'
import { importWalletData } from '../../constants/data'
import WalletCard from '../../components/common/WalletCard'
import Input from '../../components/common/Input'

export default function ImportWalletScreen({ navigation, route }) {
    const { numberValue, ButtonValue } = route.params
    const cardRef = useRef([])
    const [btnValue, setBtnValue] = useState(appConstant.confirm)
    const [walletData, setWalletData] = useState(importWalletData)
    const [isEdit, setIsEdit] = useState(false)

    useEffect(() => {
        cardRef.current = cardRef.current.slice(0, walletData.length);
    }, []);

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', backAction);
        return async () => {
            BackHandler.removeEventListener('hardwareBackPress', backAction);
        };
    }, []);

    const handleConfirmClick = () => {
        setIsEdit(false)

        setBtnValue(appConstant.confirm)
        navigation.navigate(appConstant.complateSeeds)
    }

    const handleEditClick = () => {
        cardRef.current[0].focus()
        setIsEdit(true)
        setBtnValue(appConstant.edit)
    }

    const backAction = () => {
        setIsEdit(false)
        navigation.navigate(appConstant.attentionScreen2, {
            ButtonValue: ButtonValue,
            numberValue: numberValue,
            from: appConstant.importWallet

        });
        return true;
    };

    return (
        <View style={styles.container} onStartShouldSetResponder={() => Keyboard.dismiss()}>
            <Header title={appConstant.importWallet} showRightIcon RightIcon={'info'} showBackIcon onBackPress={backAction} statusBarcolor={colors.red} />
            <View style={styles.subContainer}>
                <WalletCard style={styles.walletCardContainer}
                    titleColor={'red'}
                    title={appConstant.recoverySeeds}
                    headerStyle={{ borderColor: colors.red }}
                    children={
                        <FlatList
                            data={numberValue && walletData.slice(0, numberValue)}
                            numColumns={3}
                            contentContainerStyle={{ justifyContent: 'center', alignItems: "center" }}
                            keyExtractor={(item) => {
                                return item.id;
                            }}
                            renderItem={({ item, index }) => {
                                return (
                                    <View >
                                        <Input
                                            withLeftIcon
                                            ref={(el) => (cardRef.current[index] = el)}
                                            leftIcon={
                                                <View style={[styles.numberContainer, { backgroundColor: item.name === '' ? colors.white : colors.red }]}>
                                                    <FontText name={"inter-bold"} size={normalize(12)} color={item.name === '' ? 'red' : 'white'}>
                                                        {item?.id}
                                                    </FontText>
                                                </View>
                                            }
                                            placeholder={''}
                                            value={item?.name}
                                            // numberOfLines={2}
                                            editable={isEdit ? true : false}
                                            multiline={false}
                                            inputStyle={[styles.textInput, { color: item.name == '' ? colors.white : colors.red }]}
                                            onChangeText={text => {
                                                walletData[index].name = text;
                                                setWalletData([...walletData]);
                                                if (index === walletData.length - 1) {
                                                    return;
                                                }
                                            }}
                                            keyboardType={'default'}
                                            returnKeyType={'next'}
                                            blurOnSubmit

                                            style={[styles.inputContainer, {
                                                backgroundColor: item.name == '' ? colors.red : colors.white
                                            }]}
                                        />
                                    </View>
                                )
                            }}
                        />
                    }
                />
            </View>
            <FontText name={"inter-regular"} size={22} color={'white'} style={{ width: wp(90) }} pBottom={hp(2)} >
                {appConstant.enterSeedsCorrectly}
            </FontText>
            <Button
                flex={null}
                height={hp(6.5)}
                width="90%"
                type="highlight"
                borderRadius={11}
                onPress={handleConfirmClick}
                style={[styles.button, { backgroundColor: btnValue === appConstant.confirm ? colors.white : colors['red-open'] }]}>
                <FontText name={"inter-medium"} size={normalize(16)} color={btnValue === appConstant.confirm ? "red" : 'white'}>
                    {appConstant.confirm}
                </FontText>
            </Button>
            <Button
                flex={null}
                height={hp(6.5)}
                width="90%"
                type="highlight"
                borderRadius={11}
                onPress={handleEditClick}
                style={[styles.button, { backgroundColor: btnValue === appConstant.edit ? colors.white : colors['red-open'] }]}>
                <FontText name={"inter-medium"} size={normalize(16)} color={btnValue === appConstant.edit ? "red" : 'white'}>
                    {appConstant.edit}
                </FontText>
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.red,
        alignItems: 'center',
    },
    subContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        bottom: hp(2),
        alignItems: 'center',
        marginTop: hp(2),
    },
    walletCardContainer: {
        backgroundColor: colors['red-open'],
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: hp(3)
    },
    inputContainer: {
        backgroundColor: colors.white,
        borderRadius: wp(2),
        width: wp(25),
        height: hp(4),
        flexDirection: 'row',
        marginBottom: hp(1),
        padding: 0,
        paddingHorizontal: wp(2),
        marginHorizontal: wp(1),
        paddingVertical: 0,
    },
    textInput: {
        fontSize: normalize(16),
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
    nameContainer: {
        height: hp(4),
        padding: 0
    }
})