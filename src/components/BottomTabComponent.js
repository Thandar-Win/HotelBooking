import React,{useEffect} from "react";
import {View,Image,Text,TouchableOpacity,Dimensions,StyleSheet} from 'react-native'
import colors from '../constants/color'
import {useDispatch,useSelector} from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import qtyAction from '../store/action/qty'
import wListQtyAction from "../store/action/wListQty";

const width = Dimensions.get('screen').width

const BottomTabComponent = ({navigation,screenName}) => {
    const bookingQty = useSelector(state => state.Qty)
    const favourQty = useSelector(state => state.WListQty) 
    const dispatch = useDispatch()

    useEffect(() => {
        async function getBookingQty() {
           let qtyData = await AsyncStorage.getItem('bookQty')
           let qty = JSON.parse(qtyData)
           if(qty == null){
             dispatch(qtyAction.setTotalQty(0))
             AsyncStorage.setItem('bookQty', JSON.stringify(0))
           }else{
             dispatch(qtyAction.setTotalQty(qty))
             AsyncStorage.setItem('bookQty', JSON.stringify(qty))
           }
         }

         async function getWishListQty() {
            let qtyData = await AsyncStorage.getItem('favourQty')
            let qty = JSON.parse(qtyData)
            if(qty == null){
              dispatch(wListQtyAction.setFavorQty(0))
              AsyncStorage.setItem('favourQty', JSON.stringify(0))
            }else{
              dispatch(wListQtyAction.setFavorQty(qty))
              AsyncStorage.setItem('favourQty', JSON.stringify(qty))
            }
          }

          getWishListQty()
          getBookingQty()
     
       }, [navigation, bookingQty,favourQty])

       
       

    return(
        <View style = {styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate('Home')} style = {styles.txtImgContainer}>
                <Image style = {[styles.imgStyle,{tintColor : screenName == 'Home' ? colors.lightBlue : 'gray' }]} source={require('../../assets/icons/gray_home.png')} />
                <Text style = {[styles.txtStyle,{color : screenName == 'Home' ? colors.lightBlue : 'gray'}]}>Home</Text>
            </TouchableOpacity>

            <TouchableOpacity  onPress={() => navigation.navigate('WList')} style = {styles.txtImgContainer}>
                <Image style = {[styles.imgStyle,{tintColor : screenName == 'WList' ? colors.lightBlue : 'gray' }]} source={require('../../assets/icons/wish_list.png')} />
               {favourQty != 0 && <View 
                style = {{
                    position : 'absolute',
                    top : -5,
                    right : 0,
                    width : 22,
                    height : 22,
                    borderRadius  : 11,
                    marginRight : width / 8 - 22,
                    backgroundColor : colors.red900,
                    justifyContent : 'center',
                    alignItems : 'center'
                    }}>
                    <Text>{favourQty}</Text>
                </View>}
                <Text style = {[styles.txtStyle,{color : screenName == 'WList' ? colors.lightBlue : 'gray'}]}>Wish List</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('BookList')} style = {styles.txtImgContainer}>
                <Image style = {[styles.imgStyle,{tintColor : screenName == 'BookList' ? colors.lightBlue : 'gray' }]} source={require('../../assets/icons/list.png')} />
                { bookingQty != 0 && <View 
                style = {{
                    position : 'absolute',
                    top : -5,
                    right : 0,
                    width : 22,
                    height : 22,
                    borderRadius  : 11,
                    marginRight : width / 8 - 22,
                    backgroundColor : colors.red900,
                    justifyContent : 'center',
                    alignItems : 'center'
                    }}>
                    <Text>{bookingQty}</Text>
                </View>}
                <Text style = {[styles.txtStyle,{color : screenName == 'BookList' ? colors.lightBlue : 'gray'}]}>Booking List</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Profile')} style = {styles.txtImgContainer}>
                <Image style = {[styles.imgStyle,{tintColor : screenName == 'Profile' ? colors.lightBlue : 'gray' }]} source={require('../../assets/icons/Profile.png')} />
                <Text style = {[styles.txtStyle,{color : screenName == 'Profile' ? colors.lightBlue : 'gray'}]}>Profile</Text>
            </TouchableOpacity>

  
        </View>
    )
}

export default BottomTabComponent

const styles = StyleSheet.create({
    container : {
        height : 60,
        backgroundColor : '#fff',
        flexDirection : 'row'
    },
    txtImgContainer : {
        justifyContent : 'center',
        alignItems : 'center',
        width : width / 4
    },
    imgStyle : {
        width : 25,
        height : 25
    },
    txtStyle : {
        marginTop : 3,
        fontSize : 14,
        fontWeight : 'bold'
    }
})