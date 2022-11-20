import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {Storage} from '@aws-amplify/storage'



export default class LiveUpdate extends React.Component {
 
state = {
    images_uri: '',
    allImages: []
}


  images_list =  async () =>  {
    await Storage.list('', { level: "public" }) .then (async result => {
      result = result.slice(1)
        var resModified = [].concat(result)
        resModified.sort((a, b) => b['lastModified'].toString().localeCompare(a['lastModified']))
        await this.getImagesUri(resModified) // (data)
        var length = resModified.length;
        this.setState({ allImages: resModified [0] })
        console.log('allImages: ', this.state.allImages)
       
      })
      .catch(err => console.log(err))
  }


getImagesUri = async (data) =>{
  let count, foo
  let uriArray = []
  for (count = 0; count < data.length; count++) {
    foo = data[count]['key']
    // Given the key, the get method returns the uri of each image
    await Storage.get(foo)
      .then(bar => {
        // shorten the uri for faster parsing
        var shortUri = bar.substr(0, 102)
        uriArray.push(bar)
      })
      .catch(err => console.log(err))
    // add an uri key to the data array of objects
    data[count]['uri'] = uriArray[count]
  }
}
render() {
  let { allImages } = this.state
  return (
    <View style= {styles.container}>            

      <Image
  style={styles.imgupdate}
  source={{uri:allImages.uri}}
/>
<TouchableOpacity style={styles.but}
        onPress={this.images_list}>
        <Text style={ styles.update}>Update </Text>
      </TouchableOpacity>
      </View>
      
  );
}
}

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
    width: 250,
    height: 47,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 75,
    marginTop: 50,
    borderRadius: 8,
  },
  update: {
    fontSize: 22, 
    color: '#fff',
  },
  imgupdate: {
    width: 400,
    height: 450,
    marginTop: 120,
    resizeMode: 'contain',
  }
});
