import { BackHandler, Dimensions, Image, PermissionsAndroid, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import colors from '../../assets/colors'
import { hp, normalize, wp } from '../../helper/responsiveScreen'
import Header from '../../components/common/Header'
import { useTranslation } from 'react-i18next'
import Button from '../../components/common/Button'
import FontText from '../../components/common/FontText'
import appConstant from '../../helper/appConstant'
import SvgIcons from '../../assets/SvgIcons'
import { Camera } from 'react-native-camera-kit'

export default function ScanQrScreen({ navigation, route }) {
    const { t } = useTranslation();
    const walletName = route?.params?.walletName
    const [qrvalue, setQrvalue] = useState('');
    const [opneScanner, setOpneScanner] = useState(false);

    const WalletData = {
        from: '0xa94b3c662eE5602A3308604a3fB9A8FDd5caa710',
        to: '0x17d33da0FbC3167CC5aA1e68c1b412183B5U5d1',
        fees: '0.0000315 ETH',
        amount: '0.001 ETH'
    }

    useEffect(() => {
        onOpneScanner();
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

    const onOpneScanner = () => {
        if (Platform.OS === 'android') {
            async function requestCameraPermission() {
                try {
                    const granted = await PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.CAMERA,
                        {
                            title: 'Camera Permission',
                            message: 'App needs permission for camera access',
                        },
                    );
                    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                        setQrvalue('');
                        setOpneScanner(true);
                    } else {
                        alert('CAMERA permission denied');
                    }
                } catch (err) {
                    alert('Camera permission err', err);
                    console.warn(err);
                }
            }
            requestCameraPermission();
        } else {
            setQrvalue('');
            setOpneScanner(true);
        }
    };


    const onBarcodeScan = (qrvalue) => {
        console.log(qrvalue)
        setQrvalue(qrvalue);
        setOpneScanner(false);
        if (qrvalue) {
            navigation.navigate(appConstant.signTransaction, {
                walletName: walletName,
                WalletData: WalletData
            })
        }

    };

    return (
        <View style={styles.container}>
            <Header title={t("scanQr")} showRightIcon statusBarcolor={colors.black} style={{ alignSelf: 'center' }} RightIcon={'info'} />
            <View style={styles.subContainer}>
                <TouchableOpacity onPress={() => navigation.navigate(appConstant.signTransaction, {
                    walletName: walletName,
                })}>
                    {opneScanner &&
                        <>
                            <View style={{ borderRadius: 10, backgroundColor: colors.black, padding: 6, borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
                                <Camera
                                    style={{ backgroundColor: 'green', height: hp(41.5), width: hp(41.5), justifyContent: 'center', alignItems: 'center', borderRadius: 10 }}
                                    scanBarcode={true}
                                    colorForScannerFrame={'blue'}
                                    onReadCode={(event) =>
                                        onBarcodeScan(event.nativeEvent.codeStringValue)
                                    }
                                />
                                <View style={{ position: 'absolute' }}>
                                    <Image source={require('../../assets/images/frame.png')} style={{ height: hp(44.1), width: hp(44.1), padding: 4, marginTop: hp(0.8) }} />
                                </View>


                            </View>

                        </>
                    }
                </TouchableOpacity>
            </View>
            <View style={styles.bottomView}>
                <FontText name={"inter-regular"} size={normalize(22)} color="white"  >
                    {'Metamask Wallet'}
                </FontText>
                <SvgIcons.Dog />
            </View>
            <Button
                flex={null}
                type="highlight"
                borderRadius={11}
                bgColor="white"
                onPress={backAction}
                buttonStyle={styles.button}>
                <FontText name={"inter-medium"} size={normalize(22)} color="black">
                    {t("back")}
                </FontText>
            </Button>
        </View >
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
        justifyContent: 'center',
        alignItems: 'center',
    },
    scannerContainer: {
        // borderRadius: 10,
        backgroundColor: colors.gray,
        height: hp(45),
        width: hp(45),
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
        paddingHorizontal: wp(4),
    },
    image: {
        width: hp(3.5),
        height: hp(5.5),
    },
    button: {
        backgroundColor: colors.white,
        marginBottom: hp(3),
        height: hp(8.5),
        width: wp(90),
    },
    maskOutter: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    maskInner: {
        width: 300,
        backgroundColor: 'transparent',
        borderColor: 'white',
        borderWidth: 1,
    },
    maskFrame: {
        backgroundColor: 'rgba(1,1,1,0.6)',
    },
    maskRow: {
        width: '100%',
    },
    maskCenter: { flexDirection: 'row' },
})