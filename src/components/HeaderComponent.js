import React from "react";
import {View,Text,TouchableOpacity,Image,StyleSheet,Platform} from 'react-native'

const HeaderComponent = ({navigation,title,iconName,parentScreenName}) => {
    return(
        <View style = {styles.container}>
            { iconName == 'menu' ?
            <TouchableOpacity onPress={() => {navigation.toggleDrawer()}} >
             <Image source={require('../../assets/icons/menu.jpg')} style = {styles.imgStyle} />
            </TouchableOpacity>
            :
            <TouchableOpacity onPress={() => navigation.navigate(parentScreenName)}>
                <Image source={require('../../assets/icons/back_arrow.jpg')} style = {styles.imgStyle} />
            </TouchableOpacity>
            }
            <Text style = {styles.txtStyle}>{title}</Text>
        </View>
    )
}

export default HeaderComponent

const styles = StyleSheet.create({
    container : {
        flexDirection : 'row',
        alignItems : 'center',
        backgroundColor : 'white',
        height : 50,
        paddingHorizontal : 18,
        marginTop : Platform.OS == 'ios' ? 0 : 24
    },
    imgStyle : {
        width : 25, 
        height : 25,
        tintColor : '#aa2c88'
    },
    txtStyle : {
        marginLeft : 5,
        fontSize : 16,
        color : '#aa2c88'
    }

})