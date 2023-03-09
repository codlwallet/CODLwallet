import { Image, StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import colors from '../../assets/colors'
import Header from '../../components/common/Header'
import { mainData, settingData } from '../../constants/data'
import FontText from '../../components/common/FontText'
import { hp, normalize, wp } from '../../helper/responsiveScreen'
import Button from '../../components/common/Button'
import appConstant from '../../helper/appConstant'

export default function MainScreen({ navigation, route }) {
    const { hidden } = route?.params
    const [hideMenu, setHideMenu] = useState(false);

    console.log("hidden.......", hidden)

    const handleConnectClick = () => {

    }

    const handleLockDeviceClick = () => {

    }

    return (
        <View style={styles.container}>
            <Header title={'Alice’s Crypto'} showRightIcon RightIcon={!hideMenu ? 'menu' : 'false'} RightIconPress={() => setHideMenu(!hideMenu)} style={{ height: hp(10) }} />
            <View style={styles.subConatiner}>
                {!hideMenu ?
                    <>
                        {mainData.map((item, index) => {
                            return (
                                <View style={styles.buttonContainer} key={index} >
                                    <View>
                                        {item?.icon}
                                    </View>
                                    {item?.image && <Image source={item.image} style={{ width: hp(3), height: hp(6) }} />}
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
                                    <FontText size={normalize(22)} color={'white'} name={'inter-regular'} >
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
                height={hp(7)}
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
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
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