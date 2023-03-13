import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {containerFull, goback, logo, row} from '../../../CommonCss/pagecss';
import logo1 from '../../../../assets/logo1.jpg';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  formbtn,
  formHead2,
  formHead3,
  formInput,
} from '../../../CommonCss/formcss';

const Signup_AccountCreated = ({navigation}) => {
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

      <View style={row}>
        <MaterialIcons name="verified" color="#99B83C" size={30} />
        <Text style={formHead2}>Account Created Successfully</Text>
      </View>
      <Text style={formbtn} onPress={() => navigation.navigate('Login')}>
        Let's Roll
      </Text>
    </View>
  );
};

export default Signup_AccountCreated;

const styles = StyleSheet.create({});
