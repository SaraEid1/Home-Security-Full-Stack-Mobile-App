import { StyleSheet} from 'react-native';
import Home from './pages/home';
import Started from './pages/getStarted';
import LiveUpdate from './pages/liveupdate';
import PhotoLibrary from './pages/photolibrary';
import Popup from './pages/popup';
import './shim';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Amplify from "@aws-amplify/core"


Amplify.configure({
  Auth: {
      identityPoolId: 'us-west-1:XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX', //REQUIRED - Amazon Cognito Identity Pool ID
      region: 'us-west-1', // REQUIRED - Amazon Cognito Region
      userPoolId: 'us-west-1_XXXXXXXXX', //OPTIONAL - Amazon Cognito User Pool ID
      userPoolWebClientId: '', //OPTIONAL - Amazon Cognito Web Client ID
  }
  ,
  Storage: {
      AWSS3: {
          bucket: 'xxxxxxxxx', //REQUIRED -  Amazon S3 bucket name
          region: 'ca-central-1', //OPTIONAL -  Amazon service region
      }
  }, 
  Analytics: { 
    disabled: true 
  } , 
  
});

const Stack = createNativeStackNavigator();


export default function App() {

  return (
<NavigationContainer>
            <Stack.Navigator screenOptions={{
              headerStyle: {
                backgroundColor: 'transparent'
              }, 
              headerTransparent: true,
              headerTitle: '',
              headerLeftContainerStyle:{
                paddingLeft: 20
              },
              headerTitleStyle: {
                fontSize: 22,
                fontWeight: 'bold'
              },
              headerBackVisible:false
            }} initialRouteName="Started">
                <Stack.Screen name='Started' component = {Started}/>
                <Stack.Screen name='Home' component = {Home}/>
                <Stack.Screen options= {{ headerTitle: 'Live Update', headerBackVisible:true}} name='LiveUpdate' component = {LiveUpdate} />
                <Stack.Screen options= {{ headerTitle: 'Photo Library', headerBackVisible:true}} name='PhotoLibrary' component = {PhotoLibrary}/>
                <Stack.Screen name='Popup' component = {Popup}/>
            </Stack.Navigator>
        </NavigationContainer>

  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
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
