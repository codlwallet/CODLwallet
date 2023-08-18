import {
  BackHandler,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import colors from '../../assets/colors';
import {hp, normalize, wp} from '../../helper/responsiveScreen';
import Header from '../../components/common/Header';
import FontText from '../../components/common/FontText';
import {useTranslation} from 'react-i18next';
import {walletListData} from '../../constants/data';
import ButtonView from '../../components/common/ButtonList';
import appConstant from '../../helper/appConstant';
import Button from '../../components/common/Button';
import SvgIcons from '../../assets/SvgIcons';
import {useDispatch, useSelector} from 'react-redux';
import {selectAccount} from '../../redux/slices/authSlice';
import {useFocusEffect} from '@react-navigation/native';
import {getAccountsData} from '../../storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AccountListScreen({navigation, route}) {
  const {t} = useTranslation();
  const name = route?.params?.name;
  const icon = route?.params?.icon;
  const accountListArry = route?.params?.accountList;
  const showlistvisible = route?.params?.showList;
  const from = route?.params?.from;
  const headerName = route?.params?.headerName;
  const {passphrase} = useSelector(state => state.auth);
  const {selectedNetwork} = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const [showList, setShowList] = useState(
    showlistvisible === false ? false : true,
  );
  const [btnValue, setButtonValue] = useState();
  const [buttonIndex, setButtonIndex] = useState();
  const [accountValue, setAccountValue] = useState();
  const [accountList, setAccountList] = useState(accountListArry);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);
    return async () => {
      BackHandler.removeEventListener('hardwareBackPress', backAction);
    };
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      getAccountsData().then(async res => {
        let user = await AsyncStorage.getItem('hidden');
        const isHidden = JSON.parse(user);
        if (res.status) {
          if (!isHidden) {
            setAccountList(res.created?.general);
          } else {
            setAccountList(res.created?.hidden[passphrase]);
          }
        }
      });
    }, []),
  );

  useFocusEffect(
    React.useCallback(() => {
      if (showlistvisible === false) {
        console.log('showlistvisible');
        setShowList(false);
      }
    }, [showlistvisible]),
  );

  const backAction = () => {
    if (from === appConstant.accountDetails) {
      navigation.navigate(appConstant.main);
    } else {
      navigation.goBack();
    }
    return true;
  };

  const handleWalletOptionClick = (item, index) => {
    setButtonValue(item?.name);
    setButtonIndex(index);
    if (item.value === appConstant.createNewAccount) {
      setTimeout(() => {
        navigation.navigate(appConstant.createAccount, {
          name: name,
          from: appConstant.accountList,
          accountList: accountList,
          onGoBack: () => {
            setShowList(true);
          },
        });
        setButtonValue('');
        setButtonIndex();
        setShowList(true);
      }, 200);
    } else {
      setTimeout(() => {
        navigation.navigate(appConstant.reorder, {
          name: name,
          accountList: accountList,
          onGoBack: () => {
            setShowList(true);
          },
        });
        setButtonValue('');
        setButtonIndex();
        setShowList(true);
      }, 200);
    }
  };

  const onClickAccount = itm => {
    setAccountValue(itm?.name);
    dispatch(selectAccount(itm));
    navigation.navigate(appConstant.accountDetails, {
      walletName: itm?.name,
      walletAddress: itm?.publicKey,
      from: appConstant.accountList,
      headerName: headerName,
      accountList: accountList,
      name: name,
      onGoBack: () => {
        setAccountValue('');
      },
    });
  };

  return (
    <View style={styles.container}>
      <Header
        title={selectedNetwork}
        showRightIcon
        RightIcon={showList ? 'menu' : 'false'}
        showBackIcon={showList ? true : false}
        onBackPress={backAction}
        statusBarcolor={colors.black}
        titleStyle={{left: showList ? wp(2.2) : wp(24), width: wp(45)}}
        titleIcon={
          selectedNetwork === appConstant.ethereum ? (
            <Image
              source={require('../../assets/images/iEthereum.png')}
              style={styles.icons}
            />
          ) : selectedNetwork === appConstant.avalanche ? (
            <Image
              source={require('../../assets/images/iAvalanche.png')}
              style={styles.icons}
            />
          ) : selectedNetwork === appConstant.polygon ? (
            <Image
              source={require('../../assets/images/iPolygon.png')}
              style={styles.icons}
            />
          ) : selectedNetwork === appConstant.bsc ? (
            <Image
              source={require('../../assets/images/iBSC.png')}
              style={styles.icons}
            />
          ) : selectedNetwork === appConstant.arbitrum ? (
            <Image
              source={require('../../assets/images/iArbitrum.png')}
              style={styles.icons}
            />
          ) : selectedNetwork === appConstant.optimism ? (
            <Image
              source={require('../../assets/images/iOptimism.png')}
              style={styles.icons}
            />
          ) : (
            <Image
              source={require('../../assets/images/izkSync.png')}
              style={styles.icons}
            />
          )
        }
        // titleIcon={<Image source={icon} style={selectedNetwork == appConstant.ethereum ? { height: hp(5), width: wp(6) } : selectedNetwork == appConstant.avalanche ? { height: hp(3.6), width: hp(4.4) } : selectedNetwork == appConstant.polygon ? { height: hp(4), width: hp(4.5) } : selectedNetwork == appConstant.bsc ? { height: hp(4), width: hp(3.5) } : selectedNetwork == appConstant.arbitrum ? { height: hp(4.1), width: hp(3.6) } : selectedNetwork == appConstant.optimism ? { height: hp(4.5), width: hp(4.5) } : selectedNetwork == appConstant.zksync ? { height: hp(3), width: hp(5) } : { height: hp(5), width: wp(8.8) }} />}
        RightIconPress={() => {
          setShowList(!showList);
        }}
        titleWithIcon
      />
      <View style={styles.subContainer}>
        {showList ? (
          <FlatList
            data={accountList}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  key={index}
                  style={[styles.listView]}
                  onPress={() => onClickAccount(item)}>
                  <FontText
                    name={'inter-regular'}
                    size={normalize(22)}
                    color={'white'}
                    style={{flex: 0.7}}>
                    {item?.name}
                  </FontText>
                  <FontText
                    name={'inter-regular'}
                    size={normalize(15)}
                    color={'white'}
                    style={{flex: 0.6}}
                    textAlign={'left'}>
                    {item?.publicKey.replace(
                      item?.publicKey.substring(10, 38),
                      `...`,
                    )}
                  </FontText>
                </TouchableOpacity>
              );
            }}
            contentContainerStyle={{justifyContent: 'center', flexGrow: 1}}
          />
        ) : (
          <>
            {walletListData?.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleWalletOptionClick(item, index)}
                  style={{alignItems: 'center'}}>
                  <ButtonView
                    listItem={item}
                    showRightIcon
                    index={index}
                    buttonIndex={buttonIndex}
                  />
                </TouchableOpacity>
              );
            })}
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },
  subContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonContainer: {
    height: hp(8.5),
    borderRadius: wp(2),
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: wp(5),
    backgroundColor: colors.yellow,
    marginHorizontal: wp(5),
    marginBottom: hp(2),
  },
  image: {
    width: hp(3),
    height: hp(5),
  },
  button: {
    marginBottom: hp(3),
  },
  listView: {
    height: hp(8.5),
    borderRadius: wp(2),
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: wp(4),
    backgroundColor: colors.gray,
    marginHorizontal: wp(5),
    marginBottom: hp(2),
    flex: 1,
  },
  icons: {
    width: hp(4.8),
    height: hp(5.8),
  },
});
