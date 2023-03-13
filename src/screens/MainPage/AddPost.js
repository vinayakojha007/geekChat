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
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {firebase} from '../../Firebase/config';
import * as ImagePicker from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddPost = ({navigation}) => {
  const [postdescription, setpostdescription] = useState('');

  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [error, setError] = useState('');
  const [post, setPost] = useState('');

  const pickImage = async value => {
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
        setError(response.customButton);
        alert(response.customButton);
      } else if (!response.didCancel) {
        const response1 = await fetch(response.assets[0].uri);
        const blob = await response1.blob();
        const filename = response.assets[0].uri.substring(
          response.assets[0].uri,
        );
        const ref = firebase.storage().ref().child(filename);
        const snapshot = await ref.put(blob);
        const url = await snapshot.ref.getDownloadURL();
        console.log(url);
        setLoading1(false);
        setPost(url);
      } else {
        setLoading1(false);
        setPost(null);
      }
    });
  };

  const handleUpload = () => {
    if (post != null) {
      AsyncStorage.getItem('user').then(data => {
        setLoading2(true);

        fetch('http://10.0.2.2:3000/addpost', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: JSON.parse(data).user.email,
            post: post,
            postdescription: postdescription,
          }),
        })
          .then(res => res.json())
          .then(data => {
            if (data.message == 'Post added successfully') {
              alert('Post added successfully');
              setLoading2(false);
              navigation.navigate('My_UserProfile');
            } else {
              alert('Something went wrong, please try again');
              setLoading2(false);
            }
          });
      });
    } else {
      alert('Please select an image');
    }
  };

  return (
    <View style={containerFull}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Settings_1')}
        style={goback}>
        <MaterialIcons name="arrow-back-ios" size={24} color="gray" />
        <Text
          style={{
            color: 'gray',
            fontSize: 16,
          }}>
          Go Back
        </Text>
      </TouchableOpacity>

      <Image source={logo1} style={logo} />
      {loading1 ? (
        <ActivityIndicator size="large" color="white" />
      ) : (
        <>
          <Text style={formHead2}>Add New Post</Text>

          {post ? (
            <TouchableOpacity onPress={() => pickImage()}>
              <Image
                source={{uri: post}}
                style={{
                  width: 200,
                  height: 200,
                  marginVertical: 10,
                }}
              />
            </TouchableOpacity>
          ) : (
            <Text
              style={styles.addpost}
              onPress={() => {
                 pickImage();
              }}>
              Click here to select a new post
            </Text>
          )}
        </>
      )}
      <Text style={formHead2}>Change Description</Text>
      <TextInput
        placeholder="Enter new description"
        style={formInput}
        onChangeText={text => setpostdescription(text)}
        multiline={true}
        numberOfLines={5}
      />

      {loading2 ? (
        <ActivityIndicator size="large" color="white" />
      ) : (
        <Text style={formbtn} onPress={() => handleUpload()}>
          Upload
        </Text>
      )}
    </View>
  );
};

export default AddPost;

const styles = StyleSheet.create({
  addpost: {
    fontSize: 20,
    fontWeight: '100',
    color: 'white',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 50,
    width: '80%',
    textAlign: 'center',
    marginVertical: 20,
  },
});
