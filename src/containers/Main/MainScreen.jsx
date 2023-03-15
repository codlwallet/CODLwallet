import { Image, StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import colors from '../../assets/colors'
import Header from '../../components/common/Header'
import { mainData, settingData } from '../../constants/data'
import FontText from '../../components/common/FontText'
import { hp, normalize, wp } from '../../helper/responsiveScreen'
import Button from '../../components/common/Button'
import appConstant from '../../helper/appConstant'
import SvgIcons from '../../assets/SvgIcons'

export default function MainScreen({ navigation, route }) {
    const { hidden } = route?.params
    const [hideMenu, setHideMenu] = useState(false);

    const handleConnectClick = () => {

    }

    const handleLockDeviceClick = () => {

    }

    return (
        <View style={styles.container}>
            <Header title={'Alice’s Crypto'} showRightIcon RightIcon={!hideMenu ? 'menu' : 'false'} RightIconPress={() => setHideMenu(!hideMenu)} style={{ height: hp(10) }} showHiddenTitle={hidden} />
            <View style={styles.subConatiner}>
                {!hideMenu ?
                    <>
                        {mainData.map((item, index) => {
                            return (
                                <View style={styles.buttonContainer} key={index} >
                                    <View>
                                        {item.name === 'Bitcoin' ?
                                            <SvgIcons.Bitcoin height={hp(6)} width={hp(4)} /> :
                                            item.name === 'Ethereum' ?
                                                <Image source={item.image} style={{ width: hp(3), height: hp(6) }} /> :
                                                item.name === 'Solana' ?
                                                    <SvgIcons.Solana height={hp(6)} width={hp(4)} /> :
                                                    item.name === 'Avalanche' ?
                                                        <View style={{ backgroundColor: colors.white, padding: 0, }}>
                                                            <SvgIcons.AV height={hp(6)} width={hp(4)} />
                                                        </View> :
                                                        <SvgIcons.Poly height={hp(6)} width={hp(4)} />
                                        }
                                    </View>
                                    <FontText size={normalize(25)} color={'white'} name={'inter-regular'} pLeft={wp(5)}>
                                        {item?.name}
                                    </FontText>
                                </View>
                            )
                        })
                        }
                    </>
                    :
                    <>
                        {settingData.map((item, index) => {
                            return (
                                <View style={[styles.buttonContainer, { height: hp(7) }]} key={index} >
                                    <FontText size={normalize(22)} color={item.name === appConstant.deleteEverything ? "red" : 'white'} name={'inter-regular'} >
                                        {item?.name}
                                    </FontText>
                                </View>
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
                    {!hideMenu ? appConstant.connect : appConstant.lockDevice}
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