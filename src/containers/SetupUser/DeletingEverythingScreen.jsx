import { BackHandler, StatusBar, StyleSheet, View } from 'react-native'
import React, { useEffect, } from 'react'
import colors from '../../assets/colors'
import { hp, } from '../../helper/responsiveScreen'
import SvgIcons from '../../assets/SvgIcons'
import AttentionWarningView from '../../components/AttentionWarningView'
import { useTranslation } from 'react-i18next'
import { initial } from '../../storage'
import appConstant from '../../helper/appConstant'

export default function DeletingEverythingScreen({ navigation }) {
    const { t } = useTranslation();

    useEffect(() => {
        setTimeout(() => {
            initial().then((res) => {
                navigation.navigate(appConstant.welcome, { from: appConstant.deleteEverything })
            })
        }, 5000);
    }, []);

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

    return (
        <View style={styles.container}>
            <StatusBar
                barStyle={'light-content'}
                translucent
                backgroundColor={colors.red}
            />
            <AttentionWarningView
                isBgRed
                bgColor
                title={t("deletingEverything")}
                mainIcon={<SvgIcons.RedPolygon height={hp(11)} width={hp(11)} />}
                description={t("deletingEveryDis")}
            />
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.red,
    },
})
