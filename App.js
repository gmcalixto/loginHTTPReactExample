import React,{Component,useState} from 'react';
import {Text, TextInput,View, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import Constants from 'expo-constants';


class App extends Component {
  
  state = {
    user: '',
    password: '',
    status: ''
  }

  //exemplo de validacao de login
  async validateLogin(user,password){
    
    var obj = { "email": user,
                "password":password};

    await fetch(
      'https://reqres.in/api/login', 
      {
          method: 'POST',
          headers: 
          {
             Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(obj)
      }).then(response => {
          if (response.status === 200) {
            this.setState({ status: 'OK, autenticado' })
            response.text().then(function(result){ 
              console.log(result); 
              });
          } else {
            this.setState({ status: 'Falha no login' })
          }
      })
      .then(response => {
        console.debug(response);
      }).catch(error => {
        console.error(error);
      });
  }
  
  
  render(){
    return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>Minha tela de Login</Text>

      <Text style={styles.loginLabel}>User</Text>

      <TextInput 
        autoCorrect = {false} 
        placeholder = "Digite seu usuário" 
        placeholderTextColor = "grey" 
        style = {styles.textInput}
        clearButtonMode = "always"
        onChangeText={(value) => this.setState({ user: value })}
       />

      <Text style={styles.loginLabel}>Password</Text>

      <TextInput 
        autoCorrect = {false} 
        placeholder = "Digite seu senha" 
        placeholderTextColor = "grey"
        secureTextEntry={true} 
        style = {styles.textInput}
        clearButtonMode = "always"
        onChangeText={(value) => this.setState({ password: value })}
       />

      <TouchableOpacity
        onPress={()=>{
          this.validateLogin(this.state.user,this.state.password)
        }}>
          <Text style={styles.button}>Login</Text>
        </TouchableOpacity>

      <Text style={styles.loginLabel}>{this.state.status}</Text>

    </View>
  );
  }
  
} export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#fff',
    padding: 8,
  },
  paragraph: {
    fontFamily: Platform.OS==='ios'?'AvenirNext-Regular':'Roboto',
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  loginLabel: {
    fontFamily: Platform.OS==='ios'?'AvenirNext-Regular':'Roboto',
    marginTop: 10,
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button:{
    backgroundColor:'grey',
	    color:'white',
      fontSize: 15,
	    width: 150,
	    marginTop: 20,
	    marginHorizontal:20,
	    paddingHorizontal:10,
      textAlign: 'center',
      fontFamily: Platform.OS==='ios'?'AvenirNext-Regular':'Roboto',
	    alignSelf: 'center'
  },
  textInput: {
	    backgroundColor:'#666',
	    color:'white',
      fontSize: 15,
	    height: 40,
	    width: 250,
	    marginTop: 20,
	    marginHorizontal:20,
	    paddingHorizontal:10,
      fontFamily: Platform.OS==='ios'?'AvenirNext-Regular':'Roboto',
	    alignSelf: 'center'}
});
