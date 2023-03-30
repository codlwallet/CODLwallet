import { BackHandler, Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import colors from '../../assets/colors'
import Header from '../../components/common/Header'
import { mainData } from '../../constants/data'
import FontText from '../../components/common/FontText'
import { hp, normalize, wp } from '../../helper/responsiveScreen'
import Button from '../../components/common/Button'
import SvgIcons from '../../assets/SvgIcons'
import { useTranslation } from 'react-i18next'
import i18n from '../../constants/i18n'

export default function NetworksScreen({ navigation, route }) {
    const { t } = useTranslation();
    const [btnIndex, setBtnIndex] = useState();

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

    // const handleDoneClick = () => {
    //     navigation.goBack()
    // }

    return (
        <View style={styles.container}>
            <Header title={t("networks")} showRightIcon RightIcon={'info'} showBackIcon onBackPress={backAction} />
            <View style={styles.subConatiner}>
                {mainData.map((item, index) => {
                    return (
                        <View style={styles.buttonView} key={index}>
                            {index === btnIndex && <SvgIcons.DotIcon style={{ right: wp(3) }} />}
                            <TouchableOpacity style={[styles.buttonContainer, { backgroundColor: index === btnIndex ? colors.white : colors.gray }]} key={index} onPress={() => setBtnIndex(index)}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    {item.value === 'Bitcoin' ?
                                        <Image source={item.image} style={{ height: hp(5), width: hp(4), tintColor: index === btnIndex ? '#495057' : colors.white }} /> :
                                        item.value === 'Ethereum' ?
                                            <Image source={index === btnIndex ? item?.img : item.image} style={{ width: hp(4), height: hp(6.5) }} /> :
                                            item.value === 'Solana' ?
                                                <Image source={item.image} style={{ height: hp(3.5), width: hp(4.5), tintColor: index === btnIndex ? '#495057' : colors.white }} /> :
                                                item.value === 'Avalanche' ?
                                                    <Image source={item.image} style={{ height: hp(4.3), width: hp(5), tintColor: index === btnIndex ? '#495057' : colors.white }} />
                                                    :
                                                    <Image source={item.image} style={{ height: hp(4), width: hp(4.5), tintColor: index === btnIndex ? '#495057' : colors.white }} />
                                    }
                                    <FontText size={normalize(25)} color={index === btnIndex ? 'black' : 'white'} name={'inter-regular'} pLeft={wp(5)} style={{}}>
                                        {i18n.language === 'tr' ? item?.name : item?.value}
                                    </FontText>
                                </View>
                                {index === btnIndex && <SvgIcons.BlackCheck height={hp(3)} width={hp(3)} />}
                            </TouchableOpacity>
                        </View>
                    )
                })
                }
            </View>
            <Button
                flex={null}
                height={hp(8.5)}
                width={wp(90)}
                type="highlight"
                borderRadius={11}
                bgColor="white"
                onPress={backAction}
                style={styles.button}>
                <FontText name={"inter-medium"} size={normalize(22)} color="black">
                    {t("done")}
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
    buttonView: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonContainer: {
        backgroundColor: colors.gray,
        alignItems: 'center',
        flexDirection: 'row',
        width: wp(88),
        borderRadius: wp(2),
        marginVertical: hp(1),
        paddingHorizontal: wp(4),
        height: hp(9),
        justifyContent: 'space-between'
    },
    button: {
        marginBottom: hp(3),
    }
})