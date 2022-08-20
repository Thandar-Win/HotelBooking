import React, { useState,useEffect } from "react";
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {createDrawerNavigator, DrawerContentScrollView} from '@react-navigation/drawer'
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen";
import HotelHomeScreen from "../screens/HomeScreen";
import HotelDetailScreen from "../screens/HotelDetailScreen";
import BookingScreen from "../screens/BookingScreen";
import WishListScreen from "../screens/WishListScreen";
import ProfileScreen from "../screens/ProfileScreen";
import CustomDrawerComponent from "./CustomDrawerComponent";
import CustomerServicesScreen from "../screens/CustomerServicesScreen";
import CoronavirusScreen from "../screens/CoronavirusScreen";
import BookingListScreen from "../screens/BookingListScreen";
import MapViewScreen from "../screens/MapViewScreen";
import ReviewModalScreen from '../screens/ReviewModalScreen'
import ReviewListScreen from "../screens/ReviewListScreen";
import AsyncStorage from '@react-native-async-storage/async-storage'
import {useDispatch,useSelector} from 'react-redux'
import signCountAction from '../store/action/signcount'
import { auth } from "../firebase/firebase-config";


const Stack = createNativeStackNavigator()
//const Tab = createMaterialTopTabNavigator()
const Drawer = createDrawerNavigator()

const CustomDrawerContent = props => {
    return(
        <DrawerContentScrollView {...props} >
            <CustomDrawerComponent navigation = {props.navigation} />
        </DrawerContentScrollView>
    )
}

const DrawerNavigator = () => {
    return(
        <Drawer.Navigator 
        drawerContent={props => CustomDrawerContent(props)}
        screenOptions = {{headerShown : false}}
        >
            <Drawer.Screen name = "Home" component = {HotelHomeScreen} />
            <Drawer.Screen name = "Detail" component = {HotelDetailScreen} />
            <Drawer.Screen name = "Book" component = {BookingScreen} />
            <Drawer.Screen name = "WList" component={WishListScreen} />
            <Drawer.Screen name = "Profile" component = {ProfileScreen} />
            <Drawer.Screen name = "Customer" component= {CustomerServicesScreen} />
            <Drawer.Screen name = 'Coronavirus' component={CoronavirusScreen} />
            <Drawer.Screen name = 'BookList' component={BookingListScreen} />
            <Drawer.Screen name = "Map" component={MapViewScreen} />
            <Drawer.Screen name = "ReviewModal" component={ReviewModalScreen} />
            <Drawer.Screen name = "Review" component={ReviewListScreen} />
        </Drawer.Navigator>
    )
}

const Navigator = () => {
    const [user, setUser] = useState(false)

    useEffect(() => {

        const getSignCount = async () => {

        const getSignCountFromAsync = await AsyncStorage.getItem('srcCount')

        const signCount = JSON.parse(getSignCountFromAsync)

            if(signCount != null){

                setUser(true)

            }

        }

        getSignCount()

    },[])
    

    return(
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown : false
                }}
                //drawerContent = {(props) => <CustomDrawerComponent {...props} /> }
                >
                 {!user && <Stack.Screen name="SignIn" component={SignInScreen} />  }
                 {!user && <Stack.Screen name="UpSign" component={SignUpScreen} />  }
                 <Stack.Screen name = 'drawer' component={DrawerNavigator} />
            </Stack.Navigator>
        </NavigationContainer>
    )
} 

export default Navigator