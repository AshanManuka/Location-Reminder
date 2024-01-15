import React, { useState, useEffect } from 'react';
import { View, Pressable, StyleSheet, Text, TextInput } from 'react-native';
import * as Location from 'expo-location';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';

const HomeScreen = ({ navigation }) => {
  const [startLocation, setStartLocation] = useState(null);
  const [endLocation, setEndLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [mapRegion, setMapRegion] = useState({
    latitude: 7.9403,
    longitude: 81.0188,
    latitudeDelta: 0.0522,
    longitudeDelta: 0.0421
  });

  // useEffect(() => {
  //   // (async () => {
      
  //   //   let { status } = await Location.requestForegroundPermissionsAsync();
  //   //   if (status !== 'granted') {
  //   //     setErrorMsg('Permission to access location was denied');
  //   //     return;
  //   //   }

  //   //   let location = await Location.getCurrentPositionAsync({});
  //   //   setLocation(location);
  //   // })();
  // }, []);

  const startTrip = async () => {

  (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setStartLocation(location);
    })();
    console.log(startLocation);
  };

  const changeStartLocation = (inputText) => {
    setStartLocation(inputText);
  };

  const changeEndLocation = (inputText) => {
    setEndLocation(inputText);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.mainText}>Hello Ashan,</Text>

      <View style={styles.startBtnSec}>
        <Pressable style={styles.startBtn} onPress={startTrip}>
          <Text style={styles.btnText}>Start a Trip</Text>
        </Pressable>
      </View>

      <View style={styles.subView}>
        <TextInput
          style={styles.inputItemsOne}
          onChangeText={changeStartLocation}
          placeholder="Start Location"
          value={startLocation}
        />

        <TextInput
          style={styles.inputItemsTwo}
          onChangeText={changeEndLocation}
          placeholder="Final Location"
          value={endLocation}
        />


        <MapView style={styles.subMapView}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        region={mapRegion}

        onPress={(event) => {
          const { coordinate } = event.nativeEvent;
          console.log('Tapped location:', coordinate);
          // Do something with the tapped location, e.g., setEndLocation
          setEndLocation({
            coordinate
          });
        }}
        
        >

        </MapView>



      </View>

      <View style={styles.btnSec}>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate('Game')}
        >
          <Text style={styles.btnText}>Logs</Text>
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
    startBtnSec:{
      marginTop:'10%',
      backgroundColor: '#16a085',
      width:'85%',
      height:'10%',
      margin: '2%',
      borderRadius:6
    },
    startBtn:{
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 8,
      height:'100%',
      backgroundColor: '#16a085',
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
        marginTop:'10%',
        width:'95%',
        height:'60%',
        borderRadius:10
    },
    inputItemsOne:{
        height: 40,
        width:'40%',
        borderWidth: 1,
        marginTop:'2%',
        marginLeft:'5%',
        borderTopColor:'#0a3d62',
        borderLeftColor:'#0a3d62',
        borderRightColor:'#0a3d62',
        borderBottomColor:'#fff',
        color:'#fff',
        fontSize:18,
    },
    inputItemsTwo:{
        height: 40,
        width:'40%',
        borderWidth: 1,
        marginTop:'-10%',
        marginLeft:'55%',
        borderTopColor:'#0a3d62',
        borderLeftColor:'#0a3d62',
        borderRightColor:'#0a3d62',
        borderBottomColor:'#fff',
        color:'#fff',
        fontSize:18,
    },
    btnSec:{
        marginTop:'20%'
    },
    subMapView:{
      width:'95%',
      height:'80%',
      marginTop:'10%',
      marginLeft:'2.5%',
      
    },
  });
  