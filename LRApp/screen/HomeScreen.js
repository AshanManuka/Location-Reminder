import React from 'react';
import { View, Pressable, StyleSheet, Text, TextInput } from "react-native";


const HomeScreen = ({navigation}) => {

    const [startLocation, setStartLocation] = React.useState('');

    const startTrip = () => {
        alert("Start Trip");
    }

    const changeStartLocation = (inputText) => {
        setStartLocation(inputText);

    }




    return(
        <View style={styles.container}>

            <Text style={styles.mainText}>Hello Ashan,</Text>

            <View style={styles.startBtnSec}>
                <Pressable style={styles.startBtn}
                    onPress={startTrip}
                >
                <Text style={styles.btnText}>Start a Trip</Text> 
                </Pressable>
            </View>


            <View style={styles.subView}>

                <TextInput style={styles.inputItemsOne}
                onChangeText={changeStartLocation}
                placeholder='Start Location'
                value={startLocation}
                />



            </View>





        <View style={styles.btnSec}>
        <Pressable style={styles.button}
        onPress={() => navigation.navigate('Game')}>
        <Text style={styles.btnText}>Logs</Text>  
        </Pressable>
        </View>





        </View>
    );
}
export default HomeScreen

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
        height:'60%'
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
    btnSec:{
        marginTop:'20%'
    }
  });
  