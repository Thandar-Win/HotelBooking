import React, { useState,useEffect } from 'react'
import { StyleSheet, Text, View,SafeAreaView, TextInput, TouchableOpacity,Image,ToastAndroid } from 'react-native'
import {Input} from 'react-native-elements'
import {LinearGradient} from 'expo-linear-gradient'
import { auth } from '../firebase/firebase-config'

import colors from '../constants/color'

import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch,useSelector } from 'react-redux'

import userEmailAction from '../store/action/useremail'
import signCountAction from '../store/action/signcount'


const SignInScreen = ({navigation,route}) => {
    
    

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const [showPwd,setShowPwd] = useState(true)
    
    // useEffect(() => {
    //     const unsubscribe =  auth.onAuthStateChanged(user => {
    //         if(user){
                
    //             navigation.replace('drawer')
    //         }
    //     })
    //     return unsubscribe
    // }, [])

    

    const dispatch = useDispatch()

    const handleSignIn = (data) => {        
 
        AsyncStorage.removeItem('umail')
        dispatch(userEmailAction.userEmail([]))

            if(email != '' && password != '' ){

            AsyncStorage.getItem('umail').then((res) => {
                const mail = JSON.parse(res)
                if(mail == null){
                    let usermail = []
                    usermail.push(email)

                    AsyncStorage.setItem('umail',JSON.stringify(usermail))
                    dispatch(userEmailAction.userEmail(usermail))
                }else{
                    mail.push(email)

                    AsyncStorage.setItem('umail',JSON.stringify(mail))
                    dispatch(userEmailAction.userEmail(mail))
                }
            })

            auth
            .signInWithEmailAndPassword(email,password)
            .then(userCredentials => {
                const user = userCredentials.user;

                AsyncStorage.getItem('srcCount').then((res) => {
                    const countSign = JSON.parse(res)
                    if(countSign == null){

                        AsyncStorage.setItem('srcCount',JSON.stringify(user))
                        dispatch(signCountAction.setCountScreen(user))
                    }
                })
                successSignIn()
                navigation.navigate('drawer')
                
            })
            .catch(error => alert(error.message))        
        }
        else{
            unSuccessSignIn()
        }
        }

        const successSignIn = () => {

            ToastAndroid.showWithGravityAndOffset(

                "Sign in Successful!!!",

                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,  
                25,
                50


            )
        }
        const unSuccessSignIn = () => {

            ToastAndroid.showWithGravityAndOffset(

                "Sign in Unsuccessful!!!",

                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,  
                25,
                50


            )
        }
        const handleEyeIcon = () => {
            if(showPwd == true){
                setShowPwd(false)
            }else{
                setShowPwd(true)
            }
        }

    

  return (
    <SafeAreaView style = {styles.content}>      
        <View style = {styles.container}>
            <LinearGradient colors = {['#0eee,#04ff','#0bbb']} style = {{flex : 1}} >
                <View style = {styles.inputContainer}>               
                    <Input
                    inputContainerStyle = {styles.input}
                    placeholder = "Email"
                    value={email}
                    keyboardType = 'email-address'
                    // style = {{color : emailVaildError == 'Valid email address' ? colors.lightBlueA400 : colors.red900}}
                    onChangeText={text =>{setEmail(text)}}
                    rightIcon = {<Image source={require('../../assets/icons/mail.png')} style = {styles.imgStyle} />}
                    />
            
                    <Input
                    inputContainerStyle = {styles.input}
                    placeholder = "Password"
                    value={password}
                    onChangeText={text => setPassword(text)}
                    secureTextEntry = {showPwd}
                    rightIcon = {
                        <TouchableOpacity onPress={() => handleEyeIcon()} >
                        {
                            showPwd ?
                            <Image source={require('../../assets/icons/hide_eye.png')} style = {styles.imgStyle} /> 
                            :
                            <Image source={require('../../assets/icons/show_eye.png')} style = {styles.imgStyle} /> 

                        }
                    </TouchableOpacity>
                    }
                    />             
                </View>

                <View style = {styles.buttonContainer}>
                    <TouchableOpacity onPress={() => handleSignIn()}  style = {styles.button}>
                        <Text style = {styles.buttonText}>Sign In</Text>
                    </TouchableOpacity>
                    <View style = {styles.buttonOutLineContainer} >
                        <Text style = {styles.buttonOutLineText}>If you don't have an account,</Text>
                        <TouchableOpacity onPress={() => {navigation.navigate('UpSign')}} style = {styles.signUpContainer}   >
                            <Text style = {styles.signUpTxt}>Sign Up </Text>
                        </TouchableOpacity>
                        
                    </View>
                </View>
            </LinearGradient>
            </View>
        
    </SafeAreaView>
  )
}

export default SignInScreen

const styles = StyleSheet.create({ 
    content: {
        flex : 1
    },
    container: {
        flex : 1,
        justifyContent : 'center',
        alignItems: 'center',
        backgroundColor : colors.lightBlue
    },
    inputContainer:{
        width : '90%',
    },
    input: {
        backgroundColor : colors.white,
        paddingVertical : 1,
        paddingHorizontal : 10,
        borderRadius : 10,
        marginTop : 5,      
        borderWidth : 1,
        borderColor : colors.lightBlueA400
    },
    imgStyle : {
        width : 25,
        height : 25
    },
    buttonContainer: {
        width : '60%',
        justifyContent : 'center',
        alignItems : 'center',
        marginTop : '10%'
    },
    button: {
        backgroundColor : colors.lightBlueA400,
        width : '100%',
        padding : 15,
        borderRadius : 10,
        alignItems : 'center'
    },
    buttonText: {
        color : colors.white,
        fontWeight : '700',
        fontSize : 16
    },
    errTxt : {
        marginLeft : 5,
        fontSize : 16,
    },
    buttonOutLineContainer: {
        flexDirection : 'row',
        marginTop : 8,
        alignItems : 'center',
        padding : 10
    },
    buttonOutLineText: {
        color : 'black',
        fontWeight : '700',
        fontSize : 16,
        textAlign : 'center'
    },
    signUpContainer : {
        marginLeft : 10,
        justifyContent : 'center',
        alignItems : 'center'
    },
    signUpTxt : {
        color : colors.lightBlueA400,
        fontWeight : 'bold',
        fontSize : 20,
        textAlign : 'center'
    }
})