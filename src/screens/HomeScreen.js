import React,{useState,useEffect} from 'react'
import {SafeAreaView,View,Text,StyleSheet,TouchableOpacity,FlatList,Image,Dimensions,BackHandler} from 'react-native'
import {SearchBar} from 'react-native-elements'
import BottomTabComponent from '../components/BottomTabComponent'
import HeaderComponent from '../components/HeaderComponent'
import colors from '../constants/color'

const width = Dimensions.get('screen').width
const hotelList = [
  {
    _id : 0,
    img : require('../../assets/icons/attran_hotel.jpg'),
    name : 'ATTRAN HOTEL',
    town : 'Mawlamyine',
    dollor : '$70',
    location :'around 20 minutes walk of Kyeik Than Lan Pagoda,reasonable distance from Mon Culture Center Museum',
    lat : 16.499724,
    long : 97.619523,
    imgDetail : [
      {
        img1 : require('../../assets/icons/attran_room.jpg')
      }
    ]
  },
  {
    _id : 1,
    img : require('../../assets/icons/strand_hotel.jpg'),
    name : 'STRAND HOTEL',
    town : 'Mawlamyine',
    dollor : '$60',
    location :'Between Lower Main Road and Strand Road Phat Tan Quarter, Mawlamyine, Mon State',
    lat : 16.497377,
    long : 97.618694, 
    imgDetail : [
      {
        img1 : require('../../assets/icons/strand_room.jpg')
      }
    ]
  },
  {
    _id : 2,
    img : require('../../assets/icons/zwekabin_hotel.jpg'),
    name : 'ZWE KA BIN HOTEL',
    town : 'Hpa-an',
    dollor : '$50',
    location :'outskirts of Hpa-An,flanked by pretty limestone mountains and facing Mount Zwekabin',
    lat : 16.844151,
    long : 97.624495,
    imgDetail : [
      {
        img1 : require('../../assets/icons/zwekabin_room.jpg')
      }
    ]
  }
]

const  starIcon = [
  {
    starImg : require('../../assets/icons/star.png'),
  },
  {
    starImg : require('../../assets/icons/star.png'),
  },
  {
    starImg : require('../../assets/icons/star.png'),
  },
  {
    starImg : require('../../assets/icons/star.png'),
  },
  {
    starImg : require('../../assets/icons/star.png'),
  }
]



const HotelHomeScreen = ({navigation,route}) => {

  const [search, setSearch] = useState('')
  const [filterData,setFilterData] = useState([])
  const [isInSearch,setIsInSearch] = useState(true)
 
  const searchTextFunction = (text) => {
    if(text){
      const newData = hotelList.filter(item => {
        const itemData = item.name ? item.name.toLowerCase() : ''.toLowerCase()
        const textData = text.toLowerCase()
        return itemData.indexOf(textData) > -1
      })
      setIsInSearch(false)
      setSearch(text)
      setFilterData(newData)
      
    }else{
      setSearch(text)
      setFilterData([])
      setIsInSearch(true)
      
    }
  }

  useEffect(() => {
    const backAction = () => {
      return true
    }
  
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    )
    
    return () => backHandler.remove()
  
  },[route])

  return(
    <SafeAreaView style = {styles.context}>
      <HeaderComponent navigation = {navigation} title = 'Home' iconName = 'menu' />
      <View style = {{flex : 1,padding : 18}}>
      <View style={{marginTop : 10}}>
      <SearchBar
      placeholder="Type Here..."
      onChangeText={searchTextFunction}
      value={search}
      lightTheme
      inputContainerStyle = {{backgroundColor : colors.white}}
      containerStyle = {{backgroundColor : colors.white,borderRadius : 10}}
      round
      />
      </View>
      {isInSearch ?
        <FlatList
          data = {hotelList}
          renderItem = {({item,index}) => {
            return(
              <TouchableOpacity onPress={() => navigation.navigate('Detail',{
                data : item,
                //parentScreen : 'Home'
              })} 
              style = {{backgroundColor : colors.lightBlue,borderRadius : 10,marginTop : 15}}>

                <View style = {{width : width - 36,height : width/2 - 10,justifyContent : 'center',alignItems : 'center',borderTopLeftRadius : 10,borderTopRightRadius : 10}}>
                  <Image resizeMode='cover' source={item.img} style = {{width : '100%',height : '100%',borderTopLeftRadius : 10,borderTopRightRadius : 10}} />
                </View>

                <View style = {{flexDirection : 'row',justifyContent : 'space-between',padding : 20}}>
                <View >
                <Text style = {styles.hotelName} >{item.name}</Text>
                <View style = {styles.imgContainer}>
                  {
                  starIcon.map((item,index) => {
                    return(
                      <View key={index} style = {{width : 25,height : 25}}>
                        <Image source={item.starImg} style = {styles.starIcon} />
                     </View>
                    )
                  })
                  } 
                  <Text style = {{marginLeft : 5,color : 'gray'}}>(5.0)</Text>
                </View>
                <View style = {{flexDirection : 'row',alignItems : 'center',marginTop : 10}}>
                  <Image style = {{width : 15, height : 15,tintColor : 'gray'}} source = {require('../../assets/icons/map.png')} />
                  <Text style = {{marginLeft : 5,color : 'gray'}}>{item.town}</Text>
                </View>
                </View>
                <View>
                  <Text style={{marginTop : 10,textAlign : 'center',fontSize : 24,color : 'pink'}}>{item.dollor}</Text>
                  <Text style = {{textAlign : 'center',marginTop : 5,color : 'gray'}}>per night</Text>
                </View>
                </View>
              </TouchableOpacity>
            )
          }}
          keyExtractor = {(item,index) => index.toString()}
          showsVerticalScrollIndicator = {false}
        />
        
        :
        <FlatList
                    data = {filterData}
                    renderItem = {({item,index}) => {
                        return(
                            <TouchableOpacity onPress={() => navigation.navigate('Detail',{
                              data : item,
                              parentScreen : 'Home'
                            }) } style = {{padding : 16,flexDirection : 'row',backgroundColor : 'white',borderRadius : 10,marginTop : 10}}>
                                <View style = {{width : width/4+10,height : width/4+10,justifyContent : 'center',alignItems : 'center'}}>
                                <Image source={item.img} style= {{width : '100%',height : '100%',borderRadius : 10}} />
                                    
                                </View>
                                

                                <View style = {{flex : 1, marginLeft : 10}}>
                                    <Text style={{fontSize : 16,fontWeight : '100'}}>{item.name} </Text>
                                    <Text style= {{fontSize : 14,marginTop : 5}}>{item.town} </Text>
                                </View>
                            </TouchableOpacity>
                        )
                    }} 
                    keyExtractor = {(item,index) => index.toString()}
                    showsVerticalScrollIndicator = {false}
                />
      }

      {
        filterData.length == 0 && 
        <View style = {{flex : 1,alignItems : 'center'}}>
          <Text style ={{fontSize : 23,fontWeight : 'bold'}}>There is no found your hotel.</Text>
        </View>
      }
       
      </View>
      
      <BottomTabComponent navigation={navigation} screenName = 'Home' />
    </SafeAreaView>
  )
}

export default HotelHomeScreen

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
    fontSize : 12,
    //marginTop : 10,
    fontWeight :'bold'
  },
  imgContainer : {
    flexDirection : 'row',
    alignItems : 'center',
    marginTop : 10,
    justifyContent : 'space-between'
  },
  starIcon : {
    width : 20,
    height : 20,
    //tintColor : '#aa2c88',
    
  }
});
