import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { confirmSeedsData } from '../../constants/data'
import { hp, normalize, wp } from '../../helper/responsiveScreen'
import colors from '../../assets/colors'
import appConstant from '../../helper/appConstant'
import FontText from '../../components/common/FontText'
import Button from '../../components/common/Button'
import Header from '../../components/common/Header'
import WalletCard from '../../components/WalletCard'

export default function ConfirmSeedsScreen(props) {
    const { navigation } = props
    const [btnValue, setButtonValue] = useState()
    const [buttonIndex, setButtonIndex] = useState(0)
    const [numberValue, setNumberValue] = useState()
    const [numberIndex, setNumberIndex] = useState(0)

    const handleConfirmClick = () => {
        navigation.navigate(appConstant.complateSeeds)
    }

    const handleBackClick = () => {
        navigation.goBack()
    }

    return (
        <View style={styles.container}>
            <Header title={appConstant.confirmSeeds} showRightIcon RightIcon={'info'} showBackIcon onBackPress={handleBackClick} />
            <View style={styles.subContainer}>
                <WalletCard style={styles.walletCardContainer}
                    title={'1st seed'}
                    headerStyle={{ borderColor: colors.black }}
                    titleColor={'black'}
                    children={
                        <View style={styles.walletInnerContainer}>
                            <View style={styles.numberWiew}>
                                <FontText name={"inter-bold"} size={normalize(22)} color={'black'}>
                                    1
                                </FontText>
                            </View>
                            {confirmSeedsData.map((item, index) => {
                                return (
                                    <View key={index}>
                                        <TouchableOpacity style={[styles.numberContainer, { backgroundColor: index === numberIndex ? colors.white : colors.black }]} onPress={() => {
                                            setNumberValue(item?.number)
                                            setNumberIndex(index)
                                        }}>
                                            <FontText name={"inter-regular"} size={normalize(16)} color={index === numberIndex ? "black" : 'white'}>
                                                {item?.name}
                                            </FontText>
                                        </TouchableOpacity>
                                    </View>
                                )
                            })}
                        </View>
                    }
                />

            </View>
            <Button
                flex={null}
                height={hp(8.5)}
                width="95%"
                type="highlight"
                borderRadius={11}
                bgColor="white"
                onPress={handleConfirmClick}
                style={styles.button}>
                <FontText name={"inter-medium"} size={normalize(22)} color="black">
                    {appConstant.confirm}
                </FontText>
            </Button>
        </View >
    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.black,
        flex: 1,
        alignItems: 'center',
    },
    subContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        marginBottom: hp(2)
    },
    walletCardContainer: {
        backgroundColor: colors.gray,
        bottom: hp(1.5),
        width: wp(95),
        paddingBottom: hp(2.5),
        paddingTop: hp(3),
    },
    walletInnerContainer: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1
    },
    numberWiew: {
        backgroundColor: colors.white,
        height: hp(6),
        width: wp(14),
        borderRadius: wp(2),
        justifyContent: 'center',
        alignItems: 'center',
    },
    numberContainer: {
        backgroundColor: colors.black,
        borderRadius: wp(2),
        paddingHorizontal: wp(2),
        height: hp(6),
        width: wp(22),
        justifyContent: 'center',
        alignItems: 'center',
    },
})