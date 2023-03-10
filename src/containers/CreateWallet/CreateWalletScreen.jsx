import { Alert, FlatList, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import colors from '../../assets/colors'
import Header from '../../components/common/Header'
import appConstant from '../../helper/appConstant'
import { hp, normalize, wp } from '../../helper/responsiveScreen'
import Button from '../../components/common/Button'
import FontText from '../../components/common/FontText'
import { createWalletData } from '../../constants/data'
import WalletCard from '../../components/common/WalletCard'
import DeviceInfo from 'react-native-device-info'

import RNFS from 'react-native-fs';
import { useDispatch } from 'react-redux'
import { setConfirmIndex, setConfirmWords } from '../../redux/slices/authSlice'
import { create } from '../../storage'

export default function CreateWalletScreen({ navigation, route }) {
    const dispatch = useDispatch();
    const { numberValue } = route.params
    const [words, setWords] = useState([])
    const [downloadText, setText] = useState()

    const handleBackClick = () => {
        navigation.navigate(appConstant.attentionScreen2, { numberValue })
    }

    const handleProceedClick = () => {
        const confirmIndex = Math.ceil((Math.random() * numberValue));
        dispatch(setConfirmIndex(confirmIndex));
        const confirmWords = [
            {
                number: (confirmIndex == 1 ? 3 : confirmIndex - 1),
                name: words[(confirmIndex == 1 ? 3 : confirmIndex - 1) - 1]
            },
            {
                number: confirmIndex,
                name: words[confirmIndex - 1]
            },
            {
                number: (confirmIndex == numberValue ? 22 : confirmIndex + 1),
                name: words[(confirmIndex == numberValue ? 22 : confirmIndex + 1) - 1]
            },
        ]
        console.log(confirmWords, confirmIndex)
        dispatch(setConfirmWords(confirmWords))
        navigation.navigate(appConstant.attentionScreen3, {
            numberValue: numberValue
        })
    }

    const download = () => {
        console.log("download")
        let path = `${RNFS.DownloadDirectoryPath}/priv.txt`;
        RNFS.writeFile(path, downloadText, 'utf8').then((res) => {
            Alert.alert("Saved the wallet.")
        }
        ).catch((err) => {
            Alert.alert("You have got an error.")
        });
    }

    useEffect(() => {
        if (numberValue > 0 && words.length == 0) {
            const uniqueId = DeviceInfo.getUniqueIdSync();
            const data = {
                count: numberValue,
                machineId: uniqueId
            }

            create(data).then((res) => {
                const mnemonic = res.words;
                console.log(mnemonic, "mnemonic")
                if (res.status) {
                    setText(mnemonic)
                    const sortWords = mnemonic?.split(" ")
                    setWords(sortWords)
                }
            }).catch((e) => {
                console.log(e);
                Alert.alert('Error!', 'You have got an error.');
            })
        }
    }, [numberValue])

    return (
        <View style={styles.container}>
            <Header title={appConstant.createWallet} showRightIcon RightIcon={'info'} showBackIcon statusBarcolor={colors.red} />
            <View style={styles.subContainer}>
                <WalletCard style={styles.walletCardContainer}
                    titleColor={'red'}
                    headerStyle={{ borderColor: colors.red }}
                    title={appConstant.recoverySeeds}
                    children={
                        <FlatList
                            data={words}
                            numColumns={3}
                            // keyExtractor={(index) => index.toString()}
                            renderItem={(res) => {
                                return (
                                    <View key={res.index} style={styles.seedsContainer}>
                                        <View style={styles.numberContainer}>
                                            <FontText name={"inter-bold"} size={normalize(12)} color={'white'}>
                                                {(res.index + 1)}
                                            </FontText>
                                        </View>
                                        <View style={styles.nameContainer}>
                                            <FontText name={"inter-regular"} size={normalize(16)} color={'red'} pLeft={wp(1)} lines={1}>
                                                {res.item}
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
            <Button
                flex={null}
                height={hp(6.5)}
                width="90%"
                type="highlight"
                borderRadius={11}
                onPress={download}
                style={[styles.button, { backgroundColor: colors.white }]}>
                <FontText name={"inter-medium"} size={normalize(16)} color={"red"}>
                    {appConstant.download}
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
        justifyContent: 'center',
    },
    button: {
        marginBottom: hp(2),
        alignItems: 'center',
        marginTop: hp(2),
        // position: 'absolute'
    },
    walletCardContainer: {
        backgroundColor: colors['red-open'],
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: hp(3),
        paddingBottom: hp(1.5),
        paddingHorizontal: 0
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
        marginHorizontal: wp(1),
    },
    numberContainer: {
        backgroundColor: colors.red,
        borderRadius: wp(1),
        height: hp(2.5),
        width: hp(2.5),
        justifyContent: 'center',
        alignItems: 'center'
    },
    nameContainer: {
        width: wp(15),
        flex: 1
    }
})