import { BackHandler, Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import colors from '../../assets/colors'
import Header from '../../components/common/Header'
import { mainData } from '../../constants/data'
import FontText from '../../components/common/FontText'
import { hp, normalize, wp } from '../../helper/responsiveScreen'
import Button from '../../components/common/Button'
import SvgIcons from '../../assets/SvgIcons'
import { useTranslation } from 'react-i18next'
import i18n from '../../constants/i18n'
import { getNetwork, setNetwork } from "../../storage";
import appConstant from '../../helper/appConstant'
import PopUp from '../../components/common/AlertBox'
import DraggableFlatList, {
    ScaleDecorator,
} from "react-native-draggable-flatlist";
import { GestureHandlerRootView } from 'react-native-gesture-handler'

export default function NetworksScreen({ navigation, route }) {
    const { t } = useTranslation();
    const [btnIndex, setBtnIndex] = useState({});
    const [showAlert, setShowAlert] = useState(false)
    const [alertTitle, setAlertTitle] = useState('')
    const [alertMessage, setAlertMessage] = useState('')
    const [mainDataList, setMainDataList] = useState(mainData)

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', backAction);
        return async () => {
            BackHandler.removeEventListener('hardwareBackPress', backAction);
        };
    }, []);
    useEffect(() => {
        getNetwork().then(res => {
            if (res.status) {
                let _networks = {}
                for (const data of mainDataList) {
                    _networks[data?.value] = false;
                    if (res?.networks?.indexOf(data?.value) >= 0) _networks[data?.value] = true;
                }
                setBtnIndex(_networks);
            }
        })
    }, [])

    const backAction = () => {
        navigation.goBack()
        return true;
    };
    const handleDoneClick = () => {
        let _networks = []
        for (const key in btnIndex) {
            if (btnIndex[key]) _networks = [..._networks, key]
        }
        if (_networks.length === 0) {
            setShowAlert(true)
            setAlertTitle(t("selectNetwork"))
            setAlertMessage(t("networkError"))
        } else {
            setNetwork(_networks)
            backAction()
        }
    }


    const renderItem = ({ item, drag, isActive }) => {
        return (
            <GestureHandlerRootView style={{ flex: 2 }}>
                <View style={styles.buttonView} key={item?.id}>
                    {isActive && <SvgIcons.DotIcon style={{ right: wp(2) }} />}
                    <TouchableOpacity disabled={isActive} onLongPress={drag} style={[styles.buttonContainer, { backgroundColor: isActive ? colors.lightGrey : colors.gray }]} onPress={() => setBtnIndex({ ...btnIndex, [item?.value]: !btnIndex[item?.value] })}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            {item.value === appConstant.ethereum ?
                                <Image source={item.image} style={{ width: hp(3.5), height: hp(5.6) }} /> :
                                item.value === appConstant.avalanche ?
                                    <Image source={item.image} style={[styles.icons, { right: wp(1), }]} /> :
                                    item.value === appConstant.polygon ?
                                        <Image source={item.image} style={[styles.icons]} /> :
                                        item.value === appConstant.bsc ?
                                            <Image source={item.image} style={[styles.icons,]} /> :
                                            item.value === appConstant.arbitrum ?
                                                <Image source={item.image} style={[styles.icons,]} />
                                                :
                                                item.value === appConstant.optimism ?
                                                    <Image source={item.image} style={[styles.icons,]} />
                                                    :
                                                    item.value === appConstant.zksync ?
                                                        <Image source={item.image} style={[styles.icons, { backgroundColor: 'transparent', }]} /> :

                                                        <Image source={btnIndex[item?.value] ? item?.img : item.image} style={styles.icons} />
                            }
                            <FontText size={normalize(25)} color={'white'} name={'inter-regular'} pLeft={wp(5)} style={{ right: item.name === 'Avalanche' ? wp(6) : 0 }}>
                                {item?.value}
                            </FontText>
                        </View>
                        {btnIndex[item?.value] ? <SvgIcons.Check height={hp(3)} width={hp(3)} /> : <SvgIcons.BlackCheck height={hp(3)} width={hp(3)} />}
                    </TouchableOpacity>
                </View>
            </GestureHandlerRootView>

        );
    };
    return (
        <View style={styles.container}>
            <Header title={t("networks")} showRightIcon RightIcon={'info'} showBackIcon onBackPress={backAction} />
            <View style={styles.subConatiner}>
                <DraggableFlatList
                    data={mainDataList}
                    onDragEnd={({ data }) => { setMainDataList(data), console.log("data...", data) }}
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
            {showAlert && <PopUp
                title={alertTitle}
                message={alertMessage}
                onConfirmPressed={() => {
                    setShowAlert(false)
                }}
            />}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.black,
        alignItems: 'center'
    },
    subConatiner: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    buttonView: {
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
    },
    buttonContainer: {
        backgroundColor: colors.white,
        alignItems: 'center',
        flexDirection: 'row',
        width: wp(88),
        borderRadius: wp(2),
        marginVertical: hp(1),
        paddingHorizontal: wp(4),
        height: hp(9),
        justifyContent: 'space-between'
    },
    button: {
        // backgroundColor: colors.white,
        marginBottom: hp(3),
        // alignItems: 'center',
    },
    icons: {
        width: hp(4.6),
        height: hp(5.5)
    }
})