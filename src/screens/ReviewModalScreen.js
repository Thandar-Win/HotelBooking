import React,{useState} from "react";
import {SafeAreaView,View,Modal,Text,TouchableOpacity, TextInput,Dimensions,Image} from 'react-native'
import colors from "../constants/color";
import AsyncStorage from '@react-native-async-storage/async-storage'
import reviewAction from  '../store/action/review'
import {useDispatch,useSelector} from 'react-redux'
import HeaderComponent from "../components/HeaderComponent";
import {Rating} from 'react-native-elements'

const width = Dimensions.get('screen').width
const ReviewModalScreen = ({navigation,route}) =>{

const [comment, setComment] =useState('')

const [rating,setRating] = useState('')

const [showDate,setShowDate] = useState('')

const starImgFilled = require('../../assets/icons/starImgFilled.png')


const dispatch = useDispatch()


const {reviewHotel} = route.params



const saveToReviewModal = (reviewHotel) =>{
  
  let curDate = new Date()
  let fDate = curDate.getDate() + '/' +(curDate.getMonth() + 1) + '/' + curDate.getFullYear()
  setShowDate(fDate)


  reviewHotel.comment = comment
  reviewHotel.rating = rating
  reviewHotel.showDate = showDate

  AsyncStorage.getItem('rev').then((res) => {
    console.log('review data from async', res)
    let reviewData = JSON.parse(res)
    let reviewmodal = []
    if(reviewData == null){
      reviewmodal.push(reviewHotel)
      AsyncStorage.setItem('rev',JSON.stringify(reviewmodal))
      dispatch(reviewAction.saveToReview(reviewmodal))
    }else{
      reviewData.unshift(reviewHotel)
      AsyncStorage.setItem('rev',JSON.stringify(reviewData))
      dispatch(reviewAction.saveToReview(reviewData))
    }
  })
  setComment('')
  setRating('')
}

return(
       <View style = {{flex:1, backgroundColor:'rgba(0,0,0,0.8)',alignItems:'center',justifyContent:'center'}}>
          
          <View style = {{backgroundColor : colors.white,padding : 10,justifyContent : 'center',alignItems : 'center',borderRadius : 10,top :10,borderWidth : 1,elevation : 10,shadowColor : colors.lightBlueA400,shadowRadius : 10,borderColor : colors.red900}}>
            <Text style = {{textAlign : 'center', fontSize : 23}}>Please Rate Us!!</Text>        
          </View>

        <View style={{ width: '70%', borderRadius: 10, padding: 10, backgroundColor: colors.white, justifyContent: 'center', alignItems: 'center' }}>
        <Rating

          showRating 

          fractions = {1}
          startingValue = {0}
          ratingImage={starImgFilled}
          ratingCount={5}
          imageSize={30}

          onFinishRating = {(value) => setRating(value)}

          style={{ paddingVertical: 10 }}

        />
        
         <View style = {{borderWidth : 1,borderColor : colors.lightBlue,borderRadius : 10,height : width/2,padding : 20,marginTop : 10,width : "100%"}}>
         <TextInput
         placeholder="Write a comment"
         value={comment}
         onChangeText = {text => setComment(text) }
         multiline = {true}
         
         />   
         </View>
        <View style={{width : '100%',justifyContent : 'space-between',flexDirection : 'row',marginTop : 10}}>
        <TouchableOpacity onPress={() => {navigation.navigate('BookList')}} style = {{justifyContent  : 'center',alignItems : 'center',width : '40%',backgroundColor : colors.lightBlue,padding :10,borderRadius : 10}}>
          <Text>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {navigation.navigate('BookList'),saveToReviewModal(reviewHotel)}} style = {{justifyContent  : 'center',alignItems : 'center',width : '40%',backgroundColor : colors.lightBlue,padding :10,borderRadius : 10}}>
          <Text>Ok</Text>
        </TouchableOpacity>
        </View>
        </View>
        </View>
       
    
)
}

export default ReviewModalScreen