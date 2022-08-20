import React, { useState ,useEffect} from 'react'
import { StyleSheet, Text, View,TouchableOpacity,Image,SafeAreaView ,TextInput,ToastAndroid} from 'react-native'
import colors from '../constants/color'
import HeaderComponent from '../components/HeaderComponent'
import { auth } from '../firebase/firebase-config'
import { useDispatch } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import signCountAction from '../store/action/signcount'

import userNameAction from '../store/action/username'
import userEmailAction from '../store/action/useremail'
import wishListAction from '../store/action/wishlist'
import wListQtyAction from '../store/action/wListQty'
import bookingAction from '../store/action/booking'
import qtyAction from '../store/action/qty'
import reviewAction from  '../store/action/review'


const SignUpScreen = ({navigation,route}) => {
  const [userName,setUserName] = useState('')

  const [email,setEmail] = useState('')
  const [emailVaildError,setEmailVaildError] = useState('')

  const [password,setPassword] = useState('')
  const [showPwd,setShowPwd] = useState(true)

  const [confirmPassword,setConfirmPassword] = useState('')
  const [showConfirmPwd,setShowConfirmPwd] = useState(true) 

  const dispatch = useDispatch()

//   useEffect(() => {
//     const unsubscribe =  auth.onAuthStateChanged(user => {
//         if(user){
//             navigation.navigate('drawer')
//         }
//     })
//     return unsubscribe
// }, [])

const handleSignUp = () => { 

    AsyncStorage.removeItem('uname')
    dispatch(userNameAction.userName([]))

    AsyncStorage.removeItem('umail')
    dispatch(userEmailAction.userEmail([]))

    AsyncStorage.removeItem('wishlist')
    dispatch(wishListAction.saveToFavour([]))

    AsyncStorage.removeItem('favourQty')
    dispatch(wListQtyAction.setFavorQty(0))

    AsyncStorage.removeItem('user')
    dispatch(bookingAction.saveToBooking([]))

    AsyncStorage.removeItem('bookQty')
    dispatch(qtyAction.setTotalQty(0))

    AsyncStorage.removeItem('rev')
    dispatch(reviewAction.saveToReview([]))

    

   if(userName != '' && email != '' && password != '' && confirmPassword != '' ){

    AsyncStorage.getItem('uname').then((res) => {
        const name = JSON.parse(res)
        if(name == null){
            let username = []
            username.push(userName)

            AsyncStorage.setItem('uname', JSON.stringify(username))
            dispatch(userNameAction.userName(username))
        }else{
            name.push(userName)

            AsyncStorage.setItem('uname',JSON.stringify(name))
            dispatch(userNameAction.userName(name))
        }
    })

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
    .createUserWithEmailAndPassword(email,password)
    .then(userCredentials => {
        const user = userCredentials.user;
        
        AsyncStorage.getItem('srcCount').then((res) => {
            const countSign = JSON.parse(res)
            if(countSign == null){

                AsyncStorage.setItem('srcCount',JSON.stringify(user))
                dispatch(signCountAction.setCountScreen(user))
            }
        })
        successSignUp()
        navigation.navigate('drawer')

        setUserName('')
        setEmail('')
        setPassword('')
        setConfirmPassword('')
    })
    .catch(error => alert(error.message))
    
}else{
    unSuccessSignUp()
}
}

const successSignUp = () => {

    ToastAndroid.showWithGravityAndOffset(

        "Sign Up Successful!!!",

        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,  
        25,
        50


    )
}

const unSuccessSignUp = () => {

    ToastAndroid.showWithGravityAndOffset(

        "Sign Up Unsuccessful!!!",

        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,  
        25,
        50


    )
}
  

  const handleEyeIcon = () =>{
    if(showPwd == true){
        setShowPwd(false)
    }else{
        setShowPwd(true)
    }
  }

  const handleEyeConfirmIcon = () =>{
    if(showConfirmPwd == true){
        setShowConfirmPwd(false)
    }else{
        setShowConfirmPwd(true)
    }
  }

  const handleValidEmail = (val) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/ 
   if(val.length === 0){
    setEmailVaildError('Email address must be enter ')
   }else if(reg.test(val) === false) {
      setEmailVaildError('Ivalid email address')
    }else  {
      setEmailVaildError('Valid email address')
      
    }
  }

  return(
    <SafeAreaView style = {styles.content}>
      
      <View style = {styles.container}>

        <View style = {styles.inputContainer}>
            <View style = {styles.input}>
                <TextInput
                 placeholder = "User Name"
                 value={userName}
                 keyboardType = 'email-address'
                 onChangeText={text => setUserName(text)}
                 />
                <Image source={require('../../assets/icons/user.png')} style = {styles.imgStyle} />
            </View>

            <View style = {styles.input}>
                <TextInput
                 placeholder = "Email"
                 value={email}
                 keyboardType = 'email-address'
                 onChangeText={text => {
                    setEmail(text)
                    handleValidEmail(text)
                }}
                 style = {{color : emailVaildError == 'Valid email address' ? colors.lightBlueA400 : colors.red900}}
                 />
                <Image source={require('../../assets/icons/mail.png')} style = {styles.imgStyle} />
            </View>

            <Text style = {[styles.errTxt,{color : emailVaildError == 'Valid email address'? colors.lightBlueA400 : colors.red900,}]}>{emailVaildError}</Text>

            <View style = {styles.input}>
                <TextInput
                 placeholder = "Password"
                 value={password}
                 onChangeText={text => setPassword(text)}
                 secureTextEntry = {showPwd}
                />
                <TouchableOpacity onPress={() => handleEyeIcon()}>
                    {
                        showPwd ?
                        <Image source={require('../../assets/icons/hide_eye.png')} style = {styles.imgStyle} />
                        :
                        <Image source={require('../../assets/icons/show_eye.png')} style = {styles.imgStyle} />

                    }
                </TouchableOpacity>
            </View>

            

            <View style = {styles.input}>
                <TextInput
                 placeholder = "Confirm Password"
                 value={confirmPassword}
                 onChangeText={text => setConfirmPassword(text)}
                 secureTextEntry = {showConfirmPwd}
                 />
                <TouchableOpacity onPress={() => handleEyeConfirmIcon()}>
                    {
                        showConfirmPwd ?
                        <Image source={require('../../assets/icons/hide_eye.png')} style = {styles.imgStyle} />
                        :
                        <Image source={require('../../assets/icons/show_eye.png')} style = {styles.imgStyle} />
                    }
                </TouchableOpacity>
            </View>

            

          </View>

            <View style = {styles.buttonContainer}>
              <TouchableOpacity onPress={() => handleSignUp()} style = {styles.button}>
                <Text style = {styles.buttonText}>Sign Up</Text>
              </TouchableOpacity>
            </View>  

            <View style = {styles.buttonOutLineContainer} >
                <Text style = {styles.buttonOutLineText}>If you have an account,</Text>
                <TouchableOpacity onPress={() => {navigation.navigate('SignIn',{userName : userName})}} style = {styles.signUpContainer}   >
                    <Text style = {styles.signUpTxt}>Sign In </Text>
                </TouchableOpacity>
            </View>              
            
      </View>
    </SafeAreaView>
  )
}

export default SignUpScreen

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
        width : '80%',
    },
    input: {
        backgroundColor : colors.white,
        paddingVertical : 10,
        paddingHorizontal : 15,
        borderRadius : 10,
        marginTop : 5,
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'space-between',
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
