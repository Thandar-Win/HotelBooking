import React from "react";
import {SafeAreaView,View,StyleSheet,Dimensions,TouchableOpacity,Image,Text} from 'react-native'
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import AccommodationScreen from "../screens/AccommodationScreen";
import HelpScreen from "../screens/HelpScreen";

const Tab = createMaterialTopTabNavigator()

const TopTabComponent = (navigation) => {
    return (
      <Tab.Navigator>
        <Tab.Screen name="Accommodation" component={AccommodationScreen} />
        <Tab.Screen name="Help" component={HelpScreen} />
      </Tab.Navigator>
    );
  }

export default TopTabComponent