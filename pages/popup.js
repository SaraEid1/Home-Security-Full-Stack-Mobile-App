import React, {useState, useEffect,useRef } from 'react';
import { StyleSheet, View, Modal, Image, Animated} from 'react-native';
import {PopUpText, StyledPopUpButton, StyledPopUpButton1, ButtonTextPopUp} from '../components/style';
import {Storage} from '@aws-amplify/storage'
import '../shim';

const ModalPoup = ({visible, children}) => {
  const [showModal, setShowModal] = useState(visible);
  const scaleValue = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    toggleModal();
  }, [visible]);
  const toggleModal = () => {
    if (visible) {
      setShowModal(true);
      Animated.spring(scaleValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      setTimeout(() => setShowModal(false), 200);
      Animated.timing(scaleValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };
  return (
    <Modal transparent visible={showModal}>
      <View style={styles.modalBackGround}>
        <Animated.View
          style={[styles.modalContainer, {transform: [{scale: scaleValue}]}]}>
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
};


const App = ({navigation}) => {
  
  const [visible, setVisible] = useState(true);
  const [allImages, setallImages] = useState([]);
  const [last_length, setlast_length] = useState(11);

  function iot () {
  const AWSIoTData = require('aws-iot-device-sdk');

  const client = AWSIoTData.device({
  region: 'ca-central-1',
  host: 'XXXXXXXXXXXXXX-ats.iot.ca-central-1.amazonaws.com',
  clientId: '',
  protocol: 'wss',
  maximumReconnectTimeMs: 5000,
  debug: true,
  accessKeyId: '',
  secretKey: '',
});

client.on('connect', function () {
  console.log('Connected');
  client.subscribe('test/testing');
  client.publish('test/testing', JSON.stringify({ accept: 1}));
});

client.on('error', function (err) {
  console.log('Error', err);
});

client.on('message', function (topic, payload) {
  const msg = JSON.parse(payload.toString());
  console.log('Message', topic, msg);
});

return client;
}


function iot_reject () {
const AWSIoTData = require('aws-iot-device-sdk');

const client = AWSIoTData.device({
  region: 'ca-central-1',
  host: 'XXXXXXXXXXXXXX-ats.iot.ca-central-1.amazonaws.com',
  clientId: '',
  protocol: 'wss',
  maximumReconnectTimeMs: 5000,
  debug: true,
  accessKeyId: '',
  secretKey: '',
});

client.on('connect', function () {
console.log('Connected');
client.subscribe('test/testing');
client.publish('test/testing', JSON.stringify({ accept: 0}));
});

client.on('error', function (err) {
console.log('Error', err);
});

client.on('message', function (topic, payload) {
const msg = JSON.parse(payload.toString());
console.log('Message', topic, msg);
});

return client;
}

  async function image_list () {
    Storage.list('', { level: "public" }) .then (async result => {
      result = result.slice(1)
        var images_arr = [].concat(result);
        images_arr.sort((a, b) => b['lastModified'].toString().localeCompare(a['lastModified']))
        await getImagesUri(images_arr);
        var length = images_arr.length;
        if (length > last_length){
          console.log('Popup');
          setlast_length (length);
          navigation.navigate ("Popup");
        }
        if (length < last_length){
         setlast_length (length);
        }
      setallImages (images_arr[0]);
      })
      .catch(err => console.log(err))
  }
  
  async function getImagesUri (data) {
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

  const [buttonClicked1, setButtonClicked1] = useState(false);


  function press() {

    setButtonClicked1(true);
      if(buttonClicked1){
        iot_reject();
          setButtonClicked1(false);
          setVisible(false);
          navigation.navigate ("Home");
       }

} 

useEffect(() => {
  image_list()
}, [])

const [buttonClicked, setButtonClicked] = useState(false);


const but = () => {
  setButtonClicked(true);
      if(buttonClicked){
          iot();
          setButtonClicked(false);
          setVisible(false);
          navigation.navigate ("Home");
       }
}

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ModalPoup visible={visible}>

        <View style={{alignItems: 'center'}}>
          
          
        </View>

        <PopUpText>
        Someone is detected!
        </PopUpText>
        <Image
          style={styles.imgupdate}
          source={{uri:allImages.uri}}
        />
        <View style={{ flexDirection:"row" }}> 
        <StyledPopUpButton onPress={() => but()}>
                <ButtonTextPopUp> Accept </ButtonTextPopUp>
            
        </StyledPopUpButton>

        <StyledPopUpButton1 onPress={() => press()}>
                <ButtonTextPopUp> Reject </ButtonTextPopUp>
            </StyledPopUpButton1>
            </View>
        
      </ModalPoup>
     
    </View>
  );
};

const styles = StyleSheet.create({
  modalBackGround: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 20,
    elevation: 20,
  },
  header: {
    width: '100%',
    height: 40,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  imgupdate: {
    width: 200,
    height: 200,
    marginLeft: 40,
    marginBottom: 40,
  }
});

export default App;