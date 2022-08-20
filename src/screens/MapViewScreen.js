import React from 'react'
import {SafeAreaView,View,Text,TouchableOpacity,StyleSheet,Dimensions} from 'react-native'
import MapView,{PROVIDER_GOOGLE} from 'react-native-maps'
import HeaderComponent from '../components/HeaderComponent'

const width = Dimensions.get('screen').width
const height = Dimensions.get('screen').height
const MapViewScreen = ({navigation,route}) => {
  const {lat, long} = route.params
    return(
        <View style={styles.container}>
            <HeaderComponent navigation={navigation} title = 'Map' iconName = 'menu' parentScreenName='Home'/>
            <MapView
                provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                style={styles.map}
                region={{
                latitude: lat,
                longitude: long,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
                }}
     >
     </MapView>
   </View>
    )
}

export default MapViewScreen

const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      height: height,
      width: width,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },
   });