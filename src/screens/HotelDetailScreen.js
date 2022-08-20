import React,{useEffect,useState} from 'react'
import {View,Text,StyleSheet, SafeAreaView,Image,TouchableOpacity,Dimensions ,ScrollView} from 'react-native'
import {useIsFocused} from '@react-navigation/native'
import HeaderComponent from '../components/HeaderComponent'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {useDispatch, useSelector} from 'react-redux'
import wishListAction from '../store/action/wishlist'
import wListQtyAction from '../store/action/wListQty'
import colors from '../constants/color'

const width = Dimensions.get('screen').width
const HotelDetailScreen = ({navigation,route}) => {
  
  const {data} = route.params
 // console.log('Parent Screen Name is' , parentScreen)

  const [isInWishList,setIsInWishList] = useState(false)
  const dispatch = useDispatch()

  favourQty = useSelector(state => state.WListQty)
  

  const amenitiesArr = [
    {
      amenitiesIcon : require('../../assets/icons/reception.png'),
      amenitiesTxt : 'Reception'
    },
    {
      amenitiesIcon : require('../../assets/icons/wifi.png'),
      amenitiesTxt : 'Free Wifi'
    },
    {
      amenitiesIcon : require('../../assets/icons/toiletries.png'),
      amenitiesTxt : 'Toiletries'
    },
  ]

  const guaranteeArr = [
    {
      guaranteeImg : require('../../assets/icons/wifi.png'),
      guaranteeTxt : 'Free Wifi'
    },
    {
      guaranteeImg : require('../../assets/icons/television.png'),
      guaranteeTxt : 'Television'
    },
    {
      guaranteeImg : require('../../assets/icons/mineral_water.png'),
      guaranteeTxt : 'Mineral Water'
    },
    {
      guaranteeImg : require('../../assets/icons/clean_linen.png'),
      guaranteeTxt : 'Clean Linen'
    },
    {
      guaranteeImg : require('../../assets/icons/washrooms.png'),
      guaranteeTxt : 'Washrooms'
    },
    {
      guaranteeImg : require('../../assets/icons/toiletries.png'),
      guaranteeTxt : 'Toiletries'
    }
  ]

  useEffect(() => {
    AsyncStorage.getItem('wishlist').then((res) => {
      const wishListData = JSON.parse(res)
      if(wishListData != null ){
        let isWishListId = null
        for(let i=0; i<wishListData.length; i++){
          if(wishListData[i]._id == data._id){
            isWishListId = data._id
          }
        }
        if(isWishListId != null){
          setIsInWishList(true)
        }else{
          setIsInWishList(false)
        }
    }else{
        setIsInWishList(false)
    }
    })
  }, [route])

  const addToWishList = (data) => {
   
    data.qty = 1
    let  favQty = data.qty
    if(!isInWishList){

      AsyncStorage.getItem('wishlist').then((res) => {
        const wishListData = JSON.parse(res)
        let hotels = []
        if(wishListData == null){
          hotels.push(data)
          
          dispatch(wishListAction.saveToFavour(hotels))
          AsyncStorage.setItem('wishlist', JSON.stringify(hotels))

          AsyncStorage.setItem('favourQty', JSON.stringify(1))
          dispatch(wListQtyAction.setFavorQty(1))
        }else{
          let isWishListId = null
 
          for(let i=0; i<wishListData.length; i++){
            favQty += wishListData[i].qty
            if(wishListData[i]._id == data._id){
                isWishListId = data._id

                //wishListData[i].qty +=  1
            }
          }
          //console.log("Is ID null...?", isWishListId)
          if(isWishListId == null){
            wishListData.push(data)
          }
  
          AsyncStorage.setItem('wishlist', JSON.stringify(wishListData))
          dispatch(wishListAction.saveToFavour(wishListData))

          AsyncStorage.setItem('favourQty', JSON.stringify(favQty))
          dispatch(wListQtyAction.setFavorQty(favQty))
  
        }
        setIsInWishList(true)
      })
    }else{
      AsyncStorage.getItem('wishlist').then((res) => {
       // console.log('Detail data from Asyn..',res)
        const wishListData = JSON.parse(res)
        let hotels = []
        if(wishListData != null){
          hotels = wishListData.filter(prod => prod._id != data._id)
        }
        AsyncStorage.setItem('wishlist', JSON.stringify(hotels))
        dispatch(wishListAction.saveToFavour(hotels))

        AsyncStorage.setItem('favourQty', JSON.stringify(favourQty - 1))
        dispatch(wListQtyAction.setFavorQty(favourQty - 1))

        
      })
      setIsInWishList(false)
    }
  }
  return(
    <SafeAreaView style = {{flex : 1}}>
      <HeaderComponent navigation={navigation} title = 'Detail' iconName = 'back' parentScreenName='Home'/>
      <ScrollView showsVerticalScrollIndicator={false} style = {{marginBottom : 10}} >
      <View style = {styles.container}>

        {
          data.imgDetail.map((item,index) => {
            return(
              <View key = {index} style = {{width : '100%', height : 200}}>
                <Image style = {{width : '100%',height : '100%' }} source = {item.img1} />
              </View>
            )
          })
          
        }
        
       <View style = {{padding : 20,marginHorizontal : 10}}>
        
        <View  style={{flexDirection : 'row',alignItems : 'center',justifyContent : 'space-between'}} >
          <Text style = {{fontSize : 18, fontWeight : 'bold',textAlign : 'center'}}>{data.name}</Text>
          <TouchableOpacity onPress={() => addToWishList(data) }>
               {
               isInWishList ?
               <Image style={{width : 25,height : 25,tintColor  : 'red'}} source={require('../../assets/icons/hearts.png')} /> 
               :
               <Image style={{width : 25,height : 25,tintColor : 'black'}} source={require('../../assets/icons/hearted.png')} />
               }

          </TouchableOpacity>
        </View>

        <View style = {{flexDirection : 'row',marginTop : 10}}>
          <Image source={require('../../assets/icons/map.png')} style = {{width : 20,height : 20}} />
          <Text style = {{marginLeft : 5}}>{data.location}</Text> 
           
        </View>
        <TouchableOpacity style = {{marginTop : 5,marginLeft : 5}} 
        onPress={() => navigation.navigate('Map',{
            lat : data.lat,
            long : data.long
        })}>
            <Text style = {{color :"red"}}>See on Map </Text> 
        </TouchableOpacity> 
        
        <View style = {{flexDirection : 'row',marginTop : 10}}>
          <Image source={require('../../assets/icons/landmark.png')} style = {{width : 20, height : 20}} />
          <Text style = {{marginLeft : 5}}>Strand Walking Street</Text>
        </View>
        <Text style = {{color : 'red',marginTop : 10}}>See All Nearby Landmarks</Text>
       </View>

        <View style = {{width : '85%', height : 1, marginHorizontal : 30, backgroundColor : 'gray'}} />

        <View style = {{padding : 20,marginHorizontal : 10}}>
          <Text style = {{fontSize : 18,fontWeight : 'bold'}}>Amenities</Text>

          <View  style = {{flexDirection : 'row',justifyContent : 'space-around',alignItems : 'center',marginTop : 5,height : 80}}>
          {
          amenitiesArr.map((item,index) => {
            return(
              <TouchableOpacity key={index} style = {{width : width / 3,padding : 10,}} >
                <Image source={item.amenitiesIcon} style = {{width : 25, height : 25}} />
                <Text style = {{fontSize : 14,marginTop : 5}}>{item.amenitiesTxt}</Text>
              </TouchableOpacity>   
            )
          })}
          </View>

        </View>

        <View style = {{width : '85%', height : 1, marginHorizontal : 30, backgroundColor : 'gray'}} />

        <View style = {{padding : 20,marginHorizontal : 10}}>
          <Text style = {{fontSize : 18, fontWeight : 'bold'}}>Service Guarantee</Text>

          <View style = {{flexDirection : 'row',justifyContent : 'space-around',alignItems : 'center',marginTop : 10,height : 80}}>
            {
              guaranteeArr.map((item,index) => {
                return(
                  <TouchableOpacity key={index} style = {{width : width / 6,padding : 6,justifyContent : 'center' }}>
                    <Image source={item.guaranteeImg} style = {{width : 25, height : 25}} />
                    <Text style = {{fontSize : 14,marginTop : 5}}>{item.guaranteeTxt}</Text>
                  </TouchableOpacity>
                )
              })
            }          
          </View>

        </View>
        <View style = {{width : '85%', height : 1, marginHorizontal : 30, backgroundColor : 'gray'}} />

        <View style = {{padding: 20,marginTop : 5,alignItems : 'flex-end'}}>
          <TouchableOpacity onPress={() => navigation.navigate("Book",{
            data : data
          })} style = {{backgroundColor : '#ADD8E6',alignItems : 'center',justifyContent : 'center',paddingVertical : 8,paddingHorizontal : 25,borderBottomEndRadius : 5,borderTopStartRadius : 5}}>
          <Text style ={{textAlign : 'center',fontSize : 18,fontWeight : 'bold',color : 'red'}}>Book Now</Text>
          </TouchableOpacity>
        </View>
      
        </View>
      </ScrollView>
      
    </SafeAreaView>
  )
}

export default HotelDetailScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: '#ADD8E6',
    //alignItems: 'center',
    //justifyContent: 'center',
  },
});
