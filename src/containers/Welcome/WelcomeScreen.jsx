import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { StatusBar, StyleSheet, View } from 'react-native'
import colors from '../../assets/colors';
import SvgIcons from '../../assets/SvgIcons';
import Button from '../../components/common/Button';
import FontText from '../../components/common/FontText';
import appConstant from '../../helper/appConstant';
import { hp, normalize, wp } from '../../helper/responsiveScreen';
import { check } from '../../storage';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/slices/authSlice';
import { useFocusEffect } from '@react-navigation/native';

const WelcomeScreen = ({ navigation, route }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch()

    const [from, setFrom] = useState(route?.params?.from)

    useFocusEffect(
        React.useCallback(() => {
            check().then(res => {
                if (res.status) {
                    if (res.isExist) {
                        if (from == appConstant.deleteEverything) setFrom(null);
                        // if (from == appConstant.setupWallet) setFrom(null);
                        else if (!from) {
                            setFrom(appConstant.welcomePurchase);
                        }
                        dispatch(setUser(res.user));
                    } else {
                        if (from == appConstant.setupWallet) {
                            setFrom(appConstant.setupWallet)
                        }
                        else {
                            setFrom(null);

                        }
                    }
                }
            })
        }, []),
    );

    const onPressStartBtn = () => {
        navigation.navigate(appConstant.setupUser, {
            from: from
        })
    }

    return (
        <>
            <View style={styles.container}>
                <SvgIcons.AppLogo />
                <Button
                    flex={null}
                    type="highlight"
                    borderRadius={11}
                    bgColor="white"
                    onPress={onPressStartBtn}
                    style={styles.buttonView}>
                    <FontText name={"inter-medium"} size={normalize(22)} color="black">
                        {from !== null ? t("unlock") : t("getStarted")}
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
        bottom: hp(3)
    },
    // button: {
    //     backgroundColor: colors.white,
    //     alignItems: 'center',
    //     width: wp(90)
    // }
})