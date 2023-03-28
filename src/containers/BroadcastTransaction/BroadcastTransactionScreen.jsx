import { BackHandler, Image, StyleSheet, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import colors from '../../assets/colors'
import Header from '../../components/common/Header'
import { hp, normalize, wp } from '../../helper/responsiveScreen'
import Button from '../../components/common/Button'
import FontText from '../../components/common/FontText'
import { useTranslation } from 'react-i18next'
import QRCode from 'react-native-qrcode-svg'
import appConstant from '../../helper/appConstant'
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { paginationData } from '../../constants/data'
import TransactionCard from '../../components/TransactionCard'

export default function BroadcastTransactionScreen({ navigation, route }) {
    const { t } = useTranslation();
    const walletName = route?.params?.walletName
    const CarouselRef = useRef();
    const [selectedIndex, setselectedIndex] = useState(0);

    const details = {
        from: '0xa94b3c662eE5602A3308604a3fB9A8FDd5caa710',
        to: '0xa94b3c662eE5602A3308604a3fB9A8FDd5caa710',
        fees: '0.0000315 ETH',
        amount: '0.001 ETH'
    }

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', backAction);
        return async () => {
            BackHandler.removeEventListener('hardwareBackPress', backAction);
        };
    }, []);

    const backAction = () => {
        navigation.navigate(appConstant.accountDetails, {
            walletName: walletName
        })
        return true;
    };

    const RenderItem = ({ item }) => {
        return (
            <>
                {item?.id === 1 ?
                    <View style={styles.scannerContainer}>
                        <View style={styles.walletHeaderView}>
                            <FontText name={"inter-bold"} size={normalize(11)} color="black" textTransform={'uppercase'}>
                                {t("signedTX")}
                            </FontText>
                        </View>
                        <QRCode
                            logo={require('../../assets/images/BlackAppLogo.png')}
                            logoSize={50}
                            size={hp(39)}
                            logoMargin={10}
                            logoBackgroundColor='white'
                        />
                    </View>
                    :
                    < View style={{ marginTop: hp(15) }}>
                        <TransactionCard
                            item={details}
                            headerTitle={item?.title}
                        />
                    </View>
                }
            </>
        )
    }

    return (
        <View style={styles.container}>
            <Header title={t("broadcastTransaction")} showRightIcon RightIcon={'info'} statusBarcolor={colors.black} style={{ alignSelf: 'center' }} />
            <View style={styles.subContainer}>
                <Carousel
                    data={paginationData}
                    ref={CarouselRef}
                    itemWidth={hp(45)}
                    sliderWidth={wp(90)}
                    renderItem={RenderItem}
                    onSnapToItem={index => setselectedIndex(index)}
                />
                <Pagination
                    dotsLength={paginationData.length}
                    activeDotIndex={selectedIndex}
                    carouselRef={CarouselRef}
                    tappableDots={true}
                    dotStyle={{
                        width: wp(2.5),
                        height: wp(2.5),
                        borderRadius: wp(7),
                        backgroundColor: colors.white,
                        bottom: hp(10),
                        marginHorizontal: (-10),
                    }}
                    activeOpacity={0.5}
                    inactiveDotStyle={{
                        backgroundColor: colors['gray-open'],
                        width: wp(4),
                        height: wp(4),
                        marginHorizontal: (-10),
                    }}
                />
            </View>
            <Button
                flex={null}
                type="highlight"
                borderRadius={11}
                bgColor="white"
                onPress={backAction}
                buttonStyle={styles.button}>
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
        paddingHorizontal: wp(3.5),
        alignItems: 'center'
    },
    subContainer: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    button: {
        backgroundColor: colors.white,
        marginBottom: hp(3),
        height: hp(8.5),
        width: wp(90),
    },
    scannerContainer: {
        backgroundColor: colors.white,
        height: hp(45),
        width: hp(45),
        borderRadius: wp(2),
        alignItems: 'center',
        marginTop: hp(15)
    },
    walletHeaderView: {
        backgroundColor: colors.white,
        borderRadius: wp(1.5),
        paddingHorizontal: wp(2),
        paddingVertical: hp(0.5),
        top: hp(-2),
        borderWidth: wp(1),
        borderColor: colors.black,
    },
    bottomView: {
        backgroundColor: colors.gray,
        height: hp(11),
        width: wp(90),
        marginBottom: hp(2),
        borderRadius: wp(2),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between",
        paddingHorizontal: wp(5)
    },
})