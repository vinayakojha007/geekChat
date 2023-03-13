import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import React, {useState,useEffect} from 'react';
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

const SearchUserPage = ({navigation}) => {
  const [keyword, setKeyword] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const getallusers = async () => {
    if (keyword.length > 0) {
      setLoading(true);
      fetch('http://10.0.2.2:3000/searchuser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({keyword: keyword}),
      })
        .then(res => res.json())
        .then(data => {
          console.log(data,"vghghghhvg")
          if (data.error) {
            setData([]);
            setError(data.error);
            console.log("data check",data.message)
            setLoading(false);
          } else if (data.message == 'User Found') {
            setError(null);
            console.log("data check",data.message)
            setData(data.user);
            
            setLoading(false);
          }
        })
        .catch(err => {
          setData([]);
          setLoading(false);
        });
    } else {
      setData([]);
      setError(null);
    }
  };

  useEffect(() => {
    getallusers();
  }, [keyword]);


  return (
    <View style={styles.container}>
      <StatusBar />
      <TopNavbar navigation={navigation} />
      <Bottomnavbar navigation={navigation} page={'SearchUserPage'} />

      <TextInput
        placeholder="Search By Username.."
        style={searchbar}
        onChangeText={text => {
          setKeyword(text);
        }}
      />

      {loading ? (
        <ActivityIndicator size="large" color="white" />
      ) : (
        <>
          {error ? (
            <Text style={formHead2}>{error}</Text>
          ) : (
            <ScrollView style={styles.userlists}>
              {data.map((item, index) => {
                return (
                  <UsersCard
                    key={item.username}
                    user={item}
                    navigation={navigation}
                  />
                );
              })}
            </ScrollView>
          )}
        </>
      )}
    </View>
  );
};

export default SearchUserPage;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
    paddingVertical: 50,
  },
  userlists: {
    width: '100%',
    marginTop: 20,
  },
});

