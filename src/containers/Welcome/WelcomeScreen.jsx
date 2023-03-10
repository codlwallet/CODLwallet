import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import colors from '../../assets/colors';
import SvgIcons from '../../assets/SvgIcons';
import Button from '../../components/common/Button';
import FontText from '../../components/common/FontText';
import appConstant from '../../helper/appConstant';
import { hp, normalize, wp } from '../../helper/responsiveScreen';

const WelcomeScreen = (props) => {
    const { navigation } = props

    const onPressStartBtn = () => {
        navigation.navigate(appConstant.setupUser)
    }

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
                height={hp(8.5)}
                type="highlight"
                borderRadius={11}
                bgColor="white"
                onPress={onPressStartBtn}
                buttonStyle={styles.button}
                style={styles.buttonView}>
                <FontText name={"inter-medium"} size={normalize(22)} color="black">
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
    buttonView: {
        position: 'absolute',
        bottom: hp(4)
    },
    button: {
        backgroundColor: colors.white,
        alignItems: 'center',
        width: wp(90)
    }
})