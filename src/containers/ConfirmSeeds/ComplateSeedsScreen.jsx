import { StatusBar, StyleSheet, View } from 'react-native'
import React, { useEffect } from 'react'
import colors from '../../assets/colors'
import SvgIcons from '../../assets/SvgIcons'
import { hp } from '../../helper/responsiveScreen'
import appConstant from '../../helper/appConstant'
import AttentionWarningView from '../../components/AttentionWarningView'

export default function ComplateSeedsScreen(props) {
    const { navigation } = props
    useEffect(() => {
        setTimeout(() => {
            navigation.navigate(appConstant.welcomePurchase)
        }, 2000);
    }, [])

    return (
        <View style={styles.container}>
            <StatusBar
                barStyle={'light-content'}
                translucent
                backgroundColor={colors.black}
            />
            <AttentionWarningView
                title={appConstant.complate}
                mainIcon={<View style={styles.imageContainer}>
                    <SvgIcons.BlackCheck />
                </View>}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.black,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageContainer: {
        backgroundColor: colors.white,
        justifyContent: 'center',
        alignItems: 'center',
        height: hp(8),
        width: hp(8),
        borderRadius: hp(4)
    }
})