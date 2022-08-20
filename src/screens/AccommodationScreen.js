import React from "react";
import {SafeAreaView,View,Text,TouchableOpacity,Image, ScrollView} from 'react-native'
import colors from "../constants/color";

const AccommonArr = [
    {   
        name : 'Coronavirus-related support',
        img : require('../../assets/icons/chevron_right.png'),
        AccommoDetail : [
            {
                txt1 : 'Hello',
                txt2 : 'Hi'
            }
        ]
    },
    {
        name : 'Cancellations',
        img : require('../../assets/icons/chevron_right.png'),
        AccommoDetail : [
            {
                txt1 : 'Ma',
                //txt2 : 'Mg'
            }
        ]
    },
    {
        name : 'Payment',
        img : require('../../assets/icons/chevron_right.png')
    },
    {
        name : 'Booking details',
        img : require('../../assets/icons/chevron_right.png')
    },
    {
        name : 'Room types',
        img : require('../../assets/icons/chevron_right.png')
    },
    {
        name : 'Pricing',
        img : require('../../assets/icons/chevron_right.png')
    },
    {
        name : 'Credit cards',
        img : require('../../assets/icons/chevron_right.png')
    },
    {
        name : 'Property policies',
        img : require('../../assets/icons/chevron_right.png')
    },
    {
        name : 'Extra facilities',
        img : require('../../assets/icons/chevron_right.png')
    },
    {
        name : 'Security and awareness',
        img : require('../../assets/icons/chevron_right.png')
    }
]

const AccommodationScreen = ({navigation,route}) => {
    return(
        <SafeAreaView style = {{flex : 1,margin : 10}}>
           {
                AccommonArr.map((item,index) => {
                    return(
                        <View key={index}>
                            <TouchableOpacity 
                            onPress={() => navigation.navigate('Coronavirus',{
                                txtDetail : item
                            })} 
                            style = {{flexDirection : 'row', justifyContent : 'space-between',
                            alignItems : 'center',paddingLeft : 5,paddingVertical : 10}}>

                                <Text style = {{flex : 1,fontSize : 14}}>{item.name}</Text>
                                <Image source={item.img} style = {{width : 20,height : 20}} />
                                
                            </TouchableOpacity>
                            <View style = {{marginLeft : 5,height : 1,backgroundColor : colors.lightBlue}} />
                        </View>
                    )
                })
            }
           
        </SafeAreaView>
    )
}

export default AccommodationScreen