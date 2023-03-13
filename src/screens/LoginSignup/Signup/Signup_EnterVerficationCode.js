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
import {formbtn, formHead3, formInput} from '../../../CommonCss/formcss';

const Signup_EnterVerficationCode = ({navigation,route}) => {
  const {useremail,userVerificationCode} = route.params
  console.log(useremail,userVerificationCode);

  const [verificationCode,setVerificationCode] = useState('');

  const handleVerificationCode=()=>{
    if (verificationCode != userVerificationCode) {
      alert('Invalid Verification Code');
    } else if (verificationCode==userVerificationCode)
    {
      alert('Verification code matched')
      navigation.navigate('Signup_ChooseUsername',{
        email:useremail
      })
    }
    else{
      alert('Please try Again')
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
      <Text style={formHead3}>
        A verification code has been sent to your email
      </Text>
      <TextInput placeholder="Enter 6-Digit Code here" style={formInput} onChangeText={(text)=>setVerificationCode(text)}/>

      <Text
        style={formbtn}
        onPress={() =>handleVerificationCode()}>
        Next
      </Text>
    </View>
  );
};

export default Signup_EnterVerficationCode;

const styles = StyleSheet.create({});
