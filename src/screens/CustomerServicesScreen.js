import React from 'react'
import {View,SafeAreaView,Text,TouchableOpacity, ScrollView} from 'react-native'
import HeaderComponent from '../components/HeaderComponent'
import TopTabComponent from '../components/TopTabComponent'
import colors from '../constants/color'

const CustomerServicesScreen = ({navigation,route}) => {
    return(
        <SafeAreaView style = {{flex : 1,}}>
            <HeaderComponent navigation={navigation} title = 'Help Centre' iconName='back' parentScreenName='Profile'  />
            
            <View style = {{flex : 1,}}>
                <View style = {{padding : 20,marginTop : 20,margin : 10,borderRadius : 10,justifyContent : 'center'}}>
                    <Text style = {{fontSize : 20,fontWeight : 'bold'}} >Welcome to the Help Centre</Text>
                    <Text style = {{marginTop : 10,fontSize : 14,}}>We're available 24 hours a day</Text>
                </View>

                <View style = {{backgroundColor : colors.white,justifyContent : 'center',padding : 20,marginTop : 10}}>
                    <Text style = {{fontSize : 20,fontWeight : 'bold'}} >Frequently asked questions</Text>
                </View>
                <TopTabComponent navigation={navigation} />
            </View>
                    
        </SafeAreaView>
    )
}

export default CustomerServicesScreen