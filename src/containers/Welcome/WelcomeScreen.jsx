import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { Image, StatusBar, StyleSheet, View } from 'react-native'
import colors from '../../assets/colors';
import SvgIcons from '../../assets/SvgIcons';
import Button from '../../components/common/Button';
import FontText from '../../components/common/FontText';
import appConstant from '../../helper/appConstant';
import { hp, normalize, wp } from '../../helper/responsiveScreen';
import { check } from '../../storage';
import constants from '../../helper/appConstant';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/slices/authSlice';


const WelcomeScreen = ({ navigation, route }) => {
    const { t } = useTranslation();
    const dispatch=useDispatch()

    const [from, setFrom] = useState(route?.params?.from)

    // const from = route?.params?.from

    useEffect(() => {

        check().then(res => {
            if (res.status) {
                if (res.isExist){
                    setFrom(constants.welcomePurchase)
                    dispatch(setUser(res.user));
                }
            }
        })
        return () => {
        }
    }, [])


    const onPressStartBtn = () => {
        navigation.navigate(appConstant.setupUser, {
            from: from,
        })
    }

    return (
        <>
            <StatusBar backgroundColor={colors.black} />
            <View style={styles.container}>
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
                        {from ? t("unlock") : t("getStarted")}
                    </FontText>
                </Button>
            </View>
        </>

    )
}

export default WelcomeScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.black,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
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