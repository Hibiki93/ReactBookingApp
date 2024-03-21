import React, { useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  Image,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import config from "../../apps/config/config";

function LoginScreen(props) {
  const [username, setUsername] = useState('user');
  const [password, setPassword] = useState('password123');
  const navigation = useNavigation();

  const login = async()=>{
    if(username && password){
      try {
        const response = await fetch(`${config.apiURL}auth`, {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: username,
            password: password,
          })
        });
        const data = await response.json();
        console.log(data);
        if(data.token){
          alert(
            "Login As Admin Success!"
          );
          AsyncStorage.setItem('tokenUser', data.token);
          AsyncStorage.setItem('admin', '1');
          navigation.navigate('Home'); 
        }else if(username == 'user'){
          alert(
            "Login As User Success!"
          );
          AsyncStorage.setItem('admin', '0');
          navigation.navigate('Book Appointment'); 
        }else{
          alert(
            "User not existing or invalid password"
          );
        }
      } catch (error) {
        console.error('Error occurred while logging in:', error);
        // Handle error here
      }
    }
  }
  return (
    <ImageBackground
      style={styles.background}
      source={require("../../assets/background.jpg")}
    >
      <Image
        style={styles.logo}
        source={{ uri: "https://avatars.githubusercontent.com/u/38676912?v=4" }}
      ></Image>
      <SafeAreaView style={styles.container}>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            value={username}
            placeholder="Username"
            placeholderTextColor="#003f5c"
            onChangeText={(username) => setUsername(username.toLocaleLowerCase())}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            value={password}
            placeholder="Password"
            placeholderTextColor="#003f5c"
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
          />
        </View>

        <TouchableOpacity>
          <Text style={styles.forgot_button}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginBtn} onPress={login}>
          <Text style={styles.loginText}>
            Login
          </Text>
        </TouchableOpacity>
        <View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
  },
  loginButton: {
    width: "100%",
    height: 70,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    transform: [{ translateX: -50 }],
    left: "50%",
    right: "50%",
    overflow: "hidden",
    position: "absolute",
    top: 70,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "start",
    marginTop:250,
  },

  inputView: {
    backgroundColor: "#fff",
    borderRadius: 30,
    width: "80%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
  },

  TextInput: {
    height: 50,
    flex: 1,
    padding: 5,
    marginLeft: 20,
  },

  forgot_button: {
    height: 30,
    marginBottom: 30,
  },

  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#2196f3",
  },
  loginText:{
    color:"#fff"
  }
});

export default LoginScreen;
