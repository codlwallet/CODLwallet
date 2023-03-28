import { BackHandler, Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import colors from '../../assets/colors';
import { hp, normalize, wp } from '../../helper/responsiveScreen';
import Header from '../../components/common/Header';
import FontText from '../../components/common/FontText';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import { walletListData } from '../../constants/data'
import ButtonView from '../../components/common/ButtonList';
import appConstant from '../../helper/appConstant';
import Button from '../../components/common/Button';
import SvgIcons from '../../assets/SvgIcons';

export default function AccountListScreen({ navigation, route }) {
    const { t } = useTranslation();
    const name = route?.params?.name
    const accountList = route?.params?.accountList
    const [walletData, setWalletData] = useState()
    const [showList, setShowList] = useState(true)
    const [btnValue, setButtonValue] = useState()
    const [buttonIndex, setButtonIndex] = useState()
    const [showReorder, setShowReorder] = useState(false)
    const [accountValue, setAccountValue] = useState()

    useEffect(() => {
        async function getWalletData() {
            const data = await AsyncStorage.getItem('WalletList');
            setWalletData(JSON.parse(data))
        }
        getWalletData()
    }, [])

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', backAction);
        return async () => {
            BackHandler.removeEventListener('hardwareBackPress', backAction);
        };
    }, []);

    const backAction = () => {
        navigation.goBack()
        return true;
    };

    const handleWalletOptionClick = (item, index) => {
        setButtonValue(item?.name)
        setButtonIndex(index)
        if (item.value === appConstant.createNewAccount) {
            navigation.navigate(appConstant.createAccount, {
                name: name
            })
        }
        else {
            setShowReorder(true)
            setButtonValue('')
            setButtonIndex()
        }
    }

    const handleDoneClick = () => {
        setShowReorder(false)
    }

    const onClickAccount = (itm) => {
        setAccountValue(itm?.walletName)
        if (!showReorder) {
            navigation.navigate(appConstant.accountDetails, {
                walletName: itm?.walletName,
                from: appConstant.accountList,
                onGoBack: () => {
                    setAccountValue('')
                },
            })
        }
    }

    return (
        <View style={styles.container}>
            {showReorder && !showList ?
                <Header title={t('reorder')}
                    showRightIcon
                    RightIcon={'false'}
                    showBackIcon
                    onBackPress={backAction}
                    statusBarcolor={colors.black}
                    RightIconPress={() => { setShowReorder(false), setShowList(false) }} />
                :
                <Header title={name}
                    showRightIcon
                    RightIcon={!showReorder && !showList ? 'false' : 'menu'}
                    showBackIcon={showList ? true : false}
                    onBackPress={backAction}
                    statusBarcolor={colors.black}
                    titleStyle={{ left: showList ? 0 : wp(30) }}
                    titleIcon={
                        name === appConstant.bitcoin ?
                            <SvgIcons.Bitcoin height={hp(5)} width={hp(3)} /> :
                            name === appConstant.ethereum ?
                                <Image source={require('../../assets/images/EV.png')} style={{ width: hp(3.5), height: hp(5.5), }} /> :
                                name === appConstant.solana ?
                                    <SvgIcons.Solana height={hp(5.5)} width={hp(3.5)} /> :
                                    name === appConstant.avalanche ?
                                        <View style={{ backgroundColor: colors.black }}>
                                            <Image source={require('../../assets/images/img.png')} style={{ height: hp(6), width: hp(6) }} />
                                        </View> :
                                        <SvgIcons.Poly height={hp(5.5)} width={hp(4)} />
                    }
                    RightIconPress={() => { setShowList(!showList) }}
                    titleWithIcon />
            }
            <View style={styles.subContainer}>
                {showList || showReorder ?
                    <ScrollView contentContainerStyle={{ justifyContent: 'center', alignItems: 'center', flexGrow: 1, paddingVertical: hp(0.5) }}  >
                        {accountList.map((item, index) => {
                            return (
                                <View key={index} style={styles.listView}>
                                    {item?.walletName === accountValue && <SvgIcons.DotIcon style={{ left: wp(-2) }} />}
                                    <TouchableOpacity style={[styles.buttonContainer, { backgroundColor: item?.walletName === accountValue ? colors.white : colors.gray }]} onPress={() => onClickAccount(item)}>
                                        <FontText name={"inter-regular"} size={normalize(22)} color={item?.walletName === accountValue ? "black" : 'white'}  >
                                            {item?.walletName}
                                        </FontText>
                                        <FontText name={"inter-regular"} size={normalize(15)} color={item?.walletName === accountValue ? "black" : 'white'}  >
                                            {"0xa94bb...a710"}
                                        </FontText>
                                    </TouchableOpacity>
                                </View>
                            )
                        })
                        }
                    </ScrollView>
                    :
                    <>
                        {walletListData?.map((item, index) => {
                            return (
                                <TouchableOpacity key={index} onPress={() => handleWalletOptionClick(item, index)}>
                                    <ButtonView listItem={item} showRightIcon index={index} buttonIndex={buttonIndex} />
                                </TouchableOpacity>
                            )
                        })
                        }
                    </>
                }
            </View>

            {showReorder && <Button
                flex={null}
                type="highlight"
                borderRadius={11}
                bgColor="white"
                onPress={handleDoneClick}
                buttonStyle={styles.button}>
                <FontText name={"inter-medium"} size={normalize(22)} color="black">
                    {t("done")}
                </FontText>
            </Button>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.black,
    },
    subContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    buttonContainer: {
        height: hp(8.5),
        width: '95%',
        borderRadius: wp(2),
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingHorizontal: wp(5),
        backgroundColor: colors.gray,
    },
    image: {
        width: hp(3),
        height: hp(5),
    },
    button: {
        backgroundColor: colors.white,
        marginBottom: hp(3),
        height: hp(8.5),
        width: wp(90)
    },
    listView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: wp(93),
        marginBottom: hp(2)
    }

})