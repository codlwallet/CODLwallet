import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import appConstant from '../../helper/appConstant'
import colors from '../../assets/colors'
import Header from '../../components/common/Header'
import ButtonView from '../../components/common/ButtonList'
import { walletData, walletNumberData } from '../../constants/data'
import Button from '../../components/common/Button'
import { hp, normalize, wp } from '../../helper/responsiveScreen'
import FontText from '../../components/common/FontText'
import WalletCard from '../../components/WalletCard'

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
            </View>
            <View style={styles.bottomView}>
                <WalletCard style={styles.walletCardContainer}
                    title={appConstant.numberOfWords}
                    headerStyle={{ borderColor: colors.black }}
                    titleColor={'black'}
                    children={
                        <View style={styles.numberView}>
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
                        </View>
                    }
                />
                <Button
                    flex={null}
                    height={hp(8.5)}
                    type="highlight"
                    borderRadius={11}
                    bgColor="white"
                    onPress={handleProceedClick}
                    buttonStyle={styles.button}
                >
                    <FontText name={"inter-medium"} size={normalize(22)} color="black">
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
        alignItems: 'center',
        alignSelf: 'center',
        width: wp(90),
        height: hp(8.5)
    },
    bottomView: {
        position: 'absolute',
        bottom: hp(4),
    },
    walletCardContainer: {
        backgroundColor: colors.gray,
        marginBottom: hp(2),
        paddingTop: hp(3.5),
        paddingBottom: hp(2),
    },
    numberView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: wp(4)
    },
    numberContainer: {
        backgroundColor: colors.black,
        borderRadius: wp(2),
        paddingHorizontal: wp(10),
        paddingVertical: hp(1.8),
    }
})