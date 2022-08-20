import React from "react";
import {View,Text,Image} from 'react-native'

const CoronavirusScreen = ({navigation,route}) => {
    const {txtDetail} = route.params
    console.log("Text Detail is", txtDetail)
    return(
        <View style = {{flex : 1,justifyContent : 'center',alignItems : 'center'}}>
            {
            txtDetail.AccommoDetail.map((item,index) => {
                return(
                    <View key={index}>
                        <Text>{item.txt1}</Text>
                        <Text>{item.txt2}</Text>
                    </View>
                )
            })
            }
        </View>
    )
}

export default CoronavirusScreen