import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import colors from '../../assets/colors'
import Header from '../../components/common/Header'
import { mainData, settingData } from '../../constants/data'
import FontText from '../../components/common/FontText'
import { hp, normalize, wp } from '../../helper/responsiveScreen'
import Button from '../../components/common/Button'
import appConstant from '../../helper/appConstant'
import SvgIcons from '../../assets/SvgIcons'

export default function NetworksScreen({ navigation, route }) {
    const [btnIndex, setBtnIndex] = useState(0);

    const handleDoneClick = () => {

    }

    return (
        <View style={styles.container}>
            <Header title={appConstant.networks} showRightIcon RightIcon={'info'} showBackIcon onBackPress={() => navigation.goBack()} />
            <View style={styles.subConatiner}>
                {mainData.map((item, index) => {
                    return (
                        <TouchableOpacity style={[styles.buttonContainer, { backgroundColor: index === btnIndex ? colors.white : colors.gray }]} key={index} onPress={() => setBtnIndex(index)}>
                            <View>
                                {item.name === 'Bitcoin' ?
                                    <Image source={item.image} style={{ height: hp(5.2), width: hp(4), tintColor: index === btnIndex ? '#495057' : colors.white }} /> :
                                    item.name === 'Ethereum' ?
                                        <Image source={index === btnIndex ? item?.img : item.image} style={{ width: hp(4), height: hp(6.5) }} /> :
                                        item.name === 'Solana' ?
                                            <Image source={item.image} style={{ height: hp(4), width: hp(4), tintColor: index === btnIndex ? '#495057' : colors.white }} /> :
                                            item.name === 'Avalanche' ?
                                                <View style={{ backgroundColor: index === btnIndex ? colors.white : colors.gray }}>
                                                    <Image source={item.image} style={{ height: hp(7), width: hp(7), right: wp(2.5), }} />
                                                </View> :
                                                <Image source={item.image} style={{ height: hp(5), width: hp(5), tintColor: index === btnIndex ? '#495057' : colors.white }} />
                                }
                            </View>
                            <FontText size={normalize(25)} color={index === btnIndex ? 'black' : 'white'} name={'inter-regular'} pLeft={wp(5)} style={{ right: item.name === 'Avalanche' ? wp(6) : 0 }}>
                                {item?.name}
                            </FontText>
                        </TouchableOpacity>
                    )
                })
                }
            </View>
            <Button
                flex={null}
                height={hp(8.5)}
                width="90%"
                type="highlight"
                borderRadius={11}
                bgColor="white"
                // onPress={!hideMenu ? handleConnectClick : handleLockDeviceClick}
                style={styles.button}>
                <FontText name={"inter-medium"} size={normalize(22)} color="black">
                    {appConstant.done}
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