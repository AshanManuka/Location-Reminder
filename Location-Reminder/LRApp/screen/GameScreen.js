import React from 'react';
import { View, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";


const GameScreen = ({navigation}) => {

    const [typedLocation, setTypedLocation] = React.useState('');
    const [searchResults, setSearchResults] = React.useState([]);
    const [selectedPlace, setSelectedPlace] = React.useState([]);

    const changeLocations = (inputText) => {
        setTypedLocation(inputText);
    }

    const searchKeyword = () => {
        // alert("Search..!")
        const locationList = [
            {
                id:1,
                name:"Cafe"
            },
            {
                id:2,
                name:"Pharmacy"
            },
            {
                id:3,
                name:"Meet-Shop"
            },
            {
                id:4,
                name:"Beer-Shop"
            },
            {
                id:5,
                name:"Grocery-Shop"
            }
        ]

        //setSearchResults(locationList);

        fetch('http://3.84.10.254/open', { method: 'GET' })
        .then((responseJson) => {
          console.log(responseJson);
        })
        .catch((error) => {
          console.error(error);
        });
        
        
        // fetch(baseUrlAA,{method: 'GET'})
        // .then((responseJson) => {
        //   console.log(responseJson);
        // })
        // .catch((error) => {
        //   console.error(error)
        // });
        
    }

    const methodOne = () => {
      const baseUrl = 'http://192.168.51.206:8000/open';

      fetch(baseUrl,{method: 'GET'})
        .then((responseJson) => {
          console.log(responseJson);
        })
        .catch((error) => {
          console.error(error)
        });

    }

    const methodTwo = () => {
      const baseUrl = 'http://192.168.171.220:8000/open';

      fetch(baseUrl,{method: 'GET'})
        .then((responseJson) => {
          console.log(responseJson);
        })
        .catch((error) => {
          console.error(error)
        });
      
    }

    const methodThree = () => {

      const baseUrl = 'http://192.168.248.129:8000/open';

      fetch(baseUrl,{method: 'GET'})
        .then((responseJson) => {
          console.log(responseJson);
        })
        .catch((error) => {
          console.error(error)
        });
    }

    const methodFour = () => {

      const baseUrl = 'http://3.84.10.254/open';
  
      fetch(baseUrl,{method: 'GET'})
        .then((responseJson) => {
          console.log(responseJson);
        })
        .catch((error) => {
          console.error(error)
        });
    }

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
                {searchResults.map((result) => (
                    <TouchableOpacity
                    key={result.id}
                    style={styles.searchResultItem}
                    onPress={() => {selectAndFindLocation(result.name,result.id)}}
                    >
                    <Text style={styles.btnText}>{result.name}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {selectedPlace.length > 0 && (
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
         <TouchableOpacity
            style={styles.sampleBtn}
            onPress={methodOne}
            >
            <Text style={styles.btnText}>Search</Text>
            </TouchableOpacity>

             {/* // fun */}
             <TouchableOpacity
            style={styles.sampleBtn}
            onPress={methodTwo}
            >
            <Text style={styles.btnText}>Search</Text>
            </TouchableOpacity>

             {/* // fun */}
             <TouchableOpacity
            style={styles.sampleBtn}
            onPress={methodThree}
            >
            <Text style={styles.btnText}>Search</Text>
            </TouchableOpacity>

             {/* // fun */}
             <TouchableOpacity
            style={styles.sampleBtn}
            onPress={methodFour}
            >
            <Text style={styles.btnText}>Search</Text>
            </TouchableOpacity>
    
    
    
    
    
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
  