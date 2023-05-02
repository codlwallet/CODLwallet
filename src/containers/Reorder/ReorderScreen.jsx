import { BackHandler, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import colors from '../../assets/colors';
import { hp, normalize, wp } from '../../helper/responsiveScreen';
import Header from '../../components/common/Header';
import FontText from '../../components/common/FontText';
import { useTranslation } from 'react-i18next';
import Button from '../../components/common/Button';
import SvgIcons from '../../assets/SvgIcons';

export default function ReorderScreen({ navigation, route }) {
    const { t } = useTranslation();
    const accountList = route?.params?.accountList
    const [accountValue, setAccountValue] = useState()

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
        navigation.goBack()
    }

    const onClickAccount = (itm) => {
        setAccountValue(itm?.name)
    }

    const onPressCloseIcon = () => {
        navigation.goBack()
        route.params.onGoBack();
    }

    return (
        <View style={styles.container}>
            <Header title={t('reorder')}
                showRightIcon
                RightIcon={'false'}
                showBackIcon
                onBackPress={backAction}
                statusBarcolor={colors.black}
                RightIconPress={onPressCloseIcon}
            />
            <View style={styles.subContainer}>
                <ScrollView contentContainerStyle={{ justifyContent: 'center', alignItems: 'center', flexGrow: 1, paddingVertical: hp(0.5) }}  >
                    {accountList?.map((item, index) => {
                        return (
                            <View key={index} style={styles.listView}>
                                {item?.name === accountValue && <SvgIcons.DotIcon style={{ left: wp(-1.5) }} />}
                                <TouchableOpacity style={[styles.buttonContainer, { backgroundColor: item?.name === accountValue ? colors.white : colors.gray }]} onPress={() => onClickAccount(item)}>
                                    <FontText name={"inter-regular"} size={normalize(22)} color={item?.name === accountValue ? "black" : 'white'} style={{ width: wp(45) }} lines={1} >
                                        {item?.name}
                                    </FontText>
                                    <FontText name={"inter-regular"} size={normalize(15)} color={item?.name === accountValue ? "black" : 'white'} style={{ width: wp(30), }} lines={1} >
                                        {item?.publicKey.replace(item?.publicKey.substring(7, 38), `...`)}
                                    </FontText>
                                </TouchableOpacity>
                            </View>
                        )
                    })
                    }
                </ScrollView>
            </View>
            <Button
                flex={null}
                type="highlight"
                borderRadius={11}
                bgColor="white"
                height={hp(8.5)}
                width={wp(90)}
                onPress={handleDoneClick}
                style={styles.button}>
                <FontText name={"inter-medium"} size={normalize(22)} color="black">
                    {t("done")}
                </FontText>
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.black,
    },
    subContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContainer: {
        height: hp(8.5),
        width: '95%',
        borderRadius: wp(2),
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingHorizontal: wp(5),
        backgroundColor: colors.gray,
    },
    button: {
        marginBottom: hp(3),
        alignSelf: 'center'
    },
    listView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: wp(93),
        marginBottom: hp(2)
    }
})