import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import appConstant from '../../helper/appConstant'
import colors from '../../assets/colors'
import Header from '../../components/common/Header'
import ButtonView from '../../components/common/ButtonList'
import { walletData, walletNumberData } from '../../constants/data'
import Button from '../../components/common/Button'
import { hp, normalize, wp } from '../../helper/responsiveScreen'
import FontText from '../../components/common/FontText'
import WalletCard from '../../components/common/WalletCard'

export default function SetupWalletScreen(props) {
    const { navigation } = props
    const [btnValue, setButtonValue] = useState(appConstant.createWallet)
    const [buttonIndex, setButtonIndex] = useState(0)
    const [numberValue, setNumberValue] = useState(12)
    const [numberIndex, setNumberIndex] = useState(0)

    const handleProceedClick = () => {
        navigation.navigate(appConstant.attentionScreen1, {
            ButtonValue: btnValue,
            numberValue: numberValue
        })
    }
    return (
        <View style={styles.container}>
            <Header title={appConstant.setupWallet} showRightIcon RightIcon={'info'} />
            <View style={styles.buttonContainer}>
                {/* <View style={{ backgroundColor: 'pink' }}> */}
                {walletData.map((item, index) => {
                    return (
                        <TouchableOpacity key={index} onPress={() => {
                            setButtonValue(item?.name)
                            setButtonIndex(index)
                        }}>
                            <ButtonView listItem={item} showRightIcon index={index} buttonIndex={buttonIndex} />
                        </TouchableOpacity>
                    )
                })
                }
                {/* </View> */}
            </View>
            <View style={{
                position: 'absolute',
                bottom: hp(4),

            }}>
                <WalletCard style={styles.walletCardContainer}
                    title={appConstant.numberOfWords}
                    headerStyle={{ borderColor: colors.black }}
                    titleColor={'black'}
                    children={
                        <>
                            {walletNumberData.map((item, index) => {
                                return (
                                    <TouchableOpacity key={index} style={[styles.numberContainer, { backgroundColor: index === numberIndex ? colors.white : colors.black }]} onPress={() => {
                                        setNumberValue(item?.number)
                                        setNumberIndex(index)
                                    }}>
                                        <FontText name={"inter-bold"} size={normalize(16)} color={index === numberIndex ? "black" : 'white'}>
                                            {item?.number}
                                        </FontText>
                                    </TouchableOpacity>
                                )
                            })}
                        </>
                    }
                />
                <Button
                    flex={null}
                    height={hp(6.5)}
                    // width="90%"
                    type="highlight"
                    borderRadius={11}
                    bgColor="white"
                    onPress={handleProceedClick}
                    style={styles.button}>
                    <FontText name={"inter-medium"} size={normalize(16)} color="black">
                        {appConstant.proceed}
                    </FontText>
                </Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.black,
        flex: 1,
        alignItems: 'center',
    },
    buttonContainer: {
        flex: 0.5,
        alignItems: 'flex-end',
        justifyContent: 'flex-end'
    },
    button: {
        backgroundColor: colors.white,
        alignItems: 'center',
        alignSelf: 'center',
        width: '100%'
    },
    walletCardContainer: {
        backgroundColor: colors.gray,
        marginBottom: hp(2),
        paddingTop: hp(4),
        paddingBottom: hp(2.5)
    },
    numberContainer: {
        backgroundColor: colors.black,
        borderRadius: wp(2),
        paddingHorizontal: wp(10),
        paddingVertical: hp(1.8),
    }
})