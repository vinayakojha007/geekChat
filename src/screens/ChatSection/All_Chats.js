import {ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState,useEffect} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {formHead2} from '../../CommonCss/formcss';
import ChatCard from '../../Cards/ChatCard';
import { searchbar } from '../../CommonCss/pagecss';
import AsyncStorage from '@react-native-async-storage/async-storage';
const All_Chats = ({navigation}) => {
  const [chats, setChats] = useState(null);
  const [userdata, setUserdata] = useState(null);

  // let chats = [
  //   {
  //     username: 'user1',
  //     lastmessage: 'hello',
  //     time: '12:00',
  //     profile_image:
  //       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbYi_1ze0c_s-qA38NiJnnkAR-3XMY8pDDNA&usqp=CAU',
  //   },
  //   {
  //     username: 'Virat',
  //     lastmessage: 'Let see you on the ground',
  //     time: '12:00',
  //     profile_image:
  //       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbYi_1ze0c_s-qA38NiJnnkAR-3XMY8pDDNA&usqp=CAU',
  //   },
  //   {
  //     username: 'MSD',
  //     lastmessage: 'have a great time',
  //     time: '12:00',
  //     profile_image:
  //       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbYi_1ze0c_s-qA38NiJnnkAR-3XMY8pDDNA&usqp=CAU',
  //   },
  //   {
  //     username: 'Rahul',
  //     lastmessage: 'goodwork',
  //     time: '12:00',
  //     profile_image:
  //       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbYi_1ze0c_s-qA38NiJnnkAR-3XMY8pDDNA&usqp=CAU',
  //   },
  //   {
  //     username: 'Ajay',
  //     lastmessage: 'See u tomorrow',
  //     time: '12:00',
  //     profile_image:
  //       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbYi_1ze0c_s-qA38NiJnnkAR-3XMY8pDDNA&usqp=CAU',
  //   },
  //   {
  //     username: 'Pintu',
  //     lastmessage: 'Join the meeting',
  //     time: '12:00',
  //     profile_image:
  //       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbYi_1ze0c_s-qA38NiJnnkAR-3XMY8pDDNA&usqp=CAU',
  //   },
  //   {
  //     username: 'Abhishek',
  //     lastmessage: 'goodnight',
  //     time: '12:00',
  //     profile_image:
  //       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbYi_1ze0c_s-qA38NiJnnkAR-3XMY8pDDNA&usqp=CAU',
  //   },
  // ];

  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    loadchats()
}, [])


const loadchats = () => {
  AsyncStorage.getItem('user')
      .then(data => {
           //console.log('async userdata ', data)
          setUserdata(JSON.parse(data))
          let userid = JSON.parse(data).user._id;
          console.log("USERID ALL CHATS page",userid)

          fetch('http://10.0.2.2:3000/getusermessages', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  userid: userid
              })
          })
              .then(res => res.json())
              .then(data => {
                   console.log("DATA CHECK ",data )
                  data.sort((a, b) => {
                      if(a.date > b.date){
                          return -1
                      }
                  })
                  setChats(data)
              })
              .catch(err => {
                  alert('Something went wrong')
                  setChats([])
              })
      })
      .catch(err => alert(err))
}
  // console.log(keyword);
  return (
    <ScrollView style={styles.container}>
      <Ionicons
        name="chevron-back-circle"
        size={24}
        color="white"
        style={styles.gohomeicon}
        onPress={() => navigation.navigate('MainPage')}
      />
      <View style={styles.c1}>
        <Text style={formHead2}>Your Chats</Text>
        <TextInput
          style={searchbar}
          placeholder="Search"
          onChangeText={text => setKeyword(text)}
        />
      </View>
      <View style={styles.c2}>
      
     
        {chats!==null && chats
          .filter(chat => {
            if (keyword == '') {
              return chat;
              
            } else if (
              chat.username.toLowerCase().includes(keyword.toLowerCase()) ||
              chat.lastmessage.toLowerCase().includes(keyword.toLowerCase())
              
            ) {
              return chat;
            }
          })
          .map((chat, index) => {
            console.log("ALL CHATS TEST PAGE",chat)
            return <ChatCard key={chat.fuserid} chat={chat} navigation={navigation} />;
          })}
      </View>
      {/* <Text style={styles.textcolor}>{chats} bhjbjb</Text> */}
    </ScrollView>
  );
};

export default All_Chats;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    width: '100%',
    height: '100%',
  },
  gohomeicon: {
    position: 'absolute',
    top: 15,
    left: 20,
    zIndex: 100,
    color: 'white',
    fontSize: 30,
  },
  c1: {
    width: '95%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 30,
    backgroundColor: '#111111',
    alignSelf: 'center',
    borderRadius: 20,
    borderColor: 'grey',
    borderWidth: 1,
  },
  searchbar: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
    fontSize: 17,
  },
  c2: {
    width: '100%',
    padding: 10,
  },

  textcolor:{
    color:'white',
    fontSize:20
  }
});
