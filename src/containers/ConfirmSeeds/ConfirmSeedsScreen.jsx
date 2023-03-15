import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { secondSeedsData, sixSeedsData, twelveSeedsData } from '../../constants/data'
import { hp, normalize, wp } from '../../helper/responsiveScreen'
import colors from '../../assets/colors'
import appConstant from '../../helper/appConstant'
import FontText from '../../components/common/FontText'
import Button from '../../components/common/Button'
import Header from '../../components/common/Header'
import WalletCard from '../../components/WalletCard'

export default function ConfirmSeedsScreen(props) {
    const { navigation } = props
    const [secondNumberValue, setSecondNumberValue] = useState()
    const [secondIndex, setSecondIndex] = useState(0)
    const [sixIndex, setsixIndex] = useState(0)
    const [twelveIndex, setTwelveIndex] = useState(0)
    const [sixNumberValue, setSixNumberValue] = useState()
    const [twelveNumberValue, setTwelveNumberValue] = useState()

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
                    title={'2th seed'}
                    headerStyle={{ borderColor: colors.black }}
                    titleColor={'black'}
                    children={
                        <View style={styles.walletInnerContainer}>
                            <View style={styles.numberWiew}>
                                <FontText name={"inter-bold"} size={normalize(22)} color={'black'}>
                                    2
                                </FontText>
                            </View>
                            {secondSeedsData.map((item, index) => {
                                return (
                                    <View key={index} style={styles.seedsView}>
                                        <TouchableOpacity style={[styles.numberContainer, { backgroundColor: index === secondIndex ? colors.white : colors.black }]} onPress={() => {
                                            setSecondNumberValue(item?.number)
                                            setSecondIndex(index)
                                        }}>
                                            <FontText name={"inter-regular"} size={normalize(16)} color={index === secondIndex ? "black" : 'white'}>
                                                {item?.name}
                                            </FontText>
                                        </TouchableOpacity>
                                    </View>
                                )
                            })}
                        </View>
                    }
                />
                <WalletCard style={styles.walletCardContainer}
                    title={'6th seed'}
                    headerStyle={{ borderColor: colors.black }}
                    titleColor={'black'}
                    children={
                        <View style={styles.walletInnerContainer}>
                            <View style={styles.numberWiew}>
                                <FontText name={"inter-bold"} size={normalize(22)} color={'black'}>
                                    6
                                </FontText>
                            </View>
                            {sixSeedsData.map((item, index) => {
                                return (
                                    <View key={index} style={styles.seedsView}>
                                        <TouchableOpacity style={[styles.numberContainer, { backgroundColor: index === sixIndex ? colors.white : colors.black }]} onPress={() => {
                                            setSixNumberValue(item?.number)
                                            setsixIndex(index)
                                        }}>
                                            <FontText name={"inter-regular"} size={normalize(16)} color={index === sixIndex ? "black" : 'white'}>
                                                {item?.name}
                                            </FontText>
                                        </TouchableOpacity>
                                    </View>
                                )
                            })}
                        </View>
                    }
                />
                <WalletCard style={styles.walletCardContainer}
                    title={'12th seed'}
                    headerStyle={{ borderColor: colors.black }}
                    titleColor={'black'}
                    children={
                        <View style={styles.walletInnerContainer}>
                            <View style={styles.numberWiew}>
                                <FontText name={"inter-bold"} size={normalize(22)} color={'black'}>
                                    12
                                </FontText>
                            </View>
                            {twelveSeedsData.map((item, index) => {
                                return (
                                    <View key={index} style={styles.seedsView}>
                                        <TouchableOpacity style={[styles.numberContainer, { backgroundColor: index === twelveIndex ? colors.white : colors.black }]} onPress={() => {
                                            setTwelveNumberValue(item?.number)
                                            setTwelveIndex(index)
                                        }}>
                                            <FontText name={"inter-regular"} size={normalize(16)} color={index === twelveIndex ? "black" : 'white'}>
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
        justifyContent: 'space-between',
        alignSelf: 'center',
        marginVertical: hp(15)
    },
    button: {
        marginBottom: hp(2)
    },
    walletCardContainer: {
        backgroundColor: colors.gray,
        bottom: hp(1.5),
        width: wp(95),
        paddingBottom: hp(5),
        paddingTop: hp(6),
        paddingHorizontal: wp(4)
    },
    walletInnerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    numberWiew: {
        backgroundColor: colors.white,
        height: hp(6),
        width: hp(6),
        borderRadius: wp(2),
        justifyContent: 'center',
        alignItems: 'center',
    },
    numberContainer: {
        backgroundColor: colors.black,
        borderRadius: wp(2),
        height: hp(6),
        width: wp(22),
        justifyContent: 'center',
        alignItems: 'center',
    },
    seedsView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
        marginTop: hp(3),
    }
})