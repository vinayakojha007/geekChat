import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {icons1} from '../CommonCss/pagecss';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const Post_Big_Card = ({
  post_pic,
  profile_image,
  username,
  likes,
  comments,
}) => {
  const [isliked, setIsLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  // console.log(comments);
  return (
    <View style={styles.container}>
      <View style={styles.c1}>
        <Image source={{uri: profile_image}} style={styles.profile_image} />
        <Text style={styles.username}>{username}</Text>
      </View>
      <Image source={{uri: post_pic}} style={styles.image} />

      <View style={styles.s2}>
        {isliked ? (
          <View style={styles.s21}>
            <AntDesign
              name="heart"
              size={24}
              color="black"
              style={styles.iconliked}
              onPress={() => {
                setIsLiked(false);
              }}
            />
            <Text style={styles.liked}>{likes.length + 1}</Text>
          </View>
        ) : (
          <View style={styles.s21}>
            <AntDesign
              name="hearto"
              size={24}
              color="black"
              style={icons1}
              onPress={() => {
                setIsLiked(true);
              }}
            />
            <Text style={styles.notliked}>{likes.length}</Text>
          </View>
        )}
        <View style={styles.s22}>
          <FontAwesome
            name="comment"
            size={30}
            color="black"
            style={icons1}
            onPress={() => {
              setShowComments(!showComments);
            }}
          />
        </View>
      </View>

      {showComments == true && (
        <View style={styles.s3}>
          {comments.map((item, index) => {
            return (
              <View style={styles.s31} key={item.id}>
                <Text style={styles.commentuser}>{item.username}</Text>
                <Text style={styles.commenttext}>{item.comment}</Text>
              </View>
            );
          })}
        </View>
      )}
    </View>
  );
};

export default Post_Big_Card;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    //height:450,
    backgroundColor: 'white',
    marginVertical: 10,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'white',
  },
  c1: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'black',
  },
  profile_image: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderColor: 'white',
    borderWidth: 1,
  },
  username: {
    color: 'white',
    marginLeft: 10,
    fontSize: 15,
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    aspectRatio: 1,
  },
  s2: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: 'black',
    padding: 10,
    alignItems: 'center',
  },
  s21: {
    flexDirection: 'row',
    //width:'100%',
    alignItems: 'center',
  },
  notliked: {
    color: 'grey',
    marginLeft: 5,
    fontSize: 25,
  },
  liked: {
    color: '#DC143C',
    marginLeft: 5,
    fontSize: 25,
  },
  iconliked: {
    color: 'red',
    fontSize: 30,
  },
  s22: {
    marginLeft: 20,
  },
  s3: {
    width: '100%',
    backgroundColor: '#111111',
    padding: 10,
  },

  commentuser: {
    color: 'white',
    fontSize: 17,
    marginLeft: 5,
  },
  commenttext: {
    color: 'grey',
    fontSize: 17,
    marginLeft: 5,
  },
  s31: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 3,
  },
});
