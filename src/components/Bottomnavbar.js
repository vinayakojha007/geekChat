import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { icons1 } from '../CommonCss/pagecss';

const Bottomnavbar = ({navigation,page}) => {
  return (
    <View style={styles.container}>

    {
      page==='MainPage' ?
      <Entypo name='home' color='black' size={30} style={styles.activeicons1}
        onPress={()=>navigation.navigate('MainPage')}
      />
      :
      <Entypo name='home' color='black' size={30} style={icons1}
        onPress={()=>navigation.navigate('MainPage')}
      />

    }
      
      {
        page==='SearchUserPage' ?
        <Ionicons name='search' color='black' size={30} style={styles.activeicons1}
        onPress={()=>navigation.navigate('SearchUserPage')}
      />
      :
      <Ionicons name='search' color='black' size={30} style={icons1}
        onPress={()=>navigation.navigate('SearchUserPage')}
      />
      }

      {
        page==='NotificationPage'?
        <Ionicons name='heart' color='black' size={30} style={styles.activeicons1}
        onPress={()=>navigation.navigate('NotificationPage')}
      />
      :
      <Ionicons name='heart' color='black' size={30} style={icons1}
        onPress={()=>navigation.navigate('NotificationPage')}
      />

      }

      {
        page==='My_UserProfile'?
        <Entypo name='user' color='black' size={30} style={styles.activeicons1}
        onPress={()=>navigation.navigate('My_UserProfile')}
      />
      :
      <Entypo name='user' color='black' size={30} style={icons1}
        onPress={()=>navigation.navigate('My_UserProfile')}
      />
      }
    </View>
  )
}

export default Bottomnavbar

const styles = StyleSheet.create({
    container:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-evenly',
        backgroundColor:'#111111',
        borderTopRightRadius:20,
        borderTopLeftRadius:20,
        position:'absolute',
        bottom:0,
        width:'100%',
        zIndex:100,
        borderTopWidth:1,
        paddingVertical:10,
        alignItems:'center'
    },
    activeicons1:{
      backgroundColor:'white',
      borderRadius:50,
      fontSize:20,
      padding:10
    }
})