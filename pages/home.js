import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity
} from 'react-native';
import img1 from './home.png';
import logout from './logout.png';
import {Auth} from 'aws-amplify';
import {Storage} from '@aws-amplify/storage'
import { withAuthenticator } from 'aws-amplify-react-native';

class Home extends React.Component {

  state = {
    image: null,
    allImages: [],
    last_length: 11
  }

  image_list = async () => {
    Storage.list('', { level: "public" }) .then (async result => {
      result = result.slice(1)
        var images_arr = [].concat(result);
        images_arr.sort((a, b) => b['lastModified'].toString().localeCompare(a['lastModified']))
        await this.getImagesUri(images_arr);
        var length = images_arr.length;
        console.log ('length:', length);
        console.log('last_length: ', this.state.last_length)
        if (length > this.state.last_length){
          console.log('home');
          this.setState({ last_length: length}) 
          this.props.navigation.navigate ("Popup");
        }
        if (length < this.state.last_length){
          this.setState({ last_length: length})
        }
        this.setState({ allImages: images_arr}) 
      })
      .catch(err => console.log(err))
  }

getImagesUri = async (data) => {
  let count, foo
  let uriArray = []
  for (count = 0; count < data.length; count++) {
    foo = data[count]['key']
    await Storage.get(foo)
      .then(bar => {
        var shortUri = bar.substr(0, 102)
        uriArray.push(bar)
      })
      .catch(err => console.log(err))
    data[count]['uri'] = uriArray[count]
  }
}

 signOut = async () => {
    try {
        await Auth.signOut({ global: true });
    } catch (error) {
        console.log('error signing out: ', error);
    }
}

render() {
  let a = this;
  setTimeout(() => {
    a.image_list();
    }, 5000);

    return (
      <View style= {styles.container}>

      <TouchableOpacity  onPress={this.signOut}>
      <Image style={styles.logout}
            source={logout} 
            />
      </TouchableOpacity>

      <TouchableOpacity style={styles.but1}
        onPress={() => {
          this.props.navigation.navigate ("LiveUpdate");
        }}>
        <Text style={{ fontSize: 23, color: '#fff' }}>Live Update </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.but2}
        onPress={() => {
          this.props.navigation.navigate ("PhotoLibrary");
        }}>
        <Text style={{ fontSize: 23, color: '#fff' }}>Photo Library </Text>
      </TouchableOpacity >

      <Image style={styles.img1}
            source={img1} 
            />
      
      </View>
  );
}
}

export default withAuthenticator(Home);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
    but1: {
        backgroundColor: '#494B7A',
        width: 300,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 45,
        marginBottom: 40,
        marginTop: 120,
        borderRadius: 8,
      },
      but2: {
        backgroundColor: '#494B7A',
        width: 300,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 45,
        marginBottom: 0,
        marginTop: 0,
        borderRadius: 8,
      },

      img1: {
        width: 280, 
        height: 280,
        marginTop: 80,
        justifyContent: 'center',
        marginHorizontal: 45,
      },

      logout: {
        width: 50,
        height: 50,
        marginHorizontal: 320,
        marginTop: 48,
      }
  
});
