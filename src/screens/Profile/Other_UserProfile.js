import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Foundation from 'react-native-vector-icons/Foundation';
import Bottomnavbar from '../../components/Bottomnavbar';
import TopNavbar from '../../components/TopNavbar';
import {searchbar} from '../../CommonCss/pagecss';
import UsersCard from '../../Cards/UsersCard';
import {
  formbtn,
  formHead,
  formHead2,
  formHead3,
  formInput,
  formTextLinkCenter,
  formTextLinkRight,
} from '../../CommonCss/formcss';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Other_UserProfile = ({navigation, route}) => {
  const [userdata, setUserdata] = useState(null);
  const {user} = route.params;
  console.log('njdnjdj' + user.email);
  const loaddata = async () => {
    fetch('http://10.0.2.2:3000/otheruserdata', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email: user.email}),
    })
      .then(res => res.json())

      .then(data => {
        console.log(data, 'mesagae');
        if (data.message == 'User Found') {
          setUserdata(data.user);
          ismyprofile(data.user);
          CheckFollow(data.user);
        } else {
          alert('User Not Found');
          //navigation.navigate('Login');
        }
      })
      .catch(err => {
        alert('Something went wrong');
      });
  };

  useEffect(() => {
    loaddata();
  }, []);

  console.log('userdata ', userdata);
  const [issameuser, setIssameuser] = useState(false);
  const ismyprofile = async otherprofile => {
    AsyncStorage.getItem('user').then(loggeduser => {
      const loggeduserobj = JSON.parse(loggeduser);
      if (loggeduserobj.user.email == otherprofile.email) {
        setIssameuser(true);
        console.log('same user');
      } else {
        setIssameuser(false);
        console.log('other user');
      }
    });
  };

  const [isfollowing, setIsfollowing] = useState(false);

  const CheckFollow = async otheruser => {
    const loggeduser = await AsyncStorage.getItem('user');
    const loggeduserobj = JSON.parse(loggeduser);
        fetch('http://10.0.2.2:3000/checkfollow', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            followfrom: loggeduserobj.user.email,
            followto: otheruser.email,
          }),
        })
      .then(res => res.json())
      .then(data => {
        if (data.message == 'User in following list') {
          setIsfollowing(true);
        } else if (data.message == 'User not in following list') {
          setIsfollowing(false);
        } else {
          alert('Something went wrong');
        }
      });
  };
  const FollowThisUser = async () => {
    console.log('Follow This User');
    const loggeduser = await AsyncStorage.getItem('user');
    const loggeduserobj = JSON.parse(loggeduser);
    fetch('http://10.0.2.2:3000/followuser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        followfrom: loggeduserobj.user.email,
        followto: userdata.email,
      }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.message == 'User Followed') {
          setIsfollowing(true);
          loaddata();
        } else {
          alert('Something Went Wrong');
        }
      });
  };

  const UnfollowThisUser = async () => {
    console.log('UnfollowThisUser');
    const loggeduser = await AsyncStorage.getItem('user');
    const loggeduserobj = JSON.parse(loggeduser);
    fetch('http://10.0.2.2:3000/unfollowuser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        followfrom: loggeduserobj.user.email,
        followto: userdata.email,
      }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.message == 'User Unfollowed') {
          loaddata();
          setIsfollowing(false);
        } else {
          alert('Something Went Wrong');
        }
      });
  };

  return (
    <View style={styles.container}>
      <StatusBar />
      <TopNavbar navigation={navigation} />
      <Bottomnavbar navigation={navigation} page={'SearchUserPage'} />
      <Foundation
        name="refresh"
        size={30}
        color="white"
        style={styles.refresh}
        onPress={() => loaddata()}
      />
      {userdata ? (
        <ScrollView>
          <View style={styles.c1}>
            {userdata.profilepic.length > 0 ? (
              <Image
                style={styles.profilepic}
                source={{uri: userdata.profilepic}}
              />
            ) : (
              <Image style={styles.profilepic} source={nopic} />
            )}
            <Text style={styles.txt}>@{userdata.username}</Text>
            {!issameuser && (
              <View style={styles.row}>
                {isfollowing ? (
                  <Text
                    style={styles.follow}
                    onPress={() => UnfollowThisUser(userdata)}>
                    UnFollow
                  </Text>
                ) : (
                  <Text
                    style={styles.follow}
                    onPress={() => FollowThisUser(userdata)}>
                    Follow
                  </Text>
                )}
                <Text
                  style={styles.message}
                  onPress={() => navigation.navigate('MessagePage',{
                    fuseremail:userdata.email,
                    fuserid:userdata._id
                  })}>
                  Message
                </Text>
              </View>
            )}
            <View style={styles.c11}>
              <View style={styles.c111}>
                <Text style={styles.txt1}>Followers</Text>
                <Text style={styles.txt2}>{userdata.followers.length}</Text>
              </View>
              <View style={styles.vr1}></View>
              <View style={styles.c111}>
                <Text style={styles.txt1}>Following</Text>
                <Text style={styles.txt2}>{userdata.following.length}</Text>
              </View>
              <View style={styles.vr1}></View>
              <View style={styles.c111}>
                <Text style={styles.txt1}>Posts</Text>
                <Text style={styles.txt2}>{userdata.posts.length}</Text>
              </View>
            </View>

            {userdata.description.length > 0 && (
              <Text style={styles.description}>{userdata.description}</Text>
            )}
          </View>
              {
                isfollowing || issameuser?
                <View>
          {userdata.posts.length > 0 ? (
            <View style={styles.c1}>
              <Text style={styles.txt}>Posts</Text>
              <View style={styles.c13}>
                {userdata.posts?.map(item => {
                  return (
                    <Image
                      key={item.post}
                      style={styles.postpic}
                      source={{uri: item.post}}
                    />
                  );
                })}
              </View>
            </View>
          ) : (
            <View style={styles.c2}>
              <Text style={styles.txt1}>You have not posted anything yet</Text>
            </View>
          )}
          </View>
          :
          <View style={styles.c2}>
            <Text style={styles.txt1}>
              Follow to see posts
            </Text>
          </View>
              }
        </ScrollView>
      ) : (
        <ActivityIndicator size="large" color="white" />
      )}
    </View>
  );
};
export default Other_UserProfile;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
    paddingVertical: 50,
  },
  c1: {
    width: '100%',
    alignItems: 'center',
  },
  profilepic: {
    width: 150,
    height: 150,
    borderRadius: 75,
    margin: 10,
  },
  txt: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
    backgroundColor: '#111111',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  txt1: {
    color: 'white',
    fontSize: 15,
  },
  txt2: {
    color: 'white',
    fontSize: 20,
  },
  c11: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  c111: {
    alignItems: 'center',
  },
  vr1: {
    width: 1,
    height: 50,
    backgroundColor: 'white',
  },
  description: {
    color: 'white',
    fontSize: 15,
    marginVertical: 10,
    backgroundColor: '#111111',
    width: '100%',
    padding: 10,
    paddingVertical: 20,
  },
  postpic: {
    width: '30%',
    height: 120,
    margin: 5,
  },
  c13: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
    justifyContent: 'center',
  },
  c2: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
  },
  refresh: {
    position: 'absolute',
    top: 50,
    right: 5,
    zIndex: 1,
  },
  row: {
    flexDirection: 'row',
  },
  message: {
    color: 'white',
  },
  follow: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
    backgroundColor: '#0AD6A0',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
  },
  message: {
    color: 'gray',
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
  },
});
