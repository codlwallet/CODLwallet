import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import colors from '../../assets/colors'
import { hp, normalize, wp } from '../../helper/responsiveScreen'
import FontText from '../../components/common/FontText'
import appConstant from '../../helper/appConstant'
import { aboutAppData } from '../../constants/data'
import Header from '../../components/common/Header'
import SvgIcons from '../../assets/SvgIcons'

export default function AboutCodlScreen({ navigation }) {

    return (
        <View style={styles.container}>
            <Header title={appConstant.AboutCODL} showRightIcon RightIcon={'info'} showBackIcon onBackPress={() => navigation.goBack()} />
            <View style={styles.buttonContainer}>
                {aboutAppData.map((item, index) => {
                    return (
                        <TouchableOpacity key={index} style={styles.button}>
                            <FontText size={normalize(22)} color={'white'} name={'inter-regular'}>
                                {item?.name}
                            </FontText>
                        </TouchableOpacity>
                    )
                })
                }
            </View>
            <View style={styles.bottomView}>
                <SvgIcons.AppIcon height={hp(10)} width={hp(10)} />
                <FontText size={normalize(18)} color={'white'} name={'inter-regular'} pTop={hp(4)}>
                    {`${appConstant.version} ${'0.0.1'}`}
                </FontText>
            </View>


        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.black,
        flex: 1,
        alignItems: 'center',
    },
    buttonContainer: {
        flex: 0.5,
        alignItems: 'flex-end',
        justifyContent: 'flex-end'
    },
    button: {
        backgroundColor: colors.gray,
        width: wp(90),
        height: hp(8.5),
        marginTop: hp(2),
        borderRadius: wp(2),
        justifyContent: 'center',
        paddingHorizontal: wp(4)
    },
    bottomView: {
        position: 'absolute',
        bottom: hp(2),
        alignItems: 'center',
        justifyContent: 'center'
    }
})