import { BackHandler, Image, PermissionsAndroid, Platform, StyleSheet, TouchableOpacity, View, ActivityIndicator } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import colors from '../../assets/colors'
import { hp, normalize, wp } from '../../helper/responsiveScreen'
import Header from '../../components/common/Header'
import { useTranslation } from 'react-i18next'
import Button from '../../components/common/Button'
import FontText from '../../components/common/FontText'
// import { Camera } from 'react-native-vision-camera'  
import appConstant from '../../helper/appConstant'
import SvgIcons from '../../assets/SvgIcons'
import { Camera } from 'react-native-camera-kit'
import { decodeTxQR } from '../../storage'
import { isCameraPresent } from 'react-native-device-info';
import QRCodeScanner from "react-native-qrcode-scanner";
import { useFocusEffect } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import PopUp from '../../components/common/AlertBox'

export default function ScanQrScreen({ navigation, route }) {
    const { t } = useTranslation();
    const walletName = route?.params?.walletName
    const [qrvalue, setQrvalue] = useState('');
    const [opneScanner, setOpneScanner] = useState(false);
    const walletAddress = route?.params?.walletAddress
    let camaraRef = useRef(null)
    const [barcode, setBarcode] = useState('');
    const [hasPermission, setHasPermission] = useState(false);
    const [data, setData] = useState('');
    const [showAlert, setShowAlert] = useState(false)
    const [alertTitle, setAlertTitle] = useState('')
    const [alertMessage, setAlertMessage] = useState('')
    const [parsingQR, setParsingQR] = useState(null)
    const { passphrase } = useSelector(state => state.auth);
    useFocusEffect(React.useCallback(() => {
        // checkCameraPermission();        
        onOpneScanner();
    }, []))

    const WalletData = {
        from: '0xa94b3c662eE5602A3308604a3fB9A8FDd5caa710',
        to: '0x17d33da0FbC3167CC5aA1e68c1b412183B5U5d1',
        fees: '0.0000315 ETH',
        amount: '0.001 ETH'
    }

    // useEffect(() => {
    // }, []);

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
    // const requestCameraPermission = async () => {
    //     try {
    //         const granted = await PermissionsAndroid.request(
    //             PermissionsAndroid.PERMISSIONS.CAMERA,
    //             {
    //                 title: 'Camera Permission',
    //                 message: 'App needs access to your camera',
    //                 buttonNeutral: 'Ask Me Later',
    //                 buttonNegative: 'Cancel',
    //                 buttonPositive: 'OK',
    //             },
    //         );
    //         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    //             return true;
    //         } else {
    //             return false;
    //         }
    //     } catch (err) {
    //         return false;
    //     }
    // }
    // const checkCameraPermission = async () => {
    //     const hasCamera = await isCameraPresent();
    //     let status = await Camera.getCameraPermissionStatus();
    //     if (hasCamera && status === 'denied') {
    //         requestCameraPermission().then(async res => {
    //             status = await Camera.getCameraPermissionStatus();
    //             setHasPermission(hasCamera && status === 'authorized');
    //         })
    //     } else {
    //         setHasPermission(hasCamera && status === 'authorized');
    //     }
    // };

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
        // if (qrvalue) {
        //     navigation.navigate(appConstant.signTransaction, {
        //         walletName: walletName,
        //         WalletData: WalletData
        //     })
        // }

    };
    let handleScan = e => {
        try {
            if (e) {
                let qrdata = e.toUpperCase();
                if (!qrdata.startsWith('UR:ETH-SIGN-REQUEST/')) {
                    throw 'invalid_qr_err';
                }
                if (!parsingQR && parsingQR === null) {
                    setParsingQR(true);
                    setQrvalue(qrdata);
                    console.log(new Date().toLocaleString())
                    decodeTxQR(qrdata, passphrase).then(res => {
                        if (res.state) {
                            setShowAlert(false)
                            setParsingQR(false);
                            setOpneScanner(false);
                            navigation.navigate(appConstant.signTransaction, {
                                walletName: walletName,
                                walletAddress: walletAddress,
                                tx: res.txdata,
                                encodedSignData: res.signdata,
                                chain: res.chaindata
                            })
                            console.log(new Date().toLocaleString())
                        } else {
                            setAlertTitle(t('wrong_qr'))
                            setAlertMessage(t('wrong_qr_err_mess'))
                            setShowAlert(true)
                        }
                    })
                }
            }
        } catch (error) {
            console.log('error', error)
            setAlertTitle(t('wrong_qr'))
            setAlertMessage(t('wrong_qr_err_mess'))
            setShowAlert(true)
            // camaraRef.reactivate();
        }
    };

    return (
        <View style={styles.container}>
            <Header title={t("scanQr")} showRightIcon statusBarcolor={colors.black} RightIcon={'info'} />
            <View style={styles.subContainer}>
            {/* {hasPermission && !showAlert && !parsingQR && <TouchableOpacity style={styles.scannerContainer}> */}
            {opneScanner && !showAlert && <TouchableOpacity style={styles.scannerContainer}>
                    {opneScanner &&
                        <>
                            <View style={styles.scannerContainer}>
                                <Camera
                                    style={styles.camera}
                                    scanBarcode={true}
                                    colorForScannerFrame={'blue'}
                                    onReadCode={(event) =>
                                        handleScan(event.nativeEvent.codeStringValue)
                                    }
                                />
                                <View style={{ position: 'absolute' }}>
                                    <Image source={require('../../assets/images/frame.png')} style={{...styles.image,backgroundColor:parsingQR?'black':'transparent'}} />
                                    {parsingQR&&<View style={{position:'absolute',top:hp(15)}}>
                                        <ActivityIndicator animating={!!parsingQR} size="large" color="#ffffff" />
                                        <FontText name={"inter-regular"} style={{...styles.centerText,marginTop:hp(3)}} size={normalize(22)} color="white"  >
                                            {t('analyzing')}
                                        </FontText>
                                    </View>}
                                </View>
                            </View>

                        </>
                    }
                    {/* <QRCodeScanner
                        reactivate={true}
                        showMarker={true}
                        markerStyle={styles.scannerStyle.markerStyle}
                        ref={(node) => { camaraRef = node }}
                        onRead={handleScan}
                    /> */}
                </TouchableOpacity>}
                {/* {
                    !hasPermission &&
                    <View style={styles.bottomView}>
                        <FontText name={"inter-regular"} style={styles.centerText} size={normalize(22)} color="white"  >
                            {t('no_permission')}
                        </FontText>
                    </View>
                } */}
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
                height={hp(8.5)}
                width={wp(90)}
                onPress={backAction}
                style={styles.button}>
                <FontText name={"inter-medium"} size={normalize(22)} color="black">
                    {t("back")}
                </FontText>
            </Button>
            {showAlert && <PopUp
                title={alertTitle}
                message={alertMessage}
                onConfirmPressed={() => {
                    setShowAlert(false)
                }}
            />}
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
    centerText: {
        textAlign: 'center',
        width: wp(80),
        paddingVertical: hp(5)
    },
    subContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scannerContainer: {
        // height: hp(45),
        // width: hp(45),
        borderRadius: 10,
        // backgroundColor: colors.gray,
        padding: 6,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    camera: {
        height: hp(41.5),
        width: hp(41.5),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
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
    analyzingView: {
        position:'absolute',
        top:hp(15),
        backgroundColor: colors.gray
    },
    image: {
        height: hp(44.1),
        width: hp(44.1),
        padding: 4,
        marginTop: hp(0.8)
    },
    button: {
        // backgroundColor: colors.white,
        marginBottom: hp(3),
        // height: hp(8.5),
        // width: wp(90),
    },
    scannerStyle: {
        markerStyle: {
            borderColor: 'white'
        }
    }
})