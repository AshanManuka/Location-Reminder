import { View, Pressable, StyleSheet, Text } from "react-native";


const SampleScreen = ({navigation}) => {
    return(
        <View>
    
        <View style={styles.btnSec}>
        <Pressable style={styles.button}
        onPress={() => navigation.navigate('Home')}>
        <Text style={styles.btnText}>Logs</Text>  
        </Pressable>
        </View>
    
    
    
    
    
        </View>
    );
} 
export default SampleScreen

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  