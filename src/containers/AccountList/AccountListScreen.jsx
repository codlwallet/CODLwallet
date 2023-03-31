import { BackHandler, Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import colors from '../../assets/colors';
import { hp, normalize, wp } from '../../helper/responsiveScreen';
import Header from '../../components/common/Header';
import FontText from '../../components/common/FontText';
import { useTranslation } from 'react-i18next';
import { walletListData } from '../../constants/data'
import ButtonView from '../../components/common/ButtonList';
import appConstant from '../../helper/appConstant';
import SvgIcons from '../../assets/SvgIcons';

export default function AccountListScreen({ navigation, route }) {
    const { t } = useTranslation();
    const name = route?.params?.name
    const accountList = route?.params?.accountList
    const headerName = route?.params?.headerName
    const [showList, setShowList] = useState(true)
    const [btnValue, setButtonValue] = useState()
    const [buttonIndex, setButtonIndex] = useState()

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
            setTimeout(() => {
                navigation.navigate(appConstant.createAccount, {
                    name: name,
                    from: appConstant.accountList,
                    onGoBack: () => {
                        setShowList(true)
                    }
                })
                setButtonValue('')
                setButtonIndex()
            }, 200);
        }
        else {
            setTimeout(() => {
                navigation.navigate(appConstant.reorder, {
                    name: name,
                    accountList: accountList,
                    onGoBack: () => {
                        setShowList(true)
                    }
                })
                setButtonValue('')
                setButtonIndex()
            }, 200);
        }
    }

    const onClickAccount = (itm) => {
        navigation.navigate(appConstant.accountDetails, {
            walletName: itm?.walletName,
            from: appConstant.accountList,
        })
    }

    return (
        <View style={styles.container}>
            <Header title={headerName}
                showRightIcon
                style={{ height: hp(10) }}
                RightIcon={showList ? 'menu' : "false"}
                showBackIcon={showList ? true : false}
                onBackPress={backAction}
                statusBarcolor={colors.black}
                titleStyle={{ left: showList ? wp(2.2) : wp(24), width: wp(45) }}
                titleIcon={
                    name === appConstant.bitcoin ?
                        <SvgIcons.Bitcoin height={hp(5)} width={hp(3)} /> :
                        name === appConstant.ethereum ?
                            <Image source={require('../../assets/images/EV.png')} style={{ width: hp(3), height: hp(5), }} /> :
                            name === appConstant.solana ?
                                <SvgIcons.Solana height={hp(5.5)} width={hp(3.5)} /> :
                                name === appConstant.avalanche ?
                                    <View style={{ backgroundColor: colors.black }}>
                                        <Image source={require('../../assets/images/img.png')} style={{ height: hp(3.8), width: hp(4.5) }} />
                                    </View> :
                                    <SvgIcons.Poly height={hp(5.5)} width={hp(4)} />
                }
                RightIconPress={() => { setShowList(!showList) }}
                titleWithIcon />

            <View style={styles.subContainer}>
                {showList ?
                    <ScrollView contentContainerStyle={{ justifyContent: 'center', alignItems: 'center', flexGrow: 1, paddingVertical: hp(0.5) }}  >
                        {accountList?.map((item, index) => {
                            return (
                                <View key={index} style={styles.listView}>
                                    <TouchableOpacity style={[styles.buttonContainer]} onPress={() => onClickAccount(item)}>
                                        <FontText name={"inter-regular"} size={normalize(22)} color={'white'}  >
                                            {item?.walletName}
                                        </FontText>
                                        <FontText name={"inter-regular"} size={normalize(15)} color={'white'}  >
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
    button: {
        marginBottom: hp(3),
    },
    listView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: wp(93),
        marginBottom: hp(2)
    }
})