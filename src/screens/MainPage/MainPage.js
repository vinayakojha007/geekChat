import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React,{useEffect,useState} from 'react';
import Bottomnavbar from '../../components/Bottomnavbar';
import TopNavbar from '../../components/TopNavbar';
import FollowersRandomPost from '../../components/FollowersRandomPost';
import AsyncStorage from '@react-native-async-storage/async-storage';
const MainPage = ({navigation}) => {
  const [userdata,setUserdata] = useState(null);
 
 
  useEffect(() => {
    AsyncStorage.getItem('user').then(data=>{
     
      setUserdata(JSON.parse(data))
    
    }).catch(err=>alert(err));
  
  }, [])
  console.log(userdata);
 
  return (
    <View style={styles.container}>
      <StatusBar />
      <TopNavbar navigation={navigation} page={'MainPage'}/>
      <Bottomnavbar navigation={navigation} page={'MainPage'}/>
      <FollowersRandomPost />
    </View>
  );
};

export default MainPage;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
    paddingVertical: 50,
  },
});
