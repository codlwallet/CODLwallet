import { BackHandler, Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import colors from '../../assets/colors';
import { hp, normalize, wp } from '../../helper/responsiveScreen';
import Header from '../../components/common/Header';
import FontText from '../../components/common/FontText';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import { walletListData } from '../../constants/data'
import ButtonView from '../../components/common/ButtonList';
import appConstant from '../../helper/appConstant';
import Button from '../../components/common/Button';
import SvgIcons from '../../assets/SvgIcons';


export default function AccountListScreen({ navigation }) {
    const { t } = useTranslation();
    const [walletData, setWalletData] = useState()
    const [showList, setShowList] = useState(true)
    const [btnValue, setButtonValue] = useState()
    const [buttonIndex, setButtonIndex] = useState()
    const [showReorder, setShowReorder] = useState(false)

    useEffect(() => {
        async function getWalletData() {
            const data = await AsyncStorage.getItem('WalletList');
            setWalletData(JSON.parse(data))
        }
        getWalletData()
    }, [])

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

    const handleWalletOptionClick = (item, index) => {
        setButtonValue(item?.name)
        setButtonIndex(index)
        if (item.name === t("createNewAccount")) {
            navigation.navigate(appConstant.createAccount)
        }
        else {
            setShowReorder(true)
            setButtonValue('')
            setButtonIndex()
        }
    }

    const handleDoneClick = () => {
        navigation.navigate(appConstant.accountDetails, {
            walletName: walletData?.walletName
        })
    }

    return (
        <View style={styles.container}>
            {showReorder && !showList ?
                <Header title={t('reorder')}
                    showRightIcon
                    RightIcon={'false'}
                    showBackIcon
                    onBackPress={backAction}
                    statusBarcolor={colors.black}
                    RightIconPress={() => { setShowReorder(false), setShowList(false) }} />
                :
                <Header title={t('ethereum')}
                    showRightIcon
                    RightIcon={'menu'}
                    showBackIcon={showList ? true : false}
                    onBackPress={backAction}
                    statusBarcolor={colors.black}
                    titleStyle={{ left: showList ? 0 : wp(23.7) }}
                    titleIcon={<Image source={require('../../assets/images/EV.png')} style={styles.image} />}
                    RightIconPress={() => { setShowList(!showList) }}
                    titleWithIcon />
            }
            <View style={styles.subContainer}>
                {showList || showReorder ?
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}>
                        {showReorder && <SvgIcons.DotIcon style={{ right: wp(3) }} />}
                        <TouchableOpacity style={[styles.buttonContainer,]} >
                            <FontText name={"inter-regular"} size={normalize(22)} color={'white'}  >
                                {walletData?.walletName}
                            </FontText>
                            <FontText name={"inter-regular"} size={normalize(15)} color={'white'}  >
                                {"0xa94bb...a710"}
                            </FontText>
                        </TouchableOpacity>
                    </View>
                    :
                    <>
                        {walletListData?.map((item, index) => {
                            return (
                                <TouchableOpacity key={index} onPress={() => handleWalletOptionClick(item, index)}>
                                    <ButtonView listItem={item} showRightIcon index={index} buttonIndex={buttonIndex} />
                                </TouchableOpacity>
                            )
                        })
                        }
                    </>
                }
            </View>

            {showReorder && <Button
                flex={null}
                type="highlight"
                borderRadius={11}
                bgColor="white"
                onPress={handleDoneClick}
                buttonStyle={styles.button}>
                <FontText name={"inter-medium"} size={normalize(22)} color="black">
                    {t("create")}
                </FontText>
            </Button>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.black,
        paddingHorizontal: wp(3.5),
    },
    subContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonContainer: {
        height: hp(8.5),
        width: wp(90),
        borderRadius: wp(2),
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingHorizontal: wp(5),
        // marginTop: hp(2),
        backgroundColor: colors.gray,
    },
    image: {
        width: hp(3),
        height: hp(5),
    },
    button: {
        backgroundColor: colors.white,
        marginBottom: hp(3),
        height: hp(8.5),
        width: wp(90)
    }

})