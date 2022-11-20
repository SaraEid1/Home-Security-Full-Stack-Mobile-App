import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, 
  Image, Dimensions, FlatList} from 'react-native';
import {Storage} from '@aws-amplify/storage'
import * as Animatable from 'react-native-animatable';
import { Ionicons } from '@expo/vector-icons';

class AnimatedImages extends React.Component {
    render (){
      return (
        <Animatable.View style={{flex: 1, alignItems:'center'}} 
        animation= 'zoomIn'
        delay= {this.props.imageIndex * 20
        }>
          {this.props.children }
        </Animatable.View>

      );
    }
}
let {width:screenWidth, height: screenHeight} = Dimensions.get ('window');

export default class PhotoLibrary extends React.Component {
  	state = {
      image: null,
      allImages: [],
      last_length: 2
    }
    componentDidMount = async () => {
      Storage.list('', { level: "public" }) .then (async result => {
        result = result.slice(1)
          var images_arr = [].concat(result);
          images_arr.sort((a, b) => b['lastModified'].toString().localeCompare(a['lastModified']))
          await this.getImagesUri(images_arr);
          var length = images_arr.length;
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
			// add an uri key to the data array of objects
			data[count]['uri'] = uriArray[count]
		}
	}


  removeImageFromS3 = async (name) => {
		await Storage.remove(name)
			.then(result => console.log('Deleted', result))
			.catch(err => console.log(err));
      this.componentDidMount;
	}


  render() {
    let { allImages } = this.state;
  return (
          <SafeAreaView style={{flex: 1, alignItems:'center', backgroundColor: '#fff'}}>
            <Text style={styles.titleText}> </Text>
            <FlatList numColumns={2} data ={allImages}
            renderItem = {(item) => {let uploadDateImage = String(item.item.lastModified).substr(0, 15)
							return (
								<View>	
                  <AnimatedImages imageIndex={item.index}>

									<Image
										source={{ uri: item.item.uri }}
										style={styles.imageStyle}
									/>
									<View style={styles.headerStyle}>
                  <Ionicons 
											name="md-trash"
											style={{ color: '#494B7A', fontSize: 20}}
											onPress={() => {this.removeImageFromS3(item.item.key)}}
										/>
										<Text style={{fontSize: 16}}>{uploadDateImage}</Text>
									</View>	
                  </AnimatedImages>		
								</View>
							)
						}
          }
        />
          </SafeAreaView>
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
    marginBottom: 30
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
  },
  container1: {
		flex: 1
	},
	headerStyle: {
		flexDirection: 'row', 
		alignItems: 'stretch',
		justifyContent: 'space-between',
		padding: 13
	}, 
	buttonStyle: {
		fontSize: 40,
		color: '#4286f4'
	},
	imageStyle: { 
		width: screenWidth/3, 
		height: screenWidth/3, 
		marginBottom: 12,
	}
});
