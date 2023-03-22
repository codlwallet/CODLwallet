import { BackHandler, Image, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import colors from '../../assets/colors'
import { hp, normalize, wp } from '../../helper/responsiveScreen'
import Header from '../../components/common/Header'
import { useTranslation } from 'react-i18next'
import Button from '../../components/common/Button'
import FontText from '../../components/common/FontText'
import { Camera, useCameraDevices } from 'react-native-vision-camera'
import appConstant from '../../helper/appConstant'
// import { BarcodeFormat, useScanBarcodes } from 'vision-camera-code-scanner'

export default function ScanQrScreen({ navigation }) {
    const { t } = useTranslation();
    const camaraRef = useRef(null)
    const devices = useCameraDevices();
    const device = devices.back;

    const [barcode, setBarcode] = useState('');
    const [hasPermission, setHasPermission] = useState(false);
    const [isScanned, setIsScanned] = useState(false)

    useEffect(() => {
        checkCameraPermission();
    }, []);

    // useEffect(() => {
    //     toggleActiveState();
    //     return () => {
    //         barcodes;
    //     };
    // }, [barcodes])

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

    const checkCameraPermission = async () => {
        const status = await Camera.getCameraPermissionStatus();
        setHasPermission(status === 'authorized');
    };

    // const toggleActiveState = async () => {
    //     if (barcodes && barcodes.length > 0 && isScanned === false) {
    //         setIsScanned(true);
    //         barcodes.forEach(async (scannedBarcode) => {
    //             if (scannedBarcode.rawValue !== '') {
    //                 setBarcode(scannedBarcode.rawValue);
    //                 Alert.alert(barcode);
    //             }
    //         });
    //     }
    // };

    return (
        <View style={styles.container}>
            <Header title={t("scanQr")} showRightIcon statusBarcolor={colors.black} style={{ alignSelf: 'center' }} RightIcon={'info'} />
            <View style={styles.subContainer}>
                <TouchableOpacity onPress={() => navigation.navigate(appConstant.signTransaction)} style={styles.scannerContainer}>
                    {/* <Camera
                    style={StyleSheet.absoluteFill}
                    device={device}
                    isActive={!isScanned}
                    frameProcessor={frameProcessor}
                    frameProcessorFps={5}
                    audio={false}
                /> */}
                </TouchableOpacity>

            </View>
            <View style={styles.bottomView}>
                <Image source={require('../../assets/images/EV.png')} style={styles.image} />
                <FontText name={"inter-regular"} size={normalize(22)} color="white" pLeft={wp(4)} style={{ width: wp(75) }}>
                    {'0x9b4545d9214097DBE61c984EB2AB83C6e86'}
                </FontText>
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
        backgroundColor: colors.gray,
        height: hp(45),
        width: hp(45),
        borderRadius: wp(4),

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
        paddingHorizontal: wp(4)
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
})