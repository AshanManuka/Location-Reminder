import { View, Pressable, StyleSheet, Text } from "react-native";


const HomeScreen = ({navigation}) => {
    return(
        <View style={styles.container}>

        <View style={styles.btnSec}>
        <Pressable style={styles.button}
        onPress={() => navigation.navigate('Game')}>
        <Text style={styles.btnText}>Logs</Text>  
        </Pressable>
        </View>

        <Text>Hello</Text>





        </View>
    );
}
export default HomeScreen

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
  