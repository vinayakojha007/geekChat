import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator
} from 'react-native';
import React, { useState } from 'react';
import {containerFull, goback, logo} from '../../../CommonCss/pagecss';
import logo1 from '../../../../assets/logo1.jpg';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {formbtn, formHead2, formInput} from '../../../CommonCss/formcss';

const ForgotPassword_EnterEmail = ({navigation}) => {
  const [email,setEmail]=useState('');
  const [loading,setLoading] = useState(false);

  const handleEmail = (text)=>{
    if (email==='') {
      alert("Please enter email")
    } else {
      setLoading(true);
      fetch("http://10.0.2.2:3000/verifyfp",{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({email:email})
      })
      .then(res => res.json()).then(
        data=>{
          if (data.error === "Invalid Credentials") {
            alert("Invalid Credentials");
            setLoading(false)
          }
          else if (data.message === "Verification Code Sent to your Email"){
            setLoading(false);
            alert(data.message);
            navigation.navigate('ForgotPassword_EnterVerificationCode',{
                useremail:data.email,
                userVerificationCode:data.VerificationCode
              }
            )
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
      <Text style={formHead2}>Verify Your Email</Text>
      <TextInput placeholder="Enter your Email" style={formInput} onChangeText={(text)=>setEmail(text)}/>

      {
        loading?<ActivityIndicator size='large' color='white' /> 
        :
        <Text
        style={formbtn}
        onPress={() =>handleEmail()
          
        }>
        Next
      </Text>
      }

      
    </View>
  );
};

export default ForgotPassword_EnterEmail;

const styles = StyleSheet.create({});
