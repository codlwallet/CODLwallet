import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { languageData } from '../../constants/data'
import Header from '../../components/common/Header'
import appConstant from '../../helper/appConstant'
import ButtonView from '../../components/common/ButtonList'
import colors from '../../assets/colors'
import { hp, normalize, wp } from '../../helper/responsiveScreen'
import Button from '../../components/common/Button'
import FontText from '../../components/common/FontText'

export default function LanguageScreen({ navigation }) {
    const [btnValue, setButtonValue] = useState(appConstant.createWallet)
    const [buttonIndex, setButtonIndex] = useState(0)
    return (
        <View style={styles.container}>
            <Header title={appConstant.language} showRightIcon RightIcon={'info'} showBackIcon onBackPress={() => navigation.goBack()} />
            <View style={styles.buttonContainer}>
                {languageData.map((item, index) => {
                    return (
                        <TouchableOpacity key={index} onPress={() => {
                            setButtonValue(item?.name)
                            setButtonIndex(index)
                        }}>
                            <ButtonView listItem={item} showRightIcon index={index} buttonIndex={buttonIndex} />
                        </TouchableOpacity>
                    )
                })
                }
            </View>
            <Button
                flex={null}
                height={hp(8.5)}
                width="90%"
                type="highlight"
                borderRadius={11}
                bgColor="white"
                style={styles.buttonView}
                // onPress={!hideMenu ? handleConnectClick : handleLockDeviceClick}
                buttonStyle={styles.button}>
                <FontText name={"inter-medium"} size={normalize(22)} color="black">
                    {appConstant.done}
                </FontText>
            </Button>
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
    buttonView: {
        position: 'absolute',
        bottom: hp(2)
    },
    button: {
        alignItems: 'center',
        alignSelf: 'center',
        width: wp(90),
        height: hp(8.5)
    },

})