import { View, Pressable, StyleSheet, Text } from "react-native";


const GameScreen = ({navigation}) => {
    return(
        <View style={styles.container}>
    
        <View style={styles.btnSec}>
        <Pressable style={styles.button}
        onPress={() => navigation.navigate('Home')}>
        <Text style={styles.btnText}>Logs</Text>  
        </Pressable>
        </View>
    
    
    
    
    
        </View>
    );
} 
export default GameScreen

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    btnSec:{
        marginTop:'20%'
    }
  });
  