import { BackHandler, I18nManager, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { languageData } from '../../constants/data'
import Header from '../../components/common/Header'
import appConstant from '../../helper/appConstant'
import ButtonView from '../../components/common/ButtonList'
import colors from '../../assets/colors'
import { hp, normalize, wp } from '../../helper/responsiveScreen'
import Button from '../../components/common/Button'
import FontText from '../../components/common/FontText'
import { useTranslation } from 'react-i18next'

export default function LanguageScreen({ navigation }) {
    const { t, i18n } = useTranslation();
    const [btnValue, setButtonValue] = useState()
    const [buttonIndex, setButtonIndex] = useState()
    const [language, setLanguage] = useState()

    useEffect(() => {
        if (i18n.language === 'tr') {
            setButtonValue(appConstant.turkce)
            setButtonIndex(1)
        }
        else {
            setButtonValue(appConstant.english)
            setButtonIndex(0)
        }
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

    const handleDoneClick = () => {
        i18n.changeLanguage(language).then(() => {
            I18nManager.forceRTL(false);
        });
        navigation.goBack()
    }

    return (
        <View style={styles.container}>
            <Header title={t("language")} showRightIcon RightIcon={'info'} showBackIcon onBackPress={backAction} />
            <View style={styles.buttonContainer}>
                {languageData.map((item, index) => {
                    return (
                        <TouchableOpacity key={index} onPress={() => {
                            setButtonValue(item?.name)
                            setButtonIndex(index)
                            setLanguage(item?.value)
                        }}>
                            <ButtonView listItem={item} showRightIcon index={index} buttonIndex={buttonIndex} from={true} />
                        </TouchableOpacity>
                    )
                })
                }
            </View>
            <Button
                flex={null}
                height={hp(8.5)}
                width={wp(90)}
                type="highlight"
                borderRadius={11}
                bgColor="white"
                style={styles.buttonView}
                onPress={handleDoneClick}
            >
                <FontText name={"inter-medium"} size={normalize(22)} color="black">
                    {t("done")}
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
        bottom: hp(3)
    },
    // button: {
    //     alignItems: 'center',
    //     alignSelf: 'center',
    //     width: wp(90),
    //     height: hp(8.5)
    // },
})