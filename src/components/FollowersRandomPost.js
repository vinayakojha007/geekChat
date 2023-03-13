import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React from 'react';
import Post_Big_Card from '../Cards/Post_Big_Card';

const FollowersRandomPost = () => {
  let data = [
    {
      id: 1,
      username: 'Vinayak',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWptOWgptv_ClVbtRo9zTrZjvje_Sk2DMJHg&usqp=CAU',
      profile_image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTI7yLAff2Tl1hukdSPVzyBWD79SnuJsrH9Zwxso6PW3vdM8MZ26MmY3d9Lj4TYPbCs6BI&usqp=CAU',
      likes: ['rahul_23', 'virat_18'],
      comments: [
        {
          id: 1,
          username: 'rahul_23',
          comment: 'nice post',
        },
        {
          id: 2,
          username: 'virat_18',
          comment: 'awesome',
        },
      ],
    },
    {
      id: 2,
      username: 'Pintu',
      image:
        'https://in-static.ok-img.com/uploads/in/22/10/26/23wbxy8wkf7jxiybybsm2rpdgnf9wz6m.jpg',
      profile_image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZjy__2mykLSMfBp-AdOSMoneYZ2FHpNaaMQ&usqp=CAU',
      likes: ['Mala', 'Manisha'],
      comments: [
        {
          id: 1,
          username: 'mala',
          comment: 'nice post',
        },
        {
          id: 2,
          username: 'manisha',
          comment: 'awesome',
        },
      ],
    },
    {
      id: 3,
      username: 'Shubham',
      image:
        'https://content3.jdmagicbox.com/comp/jamnagar/v1/0288px288.x288.180605224453.h9v1/catalogue/shubham-fashion-and-studio-green-city-jamnagar-fashion-designers-hilxw8npdp.jpg?clr=382e38',
      profile_image:
        'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F6%2F2023%2F01%2F03%2FThe-Circle-Season-5-Shubham-010323.jpg',
      likes: ['rahul_23', 'virat_18'],
      comments: [
        {
          id: 1,
          username: 'rahul_23',
          comment: 'nice post',
        },
        {
          id: 2,
          username: 'virat_18',
          comment: 'awesome',
        },
      ],
    },
    {
      id: 4,
      username: 'Ajay',
      image:
        'https://pbs.twimg.com/media/FnM6-DiaEAERoOz?format=jpg&name=large',
      profile_image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbYi_1ze0c_s-qA38NiJnnkAR-3XMY8pDDNA&usqp=CAU',
      likes: ['rahul_23', 'virat_18'],
      comments: [
        {
          id: 1,
          username: 'rahul_23',
          comment: 'nice post',
        },
        {
          id: 2,
          username: 'virat_18',
          comment: 'awesome',
        },
      ],
    },
  ];
  return (
    <ScrollView style={styles.container}>
      {data.map(item => {
        return (
          <Post_Big_Card
            key={item.id}
            username={item.username}
            profile_image={item.profile_image}
            post_pic={item.image}
            likes={item.likes}
            comments={item.comments}
          />
        );
      })}
    </ScrollView>
  );
};

export default FollowersRandomPost;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'column',
  },
});
