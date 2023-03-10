import React, { useEffect } from 'react'
import { Image, StyleSheet, View, Alert } from 'react-native'
import colors from '../../assets/colors';
import SvgIcons from '../../assets/SvgIcons';
import Button from '../../components/common/Button';
import FontText from '../../components/common/FontText';
import appConstant from '../../helper/appConstant';
import { hp, normalize } from '../../helper/responsiveScreen';

import DeviceInfo from 'react-native-device-info';
import { check, initial } from '../../storage';

const WelcomeScreen = (props) => {
    const { navigation } = props

    const onPressStartBtn = () => {
        const uniqueId = DeviceInfo.getUniqueIdSync();
        check().then((res) => {
            if (res.isExist) {
                navigation.navigate(appConstant.lockUser)
            } else {
                navigation.navigate(appConstant.setupUser)
            }
        }).catch((e) => {
            navigation.navigate(appConstant.setupUser)
        })

    }

    useEffect(() => {
        initial()
        const uniqueId = DeviceInfo.getUniqueIdSync();
        check().then((res) => {
            if (res.isExist) {
                navigation.navigate(appConstant.lockUser)
            }
        }).catch((e) => {
            Alert.alert('Failed', 'You have got an error.')
        })
    }, [])

    return (
        <View style={styles.container}>
            {/* <Image source={require('../../assets/images/AppLogo.png')} /> */}
            {/* <Image source={require('../../assets/images/AppName.png')} style={styles.image} /> */}
            {/* <SvgIcons.AppIcon /> */}
            {/* <View style={styles.image}>
                <SvgIcons.AppName />
            </View> */}
            <SvgIcons.AppLogo />
            <Button
                flex={null}
                height={hp(6.5)}
                width="90%"
                type="highlight"
                borderRadius={11}
                bgColor="white"
                onPress={onPressStartBtn}
                style={styles.button}>
                <FontText name={"inter-medium"} size={normalize(16)} color="black">
                    {appConstant.getStarted}
                </FontText>
            </Button>
        </View>
    )
}

export default WelcomeScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.black,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        paddingTop: hp(4.5)

    },
    image: {
        marginTop: hp(4)
    },
    button: {
        backgroundColor: colors.white,
        position: 'absolute',
        bottom: hp(4),
        alignItems: 'center'
    }
})