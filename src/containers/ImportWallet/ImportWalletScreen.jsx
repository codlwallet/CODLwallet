import { FlatList, StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
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
    const { numberValue } = route.params
    const [btnValue, setBtnValue] = useState(appConstant.confirm)
    const [walletData, setWalletData] = useState(importWalletData)

    const handleConfirmClick = () => {
        setBtnValue(appConstant.confirm)
        navigation.navigate(appConstant.complateSeeds)
    }

    const handleEditClick = () => {
        setBtnValue(appConstant.edit)
        // navigation.navigate(appConstant.createWallet)
    }

    const handleBackClick = () => {
        navigation.navigate(appConstant.attentionScreen2)
    }

    return (
        <View style={styles.container}>
            <Header title={appConstant.importWallet} showRightIcon RightIcon={'info'} showBackIcon onBackPress={handleBackClick} />
            <View style={styles.subContainer}>
                <WalletCard style={styles.walletCardContainer}
                    titleColor={'red'}
                    title={appConstant.recoverySeeds}
                    children={
                        <FlatList
                            data={numberValue && walletData.slice(0, numberValue)}
                            numColumns={3}
                            contentContainerStyle={{ justifyContent: 'center', alignItems: "center" }}
                            keyExtractor={(index) => index.toString()}
                            renderItem={({ item, index }) => {
                                return (
                                    <>
                                        <Input
                                            withLeftIcon
                                            leftIcon={
                                                <View style={[styles.numberContainer, { backgroundColor: item.name === '' ? colors.white : colors.red }]}>
                                                    <FontText name={"inter-bold"} size={normalize(12)} color={item.name === '' ? 'black' : 'white'}>
                                                        {item?.id}
                                                    </FontText>
                                                </View>
                                            }
                                            placeholder={''}
                                            value={item?.name}
                                            onChangeText={text => {
                                                walletData[index].name = text;
                                                setWalletData([...walletData]);
                                            }}
                                            keyboardType={'default'}
                                            returnKeyType={'done'}
                                            blurOnSubmit
                                            fontName={'poppins-regular'}
                                            fontSize={normalize(22)}
                                            style={[styles.inputContainer, {
                                                backgroundColor: item.name == '' ? colors.red : colors.white
                                            }]}
                                        />
                                    </>
                                )
                            }}
                        />
                    }
                />
            </View>
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
    },
    inputContainer: {
        backgroundColor: colors.white,
        borderRadius: wp(2),
        width: wp(25),
        height: hp(4),
        flexDirection: 'row',
        marginBottom: hp(1),
        padding: 0,
        marginHorizontal: wp(1),
        paddingHorizontal: wp(2)
    },
    numberContainer: {
        backgroundColor: colors.white,
        borderRadius: wp(1),
        height: hp(3),
        width: wp(5),
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: wp(1)
    },
    nameContainer: {
        height: hp(4),
        padding: 0
    }
})