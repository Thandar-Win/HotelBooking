import React,{useEffect} from "react";
import {View,Text,TouchableOpacity,SafeAreaView,FlatList,Image,Dimensions} from 'react-native'
import HeaderComponent from "../components/HeaderComponent";
import {useSelector,useDispatch} from 'react-redux'
import AsyncStorage from "@react-native-async-storage/async-storage";
import wishListAction from '../store/action/wishlist'
import wListQtyAction from '../store/action/wListQty'
import colors from "../constants/color";
import BottomTabComponent from "../components/BottomTabComponent";

const width = Dimensions.get('screen').width


const WishListScreen = ({navigation,route}) => {
   const hotel = useSelector(state => state.WishList)
   const wishListQty = useSelector(state => state.WListQty)
   const dispatch = useDispatch()

   useEffect(() => {
    async function getWishListProducts() {
        let wishListData = await AsyncStorage.getItem('wishlist')
        let prods = JSON.parse(wishListData)
       // console.log('route data is', prods)

        if (prods == null) {
            AsyncStorage.setItem('wishlist', JSON.stringify([]))
            dispatch(wishListAction.saveToFavour([]))
        } else {
            AsyncStorage.setItem('wishlist', JSON.stringify(prods))
            dispatch(wishListAction.saveToFavour(prods))
        }
    }

    getWishListProducts()
}, [route])

const removeWishListItem = (item) => {
    AsyncStorage.getItem('wishlist').then((data) => {
        let wishlistData = JSON.parse(data)
        let leftWishList = [];
        if (wishlistData != null) {
            leftWishList = wishlistData.filter(prod => prod._id != item._id)
        }
        dispatch(wishListAction.saveToFavour(leftWishList))
        AsyncStorage.setItem('wishlist', JSON.stringify(leftWishList))

        AsyncStorage.setItem('favourQty', JSON.stringify(wishListQty - 1))
        dispatch(wListQtyAction.setFavorQty(wishListQty - 1))

        
    })
}
    return(
        <SafeAreaView style = {{flex : 1}} >
            <HeaderComponent navigation = {navigation} title = 'Favourite Hotels' iconName = 'back' parentScreenName='Home' />
            {hotel?.length > 0 ? <View style = {{flex : 1,padding : 18}}>
                {hotel?.length > 0 && <View style = {{alignItems : 'flex-end'}}>
                    <TouchableOpacity onPress={() => {
                        AsyncStorage.removeItem('wishlist')
                        dispatch(wishListAction.saveToFavour([]))
                        
                        AsyncStorage.removeItem('favourQty')
                        dispatch(wListQtyAction.setFavorQty(0))
              
                    }}>
                    <Text style = {{fontWeight : 'bold',fontSize : 20,color : colors.green}}>Delete All</Text>
                    </TouchableOpacity>
                </View>}
                <FlatList
                    data = {hotel}
                    renderItem = {({item,index}) => {
                        return(
                            <View style = {{padding : 16,flexDirection : 'row',backgroundColor : 'white',borderRadius : 10,marginTop : 10}}>
                                <View style = {{width : width/4+10,height : width/4+10,justifyContent : 'center',alignItems : 'center'}}>
                                <Image source={item.img} style= {{width : '100%',height : '100%',borderRadius : 10}} />
                                    <TouchableOpacity onPress={() => removeWishListItem(item)} style= {{position : 'absolute',top : 0,right : 0}}>
                                        <Image source={require('../../assets/icons/delete.png')} style = {{width : 25,height : 25,tintColor : 'black'}} />
                                    </TouchableOpacity>
                                </View>
                                

                                <View style = {{flex : 1, marginLeft : 10}}>
                                    <Text style={{fontSize : 16,fontWeight : '100'}}>{item.name} </Text>
                                    <Text style= {{fontSize : 14,marginTop : 5}}>{item.town} </Text>
                                </View>
                            </View>
                        )
                    }} 
                    keyExtractor = {(item,index) => index.toString()}
                    showsVerticalScrollIndicator = {false}
                />
               
            </View>
            :
            <View style = {{flex : 1, justifyContent : 'center',alignItems : 'center'}}>
                <Text>There is no wish list data!</Text>
            </View>
            }
            <BottomTabComponent navigation={navigation} screenName ='WList' />
        </SafeAreaView>
    )
}

export default WishListScreen