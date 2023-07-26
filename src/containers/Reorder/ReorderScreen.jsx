import { BackHandler, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import colors from '../../assets/colors';
import { hp, normalize, wp } from '../../helper/responsiveScreen';
import Header from '../../components/common/Header';
import FontText from '../../components/common/FontText';
import { useTranslation } from 'react-i18next';
import Button from '../../components/common/Button';
import SvgIcons from '../../assets/SvgIcons';
import DraggableFlatList, {
} from "react-native-draggable-flatlist";
import { GestureHandlerRootView } from 'react-native-gesture-handler'

export default function ReorderScreen({ navigation, route }) {
    const { t } = useTranslation();
    const accountList = route?.params?.accountList
    const [accountValue, setAccountValue] = useState()
    const [reorderAccounts, setReorderAccounts] = useState(accountList)

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

    const handleDoneClick = async () => {
        // console.log("reorderAccounts", reorderAccounts)
        // await AsyncStorage.setItem(Config.CREATED_ACCOUNTS, JSON.stringify(reorderAccounts))
        navigation.goBack()
    }

    const onClickAccount = (itm) => {
        setAccountValue(itm?.name)
    }

    const onPressCloseIcon = () => {
        navigation.goBack()
        route.params.onGoBack();
    }

    const renderItem = ({ item, drag, isActive }) => {
        return (
            <GestureHandlerRootView style={{ flex: 1 }}>
                <View style={styles.listView}>
                    <View style={{ width: wp(1), right: wp(0.7) }}>
                        {isActive && <SvgIcons.DotIcon />}
                    </View>
                    <TouchableOpacity disabled={isActive} onLongPress={drag} style={[styles.buttonContainer, { backgroundColor: isActive ? colors.lightGrey : colors.gray }]} onPress={() => onClickAccount(item)}>
                        <FontText name={"inter-regular"} size={normalize(22)} color={item?.name === accountValue ? "black" : 'white'} style={{ width: wp(45) }} lines={1} >
                            {item?.name}
                        </FontText>
                        <FontText name={"inter-regular"} size={normalize(15)} color={item?.name === accountValue ? "black" : 'white'} style={{ width: wp(30), }} lines={1} >
                            {item?.publicKey.replace(item?.publicKey.substring(7, 38), `...`)}
                        </FontText>
                    </TouchableOpacity>
                </View>
            </GestureHandlerRootView>
        )
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
                <DraggableFlatList
                    contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
                    data={reorderAccounts}
                    onDragEnd={({ data }) => { setReorderAccounts(data) }}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderItem}
                />
            </View>
            <Button
                flex={null}
                type="highlight"
                borderRadius={11}
                bgColor="white"
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