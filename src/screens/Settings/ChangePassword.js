import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import {
  containerFull,
  goback,
  logo,
} from '../../CommonCss/pagecss';
import logo1 from '../../../assets/logo1.jpg';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  formbtn,
  formHead2,
  formHead3,
  formInput,
  formTextLinkRight
} from '../../CommonCss/formcss';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ChangePassword = ({navigation}) => {
  const [oldpassword, setOldpassword] = useState('');
  const [newpassword, setNewpassword] = useState('');
  const [confirmnewpassword, setConfirmnewpassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePasswordChange = () => {
    if (oldpassword === '' || newpassword === '' || confirmnewpassword === '') {
        alert('Please fill all the fields')
    } else if (newpassword !== confirmnewpassword) {
        alert('New password and confirm new password must be same')
    }
    else {
        setLoading(true)
        AsyncStorage.getItem('user')

            .then(data => {
                fetch('http://10.0.2.2:3000/changepassword', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": 'Bearer ' + JSON.parse(data).tokens
                    },
                    body: JSON.stringify({ email: JSON.parse(data).user.email, oldpassword: oldpassword, newpassword: newpassword })
                })
                    .then(res => res.json()).then(data => {
                        if (data.message == 'Password Changed Successfully') {
                            setLoading(false)
                            alert('Password Changed Successfully')
                            AsyncStorage.removeItem('user')
                            navigation.navigate('Login')
                        }
                        else {
                            alert('Wrong Password')
                            setLoading(false)
                        }
                    }
                    )
            })
    }
}

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
            marginLeft: 10,
          }}>
          Go Back
        </Text>
      </TouchableOpacity>

      <Image source={logo1} style={logo} />
      <Text style={formHead2}>Choose a Strong Password</Text>
      <TextInput
        placeholder="Enter Old Password"
        style={formInput}
        secureTextEntry={true}
        onChangeText={text => {
          setOldpassword(text);
        }}
      />
      <TextInput
        placeholder="Enter New Password"
        style={formInput}
        secureTextEntry={true}
        onChangeText={text => {
          setNewpassword(text);
        }}
      />
      <TextInput
        placeholder="Confirm New Password"
        style={formInput}
        secureTextEntry
        onChangeText={text => {
          setConfirmnewpassword(text);
        }}
      />
      <Text
        style={formTextLinkRight}
        onPress={() => navigation.navigate('ForgotPassword_EnterEmail')}>
        Forgot Password?
      </Text>
      {loading ? (
        <ActivityIndicator size={'large'} color="white" />
      ) : (
        <Text style={formbtn} onPress={() => handlePasswordChange()}>
          Next
        </Text>
      )}
    </View>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({});
