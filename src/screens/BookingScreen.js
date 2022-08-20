import React,{useState} from 'react'
import {View,Text,Button,Platform, TouchableOpacity,Image,SafeAreaView,TextInput,ScrollView,ToastAndroid} from 'react-native'
import PhoneInput from 'react-native-phone-number-input'
import {Picker} from '@react-native-picker/picker'
import DateTimePicker from '@react-native-community/datetimepicker'
import HeaderComponent from '../components/HeaderComponent'
import colors from '../constants/color'
import BottomTabComponent from '../components/BottomTabComponent'
import AsyncStorage from '@react-native-async-storage/async-storage'
import bookingAction from '../store/action/booking'
import qtyAction from '../store/action/qty'
import {useDispatch} from 'react-redux'
import qty from '../store/action/qty'

const BookingScreen = ({navigation,route}) => {
 
  const [gender,setGender] = useState('Mr')
  const [genderType] = useState([
    'Mr',
    'Mrs'
  ].sort())
  
  

  const [checkInDate,setCheckInDate] = useState(new Date())
  const [checkOutDate,setCheckOutDate] = useState(new Date())

  const [checkInMode,setCheckInMode] = useState('checkindate')
  const [checkOutMode,setCheckOutMode] = useState('checkoutdate')

  const [checkInShow,setCheckInShow] = useState(false)
  const [checkOutShow,setCheckOutShow] = useState(false)

  const [checkInText,setCheckInText] = useState('')
  const[checkOutText,setCheckOutText] = useState('')

  const [firstName,setFirstName] = useState('')
  const [lastName,setLastName] = useState('')
  const [email,setEmail] = useState('')
  const [emailVaildError,setEmailVaildError] =useState('')
  const [phone,setPhone] = useState('')

  const [isFocusedFirstName,setIsFocusedFirstName] = useState(false)
  const [isFocusedLastName,setIsFocusedLastName] = useState(false)
  const [isFocusedEmail,setIsFocusedEmail] = useState(false)
  const [isFocusedPhone,setIsFocusedPhone] = useState(false)
  const [isFocusedCheckInText,setIsFocusedCheckInText] = useState(false)
  const [isFocusedCheckOutText,setIsFocusedCheckOutText] = useState(false)

  const [roomCount,setRoomCount] = useState(1)
  const [guestCount,setGuestCount] = useState(1)
  const [childCount,setChildCount] = useState(0)

  const {data} = route.params
  //console.log("Route Data is" , data)
  const dispatch = useDispatch()

  const onChangeCheckIn = (event, selectedDate) => {
    
    setCheckInShow(false)
    if(selectedDate){
    const currentDate = selectedDate || checkInDate ;
    setCheckInShow(Platform.OS === 'ios')
    setCheckInDate(currentDate)

    let tempDate = new Date(currentDate)
    let checkInfDate = tempDate.getDate() + '/' +(tempDate.getMonth() + 1) + '/' + tempDate.getFullYear()
    
    setCheckInText(checkInfDate )
   
    }else{
      setCheckInText('')
      setIsFocusedCheckInText(false)
    }
 
  } 

  

  const onChangeCheckOut = (event, selectedDate) => {
    setCheckOutShow(false)
    if(selectedDate){
    const currentDate = selectedDate || checkOutDate ;
    setCheckOutShow(Platform.OS === 'ios')
    setCheckOutDate(currentDate)

    let tempDate = new Date(currentDate)
    let checkOutfDate = tempDate.getDate() + '/' +(tempDate.getMonth() + 1) + '/' + tempDate.getFullYear()
 
    setCheckOutText(checkOutfDate )
    }else{
      setCheckOutText('')
      setIsFocusedCheckOutText(false)
    }
    
  }

  const showCheckInMode = (currentMode) => {
    setCheckInShow(true)
    setCheckInMode(currentMode)

  }

  const showCheckOutMode = (currentMode) => {
    setCheckOutShow(true)
    setCheckOutMode(currentMode)

  }
//  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/
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

  const minusRooms = () => {
    if (roomCount > 1) {
      setRoomCount(roomCount - 1)
    }
  }

  const plusRooms = () => {
    setRoomCount(roomCount + 1)
  }

  const minusGuests = () => {
    if (guestCount > 1) {
      setGuestCount(guestCount - 1)
    }
  }

  const plusGuests = () => {
    setGuestCount(guestCount + 1)
  }

  const minusChild = () => {
    if (childCount >= 1) {
      setChildCount(childCount - 1)
    }
  }

  const plusChild = () => {
    setChildCount(childCount + 1)
  }


  const addToBooking = (data) =>{

      
      data.roomCount = roomCount
      data.guestCount = guestCount
      data.childCount = childCount

      data.firstName = firstName
      data.lastName = lastName

      data.checkInText = checkInText
      data.checkOutText = checkOutText

      data.gender = gender

      data.email = email
      data.phone = phone

      data.qty = 1
      data.numOfFilter = 1

      AsyncStorage.getItem('user').then((res) => {
       // console.log("user Data from Async.." , res)
        let userData = JSON.parse(res)
        let usersData = []

        if(userData == null){
          usersData.push(data)
          AsyncStorage.setItem('user',JSON.stringify(usersData))
          dispatch(bookingAction.saveToBooking(usersData))
          AsyncStorage.setItem('bookQty',JSON.stringify(1))
          dispatch(qtyAction.setTotalQty(1))
        } else {
          
          let totQty = data.qty
          
          for (let i = 0; i < userData.length; i++) {
            totQty += userData[i].qty
            
          } 

          userData.unshift(data)
          
          for (let i = 0; i < userData.length; i++) {
            data.numOfFilter += userData[i].numOfFilter
            
          }

          
          AsyncStorage.setItem('user',JSON.stringify(userData))
          dispatch(bookingAction.saveToBooking(userData))
          AsyncStorage.setItem('bookQty',JSON.stringify(totQty))
          dispatch(qtyAction.setTotalQty(totQty))
        
        }
      })
  }

  const clearData = () => {
    setRoomCount(1)
    setGuestCount(1)
    setChildCount (0)

    setFirstName('')
    setLastName('')

    setCheckInText('')
    setCheckOutText('')

    setCheckInDate(new Date())
    setCheckOutDate(new Date())

    setGender('Mr')

    setEmail('')
    setPhone('')
  }

  const onPressEventHandler = () => {
    if(firstName == '' || lastName == '' || email == '' || phone == '' || checkInText == '' || checkOutText == '' || emailVaildError != 'Valid email address' ){
      showUnsuccessToast()
      clearData()
    }else{ 
      addToBooking(data)
      showSuccessToast()
      clearData()
    }  
  }

  const showSuccessToast = () =>{
    ToastAndroid.showWithGravityAndOffset(
      "Your Booking is confirmed",
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50
    )
  }

  const showUnsuccessToast = () => {
    ToastAndroid.showWithGravityAndOffset(
      "You fail and try next time",
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50
    )
  }

  const showCheckOutUnSuccessToast = () => {
    ToastAndroid.showWithGravityAndOffset(
      "Please Chenck In Date and try again",
      ToastAndroid.LONG,
      ToastAndroid.CENTER,
      25,
      50
    )
  }

  const filledCheckInDate = () =>{
    if(checkInText == ''){
      showCheckOutUnSuccessToast()
    }else{
      showCheckOutMode('date')
      setIsFocusedCheckOutText(true)
    }
   }
   

  return(
    <SafeAreaView style = {{flex : 1}}>
      <HeaderComponent navigation={navigation} title = 'Booking' iconName = 'back' parentScreenName= 'Detail' />
    <ScrollView showsVerticalScrollIndicator = {false}>
      <View style = {{flex: 1, backgroundColor : colors.lightBlue,padding : 18}}>
        <Text style = {{fontSize : 20,fontWeight : 'bold',color : colors.green400 }}>I'm booking for </Text>
      
        <Picker
        style = {{marginTop : 10,fontSize : 16,fontWeight : 'bold', width : '30%'}}
        selectedValue = {gender}
        onValueChange = {(itemVal) => {
          setGender(itemVal)
        }}
        >
          {
            genderType.map((name,index) => (
              <Picker.Item label = {name} value = {name} key = {index}   />  
             ))
          }
        </Picker>
      
        
        <View style = {{flexDirection : 'row',justifyContent : 'space-between',alignItems : 'center'}} >
         <TextInput 
            style={{padding : 10,width: "40%",borderColor : isFocusedFirstName ? colors.green400 : colors.red900,borderBottomWidth : 1}}
            value = {firstName}
            placeholder = 'First Name'
            onChangeText={text => setFirstName(text)}

            autoComplete = {false}
            onFocus = {() => {setIsFocusedFirstName(true)} }
            onBlur = {() => {
              setIsFocusedFirstName(false)
              {firstName != '' && setIsFocusedFirstName(true)}
            }}
          />

          <TextInput 
            style={{padding : 10,width: "40%",borderColor : isFocusedLastName ? colors.green400 : colors.red900,borderBottomWidth : 1}}
            value = {lastName}
            placeholder = 'Last Name'
            onChangeText={text => setLastName(text)}
            autoComplete = {false}
            onFocus = {() => {setIsFocusedLastName(true)} }
            onBlur = {() => {
              setIsFocusedLastName(false)
              {lastName != '' && setIsFocusedLastName(true)}
            }}
          />
          
        </View>
        
       <View style = {{flexDirection : 'row', alignItems : 'center',justifyContent :'space-between',borderBottomWidth : 1,borderColor : isFocusedEmail ? colors.green400 : colors.red900,}}>
        <TextInput 
        style={{
          padding : 10,
          fontSize : 16,
          color : emailVaildError == 'Valid email address' ? colors.green : colors.red900
        }}
        value = {email}
        placeholder = 'example@gmail.com'
        onChangeText={text => {
          setEmail(text);
          handleValidEmail(text)
        }}
        autoCapitalize = "none"
        autoCorrect = {false}
        keyboardType = 'email-address'
        autoComplete = {false}
        onFocus = {() => {setIsFocusedEmail(true)}}
        onBlur = {() => {
          setIsFocusedEmail(false)
          {email != '' && setIsFocusedEmail(true)}
        } }
        />
        {
         emailVaildError == 'Valid email address'  ?

         <Image style = {{width : 20,height : 20,tintColor : colors.green}} source={require('../../assets/icons/correct.png')} />
        
        :

        isFocusedEmail && emailVaildError ?

        <TouchableOpacity onPress={() => setEmail('')}>
          <Image style = {{width : 20,height : 20,tintColor : colors.red900}} source={require('../../assets/icons/mail_error.png')} />
        </TouchableOpacity>       
        
        :

        null
        }

        
        </View>
        
         
            <Text style = {{color : emailVaildError == 'Valid email address'? colors.green : colors.red900,marginTop : 5,fontSize : 16,padding : 10}}>{emailVaildError}</Text>
            

        <View style = {{flexDirection : 'row',alignItems : 'center'}}>
        
        <PhoneInput
         defaultCode='IN'
         layout='first'
         withDarkTheme
         withShadow
         
        />
        <TextInput 
        style={{borderColor : isFocusedPhone  ? colors.green400 : colors.red900,borderBottomWidth : 1,padding : 10,width  :'50%',fontSize : 16}}
        value = {phone}
        placeholder = 'Phone Number'
        onChangeText={text => setPhone(text)}
        keyboardType = 'phone-pad'

        autoComplete = {false}
        onFocus = {() => {setIsFocusedPhone(true)}}
        onBlur = {() => {
          setIsFocusedPhone(false)
          {phone != '' && setIsFocusedPhone(true)}
        }}
        />
        </View>
          
      <Text style = {{marginBottom : 15,marginTop : 10,fontSize : 16,fontWeight : 'bold',color : colors.green400}}>Select Check-in and Check-out Date</Text>
      <View style = {{flexDirection : 'row',justifyContent : 'space-around',alignItems : 'center'}}>       
      <TextInput
      style={{backgroundColor : colors.white,padding : 10,width: "50%",borderColor : isFocusedCheckInText    ? colors.green400 : colors.red900,borderWidth : 1,borderRadius : 10}}
      value={checkInText}
      placeholder = 'Check-in date'
      onChangeText={text => setCheckInText(text)}
      autoComplete = {false}
      editable = {false}
      selectTextOnFocus = {false}
      />
      <TouchableOpacity  onPress={() => {showCheckInMode('date'),setIsFocusedCheckInText(true)} }  style = {{margin : 20}} >
        <Image style = {{width : 30, height : 30,tintColor : colors.lightBlueA400}} source = {require('../../assets/icons/calendar.png')} />
      </TouchableOpacity>
      </View>
      {
        checkInShow && 
        <DateTimePicker 
        testID = 'dateTimePicker'
        value = {checkInDate}
        mode = {checkInMode}
        //is24Hour = {true}
        display = 'default'
        onChange = {onChangeCheckIn}
        minimumDate = {new Date()}
        />
      }

      <View style = {{flexDirection : 'row',justifyContent : 'space-around',alignItems : 'center'}}>    
      <TextInput
      style={{backgroundColor : colors.white,padding : 10,width: "50%",borderColor : isFocusedCheckOutText ? colors.green400 : colors.red900,borderWidth : 1,borderRadius : 10}}
      value={checkOutText}
      placeholder = 'Check-out date'
      onChangeText={text => setCheckOutText(text)}
      autoComplete = {false}
      editable = {false}
      selectTextOnFocus = {false}
      />
      <TouchableOpacity style = {{margin : 20 }} onPress={() => {filledCheckInDate()}}>
      <Image style = {{width : 30, height : 30,tintColor : colors.lightBlueA400}} source = {require('../../assets/icons/calendar.png')} />
      </TouchableOpacity>
      </View>

      {
        checkOutShow && 
        <DateTimePicker 
        testID = 'dateTimePicker'
        value = {checkOutDate}
        mode = {checkOutMode}
        //is24Hour = {true}
        display = 'default'
        onChange = {onChangeCheckOut}
        minimumDate = {checkInDate}
        />
      }

      <Text style = {{marginBottom : 15,fontSize : 16,fontWeight : 'bold',color : colors.green400}}>Select Rooms and Guests</Text>
         
              <View style = {{flexDirection : 'row',justifyContent : 'space-between',marginHorizontal : 20,paddingHorizontal : 20}}>
                <Text style = {{flex : 1,fontSize : 16,color : colors.green400,fontWeight : 'bold'}}>Rooms</Text>
                <View style = {{flexDirection : 'row',alignItems :'center'}}>

                <TouchableOpacity onPress={() => minusRooms()}>
                  <Image source={require('../../assets/icons/negative.png')} style = {{width : 30,height : 30,tintColor : colors.lightBlueA400}} />
                </TouchableOpacity>

                <Text style = {{marginHorizontal : 10,textAlign : 'center',fontWeight : 'bold', fontSize : 16 }}>{roomCount}</Text>

                <TouchableOpacity onPress={() => plusRooms()} >
                  <Image source={require('../../assets/icons/positive.png')} style = {{width : 30,height : 30,tintColor : colors.lightBlueA400}} />  
                </TouchableOpacity>

              </View>
              </View>
              <View style = {{height : 1,backgroundColor : colors.green400,marginVertical : 10,margin : 35 }} />

              <View style = {{flexDirection : 'row',justifyContent : 'space-between',marginHorizontal : 20,paddingHorizontal : 20}}>
                <Text style = {{flex : 1,fontSize : 16,color : colors.green400,fontWeight : 'bold'}}>Guests</Text>
                <View style = {{flexDirection : 'row',alignItems :'center'}}>

                <TouchableOpacity onPress={() => minusGuests()} >
                  <Image source={require('../../assets/icons/negative.png')} style = {{width : 30,height : 30,tintColor : colors.lightBlueA400}} />
                </TouchableOpacity>

                <Text style = {{marginHorizontal : 10,textAlign : 'center',fontWeight : 'bold', fontSize : 16 }}> {guestCount}</Text>
          
        
                <TouchableOpacity onPress={() => plusGuests()}>
                  <Image source={require('../../assets/icons/positive.png')} style = {{width : 30,height : 30,tintColor : colors.lightBlueA400}} />  
                </TouchableOpacity>

              </View>
              </View>
              <View style = {{height : 1,backgroundColor : colors.green400,marginVertical : 10,margin : 35 }} />

              <View style = {{flexDirection : 'row',justifyContent : 'space-between',marginHorizontal : 20,paddingHorizontal : 20}}>
                <Text style = {{flex : 1,fontSize : 16,color : colors.green400,fontWeight : 'bold'}}>Child(ren)</Text>
                <View style = {{flexDirection : 'row',alignItems :'center'}}>

                <TouchableOpacity onPress={() => minusChild() }>
                  <Image source={require('../../assets/icons/negative.png')} style = {{width : 30,height : 30,tintColor : colors.lightBlueA400}} />
                </TouchableOpacity>

                <Text style = {{marginHorizontal : 10,textAlign : 'center',fontWeight : 'bold', fontSize : 16 }}>{childCount}</Text>

                <TouchableOpacity onPress={() => plusChild() }>
                  <Image source={require('../../assets/icons/positive.png')} style = {{width : 30,height : 30,tintColor : colors.lightBlueA400}} />  
                </TouchableOpacity>

              </View>
              </View>
              <View style = {{height : 1,backgroundColor : colors.green400,marginVertical : 10,margin : 35 }} /> 
         
              <TouchableOpacity onPress={() => {onPressEventHandler()}}   style = {{backgroundColor : colors.white,paddingVertical : 10,borderRadius : 10,marginHorizontal : 40}}>
                <Text style = {{textAlign : 'center',fontSize : 16,fontWeight : 'bold',color : colors.green400}}>Confirm Booking</Text>
              </TouchableOpacity>
      </View>
        </ScrollView>
      <BottomTabComponent navigation={navigation} screenName = 'BookList' />
    </SafeAreaView>
  )
}
export default BookingScreen

