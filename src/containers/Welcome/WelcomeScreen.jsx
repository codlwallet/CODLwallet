import React from 'react'
import { useTranslation } from 'react-i18next';
import { StatusBar, StyleSheet, View } from 'react-native'
import colors from '../../assets/colors';
import SvgIcons from '../../assets/SvgIcons';
import Button from '../../components/common/Button';
import FontText from '../../components/common/FontText';
import appConstant from '../../helper/appConstant';
import { hp, normalize, wp } from '../../helper/responsiveScreen';

const WelcomeScreen = ({ navigation, route }) => {
    const { t } = useTranslation();
    const from = route?.params?.from

    const onPressStartBtn = () => {
        navigation.navigate(appConstant.setupUser, {
            from: from
        })
    }
    return (
        <>
            {/* <StatusBar backgroundColor={colors.black} /> */}
            <View style={styles.container}>
                <SvgIcons.AppLogo />
                <Button
                    flex={null}
                    height={hp(8.5)}
                    type="highlight"
                    borderRadius={11}
                    bgColor="white"
                    width={wp(90)}
                    onPress={onPressStartBtn}
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
    buttonView: {
        position: 'absolute',
        bottom: hp(3)
    },
})