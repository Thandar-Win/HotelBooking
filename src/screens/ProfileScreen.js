import React, { useEffect, useState } from 'react'
import {SafeAreaView,View,Text,TouchableOpacity,Image,Dimensions,ScrollView} from 'react-native'
import BottomTabComponent from '../components/BottomTabComponent'
import HeaderComponent from '../components/HeaderComponent'
import colors from '../constants/color'
import { auth } from '../firebase/firebase-config'
import ModalComponent from '../components/ModalComponent'
import { useSelector,useDispatch } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import userNameAction from '../store/action/username'
import userEmailAction from '../store/action/useremail'


const width = Dimensions.get('screen').width
 
const ProfileScreen = ({navigation,route}) => {

    const [showDialog,setShowDialog] = useState(false)

    const userName = useSelector(state => state.UserName)
    const userMail = useSelector(state => state.UserEmail)
    const dispatch = useDispatch()

    useEffect(() => { 
        const getUserName = async () => {
            let name = await AsyncStorage.getItem('uname')
            let res = JSON.parse(name)

            if(res == null){
                AsyncStorage.setItem('uname',JSON.stringify([]))
                dispatch(userNameAction.userName([]))
            }else{
                AsyncStorage.setItem('uname',JSON.stringify(res))
                dispatch(userNameAction.userName(res))
            }
        }

        const getUserMail = async () => {
            let mail = await AsyncStorage.getItem('umail')
            let res = JSON.parse(mail)

            if(res == null) {
                AsyncStorage.setItem('umail',JSON.stringify([]))
                dispatch(userEmailAction.userEmail([]))
            }else{
                AsyncStorage.setItem('umail',JSON.stringify(res))
                dispatch(userEmailAction.userEmail(res))
            }
        }
        getUserName()
        getUserMail()
    },[])
    

    
    return(
        <SafeAreaView style = {{flex : 1}}>
            <HeaderComponent navigation={navigation} title = 'Profile' iconName = 'menu' />
            <ScrollView showsVerticalScrollIndicator = {false}>
            <View style = {{flex : 1}}>
                <View style = {{backgroundColor : colors.lightBlueA400,justifyContent : 'center',alignItems : 'center',padding : 20,height : width/2 + 50}}>
                    <View style = {{width : 80,height : 80,borderRadius : 40}}>
                        <Image source={require('../../assets/icons/girl.png')} style = {{width : '100%',height : '100%',borderRadius : 40}} />
                    </View>
                
                    <Text style = {{marginTop : 10,fontSize : 18,color : colors.white ,fontWeight : 'bold'}}>{userName}</Text> 
                    <Text style = {{marginTop : 3,fontSize : 18,color : colors.white,fontWeight : '500'}} >{userMail}</Text>
                </View> 

                <View style = {{padding : 20,marginTop : 5}}>
                <View style = {{flexDirection : 'row', alignItems : 'center'}}>
                    <Image source={require('../../assets/icons/Profile.png')} style = {{width : 25,height : 25,tintColor : colors.green400}} />
                    <Text style = {{marginLeft : 5,fontSize : 14,textAlign : 'center'}}>Manage Your Account</Text>
                </View>

                <TouchableOpacity onPress={() => navigation.navigate('Review')} style = {{flexDirection : 'row', alignItems : 'center',marginTop : 10}}>
                    <Image source={require('../../assets/icons/reviews.png')} style = {{width : 25,height : 25,tintColor : colors.green400}} />
                    <Text style = {{marginLeft : 5,fontSize : 14,textAlign : 'center'}}>Your Review</Text>
                </TouchableOpacity>

                <View style = {{flexDirection : 'row', alignItems : 'center',marginTop : 10}}>
                    <Image source={require('../../assets/icons/currency.png')} style = {{width : 25,height : 25,tintColor : colors.green400}} />
                    <Text style = {{marginLeft : 5,fontSize : 14,textAlign : 'center'}}>Currency</Text>
                </View>

                <View style = {{flexDirection : 'row', alignItems : 'center',marginTop : 10}}>
                    <Image source={require('../../assets/icons/nationality.png')} style = {{width : 25,height : 25,tintColor : colors.green400}} />
                    <Text style = {{marginLeft : 5,fontSize : 14,textAlign : 'center'}}>Nationality</Text>
                </View>

                <View style = {{flexDirection : 'row', alignItems : 'center',marginTop : 10}}>
                    <Image source={require('../../assets/icons/language.png')} style = {{width : 25,height : 25,tintColor : colors.green400}} />
                    <Text style = {{marginLeft : 5,fontSize : 14,textAlign : 'center'}}>Language</Text>
                </View>

                <View style = {{width : '85%', height : 1, marginHorizontal : 5, backgroundColor : colors.lightBlueA400,marginTop : 10}} />

                <View style = {{flexDirection : 'row', alignItems : 'center',marginTop : 10}}>
                    <Image source={require('../../assets/icons/wish_list.png')} style = {{width : 25,height : 25,tintColor : colors.green400}} />
                    <Text style = {{marginLeft : 5,fontSize : 14,textAlign : 'center'}}>WishList</Text>
                </View>

                <View style = {{flexDirection : 'row', alignItems : 'center',marginTop : 10}}>
                    <Image source={require('../../assets/icons/list.png')} style = {{width : 25,height : 25,tintColor : colors.green400}} />
                    <Text style = {{marginLeft : 5,fontSize : 14,textAlign : 'center'}}>Booking List</Text>
                </View>

                <View style = {{width : '85%', height : 1, marginHorizontal : 5, backgroundColor : colors.lightBlueA400,marginTop : 10}} />

                <Text style = {{marginTop : 10,marginLeft : 3,fontSize : 18,fontWeight : 'bold'}}>Help and Support</Text>

                <TouchableOpacity onPress={() => navigation.navigate('Customer')} style = {{flexDirection : 'row', alignItems : 'center',marginTop : 10}}>
                    <Image source={require('../../assets/icons/services.png')} style = {{width : 25,height : 25,tintColor : colors.green400}} />
                    <Text style = {{marginLeft : 5,fontSize : 14,textAlign : 'center'}}>Contact Customer Service</Text>
                </TouchableOpacity>

                <View style = {{flexDirection : 'row', alignItems : 'center',marginTop : 10}}>
                    <Image source={require('../../assets/icons/safety.png')} style = {{width : 25,height : 25,tintColor : colors.green400}} />
                    <Text style = {{marginLeft : 5,fontSize : 14,textAlign : 'center'}}>Safety Resource Centre</Text>
                </View>

                <View style = {{width : '85%', height : 1, marginHorizontal : 5, backgroundColor : colors.lightBlueA400,marginTop : 10}} />

                <TouchableOpacity onPress={() => setShowDialog(true)} style = {{flexDirection : 'row', alignItems : 'center',marginTop : 10}}>
                    <Image source={require('../../assets/icons/LogOut.png')} style = {{width : 25,height : 25,tintColor : colors.green400}} />
                    <Text style = {{marginLeft : 5,fontSize : 14,textAlign : 'center'}}>LogOut</Text>
                </TouchableOpacity>
                </View>

                  <ModalComponent cancelHandler={() => setShowDialog(false)} visible ={showDialog} navigation ={navigation} />       
            </View>
            </ScrollView>
            <BottomTabComponent navigation={navigation} screenName = 'Profile' />
        </SafeAreaView>
    )
}

export default ProfileScreen