import { BackHandler, FlatList, StyleSheet, View, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import colors from '../../assets/colors';
import Header from '../../components/common/Header';
import appConstant from '../../helper/appConstant';
import { hp, isIOS, normalize, wp } from '../../helper/responsiveScreen';
import Button from '../../components/common/Button';
import FontText from '../../components/common/FontText';
import WalletCard from '../../components/WalletCard';
import { useTranslation } from 'react-i18next';
import DeviceInfo from 'react-native-device-info'
import { useDispatch } from 'react-redux'
import { setConfirmData } from '../../redux/slices/authSlice'
import { create, createAccounts } from '../../storage'
import RnBgTask from 'react-native-bg-thread';

export default function CreateWalletScreen({ navigation, route }) {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const { numberValue, ButtonValue } = route.params;
    const [words, setWords] = useState([])
    const [downloadText, setText] = useState()

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', backAction);
        return async () => {
            BackHandler.removeEventListener('hardwareBackPress', backAction);
        };
    }, []);

    const handleProceedClick = async () => {
        dispatch(setConfirmData(words));
        navigation.navigate(appConstant.attentionScreen3, {
            ButtonValue: ButtonValue,
            numberValue: numberValue,
        });
    };

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
                    setWords(sortWords);

                    RnBgTask.runInBackground_withPriority("MIN", () => {
                        createAccounts()
                    })

                    // dispatch(setAccountsData(res.walletData));
                }
            }).catch((e) => {
                Alert.alert('Error!', 'You have got an error.');
            })
        }
    }, [numberValue])
    return (
        <View style={styles.container}>
            <Header title={t("createWallet")} showRightIcon RightIcon={'info'} showBackIcon onBackPress={backAction} statusBarcolor={colors.red} />
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
                                data={words}
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
                bgColor="white"
                type="highlight"
                borderRadius={11}
                onPress={handleProceedClick}
                style={styles.button}
            >
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
        marginBottom: hp(3),
        alignSelf: 'center',
        // width: wp(90),
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
