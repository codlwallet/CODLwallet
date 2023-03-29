import { BackHandler, Keyboard, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import colors from '../../assets/colors'
import { hp, normalize, wp } from '../../helper/responsiveScreen'
import Header from '../../components/common/Header'
import { useTranslation } from 'react-i18next'
import Input from '../../components/common/Input'
import SvgIcons from '../../assets/SvgIcons'
import FontText from '../../components/common/FontText'
import Button from '../../components/common/Button'
import appConstant from '../../helper/appConstant'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native'
import Alert from '../../components/common/Alert'

export default function CreateAccountScreen({ navigation, route }) {
  const { t } = useTranslation();
  const name = route?.params?.name
  const walletId = route?.params?.walletId
  const nameRef = useRef(null)
  const [walletName, setWalletName] = useState('')
  const [walletNameFocus, setWalletNameFocus] = useState(false)
  const [isSelect, setIsSelect] = useState(false)
  const [selectWallet, setSelectWallet] = useState(false)
  const [accountData, setAccountData] = useState([])
  const [showAlert, setShowAlert] = useState(false)
  const [alertTitle, setAlertTitle] = useState('')
  const [alertMessage, setAlertMessage] = useState('')
  const [showBackArrow, setShowBackArrow] = useState(false)

  useEffect(() => {
    setWalletName('')
    BackHandler.addEventListener('hardwareBackPress', backAction);
    return async () => {
      BackHandler.removeEventListener('hardwareBackPress', backAction);
    };
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      setWalletNameFocus(false)
      setIsSelect(false)
      async function getWalletData() {
        const data = await AsyncStorage.getItem('WalletList');
        setAccountData(JSON.parse(data))
      }
      getWalletData()
    }, []),
  );

  const backAction = () => {
    navigation.navigate(appConstant.main)
    return true;
  };

  const onWalletNameFocus = () => {
    setWalletNameFocus(true)
    nameRef.current.focus()
    setIsSelect(false)
    setShowBackArrow(false)
  }

  const onWalletNameBlur = () => {
    setWalletNameFocus(false)
    setIsSelect(true)
    setShowBackArrow(true)
  }

  const onWalletNameSubmit = () => {
    setWalletNameFocus(false)
    setIsSelect(true)
    setShowBackArrow(true)

  }

  const handleCreateClick = async () => {
    if (walletName === '') {
      setShowAlert(true)
      setAlertTitle(t('walletnameRequired'))
      setAlertMessage(t("walletnameError"))
    }
    else if (walletId === '' || walletId === undefined) {
      setShowAlert(true)
      setAlertTitle(t('selectWalletRequired'))
      setAlertMessage(t("selectWalletError"))
    }
    else {
      if (accountData !== null) {
        accountData.map((item) => {
          if (accountData.some((i) => i.name === name)) {
            const data = {
              walletName: walletName,
              walletAddress: '0xa94b3c662eE5602A3308604a3fB9A8FDd5caa710'
            }
            item.name === name && item?.accountDetails?.push(data)
          }
          else {
            const data =
            {
              name: name,
              accountDetails: [
                {
                  walletName: walletName,
                  walletAddress: '0xa94b3c662eE5602A3308604a3fB9A8FDd5caa710'
                }
              ]
            }
            accountData?.push(data)
            setAccountData([...accountData])
          }
        })
        await AsyncStorage.setItem("WalletList", JSON.stringify(accountData))
        navigation.navigate(appConstant.accountDetails, {
          walletName: walletName,
          from: appConstant.createAccount,
          name: name
        })
      }
      else {
        const data = [
          {
            name: name,
            accountDetails: [
              {
                walletName: walletName,
                walletAddress: '0xa94b3c662eE5602A3308604a3fB9A8FDd5caa710'
              }
            ]
          },
        ]
        await AsyncStorage.setItem("WalletList", JSON.stringify(data))
        navigation.navigate(appConstant.accountDetails, {
          walletName: walletName,
          from: appConstant.createAccount,
          name: name
        })
      }
    }
  }

  const handleSelectWalletClick = () => {
    setIsSelect(true)
    setShowBackArrow(true)
    setWalletNameFocus(false)
    navigation.navigate(appConstant.selectAccount, {
      name: name,
      walletId: walletId,
      onGoBack: () => {
        setWalletNameFocus(false)
        setShowBackArrow(false)
        // setIsSelect(false)
      },
    })
  }

  return (
    <View style={styles.container} onStartShouldSetResponder={() => Keyboard.dismiss()}>
      <Header title={t("createAccount")} showRightIcon RightIcon={'info'} showBackIcon onBackPress={backAction} statusBarcolor={colors.black} style={{ alignSelf: 'center' }} />
      <View style={styles.subContainer}>
        <Input
          withRightIcon={walletName !== '' ? true : false}
          placeholder={t("walletName")}
          value={walletName}
          ref={nameRef}
          maxLength={15}
          placeholderTextColor={walletNameFocus ? colors.black : colors.white}
          onChangeText={setWalletName}
          keyboardType={'default'}
          returnKeyType={'next'}
          onFocus={onWalletNameFocus}
          onBlur={onWalletNameBlur}
          onSubmit={onWalletNameSubmit}
          blurOnSubmit
          fontName={'poppins-regular'}
          onSubmitEditing={onWalletNameSubmit}
          fontSize={normalize(22)}
          inputStyle={[styles.textInput, {
            color: walletNameFocus == true
              ? colors.black
              : colors.white
          }]}
          style={[styles.textInputContainer,
          {
            backgroundColor:
              walletNameFocus == true
                ? colors.white
                : colors.gray,
          }]}
          rightIcon={
            <TouchableOpacity>
              {walletNameFocus ?
                <SvgIcons.BlackCheck height={hp(4)} width={hp(2.5)} /> :
                <SvgIcons.Check height={hp(4)} width={hp(2.5)} />
              }
            </TouchableOpacity>
          }
        />
        <TouchableOpacity style={[styles.buttonContainer, { backgroundColor: isSelect ? colors.white : colors.gray }]} onPress={handleSelectWalletClick}>
          <View style={[styles.numberContainer, { backgroundColor: isSelect ? colors.black : colors.white }]}>
            <FontText name={"inter-bold"} size={normalize(15)} color={isSelect ? 'white' : 'black'}>
              {walletId ? walletId : "0"}
            </FontText>
          </View>
          <FontText name={"inter-regular"} size={normalize(22)} color={isSelect ? 'black' : 'white'} pRight={!isSelect ? hp(9) : hp(9)} >
            {"0xa94bb...a710"}
          </FontText>
          {showBackArrow && <SvgIcons.BlackRightArrow height={hp(3)} width={hp(2.5)} />}
          {!showBackArrow &&
            <>
              {isSelect ? < SvgIcons.BlackCheck height={hp(4)} width={hp(2.5)} /> :
                < SvgIcons.Check height={hp(4)} width={hp(2.5)} />}
            </>
          }
        </TouchableOpacity>
      </View>
      <Button
        flex={null}
        type="highlight"
        borderRadius={11}
        bgColor="white"
        height={hp(8.5)}
        width={wp(90)}
        onPress={handleCreateClick}
        style={styles.button}>
        <FontText name={"inter-medium"} size={normalize(22)} color="black">
          {t("create")}
        </FontText>
      </Button>
      <Alert
        show={showAlert}
        title={alertTitle}
        message={alertMessage}
        onConfirmPressed={() => {
          setShowAlert(false)
        }}
      />
    </View >
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
    alignItems: 'center',
    marginTop: hp(20),
  },
  textInputContainer: {
    marginTop: hp(2),
    height: hp(8.5),
    width: wp(90)
  },
  textInput: {
    fontSize: normalize(22),
    padding: 0,
    paddingHorizontal: wp(4)
  },
  buttonContainer: {
    height: hp(8.5),
    width: wp(90),
    borderRadius: wp(2),
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: wp(5),
    marginTop: hp(2),
  },
  numberContainer: {
    height: hp(3.5),
    width: wp(6.3),
    borderRadius: wp(1),
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    marginBottom: hp(3),
    alignSelf: 'center'
  }
})