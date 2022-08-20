import React,{useEffect, useState} from 'react';
import {SafeAreaView,View,Text,Image,FlatList,Dimensions,StyleSheet,TouchableOpacity,Modal} from 'react-native'
import HeaderComponent from '../components/HeaderComponent'

import {useDispatch,useSelector} from 'react-redux'
import bookingAction from '../store/action/booking'
import qtyAction from '../store/action/qty'
import AsyncStorage from '@react-native-async-storage/async-storage'
import colors from '../constants/color'
import BottomTabComponent from '../components/BottomTabComponent';

const width = Dimensions.get('screen').width

const BookingListScreen = ({navigation,route}) => {
const data = useSelector(state => state.UserList)
const totQty = useSelector(state => state.Qty)
//console.log("User Data from Booking Screen is" , data)
const dispatch = useDispatch()


useEffect(() => {
  const getUserList = async () => {
    let userData = await AsyncStorage.getItem('user')
    let res = JSON.parse(userData)
    if(res == null){
      AsyncStorage.setItem('user',JSON.stringify([]))
      dispatch(bookingAction.saveToBooking([]))
    }else{
      AsyncStorage.setItem('user',JSON.stringify(res))
      dispatch(bookingAction.saveToBooking(res))
    }
  }
  getUserList()
},[])

const removeBookingList = (item) =>{
  
  AsyncStorage.getItem('user').then((res) =>{
    let bookingList = JSON.parse(res)
    let leftBookingList = []
    
    if(bookingList != null){
      leftBookingList = bookingList.filter(prod => prod.numOfFilter != item.numOfFilter)
    }
    AsyncStorage.setItem('user',JSON.stringify(leftBookingList))
    dispatch(bookingAction.saveToBooking(leftBookingList))

    AsyncStorage.setItem('bookQty',JSON.stringify(totQty - 1))
    dispatch(qtyAction.setTotalQty(totQty - 1))
  })
}

  return(
    <SafeAreaView style = {styles.context}>
      <HeaderComponent navigation = {navigation} title = 'Booking List' iconName = 'menu' />
      {data?.length > 0 ? <View style = {{flex : 1,padding : 18}}>
        {data?.length > 0 && <View style = {{alignItems : 'flex-end'}}>
        <TouchableOpacity onPress={() => {
          AsyncStorage.removeItem('user')
          dispatch(bookingAction.saveToBooking([]))

          AsyncStorage.removeItem('bookQty')
          dispatch(qtyAction.setTotalQty(0))
             
        }}>
          <Text style = {{fontSize : 20,color : colors.green,fontWeight : 'bold'}}>Delete All</Text>
        </TouchableOpacity>
        </View>}
         <FlatList
          data = {data}
          renderItem = {({item,index}) => {
            return(
              <View onPress={() => navigation.navigate('Detail',{
                data : item,
                parentScreen : 'Home'
              })} 
              style = {{backgroundColor : colors.lightBlue,borderRadius : 10,marginTop : 15}}>
                
                <View style = {{width : width - 36,height : width/2 - 10,justifyContent : 'center',alignItems : 'center',borderTopLeftRadius : 10,borderTopRightRadius : 10}}>
                  <Image resizeMode='cover' source={item.img} style = {{width : '100%',height : '100%',borderTopLeftRadius : 10,borderTopRightRadius : 10}} />
                  <TouchableOpacity onPress={() => removeBookingList(item)}  style= {{position : 'absolute',top : 0,right : 0}}> 
                    <Image source={require('../../assets/icons/delete.png')} style = {{width : 30,height : 30,tintColor : 'black'}} />
                  </TouchableOpacity>
                </View>
                <View style = {{padding : 20}}>
                <Text style = {styles.hotelName} >{item.name}</Text>

                <View style = {{flexDirection : 'row',justifyContent : 'space-between',marginTop : 5}}>

                <View  >
                <Text>Room(s) - {item.roomCount}</Text>
                <Text style = {{marginVertical : 5}}>Guest(s) - {item.guestCount} </Text>
                {
                  item.childCount != 0 ? 

                  <Text>Child(ren) - {item.childCount} </Text> 
                  :
                  <Text>You have no children.</Text>  
                }
                </View>

                <View  >
                  <Text>CheckInDate - {item.checkInText}</Text>
                  <Text style = {{marginVertical : 5}} >CheckOutDate - {item.checkOutText}</Text>
                </View>

                </View>
                <Text style = {{marginTop : 5}}>Welcome {item.gender} {item.firstName} {item.lastName}</Text>
                </View>
                <TouchableOpacity
                onPress={() => navigation.navigate("ReviewModal",{
                  reviewHotel : item
                })}
                style = {{marginTop : 10,paddingVertical : 8,paddingHorizontal : 25,position : 'absolute',bottom : 0,right : 0,backgroundColor : colors.green,borderBottomEndRadius:5,borderTopStartRadius : 5 }}>
                  <Text style = {{fontSize : 16,color  : colors.white}}>Write Review</Text>
                </TouchableOpacity>
              </View>
            )
          }}
          keyExtractor = {(item,index) => index.toString()}
          showsVerticalScrollIndicator = {false}
        />
       
      </View>
      
    :
    <View style = {{flex : 1, justifyContent : 'center',alignItems : 'center'}}>
      <Text>There is no booking list!</Text>
    </View>  
    }
    
    <BottomTabComponent navigation={navigation} screenName = 'BookList' />
      
    </SafeAreaView>
  )
}

export default BookingListScreen

const styles = StyleSheet.create({
    context : {
      flex : 1
    },
    container: {
      flex: 1,
      backgroundColor: colors.lightBlue,
      width : "100%",
      height : '100%' ,
      padding : 20,
      borderRadius : 10,
      elevation : 3,
      shadowRadius : 10,
      marginTop : 15 
    },
    hotelName : {
      color : '#000',
      fontSize : 14,
      fontWeight :'bold',
      
    },
    imgContainer : {
      flexDirection : 'row',
      alignItems : 'center',
      marginTop : 10,
      justifyContent : 'space-between'
    },
   
  });

