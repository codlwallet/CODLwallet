import { BackHandler, FlatList, StyleSheet, View } from 'react-native';
import React, { useEffect } from 'react';
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

export default function CreateWalletScreen({ navigation, route }) {
    const { t } = useTranslation();
    const { numberValue, ButtonValue } = route.params;

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', backAction);
        return async () => {
            BackHandler.removeEventListener('hardwareBackPress', backAction);
        };
    }, []);

    // const handleBackClick = () => {
    //     console.log("sdhsghja")
    //     navigation.navigate(appConstant.attentionScreen2, {
    //         ButtonValue: ButtonValue,
    //         numberValue: numberValue,
    //         from: appConstant.createWallet
    //     })
    // }

    const handleProceedClick = async () => {
        navigation.navigate(appConstant.attentionScreen3, {
            ButtonValue: ButtonValue,
            numberValue: numberValue,
        });
        await AsyncStorage.setItem('WalletData', JSON.stringify(numberValue && createWalletData.slice(0, numberValue)));
    };

    const backAction = () => {
        navigation.navigate(appConstant.attentionScreen2, {
            ButtonValue: ButtonValue,
            numberValue: numberValue,
            from: appConstant.createWallet,
        });
        return true;
    };

    return (
        <View style={styles.container}>
            <Header title={t("createWallet")} showRightIcon RightIcon={'info'} showBackIcon onBackPress={backAction} statusBarcolor={colors.red} />
            <View style={styles.subContainer}>
                <WalletCard
                    style={styles.walletCardContainer}
                    titleColor={'red'}
                    headerStyle={{ borderColor: colors.red }}
                    title={t("recoverySeeds")}
                    children={
                        <FlatList
                            data={numberValue && createWalletData.slice(0, numberValue)}
                            numColumns={3}
                            columnWrapperStyle={{ justifyContent: 'space-between' }}
                            keyExtractor={item => {
                                return item.id;
                            }}
                            renderItem={({ item, index }) => {
                                return (
                                    <View style={styles.seedsContainer}>
                                        <View style={styles.numberContainer}>
                                            <FontText
                                                name={'inter-bold'}
                                                size={normalize(12)}
                                                color={'white'}>
                                                {item?.id}
                                            </FontText>
                                        </View>
                                        <View style={styles.nameContainer}>
                                            <FontText
                                                name={'inter-regular'}
                                                size={normalize(14)}
                                                color={'red'}
                                                pLeft={wp(1)}>
                                                {item?.name}
                                            </FontText>
                                        </View>
                                    </View>
                                );
                            }}
                        />
                    }
                />
            </View>
            <Button
                flex={null}
                height={hp(8.5)}
                bgColor="white"
                type="highlight"
                borderRadius={11}
                width={wp(90)}
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
        alignSelf: 'center'
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
