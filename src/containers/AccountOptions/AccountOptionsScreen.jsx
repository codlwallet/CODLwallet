import { BackHandler, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import appConstant from '../../helper/appConstant'
import colors from '../../assets/colors'
import Header from '../../components/common/Header'
import ButtonView from '../../components/common/ButtonList'
import { hp, wp } from '../../helper/responsiveScreen'
import { useTranslation } from 'react-i18next'

export default function AccountOptionsScreen({ route, navigation }) {
    const { t } = useTranslation();
    const walletName = route?.params?.walletName
    const name = route?.params?.name
    const accountList = route?.params?.accountList
    const walletAddress = route?.params?.walletAddress
    const [accountOptionArray, setAccountOptionArray] = useState([{
        id: 1,
        name: 'Hesabı yeniden adlandır',
        value: appConstant.renameAccount,
    },
    {
        id: 2,
        name: 'Hesabı kaldır',
        value: appConstant.removeAccount,
    },
    {
        id: 3,
        name: 'Hesap oluşturmak',
        value: appConstant.createAccount,
    },])

    useEffect(() => {
        if (accountList.length > 1) {
            let array = accountOptionArray.slice(0, -1)
            console.log("array", array)
            setAccountOptionArray(array)
        }
        else {
            setAccountOptionArray(accountOptionArray)
        }

    }, [accountList]);

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', backAction);
        return async () => {
            BackHandler.removeEventListener('hardwareBackPress', backAction);
        };
    }, []);

    // console.log("..", Math.min())

    const handleAccountOptionClick = (item) => {
        if (item.value === appConstant.createAccount) {
            navigation.navigate(appConstant.createAccount, {
                name: name,
            })
        }
        else if (item.value === appConstant.renameAccount) {
            navigation.navigate(appConstant.renameAccount, {
                name: name,
                walletName: walletName,
                accountList: accountList,
                walletAddress: walletAddress
            })
        }
        else if (item.value === appConstant.removeAccount) {
            navigation.navigate(appConstant.removeAccount, {
                name: name,
                walletName: walletName,
                accountList: accountList,
                walletAddress: walletAddress
            })
        }
    }

    const backAction = () => {
        navigation.goBack()
        return true;
    };

    return (
        <View style={styles.container}>
            <Header title={walletName} showRightIcon RightIcon={'false'} titleStyle={{ left: wp(24) }} RightIconPress={() => navigation.goBack()} />
            <View style={styles.buttonContainer}>
                {accountOptionArray.map((item, index) => {
                    return (
                        <TouchableOpacity key={index} onPress={() => {
                            handleAccountOptionClick(item)
                            // setButtonValue(item?.value)
                            // setButtonIndex(index)
                        }}>
                            <ButtonView listItem={item} showRightIcon index={index} />
                        </TouchableOpacity>
                    )
                })
                }
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
    bottomView: {
        position: 'absolute',
        bottom: hp(3),
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
