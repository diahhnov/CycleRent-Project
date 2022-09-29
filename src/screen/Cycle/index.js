import {
  View,
  PermissionsAndroid,
  TouchableOpacity,
  Animated,
  Dimensions,
  Platform,
  Image,
  Alert,
  BackHandler,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {COLORS} from '../../assets/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {moderateScale} from 'react-native-size-matters';
import {CustomMarker, Roboto, StatusBarCore} from '../../component';
import {useNavigation} from '@react-navigation/native';
import Geolocation from 'react-native-geolocation-service';
import {Rating} from 'react-native-ratings';
import {styles} from './styles';
import {useDispatch} from 'react-redux';
import axios from 'axios';
import {baseUrl} from '@env';
import {setLoad} from '../../redux/globalAction';
import {sepedaPic} from '../../assets/Image';
import {setCycle, setDetailRental} from '../DetailCycle/redux/action';
import {rentalId, setAllRental} from './redux/action';

const {width} = Dimensions.get('window');
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;

const Cycle = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [permission, setPermission] = useState(false);
  const [location, setLocation] = useState({
    coords: {
      accuracy: 0,
      altitude: 0,
      altitudeAccuracy: 0,
      heading: 0,
      latitude: 0,
      longitude: 0,
      speed: 0,
    },
    mocked: false,
    provider: 'fused',
    timestamp: 0,
  });
  const [marker, setMarker] = useState([]);
  // const [mapId, setMapId] = useState(0);

  let mapIndex = 0;
  let mapAnimation = new Animated.Value(0);

  //exit
  const exit = () => {
    const backAction = () => {
      Alert.alert('Hold on!', 'Do you want to exit the application?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'YES', onPress: () => BackHandler.exitApp()},
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  };

  const getAllRental = useCallback(async () => {
    try {
      dispatch(setLoad(true));
      const reference = await axios.get(`${baseUrl}/rental`);
      setMarker(reference.data.data);
      dispatch(setAllRental(reference.data.data));
      dispatch(setLoad(false));
    } catch (error) {
      console.log(error);
      dispatch(setLoad(false));
    } finally {
      dispatch(setLoad(false));
    }
  }, [dispatch]);

  const getAllCyclebyOR = useCallback(async () => {
    try {
      dispatch(setLoad(true));
      const reference = await axios.get(
        `${baseUrl}/rental/632d174aa8467e439d51946a`,
      );
      dispatch(setDetailRental(reference.data.data));
      dispatch(setLoad(false));
    } catch (error) {
      error;
      dispatch(setLoad(false));
    } finally {
      dispatch(setLoad(false));
    }
  }, [dispatch]);

  const getCycleById = useCallback(async () => {
    try {
      dispatch(setLoad(true));
      const ref = await axios.get(
        `${baseUrl}/bicycle/632d174aa8467e439d51946a`,
      );
      dispatch(setCycle(ref.data.data[0]));
      dispatch(setLoad(false));
    } catch (error) {
      error;
      dispatch(setLoad(false));
    } finally {
      dispatch(setLoad(false));
    }
  }, [dispatch]);

  mapAnimation.addListener(({value}) => {
    let index = Math.floor(value / CARD_WIDTH + 0.3);
    if (index >= marker.length) {
      index = marker.length - 1;
    }
    if (index <= 0) {
      index = 0;
    }
    clearTimeout(regionTimeout);
    const regionTimeout = setTimeout(() => {
      if (mapIndex !== index) {
        mapIndex = index;

        const {coordinate} = marker[index];
        _map.current.animateToRegion(
          {
            ...coordinate,
            latitudeDelta: 0.009,
            longitudeDelta: 0.009,
          },
          350,
        );
      }
    }, 10);
  });

  useEffect(() => {
    exit();
    getCycleById();
    getAllCyclebyOR();
    getAllRental();
    LocationPermission();
    getLocation();
  }, [
    LocationPermission,
    getLocation,
    location,
    _map,
    getAllRental,
    getCycleById,
    getAllCyclebyOR,
  ]);

  const onMarkerPress = mapEventData => {
    const markerID = mapEventData._targetInst.return.key;
    dispatch(rentalId(markerID));
    let x = markerID * CARD_WIDTH + markerID * 20;
    if (Platform.OS === 'ios') {
      x = x - SPACING_FOR_CARD_INSET;
    }

    _scrollView.current.scrollTo({
      x: x,
      y: 0,
      animated: true,
    });
  };

  const LocationPermission = useCallback(async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'MyMapApp needs access to your location',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        setPermission(granted);
      } else {
        setPermission(false);
      }
    } catch (error) {
      console.warn(error);
    }
  }, []);

  const getLocation = useCallback(() => {
    if (permission === 'granted') {
      Geolocation.getCurrentPosition(position => {
        setLocation(position);
        const {latitude, longitude} = position.coords;
        setLocation({
          ...location,
          latitude,
          longitude,
        });
      }),
        error => {
          console.log(error.code, error.message);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000};
    }
  }, [location, permission]);

  const _map = React.useRef(null);
  const _scrollView = React.useRef(null);
  const addCycle = () => navigation.navigate('DetailCycle');

  return (
    <View style={styles.container}>
      <StatusBarCore backgroundColor="transparent" hidden translucent />
      <View style={styles.wrapMap}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
            latitude: location.coords.latitude
              ? location.coords.latitude
              : -6.1988,
            longitude: location.coords.longitude
              ? location.coords.longitude
              : 106.9983,
            latitudeDelta: 0.009,
            longitudeDelta: 0.009,
          }}>
          <Marker
            pinColor={COLORS.black}
            key={'user'}
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            title={'Posisi Saya'}
            description={'Lokasi saya saat ini'}
          />
          {marker.map(item => (
            <Marker
              key={item._id}
              coordinate={{
                latitude: parseFloat(item.coordinate.latitude),
                longitude: parseFloat(item.coordinate.longitude),
              }}
              onPress={e => {
                onMarkerPress(e);
                navigation.navigate('DetailCycle');
              }}
              title={item.title}
              description={String(item.available) + '' + ' available'}>
              <CustomMarker item={item} />
            </Marker>
          ))}
        </MapView>
      </View>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons
          name="arrow-back"
          size={moderateScale(30)}
          color={COLORS.black}
          style={styles.iconBack}
        />
      </TouchableOpacity>
      <Animated.ScrollView
        ref={_scrollView}
        horizontal
        pagingEnabled
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_WIDTH + 20}
        snapToAlignment="center"
        style={styles.scrollView}
        contentInset={{
          top: 0,
          left: SPACING_FOR_CARD_INSET,
          bottom: 0,
          right: SPACING_FOR_CARD_INSET,
        }}
        contentContainerStyle={{
          paddingHorizontal:
            Platform.OS === 'android' ? SPACING_FOR_CARD_INSET : 0,
        }}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: mapAnimation,
                },
              },
            },
          ],
          {useNativeDriver: true},
        )}>
        {marker.map((item, index) => (
          <View key={index}>
            <View style={styles.card} key={e => onMarkerPress(e)}>
              <Image
                source={sepedaPic}
                style={styles.cardImage}
                resizeMode="cover"
              />
              <View style={styles.textContent}>
                <Roboto numberOfLines={1} style={styles.cardtitle}>
                  {item.title}
                </Roboto>
                <View style={styles.rating}>
                  <Rating
                    type="star"
                    ratingCount={5}
                    imageSize={moderateScale(14)}
                    startingValue={item.rating}
                  />
                </View>
                <View style={styles.button}>
                  <TouchableOpacity onPress={addCycle} style={styles.signIn}>
                    <Roboto style={styles.textSign}>Rent Now</Roboto>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        ))}
      </Animated.ScrollView>
    </View>
  );
};

export default Cycle;
