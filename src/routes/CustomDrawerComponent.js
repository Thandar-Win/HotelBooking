import React,{useState,useEffect} from "react";
import {View,TouchableOpacity,Image,Text,Dimensions} from 'react-native'
import {DrawerContentScrollView} from '@react-navigation/drawer'
import ModalComponent from "../components/ModalComponent";
import colors from '../constants/color'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {useDispatch,useSelector} from 'react-redux'
import userEmailAction from '../store/action/useremail'
import userNameAction from '../store/action/username'
import { auth } from "../firebase/firebase-config";

const CustomDrawerComponent = (props) => {
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
        <DrawerContentScrollView {...props}>
        <View style = {{flex : 1}}>
           
            <View  style = {{backgroundColor : colors.lightBlueA400,justifyContent : 'center',alignItems : 'center',padding : 18}}>
                <View style = {{width: 80, height: 80, borderRadius: 40}}>
                <Image source = {require('../../assets/icons/girl.png')} style = {{ width: '100%', height: '100%', borderRadius: 40 }} />
                </View>
                <Text style = {{fontWeight: '700', marginTop: 8, fontSize: 18, color: '#fff', textAlign: 'center' }}>{userName}</Text>
                <Text style = {{fontWeight: '700', marginTop: 8, fontSize: 18, color: '#fff', textAlign: 'center' }}>{userMail}</Text>
            </View>

            <TouchableOpacity onPress={() => props.navigation.navigate('Home')} style = {{padding : 16,flexDirection : 'row', alignItems : 'center'}}>
                <Image source = {require('../../assets/icons/gray_home.png')} style = {{width : 25,height : 25,tintColor : colors.green}} />
                <Text style = {{marginLeft : 8,fontSize : 16,fontWeight : 'bold',color : '#5F5C5D'}}>Home</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => props.navigation.navigate('WList')} style = {{padding : 16,flexDirection : 'row', alignItems : 'center'}}>
                <Image source = {require('../../assets/icons/wish_list.png')} style = {{width : 25,height : 25,tintColor : colors.green}} />
                <Text style = {{marginLeft : 8,fontSize : 16,fontWeight : 'bold',color : '#5F5C5D'}}>Wish List</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => props.navigation.navigate('Review')} style = {{padding : 16,flexDirection : 'row', alignItems : 'center'}}>
                <Image source = {require('../../assets/icons/reviews.png')} style = {{width : 25,height : 25,tintColor : colors.green}} />
                <Text style = {{marginLeft : 8,fontSize : 16,fontWeight : 'bold',color : '#5F5C5D'}}>Review</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => props.navigation.navigate('Profile')} style = {{padding : 16,flexDirection : 'row', alignItems : 'center'}}>
                <Image source = {require('../../assets/icons/user.png')} style = {{width : 25,height : 25,tintColor : colors.green}} />
                <Text style = {{marginLeft : 8,fontSize : 16,fontWeight : 'bold',color : '#5F5C5D'}}>Profile</Text>
            </TouchableOpacity>

            <View style = {{width: Dimensions.get('screen').width / 3,marginVertical: 15,height: 2,marginLeft: 20,backgroundColor: colors.green}} />

            <TouchableOpacity onPress={() => props.navigation.navigate('Profile')} style = {{padding : 16,flexDirection : 'row', alignItems : 'center'}}>
                <Image source = {require('../../assets/icons/About_Us.png')} style = {{width : 25,height : 25,tintColor : colors.green}} />
                <Text style = {{marginLeft : 8,fontSize : 16,fontWeight : 'bold',color : '#5F5C5D'}}>About Us</Text>
            </TouchableOpacity>

            <View style = {{width: Dimensions.get('screen').width / 3,marginVertical: 15,height: 2,marginLeft: 20,backgroundColor: colors.green}} />

            <TouchableOpacity onPress = {() => {
                //props.navigation.closeDrawer()
                setShowDialog(true)
            }} style = {{padding : 16,flexDirection : 'row', alignItems : 'center'}}>
                <Image source = {require('../../assets/icons/LogOut.png')} style = {{width : 25,height : 25,tintColor : colors.green}} />
                <Text style = {{marginLeft : 8,fontSize : 16,fontWeight : 'bold',color : '#5F5C5D'}}>Logout</Text>
            </TouchableOpacity>

            <ModalComponent cancelHandler={() => setShowDialog(false)} visible = {showDialog} navigation = {props.navigation}  />
    
        </View>
        </DrawerContentScrollView>
    )
}

export default CustomDrawerComponent