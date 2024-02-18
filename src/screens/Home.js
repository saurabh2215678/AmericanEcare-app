import React from 'react';
import {View, Text, StyleSheet, Pressable,ImageBackground,Button} from 'react-native';

const Home = ({navigation}) => {
  return (

  	<ImageBackground source={{uri: 'https://static.vecteezy.com/system/resources/previews/002/805/090/non_2x/online-doctor-visiting-patient-illustration-concept-free-vector.jpg'}} style={{flex: 1,width: '100%', height: '100%'}}>

  	 <View style={{ width: "100%", position: 'absolute', top: 580, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
    <Button title="SignUp or Login"
    color="#841584"
    onPress={() => navigation.navigate("Login")}
    />
   </View>


   
    </ImageBackground>

  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 32,
  },
  buttonStyle: {
    height: 54,
    width: '80%',
    marginTop: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2EE59D',
    shadowRadius: 5,
    shadowOpacity: 0.7,
    shadowColor: 'rgba(46, 229, 157, 0.5)',
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },
  buttonTextStyle: {
    color: '#fdfdfd',
    fontWeight: '700',
  },
});

export default Home;