import { StyleSheet, View } from 'react-native'
import React from 'react'
import colors from '../../assets/colors'
import Header from '../../components/common/Header'
import appConstant from '../../helper/appConstant'
import SvgIcons from '../../assets/SvgIcons'
import { hp, wp } from '../../helper/responsiveScreen'
import AttentionWarningView from '../../components/AttentionWarningView'

export default function AttentionScreen1({ navigation, route }) {
    const { ButtonValue, numberValue } = route.params

    const handleUnderStandBtnClick = () => {
        navigation.navigate(ButtonValue === appConstant.createWallet ? appConstant.createWallet : appConstant.importWallet, {
            numberValue: numberValue,
            ButtonValue: ButtonValue
        })
    }

    return (
        <View style={styles.container}>
            <Header showRightIcon RightIcon={'info'} />
            <AttentionWarningView title={appConstant.watchSurroundings}
                mainIcon={<SvgIcons.HideEye height={hp(8)} width={hp(8)} />}
                description={appConstant.attention1Description}
                showButton1
                firstBtnTitle={appConstant.understand}
                buttonValue={appConstant.understand}
                handleFirstBtnClick={handleUnderStandBtnClick}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.black,
        alignItems: 'center',
    },
    subContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: wp(6),
    },
    button: {
        backgroundColor: colors.white,
        marginBottom: hp(4),
        alignItems: 'center',
    }
})