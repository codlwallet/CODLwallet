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
import Alert from '../../components/common/Alert'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native'
import { getAccountsData, createNewAccount, createOneAccount } from "../../storage";
import { useSelector } from 'react-redux'

export default function CreateAccountScreen({ navigation, route }) {
  const { t } = useTranslation();
  const name = route?.params?.name
  const walletId = route?.params?.walletId
  const nameRef = useRef(null)
  const { selectedNetwork } = useSelector((state) => state.auth)
  const [walletName, setWalletName] = useState('')
  const [walletNameFocus, setWalletNameFocus] = useState(false)
  const [isSelect, setIsSelect] = useState(false)
  const [selectWallet, setSelectWallet] = useState(false)
  const [accountData, setAccountData] = useState([])
  const [showCheckIcon, setShowIcon] = useState(false)
  const [walletAddress, setWalletAddress] = useState('')
  const [walletInfo, setWalletInfo] = useState({})
  const [id, setId] = useState()

  const [showAlert, setShowAlert] = useState(false)
  const [alertTitle, setAlertTitle] = useState('')
  const [alertMessage, setAlertMessage] = useState('')

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);
    return async () => {
      BackHandler.removeEventListener('hardwareBackPress', backAction);
    };
  }, []);


  useEffect(() => {
    createOneAccount().then((res) => {
      setWalletInfo(res.account)
      setWalletAddress(res.account.publicKey)
    })
    getAccountsData().then(res => {
      if (res.status) {
        setAccountData(res.data);
        setId(res.data?.accounts?.length+1)
        // if (typeof walletId == 'number') {
        //   setWalletAddress(res.data?.accounts[walletId]?.publicKey)
        //   if (res.data?.accounts[walletId]?.name) {
        //     setWalletName(res.data?.accounts[walletId]?.name);
        //   } else { 
        //     setWalletName('');
        //   }
        //   setId((walletId?walletId:0)+1)
        // } else {
        //   let _accounts=res.data.accounts.filter(account => {
        //     return res.data.createdAccounts[selectedNetwork].indexOf(account.publicKey) < 0;
        //   })
        //   for (const key in res.data.accounts) {
        //     if (res.data.accounts[key].publicKey === _accounts[0].publicKey) {
        //       setId(Number(key)+1);
        //       break;
        //     }
        //   }
        //   if (_accounts[0].name) {
        //     setWalletName(_accounts[0].name);
        //   } else { 
        //     setWalletName('');
        //   }
        //   setWalletAddress(_accounts[0].publicKey);
        // }
      }
    })
  }, [])

  const backAction = () => {
    navigation.navigate(appConstant.main)
    return true;
  };

  const onWalletNameFocus = () => {
    setWalletNameFocus(true)
    nameRef.current.focus()
    setIsSelect(false)
  }

  const onWalletNameBlur = () => {
    setWalletNameFocus(false)
    setIsSelect(true)
  }

  const onWalletNameSubmit = () => {
    setWalletNameFocus(false)
    setIsSelect(true)
  }

  const handleCreateClick = async () => {
    if (!walletName){
      setShowAlert(true);
      setAlertTitle('Wallet Name is Required');
      setAlertMessage('Input Wallet Name!')
      return;
    };
    if (selectedNetwork) {
      let accounts = accountData;
      accounts.accounts.push({
        name:walletName,
        publicKey:walletInfo.publicKey,
        privateKey:walletInfo.privateKey,
        nemonic:walletInfo.nemonic
      })
      accounts.createdAccounts[selectedNetwork] = [...accounts?.createdAccounts[selectedNetwork], walletAddress];
      // setAccountData(accounts);
      // for (const account of accounts?.accounts) {
      //   if (account.publicKey === walletAddress) {
      //     account.name = walletName;
      //   }
      // }
      createNewAccount(accounts).then(res => {
        if (res.status) {
          navigation.navigate(appConstant.accountDetails, {
            walletName: walletName,
            walletAddress: walletAddress,
            from: appConstant.createAccount
          })
        }
      })
    }
  }

  const handleSelectWalletClick = () => {
    // setIsSelect(true)
    // setWalletNameFocus(false)
    // navigation.navigate(appConstant.selectAccount, {
    //   name: name,
    //   onGoBack: () => {
    //     setWalletNameFocus(false)
    //     // setIsSelect(false)
    //     setSelectWallet(true)
    //   },
    // })
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
              {id}
            </FontText>
          </View>
          <FontText name={"inter-regular"} size={normalize(22)} color={isSelect ? 'black' : 'white'} pRight={!isSelect ? hp(13) : hp(9)} >
            {walletAddress.replace(walletAddress.substring(7,38),`...`)}
          </FontText>
          {!!!walletId && <SvgIcons.BlackRightArrow height={hp(3)} width={hp(2.5)} />}
          {!!walletId && <SvgIcons.BlackCheck height={hp(4)} width={hp(2.5)} />}
        </TouchableOpacity>
      </View>
      <Button
        flex={null}
        type="highlight"
        borderRadius={11}
        bgColor="white"
        onPress={handleCreateClick}
        buttonStyle={styles.button}>
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
  button: {
    alignItems: 'center',
    width: wp(90),
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
    gap:wp(3),
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
    backgroundColor: colors.white,
    marginBottom: hp(3),
    height: hp(8.5),
    width: wp(90)
  }
})