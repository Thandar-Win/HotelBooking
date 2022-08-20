import React,{useEffect} from 'react'
import {View,SafeAreaView,Text,Image,TouchableOpacity,FlatList} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import reviewAction from '../store/action/review'
import AsyncStorage from '@react-native-async-storage/async-storage'
import HeaderComponent from '../components/HeaderComponent'
import colors from '../constants/color'
import userNameAction from '../store/action/username'



const ReviewListScreen = ({navigation, route}) =>{
    
    const reviewList = useSelector(state => state.Review) 
    const userName = useSelector(state => state.UserName)    
    const dispatch = useDispatch()
    

     useEffect(() => {
        const getReviewList = async () => {
            let reviewData = await AsyncStorage.getItem('rev')
            let response = JSON.parse(reviewData)
            if(response == null){
                AsyncStorage.setItem('rev',JSON.stringify([]))
                dispatch(reviewAction.saveToReview([]))
            }else{
                AsyncStorage.setItem('rev',JSON.stringify(response))
                dispatch(reviewAction.saveToReview(response))
            }
        }

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

        getReviewList()
        getUserName()
     },[])

     
    return(
        <SafeAreaView style = {{flex : 1}}>
            <HeaderComponent navigation = {navigation} title = 'Review List' iconName = 'back' parentScreenName = 'Profile' />
            <View style = {{flex : 1,padding : 20,backgroundColor : colors.white,marginTop : 10,borderRadius : 10}}>           
            <FlatList
             data={reviewList}
             renderItem = {({item,index}) => {
                return(
                    <View  style = {{padding : 18,marginTop : 10,backgroundColor : colors.lightBlue,borderRadius : 10}}>

                        <View style = {{flexDirection : 'row',alignItems : 'center',justifyContent : 'space-between'}}>

                            <View>
                                <View style={{flexDirection : 'row',alignItems : 'center'}}>
                                    <Image source={require('../../assets/icons/girl.png')} style = {{width : 60,height : 60,borderRadius : 30}} />
                                    <Text style = {{marginLeft : 10,fontSize : 24,fontWeight : '700'}}>{userName}</Text>
                                </View>
                                
                                
                                <Text style = {{fontSize :18,justifyContent : 'center',marginTop : 10}}>{item.comment}</Text>

                                <Text style = {{fontSize :18,justifyContent : 'center',marginTop : 5,textAlign : 'center'}}>
                                    Rating : 
                                    <Image source={require('../../assets/icons/starImgFilled.png')} style={{width : 30,height: 30}}  />
                                    {item.rating}
                                </Text>
                                <Text style = {{fontSize :18,justifyContent : 'center',marginTop : 10}}>{item.showDate}</Text>
                            </View>
                            
                            <Image source={item.img} style = {{width : 150,height : 150,borderRadius : 20}} />
                            
                        </View>
                        
                    </View>
                )
             }}
             keyExtractor = {(item,index) => index.toString()}
             showsVerticalScrollIndicator = {false}
            />            
        </View>
        </SafeAreaView>
    )
}

export default ReviewListScreen