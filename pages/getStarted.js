import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity} from 'react-native';
import img from './started.png'; 
import { withAuthenticator } from 'aws-amplify-react-native';

function  App({navigation}) {


  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titleText}> HOMEY </Text>
      <View>
          <Image
            source={img} style={{ width: 350, height: 350 }}
            />

            
      <TouchableOpacity style={styles.but}
        onPress={() => {
          navigation.navigate ("Home");
        }}>
        <Text style={{ fontSize: 23, color: '#fff' }}>Get Started </Text>
      </TouchableOpacity>
      
      </View>
    </SafeAreaView>
  );
}

export default withAuthenticator(App, {
  // Render a sign out button once logged in
  includeGreetings: false
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#4D5283',
  },
  but: {
    backgroundColor: '#494B7A',
    width: 300,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 25,
    marginTop: 50,
    borderRadius: 8,
  }
});
