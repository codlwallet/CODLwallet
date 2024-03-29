import {
  BackHandler,
  Keyboard,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import colors from '../../assets/colors';
import { hp, normalize, wp } from '../../helper/responsiveScreen';
import Header from '../../components/common/Header';
import { useTranslation } from 'react-i18next';
import Input from '../../components/common/Input';
import SvgIcons from '../../assets/SvgIcons';
import FontText from '../../components/common/FontText';
import Button from '../../components/common/Button';
import appConstant from '../../helper/appConstant';
import PopUp from '../../components/common/AlertBox';
import {
  getAccountsData,
  createNewAccount,
  setDefaultAccountNameIndex,
} from '../../storage';
import { useSelector } from 'react-redux';
import Config from '../../constants';
import { useFocusEffect } from '@react-navigation/native';

export default function CreateAccountScreen({ navigation, route }) {
  const { t } = useTranslation();
  const name = route?.params?.name;
  const walletId = route?.params?.walletId;
  const from = route?.params?.from;
  const hidden = route?.params?.hidden;
  const passphrase = route?.params?.passphrase;

  const accountList = route?.params?.accountList;
  const nameRef = useRef(null);
  const { selectedNetwork } = useSelector(state => state.auth);
  const [walletName, setWalletName] = useState(route?.params?.walletName);
  const [walletNameChanged, setWalletNameChanged] = useState(false);
  const [defaultWalletName, setDefaultWalletName] = useState(null);
  const [walletNameFocus, setWalletNameFocus] = useState(false);
  const [isSelect, setIsSelect] = useState(false);
  const [selectWallet, setSelectWallet] = useState(false);
  const [accountData, setAccountData] = useState({});
  const [walletAddress, setWalletAddress] = useState('');
  const [id, setId] = useState();
  const [showAlert, setShowAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [showBackArrow, setShowBackArrow] = useState(false);

  useEffect(() => {
    setWalletName('');
    BackHandler.addEventListener('hardwareBackPress', backAction);
    return async () => {
      BackHandler.removeEventListener('hardwareBackPress', backAction);
    };
  }, []);

  console.log(hidden, passphrase, "create account")

  useFocusEffect(
    useCallback(() => {
      setWalletNameFocus(false);
      setIsSelect(false);
      setShowBackArrow(false);
      let _selected = false;
      if (typeof walletId == 'number' && from === appConstant.selectAccount) {
        _selected = true;
        setSelectWallet(true);
        if (route.params['wallet']) {
          setWalletAddress(route.params['wallet'].publicKey);
          if (route.params['wallet'].name) {
            setWalletName(route.params['wallet'].name);
          } else {
            setWalletName('');
          }
        }
        setId(walletId ? walletId : 1);
      } else {
        setSelectWallet(false);
      }
      getAccountsData().then(res => {
        if (res.status) {
          setAccountData(res.data);
          let _key = 1;
          if (!walletName) {
            if (hidden) {
              _key = res.data.defaultAccountNameIndex
                ? res.data.defaultAccountNameIndex.hidden
                : 1;
            } else {
              _key = res.data.defaultAccountNameIndex
                ? res.data.defaultAccountNameIndex.general
                : 1;
            }
            setDefaultWalletName(
              `${Config.name} ${!_selected ? _key : walletId}`,
            );
            setWalletName(`${Config.name} ${!_selected ? _key : walletId}`);
          } else {
            setDefaultWalletName(
              !/codl wallet/i.test(walletName)
                ? walletName
                : `${Config.name} ${walletId}`,
            );
            setWalletName(
              !/codl wallet/i.test(walletName)
                ? walletName
                : `${Config.name} ${walletId}`,
            );
          }
        }
      });
      return () => { };
    }, [walletId]),
  );

  const onPressCloseIcon = () => {
    if (from === appConstant.accountList) {
      navigation.goBack();
      route?.params?.onGoBack();
    } else if (from === appConstant.selectAccount && accountList?.length > 0) {
      navigation.goBack();
      route?.params?.onGoBack();
    } else {
      navigation.navigate(appConstant.main);
    }
    return true;
  };

  const onWalletNameFocus = () => {
    setWalletNameFocus(true);
    nameRef.current.focus();
    setIsSelect(false);
    setShowBackArrow(false);
  };

  const onWalletNameBlur = () => {
    setWalletNameFocus(false);
    setIsSelect(true);
    setShowBackArrow(true);
  };

  const onWalletNameSubmit = () => {
    setWalletNameFocus(false);
    setIsSelect(true);
    setShowBackArrow(true);
  };

  const handleCreateClick = async () => {
    if (walletName === '') {
      setShowAlert(true);
      setAlertTitle(t('walletnameRequired'));
      setAlertMessage(t('walletnameError'));
      return;
    }
    if (walletId === '' || walletId === undefined) {
      setShowAlert(true);
      setAlertTitle(t('selectWalletRequired'));
      setAlertMessage(t('selectWalletError'));
      return;
    }
    if (selectedNetwork) {
      if (route.params.wallet) {
        let _newWallet = route.params.wallet;
        _newWallet.name = walletName;
        createNewAccount(_newWallet, hidden, passphrase).then(
          res => {
            if (res.status) {
              if (defaultWalletName && defaultWalletName === walletName)
                setDefaultAccountNameIndex();
              navigation.navigate(appConstant.accountDetails, {
                walletName: walletName,
                walletAddress: walletAddress,
                name: name,
                hidden: hidden,
                passphrase: passphrase,
                from: appConstant.createAccount,
                accountList: accountList
              });
              setTimeout(() => {
                setWalletName('');
                setWalletAddress('');
              }, 2000);
            }
          },
        );
      }
    }
  };

  const handleSelectWalletClick = () => {
    setIsSelect(true);
    setShowBackArrow(true);
    setWalletNameFocus(false);
    navigation.navigate(appConstant.selectAccount, {
      name: name,
      walletName: walletNameChanged && walletName,
      walletId: walletId,
      accountList: accountList,
      hidden: hidden,
      passphrase: passphrase,
      onGoBackFunc: route?.params?.onGoBack,
      onGoBack: () => {
        setWalletNameFocus(false);
        setShowBackArrow(false);
        // route?.params?.onGoBack();
        // setIsSelect(false)
      },
    });
  };

  const backAction = () => {
    if (from === appConstant.accountList) {
      navigation.goBack();
      route?.params?.onGoBack();
    }
    else {
      navigation.goBack();
    }
    return true
  };

  useEffect(() => {
    handleSelectWalletClick()
  }, [])

  return (
    <View
      style={styles.container}
      onStartShouldSetResponder={() => Keyboard.dismiss()}>
      <Header
        title={t('createAccount')}
        showRightIcon
        RightIcon={
          from === appConstant.accountList || accountList?.length > 0
            ? 'false'
            : 'info'
        }
        showBackIcon
        rightIconDisable={
          from === appConstant.accountList || accountList?.length > 0
            ? false
            : true
        }
        onBackPress={backAction}
        statusBarcolor={colors.black}
        RightIconPress={onPressCloseIcon}
      />
      <View style={styles.subContainer}>
        <TouchableOpacity
          style={[
            styles.buttonContainer,
            { backgroundColor: isSelect ? colors.white : colors.gray },
          ]}
          // onFocus={}
          onPress={handleSelectWalletClick}>
          {walletAddress ? (
            <>
              <View
                style={[
                  styles.numberContainer,
                  { backgroundColor: isSelect ? colors.black : colors.white },
                ]}>
                <FontText
                  name={'inter-bold'}
                  size={normalize(15)}
                  color={isSelect ? 'white' : 'black'}>
                  {id}
                </FontText>
              </View>
              <FontText
                name={'inter-regular'}
                size={normalize(22)}
                color={isSelect ? 'black' : 'white'}
                pRight={selectWallet || showBackArrow ? hp(9) : hp(13)}>
                {walletAddress.replace(walletAddress.substring(7, 38), `...`)}
              </FontText>
            </>
          ) : (
            <FontText
              name={'inter-regular'}
              size={normalize(22)}
              color={isSelect ? 'black' : 'white'}
              pRight={!isSelect ? hp(13) : hp(9)}>
              {t('select_wallet')}
            </FontText>
          )}
          {/* {!!!walletId && <SvgIcons.BlackRightArrow height={hp(3)} width={hp(2.5)} />}
          {!!walletId && <SvgIcons.BlackCheck height={hp(4)} width={hp(2.5)} />} */}
          {showBackArrow && (
            <SvgIcons.BlackRightArrow height={hp(3)} width={hp(2.5)} />
          )}
          {!showBackArrow && selectWallet && (
            <>
              {isSelect ? (
                <SvgIcons.BlackCheck height={hp(4)} width={hp(2.5)} />
              ) : (
                <SvgIcons.Check height={hp(4)} width={hp(2.5)} />
              )}
            </>
          )}
        </TouchableOpacity>
        <Input
          withRightIcon={walletName !== '' ? true : false}
          placeholder={t('walletName')}
          value={walletName}
          ref={nameRef}
          placeholderTextColor={walletNameFocus ? colors.black : colors.white}
          onChangeText={e => {
            if (e.length <= 20) {
              setWalletName(e);
              !walletNameChanged && setWalletNameChanged(true);
            }
          }}
          keyboardType={'default'}
          returnKeyType={'next'}
          onFocus={onWalletNameFocus}
          onBlur={onWalletNameBlur}
          onSubmit={onWalletNameSubmit}
          blurOnSubmit
          fontName={'poppins-regular'}
          onSubmitEditing={onWalletNameSubmit}
          fontSize={normalize(22)}
          inputStyle={[
            styles.textInput,
            {
              color: walletNameFocus == true ? colors.black : colors.white,
            },
          ]}
          style={[
            styles.textInputContainer,
            {
              backgroundColor:
                walletNameFocus == true ? colors.white : colors.gray,
            },
          ]}
          rightIcon={
            walletName &&
            !walletNameFocus && (
              <TouchableOpacity>
                {walletNameFocus ? (
                  <SvgIcons.BlackCheck height={hp(4)} width={hp(2.5)} />
                ) : (
                  <SvgIcons.Check height={hp(4)} width={hp(2.5)} />
                )}
              </TouchableOpacity>
            )
          }
        />
      </View>
      <Button
        flex={null}
        type="highlight"
        borderRadius={11}
        bgColor="white"
        onPress={handleCreateClick}
        style={styles.button}>
        <FontText name={'inter-medium'} size={normalize(22)} color="black">
          {t('create')}
        </FontText>
      </Button>
      {showAlert && (
        <PopUp
          title={alertTitle}
          message={alertMessage}
          onConfirmPressed={() => {
            setShowAlert(false);
          }}
        />
      )}
    </View>
  );
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
    width: wp(90),
  },
  textInput: {
    fontSize: normalize(22),
    padding: 0,
    paddingHorizontal: wp(4),
  },
  buttonContainer: {
    height: hp(8.5),
    width: wp(90),
    borderRadius: wp(2),
    alignItems: 'center',
    gap: wp(5),
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
    alignItems: 'center',
  },
  button: {
    // backgroundColor: colors.white,
    marginBottom: hp(3),
    // height: hp(8.5),
    // width: wp(90),
    alignSelf: 'center',
  },
});
