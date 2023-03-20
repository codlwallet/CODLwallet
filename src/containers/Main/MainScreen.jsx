import { BackHandler, Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import colors from '../../assets/colors'
import Header from '../../components/common/Header'
import { mainData, settingData } from '../../constants/data'
import FontText from '../../components/common/FontText'
import { hp, normalize, wp } from '../../helper/responsiveScreen'
import Button from '../../components/common/Button'
import appConstant from '../../helper/appConstant'
import SvgIcons from '../../assets/SvgIcons'
import { useTranslation } from 'react-i18next'

export default function MainScreen({ navigation, route }) {
    const { t } = useTranslation();
    const hidden = route?.params?.hidden
    const [hideMenu, setHideMenu] = useState(false);
    const [showNetworks, setShowNetworks] = useState(false)

    const handleConnectClick = () => {

    }

    const handleLockDeviceClick = () => {

    }

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

    const handleMenuListClick = (item) => {
        if (item.name === t("changeName")) {
            navigation.navigate(appConstant.changeUserDetails, {
                from: appConstant.changeName
            })
        }
        else if (item.name === t("changePIN")) {
            navigation.navigate(appConstant.changeUserDetails, {
                from: appConstant.changePIN
            })
        }
        else if (item.name === t("language")) {
            navigation.navigate(appConstant.language)
        }
        else if (item.name === t("AboutCODL")) {
            navigation.navigate(appConstant.AboutCODL)
        }
        else if (item.name === t("recoveryCheck")) {
            navigation.navigate(appConstant.recoveryWarning)
        }
        else if (item.name === t("networks")) {
            navigation.navigate(appConstant.networks)
        }
        else if (item.name === t("deleteEverything")) {
            navigation.navigate(appConstant.deleteEverything)
        }
    }

    const handleMainListClick = (item) => {
        if (item.name === t("ethereum")) {
            navigation.navigate(appConstant.createAccount)
        }
    }

    return (
        <View style={styles.container}>
            <Header title={'Alice’s Crypto'} showRightIcon RightIcon={!hideMenu ? 'menu' : 'false'} RightIconPress={() => setHideMenu(!hideMenu)} style={{ height: hp(10) }} showHiddenTitle={hidden} />
            <View style={styles.subConatiner}>
                {!hideMenu ?
                    <>
                        {mainData.map((item, index) => {
                            return (
                                <TouchableOpacity style={styles.buttonContainer} key={index} onPress={() => handleMainListClick(item)} >
                                    <View>
                                        {item.name === t("bitcoin") ?
                                            <SvgIcons.Bitcoin height={hp(6)} width={hp(4)} /> :
                                            item.name === t("ethereum") ?
                                                <Image source={item.image} style={{ width: hp(4), height: hp(6.5), }} /> :
                                                item.name === t("solana") ?
                                                    <SvgIcons.Solana height={hp(6)} width={hp(4)} /> :
                                                    item.name === t("avalanche") ?
                                                        <View style={{ backgroundColor: colors.gray }}>
                                                            <Image source={item.image} style={{ height: hp(7), width: hp(7), right: wp(2.5) }} />
                                                        </View> :
                                                        <SvgIcons.Poly height={hp(6)} width={hp(4.5)} />
                                        }
                                    </View>
                                    <FontText size={normalize(25)} color={'white'} name={'inter-regular'} pLeft={wp(5)} style={{ right: item.name === appConstant.avalanche ? wp(6) : 0 }}>
                                        {item?.name}
                                    </FontText>
                                </TouchableOpacity>
                            )
                        })
                        }
                    </>
                    :
                    <>
                        {settingData.map((item, index) => {
                            return (
                                <TouchableOpacity style={[styles.buttonContainer, { height: hp(7) }]} key={index} onPress={() => handleMenuListClick(item)}>
                                    <FontText size={normalize(22)} color={item.name === t("deleteEverything") ? "red" : 'white'} name={'inter-regular'}  >
                                        {item?.name}
                                    </FontText>
                                </TouchableOpacity>
                            )
                        })
                        }
                    </>
                }
            </View>
            <Button
                flex={null}
                height={hp(8.5)}
                width="90%"
                type="highlight"
                borderRadius={11}
                bgColor="white"
                onPress={!hideMenu ? handleConnectClick : handleLockDeviceClick}
                style={styles.button}>
                <FontText name={"inter-medium"} size={normalize(22)} color="black">
                    {!hideMenu ? t("connect") : t("lockDevice")}
                </FontText>
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.black,
        alignItems: 'center'
    },
    subConatiner: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    buttonContainer: {
        backgroundColor: colors.gray,
        alignItems: 'center',
        flexDirection: 'row',
        width: wp(90),
        borderRadius: wp(2),
        marginVertical: hp(1),
        paddingHorizontal: wp(4),
        height: hp(9)
    },
    button: {
        backgroundColor: colors.white,
        marginBottom: hp(3),
        alignItems: 'center',
    }
})