import React, { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import {addLocation, getAllLocation} from './../database';
import { View, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";


const GameScreen = ({navigation}) => {

    const [typedLocation, setTypedLocation] = React.useState('');
    const [searchResults, setSearchResults] = React.useState([]);
    const [selectedPlace, setSelectedPlace] = React.useState([]);
    const [placeList, setPlaceList] = React.useState([]);

    useEffect(() => {



  
    }, []);

    const changeLocations = (inputText) => {
        setTypedLocation(inputText);
    }

    const searchKeyword = () => {
        // alert("Search..!")
        const locationList = [
            {
                id:1,
                name:"cafe"
            },
            {
                id:2,
                name:"pharmacy"
            },
            {
                id:3,
                name:"meet Shop"
            },
            {
                id:4,
                name:"beer Shop"
            },
            {
                id:5,
                name:"grocery Shop"
            }
        ]

        setPlaceList(locationList);
        

        getAllLocation((results) => {
          if (results.length > 0) {
            console.log('Search results:', results);
            setSearchResults(results);
          } else {
            alert('No business found.');
          }
        });


        
    }

    const selectedLocation = async (name, id) => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        
        if (status !== 'granted') {
          console.log('Permission to access location was denied');
          return;
        }
  
        let location = await Location.getCurrentPositionAsync({});
        console.log(location.coords.latitude);
        
        const postData = {
          placename: name,
          category: 'YourCategory', // Replace with the actual category
          latitude: location.coords.latitude, // float 6
          longitude: location.coords.longitude, // float 6
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
    };




    const selectAndFindLocation = (locationName,selectedId) => {
        const selectedArray = selectedPlace.concat({ id: selectedId, name: locationName });
        setSelectedPlace(selectedArray);
        console.log(selectedPlace);
        changeLocations('');
    }

    const removeFromList = (locationId) => {
        alert("delete from list"+locationId);
    }


    return(
        <View style={styles.container}>

            <Text style={styles.mainText}>Select Places you need to Stop</Text>

            <TextInput 
            style={styles.inputOne}
            placeholder='keyword'
            onChangeText={changeLocations}
            value={typedLocation}
            />

            <TouchableOpacity
            style={styles.searchBtn}
            onPress={searchKeyword}
            >
            <Text style={styles.btnText}>Search</Text>
            </TouchableOpacity>

            <ScrollView horizontal={true} style={styles.resultView}>
                {placeList.map((result) => (
                    <TouchableOpacity
                    key={result.id}
                    style={styles.searchResultItem}
                    onPress={() => {selectedLocation(result.name,result.id)}}
                    >
                    <Text style={styles.btnText}>{result.name}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {placeList.length > 0 && (
            <ScrollView style={styles.selectedItemsContainer}>
                <View horizontal={true}
                style={styles.resultItem}>
                    
              </View>
            {selectedPlace.map((result) => (
            <View horizontal={true}
              key={result.id}
              style={styles.resultItem}
            >
              <Text style={styles.resultTextTwo}>{result.name}</Text>
                    <TouchableOpacity
                    key={result.id}
                    style={styles.subBtn}
                    onPress={() => {removeFromList(result.id)}}
                    >
                    <Text style={styles.subBtnText}>Remove</Text>
                    </TouchableOpacity>         
            
            </View>
          ))}      
          </ScrollView>
        )}

    
        <View style={styles.btnSec}>
        <Pressable style={styles.button}
        onPress={() => navigation.navigate('Home')}>
        <Text style={styles.btnText}>Logs</Text>  
        </Pressable>
        </View>

         {/* // fun */}
        {/*<TouchableOpacity
            style={styles.sampleBtn}
            onPress={methodOne}
            >
            <Text style={styles.btnText}>Search</Text>
            </TouchableOpacity>*/}

    
    
    
    
    
        </View>
    );
} 
export default GameScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#303952',
    },
    mainText:{
        color:'#fff',
        fontWeight:'bold',
        fontSize:20,
        marginTop:'15%',
        marginLeft:'5%'

    },
    inputOne:{
        height: 40,
        width:'60%',
        borderWidth: 1,
        marginTop:'10%',
        marginLeft:'5%',
        borderTopColor:'#0a3d62',
        borderLeftColor:'#0a3d62',
        borderRightColor:'#0a3d62',
        borderBottomColor:'#fff',
        color:'#fff',
        fontSize:18,
    },
    searchBtn:{
        backgroundColor:'#fab1a0',
        marginTop:'-8%',
        padding:'2%',
        marginLeft:'70%',
        borderRadius:8,
        width:'21%'
      },
      btnText:{
        color: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 18,
        fontWeight: 'bold'
      },
      resultView:{
            position:'absolute',
            marginTop: '50%',
            flexDirection: 'row',
            width:'100%',
      },
      searchResultItem: {
        backgroundColor: '#3498db',
        padding: 10,
        marginVertical: 5,
        marginRight: 2,
        borderRadius: 5,
      },
      selectedItemsContainer: {
        marginTop: '25%',
        maxHeight: 220,
        width:'70%',
        marginLeft:'10%'
      },
      resultItem:{
        backgroundColor:'#2d3436',
        borderColor:'#fff',
        flexDirection: 'row',
        marginTop:'0.5%',
        padding:15
      },
      resultTextTwo:{
        color:'#fff',
        fontWeight:'bold',
        padding:5,
        width:'50%'
      },
      subBtn:{
        backgroundColor:'#c0392b',
        marginTop:'1%',
        marginLeft:'10%',
        borderRadius:8,
        width:'28%',
        height:'auto'
      },
      subBtnText:{
        color:'#fff',
        fontWeight:'bold',
        padding:5,
      },
    btnSec:{
        marginTop:'20%'
    }
  });
  