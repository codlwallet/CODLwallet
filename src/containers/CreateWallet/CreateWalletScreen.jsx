import { BackHandler, FlatList, StyleSheet, View, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import colors from '../../assets/colors';
import Header from '../../components/common/Header';
import appConstant from '../../helper/appConstant';
import { hp, isIOS, normalize, wp } from '../../helper/responsiveScreen';
import Button from '../../components/common/Button';
import FontText from '../../components/common/FontText';
import { createWalletData } from '../../constants/data';
import WalletCard from '../../components/WalletCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import DeviceInfo from 'react-native-device-info'

import RNFS from 'react-native-fs';
import { useDispatch } from 'react-redux'
import { setAccountsData, setConfirmData } from '../../redux/slices/authSlice'
import { create } from '../../storage'

export default function CreateWalletScreen({ navigation, route }) {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const { numberValue, ButtonValue } = route.params;
    const [words, setWords] = useState([])
    const [downloadText, setText] = useState()

    const handleBackClick = () => {
        navigation.navigate(appConstant.attentionScreen2, {
            ButtonValue: ButtonValue,
            numberValue: numberValue,
            from: appConstant.createWallet
        })
    }

    const handleProceedClick = async () => {
        let confirm_data = [];
        for (let _k = 0; _k < 3; _k++) {
            let confirmIndex;
            while (1) {
                confirmIndex = Math.ceil((Math.random() * numberValue));
                let _indexs = confirm_data.map(v => v.index);
                if (_indexs.indexOf(confirmIndex) < 0) {
                    break;
                }
            }
            let confirmWords = [
                {
                    number: (confirmIndex == 1 ? 3 : confirmIndex - 1),
                    name: words[(confirmIndex == 1 ? 3 : confirmIndex - 1) - 1]
                },
                {
                    number: confirmIndex,
                    name: words[confirmIndex - 1]
                },
                {
                    number: (confirmIndex == numberValue ? (numberValue - 2) : confirmIndex + 1),
                    name: words[(confirmIndex == numberValue ? (numberValue - 2) : confirmIndex + 1) - 1]
                },
            ]
            confirmWords.sort((a, b) => 0.5 - Math.random())
            confirm_data = [...confirm_data, {
                index: confirmIndex,
                words: confirmWords
            }]
        }
        confirm_data.sort((a, b) => a.index - b.index)
        dispatch(setConfirmData(confirm_data));
        navigation.navigate(appConstant.attentionScreen3, {
            ButtonValue: ButtonValue,
            numberValue: numberValue,
        });
    };

    const download = () => {
        let path = `${RNFS.DownloadDirectoryPath}/Wallet (${new Date().toDateString()}).txt`;
        RNFS.writeFile(path, downloadText, 'utf8').then((res) => {
            Alert.alert("Saved the wallet.", 'Wallet.txt')
        }
        ).catch((err) => {
            console.log(err, "err")
            Alert.alert("Permission denied.")
        });
    }

    const backAction = () => {
        navigation.navigate(appConstant.attentionScreen2, {
            ButtonValue: ButtonValue,
            numberValue: numberValue,
            from: appConstant.createWallet,
        });
        return true;
    };
    useEffect(() => {
        if (numberValue > 0 && words.length == 0) {
            const uniqueId = DeviceInfo.getUniqueIdSync();
            const data = {
                count: numberValue,
                machineId: uniqueId
            }

            create(data).then((res) => {
                let mnemonic = res.words;
                if (res.status) {
                    setText(mnemonic)
                    const sortWords = mnemonic?.split(" ")
                    console.log('sortWords', sortWords)
                    setWords(sortWords)
                    dispatch(setAccountsData(res.walletData));
                }
            }).catch((e) => {
                Alert.alert('Error!', 'You have got an error.');
            })
        }
    }, [numberValue])

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', backAction);
        return async () => {
            BackHandler.removeEventListener('hardwareBackPress', backAction);
        };
    }, []);

    return (
        <View style={styles.container}>
            <Header title={t("createWallet")} showRightIcon RightIcon={'info'} showBackIcon onBackPress={backAction} statusBarcolor={colors.red} style={{ alignSelf: 'center' }} />
            <View style={styles.subContainer}>
                {
                    words.length > 0 &&
                    <WalletCard
                        style={styles.walletCardContainer}
                        titleColor={'red'}
                        headerStyle={{ borderColor: colors.red }}
                        title={t("recoverySeeds")}
                        children={
                            <FlatList
                                data={["123", "123", "123"]}
                                numColumns={3}
                                columnWrapperStyle={{ justifyContent: 'space-between' }}
                                keyExtractor={item => {
                                    return item.toString();
                                }}
                                renderItem={({ item, index }) => {
                                    return (
                                        <View key={index} style={styles.seedsContainer}>
                                            <View style={styles.numberContainer}>
                                                <FontText
                                                    name={'inter-bold'}
                                                    size={normalize(12)}
                                                    color={'white'}>
                                                    {index + 1}
                                                </FontText>
                                            </View>
                                            <View style={styles.nameContainer}>
                                                <FontText
                                                    name={'inter-regular'}
                                                    size={normalize(14)}
                                                    color={'red'}
                                                    pLeft={wp(1)}>
                                                    {item}
                                                </FontText>
                                            </View>
                                        </View>
                                    );
                                }}
                            />
                        }
                    />
                }
            </View>
            <Button
                flex={null}
                height={hp(8.5)}
                bgColor="white"
                type="highlight"
                borderRadius={11}
                style={{ marginBottom: hp(2) }}
                onPress={handleProceedClick}
                buttonStyle={styles.button}>
                <FontText name={'inter-medium'} size={normalize(22)} color={'red'}>
                    {t("proceed")}
                </FontText>
            </Button>
        </View>
    );
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
        alignItems: 'center',
        width: wp(90),
    },
    walletCardContainer: {
        backgroundColor: colors['red-open'],
        paddingTop: isIOS ? hp(2.5) : hp(3),
        paddingBottom: isIOS ? hp(1) : hp(1),
        paddingHorizontal: isIOS ? wp(4.5) : wp(3.5),
    },
    seedsContainer: {
        backgroundColor: colors.white,
        borderRadius: wp(2),
        width: isIOS ? wp(26) : wp(27),
        height: hp(4),
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: isIOS ? wp(1.2) : wp(1.2),
        marginBottom: hp(1),
    },
    numberContainer: {
        backgroundColor: colors.red,
        borderRadius: wp(1),
        height: hp(2.5),
        width: hp(2.5),
        justifyContent: 'center',
        alignItems: 'center',
    },
    nameContainer: {
        width: wp(15),
        flex: 1,
    },
});
