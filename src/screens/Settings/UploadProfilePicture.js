import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
  } from 'react-native';
  import React, {useState} from 'react';
  import {containerFull, goback, hr80, logo} from '../../CommonCss/pagecss';
  import logo1 from '../../../assets/logo1.jpg';
  import {
    formbtn,
    formHead,
    formHead2,
    formHead3,
    formInput,
    formTextLinkCenter,
    formTextLinkRight,
  } from '../../CommonCss/formcss';
  import Ionicons from 'react-native-vector-icons/Ionicons';
  import {firebase} from '../../Firebase/config';
  import  * as ImagePicker from 'react-native-image-picker';
  import AsyncStorage from '@react-native-async-storage/async-storage';


  const UploadProfilePicture = ({navigation}) => {
    const [image, setImage] = useState(null);
  
    const [loading, setLoading] = useState(false);

    const picImage = async (value) => {
        let options = {
          storageOptions: {
            skipBackup: true,
            path: 'images',
          },
        };
        ImagePicker.launchImageLibrary(options, async response => {
          console.log('Response = ', response);
          const data = value;
          if (response.didCancel) {
            setError('User cancelled image picker');
          } else if (response.error) {
            setError(response.error);
          } else if (response.customButton) {
            setError( response.customButton);
            alert(response.customButton);
          }
          else if (!response.didCancel) {
            const response1 = await fetch(response.assets[0].uri);
            const blob = await response1.blob();
            const filename = response.assets[0].uri.substring(
              response.assets[0].uri,
            );
            const ref = firebase.storage().ref().child(filename);
            const snapshot = await ref.put(blob);
           const url = await snapshot.ref.getDownloadURL();
           console.log(url);
            fetch('http://10.0.2.2:3000/setprofilepic', {
              method: 'post',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                email: JSON.parse(data).user.email,
                profilepic: url,
              }),
            })
              .then(res => res.json())
              .then(data => {
                console.log(data);
                if (data.message === 'Profile picture updated successfully') {
                  setLoading(false);
                  alert('Profile picture Updated Successfully');
                  navigation.navigate('EditProfile');
                } else if (data.error) {
                  alert(data.error);
                  setLoading(false);
                  navigation.navigate('Login');
                } else {
                  console.log('failed');
                  setLoading(false);
                  alert('please try again');
                }
              })
              .catch(err => {
                console.log(err);
              });
           return url;
          } else {
            return null;
          }
        });
      };
      const handleUpload = () => {
        AsyncStorage.getItem('user').then(data => {
          setLoading(true);
          picImage(data);
        });
      };

    // const pickImage = async()=>{
    //     let result = await ImagePicker.launchImageLibrary({
    //         mediaType:ImagePicker.MediaTypeOptions.Images,
    //         allowEditing:true,
    //         aspect:[1,1],
    //         quality:1
    //     })
    //     console.log(result)
    // }
    
    // const handleUpload=()=>{
    //     pickImage();
    // }
  
  
    return (
      <View style={containerFull}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Settings_1')}
          style={goback}>
          <Ionicons name="arrow-back" size={24} color="white" />
          <Text
            style={{
              color: 'gray',
              fontSize: 16,
            }}>
            Go Back
          </Text>
        </TouchableOpacity>
  
        <Image source={logo1} style={logo} />
        <Text style={formHead2}>Choose Profile Picture</Text>
  
        {loading ? (
          <ActivityIndicator 
            size={'large'}
            color='white'
          />
        ) : (
          <Text style={formbtn} onPress={() => handleUpload()}>
            Upload
          </Text>
        )}
      </View>
    );
  };
  

export default UploadProfilePicture

const styles = StyleSheet.create({})