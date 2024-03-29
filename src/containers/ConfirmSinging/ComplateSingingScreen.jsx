import { BackHandler, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import colors from '../../assets/colors'
import SvgIcons from '../../assets/SvgIcons'
import { hp, normalize, wp } from '../../helper/responsiveScreen'
import appConstant from '../../helper/appConstant'
import AttentionWarningView from '../../components/AttentionWarningView'
import { useTranslation } from 'react-i18next'
import Button from '../../components/common/Button'
import FontText from '../../components/common/FontText'
import Header from '../../components/common/Header'
import { useSelector } from 'react-redux'
import { encodeSignedTxToQR } from '../../storage'

export default function ComplateSingingScreen({ navigation, route }) {
    const walletName = route?.params?.walletName
    const walletAddress = route?.params?.walletAddress
    const showIcon = route?.params?.name
    const from = route?.params?.from
    const { t } = useTranslation();
    const [signedTxUR, setSignedTxUR] = useState(null)
    const { signdata, selectedAccount } = useSelector(state => state.auth)

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', backAction);
        return async () => {
            BackHandler.removeEventListener('hardwareBackPress', backAction);
        };
    }, []);

    useEffect(() => {
        signdata && selectedAccount && encodeSignedTxToQR({
            _serialized: signdata.serialized,
            tx: signdata.tx.payload.transaction,
            requestId: signdata.tx.requestId,
            type: signdata.tx.type,
            privateKey: selectedAccount.privateKey
        }).then(res => {
            if (res.state) {
                setSignedTxUR(res.data)
            }
        })
        return () => { }
    }, [])

    const backAction = () => {
        navigation.navigate(appConstant.accountDetails, {
            walletName: walletName,
            showIcon: showIcon,
            walletAddress
        });
        return true;
    };

    const handlebroadcastTransactionBtn = () => {
        signedTxUR && navigation.navigate(appConstant.broadcastTransaction, {
            walletName: walletName,
            tx: signdata.tx,
            chain: signdata.chain,
            signedTxUR,
            walletAddress
        })
    }

    return (
        <View style={styles.container}>
            <Header statusBarcolor={colors.black} RightIconPress={backAction} showRightIcon RightIcon={'false'} />
            <AttentionWarningView
                title={t("transactionSigned")}
                mainIcon={<View style={styles.imageContainer}>
                    <SvgIcons.BlackCheck />
                </View>}
            />
            <Button
                flex={null}
                type="highlight"
                borderRadius={11}
                bgColor="white"
                onPress={handlebroadcastTransactionBtn}
                style={styles.buttonView}>
                <FontText name={"inter-medium"} size={normalize(22)} color="black">
                    {t("broadcastTransaction")}
                </FontText>
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.black,
        flex: 1,
    },
    imageContainer: {
        backgroundColor: colors.white,
        justifyContent: 'center',
        alignItems: 'center',
        height: hp(8),
        width: hp(8),
        borderRadius: hp(4)
    },
    buttonView: {
        marginBottom: hp(3),
        alignSelf: 'center'
    },
})
