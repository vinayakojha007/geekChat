import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
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

const Signup_ChoosePassword = ({navigation,route}) => {
  const {email,username} = route.params;
  const [password,setpassword] = useState('');
  const [confirmpassword,setconfirmpassword] = useState('');
  const [loading,setLoading] = useState(false);


  const handlePassword = ()=>{
    if (password=='' || confirmpassword=='') {
      alert('Please enter password')
    } else if(password!=confirmpassword) {
      alert('Password doesnot match')
    }
    else{
      setLoading(true); 
      fetch('http://10.0.2.2:3000/signup',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          email:email,
          username:username,
          password:password
         })
      }).then(res=>res.json()).then(
        data =>{
          if (data.message=="User Registered Successfully") {
            setLoading(false);
            alert(data.message);
            navigation.navigate('Login');
          } else {
            setLoading(false);
            alert('Please try again');
          }
        }
      )
    }
  }
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
      <Text style={formHead2}>Choose a Strong Password</Text>
      <TextInput
        placeholder="Enter Password"
        style={formInput}
        secureTextEntry={true}
        onChangeText={(text)=>setpassword(text)}
      />
      <TextInput
        placeholder="Confirm Password"
        style={formInput}
        secureTextEntry
        onChangeText={(text)=>setconfirmpassword(text)}
      />

      <Text
        style={formbtn}
        onPress={() => handlePassword()}>
        Next
      </Text>
    </View>
  );
};

export default Signup_ChoosePassword;

const styles = StyleSheet.create({});
