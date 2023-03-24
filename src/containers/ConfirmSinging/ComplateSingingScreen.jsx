import { BackHandler, StyleSheet, View } from 'react-native'
import React, { useEffect } from 'react'
import colors from '../../assets/colors'
import SvgIcons from '../../assets/SvgIcons'
import { hp, normalize, wp } from '../../helper/responsiveScreen'
import appConstant from '../../helper/appConstant'
import AttentionWarningView from '../../components/AttentionWarningView'
import { useTranslation } from 'react-i18next'
import Button from '../../components/common/Button'
import FontText from '../../components/common/FontText'
import Header from '../../components/common/Header'

export default function ComplateSingingScreen({ navigation, route }) {
    const walletName = route?.params?.walletName
    const from = route?.params?.from
    const { t } = useTranslation();

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', backAction);
        return async () => {
            BackHandler.removeEventListener('hardwareBackPress', backAction);
        };
    }, []);

    const backAction = () => {
        navigation.navigate(appConstant.accountDetails, {
            walletName: walletName
        });
        return true;
    };

    const handlebroadcastTransactionBtn = () => {
        navigation.navigate(appConstant.broadcastTransaction, {
            walletName: walletName
        })
    }

    return (
        <View style={styles.container}>
            <Header statusBarcolor={colors.black} RightIconPress={backAction} showRightIcon RightIcon={'false'} />
            <AttentionWarningView
                title={t("transactionSigned")}
                mainIcon={<View style={styles.imageContainer}>
                    <SvgIcons.BlackCheck />
                </View>}
            />
            <Button
                flex={null}
                height={hp(8.5)}
                type="highlight"
                borderRadius={11}
                bgColor="white"
                onPress={handlebroadcastTransactionBtn}
                buttonStyle={styles.button}
                style={styles.buttonView}>
                <FontText name={"inter-medium"} size={normalize(22)} color="black">
                    {t("broadcastTransaction")}
                </FontText>
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.black,
        flex: 1,
    },
    imageContainer: {
        backgroundColor: colors.white,
        justifyContent: 'center',
        alignItems: 'center',
        height: hp(8),
        width: hp(8),
        borderRadius: hp(4)
    },
    buttonView: {
        marginBottom: hp(2)
    },
    button: {
        backgroundColor: colors.white,
        width: wp(90),
    },
})
