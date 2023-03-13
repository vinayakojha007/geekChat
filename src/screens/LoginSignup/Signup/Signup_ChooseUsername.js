import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,ActivityIndicator
} from 'react-native';
import React, { useState } from 'react';
import {containerFull, goback, logo} from '../../../CommonCss/pagecss';
import logo1 from '../../../../assets/logo1.jpg';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  formbtn,
  formHead2,
  formHead3,
  formInput,
} from '../../../CommonCss/formcss';

const Signup_ChooseUsername = ({navigation,route}) => {
  const {email} = route.params

  const [username,setUsername] = useState('');
  const handleUsername = () =>{
    if (username=='') {
      alert('Please enter username')
    } else {
      setLoading(true);
      fetch('http://10.0.2.2:3000/changeusername',{
        method:'post',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          email:email,
          username:username
         })
      })
      .then(res=>res.json()).then(
        data=>{
          console.log(data)
          if (data.message == "Username Available") {
            setLoading(false);
            alert('Username has been set successfully')
            navigation.navigate('Signup_ChoosePassword',{
              email:email,
              username:username
            })
          } else {
            setLoading(false);
            alert('Username not available');
          }
        }
      ).catch(err=>{
        console.log(err);
      })
      
    }
  }

  const  [loading,setLoading] = useState(false);
  return (
    <View style={containerFull}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Login')}
        style={goback}>
        <Ionicons name="arrow-back" size={24} color="white" />
        <Text
          style={{
            color: 'gray',
            fontSize: 16,
            marginLeft: 10,
          }}>
          Go Back
        </Text>
      </TouchableOpacity>

      <Image source={logo1} style={logo} />
      <Text style={formHead2}>Choose a Username</Text>
      <TextInput placeholder="Enter a Username" style={formInput}  onChangeText={(text)=>setUsername(text)}/>
        
{
  loading?<ActivityIndicator size='large' color="white" /> :
  <Text
        style={formbtn}
        onPress={() => handleUsername()}>
        Next
      </Text>
}

     
    </View>
  );
};

export default Signup_ChooseUsername;

const styles = StyleSheet.create({});
