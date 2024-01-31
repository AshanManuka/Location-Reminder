import React, { useState, useEffect } from 'react';
import { View, Pressable, StyleSheet, Text } from 'react-native';
import * as Location from 'expo-location';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';

//const HomeScreen = ({ navigation }) => {
const HomeScreen = ({ route, navigation }) => {
  const { dataArray } = route.params || {};
  const [errorMsg, setErrorMsg] = useState(null);
  const [intervalId, setIntervalId] = useState(null);
  const [mapRegion, setMapRegion] = useState({
    latitude: 7.9403,
    longitude: 81.0188,
    latitudeDelta: 0.0522,
    longitudeDelta: 0.0421
  });

  useEffect(() => {

    console.log(dataArray);
    stopLocationUpdates();
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      //setLocation(location);
    })();

    //startTrip();
  }, [dataArray]);

  const startTrip = async () => {

  
    // Watch the user's position
  const locationSubscription = await Location.watchPositionAsync(
    { accuracy: Location.Accuracy.High, timeInterval: 1000, distanceInterval: 1 },
    (location) => {
      console.log('Location:', location);
      
      // Update the map region to the new location
      setMapRegion({
        ...mapRegion,
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      
    }
  );
  };


  const sendCurrentLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      let lati = parseFloat(location.coords.latitude).toFixed(6);
      let longi = parseFloat(location.coords.longitude).toFixed(6);

      
      const postData = {
        placename: "saloon",
        category: 'YourCategory',
        latitude:  lati, 
        longitude: longi,
      };

      const baseUrl = 'http://3.84.10.254/predict_place';

      fetch(baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      })
        .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson);
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.error('Error getting location:', error);
    }
  }

  const startLocationUpdates = () => {
    sendCurrentLocation();

    const id = setInterval(() => {
      sendCurrentLocation();
    }, 5000);

    setIntervalId(id);
  };

  const stopLocationUpdates = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  };

  return (
    <View style={styles.container}>

      <View style={styles.btnSecOne}>
        <Pressable
          style={styles.nextBtn}
          onPress={startLocationUpdates}
        >
          <Text style={styles.btnText}>Start</Text>
        </Pressable>
      </View>

      <View style={styles.subView}>

        <View style={styles.subMapViewOne}>
        <MapView style={styles.subMapViewTwo}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        region={mapRegion}

        onPress={(event) => {
          const { coordinate } = event.nativeEvent;
          console.log('Tapped location:', coordinate);
          // Do something with the tapped location, e.g., setEndLocation
          // setEndLocation({
          //   coordinate
          // });
        }}
        >

        </MapView>
        </View>

      </View>

      <View style={styles.btnSec}>
        <Pressable
          style={styles.nextBtn}
          onPress={() => navigation.navigate('Game')}
        >
          <Text style={styles.btnText}>ADD Tasks</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#303952',
      alignItems: 'center',
      justifyContent: 'center',
    },
    mainText:{
        color:'#bdc3c7',
        fontSize:20,
        width:'80%',
        fontWeight:'bold',
        marginTop:'12%'
    },
    btnText:{
        color: '#dcdde1',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 30,
        fontWeight: 'bold'
      },
    subView:{
        backgroundColor:'#0a3d62',
        marginTop:'2%',
        width:'95%',
        height:'60%',
        borderRadius:10
    },
    btnSec:{
      marginTop:'5%',
      backgroundColor: '#16a085',
      width:'80%',
      height:'8%',
      margin: '2%',
      borderRadius:6
    },
    btnSecOne:{
      marginTop:'10%',
      backgroundColor: '#16a085',
      width:'80%',
      height:'8%',
      margin: '2%',
      borderRadius:6
    },
    nextBtn:{
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 8,
      height:'100%',
      backgroundColor: '#16a085',
    },
    subMapViewOne:{
      width:'95%',
      height:'90%',
      marginTop:'10%',
      marginLeft:'2.5%',
      borderRadius:20
      
    },
    subMapViewTwo:{
      width:'100%',
      height:'100%',
      
      
    },
  });
  