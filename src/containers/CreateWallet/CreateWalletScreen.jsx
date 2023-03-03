import { FlatList, StyleSheet, View } from 'react-native'
import React from 'react'
import colors from '../../assets/colors'
import Header from '../../components/common/Header'
import appConstant from '../../helper/appConstant'
import { hp, normalize, wp } from '../../helper/responsiveScreen'
import Button from '../../components/common/Button'
import FontText from '../../components/common/FontText'
import { createWalletData } from '../../constants/data'
import WalletCard from '../../components/common/WalletCard'

export default function CreateWalletScreen(props) {
    const { navigation } = props

    const handleBackClick = () => {
        navigation.navigate(appConstant.attentionScreen2)
    }

    const handleProceedClick = () => {
        navigation.navigate(appConstant.attentionScreen3)
    }

    return (
        <View style={styles.container}>
            <Header title={appConstant.createWallet} showRightIcon RightIcon={'info'} showBackIcon onBackPress={handleBackClick} />
            <View style={styles.subContainer}>
                <WalletCard style={styles.walletCardContainer}
                    titleColor={'red'}
                    title={appConstant.recoverySeeds}
                    children={
                        <FlatList
                            data={createWalletData}
                            numColumns={3}
                            keyExtractor={(index) => index.toString()}
                            renderItem={({ item, index }) => {
                                return (
                                    <View key={index.toString()} style={styles.seedsContainer}>
                                        <View style={styles.numberContainer}>
                                            <FontText name={"inter-bold"} size={normalize(12)} color={'white'}>
                                                {item?.id}
                                            </FontText>
                                        </View>
                                        <View style={styles.nameContainer}>
                                            <FontText name={"inter-regular"} size={normalize(16)} color={'red'} pLeft={wp(1)} lines={1}>
                                                {item?.name}
                                            </FontText>
                                        </View>
                                    </View>
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
                onPress={handleProceedClick}
                style={[styles.button, { backgroundColor: colors.white }]}>
                <FontText name={"inter-medium"} size={normalize(16)} color={"red"}>
                    {appConstant.proceed}
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
        position: 'absolute'
    },
    walletCardContainer: {
        backgroundColor: colors['red-open'],
        justifyContent: 'center',
        alignItems: 'center',
    },
    seedsContainer: {
        backgroundColor: colors.white,
        borderRadius: wp(2),
        width: wp(25),
        height: hp(4),
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        paddingHorizontal: wp(2),
        marginBottom: hp(1),
        marginRight: wp(2.5),
    },
    numberContainer: {
        backgroundColor: colors.red,
        borderRadius: wp(1),
        height: hp(3),
        width: wp(6),
        justifyContent: 'center',
        alignItems: 'center'
    },
    nameContainer: {
        width: wp(15),
        flex: 1
    }
})