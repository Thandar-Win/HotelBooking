import React from 'react'
import { StyleSheet, Text, View ,TouchableOpacity,Modal} from 'react-native'
import colors from '../constants/color'
import { auth } from '../firebase/firebase-config'
import signCountAction from '../store/action/signcount'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch } from 'react-redux'

const ModalComponent = ({cancelHandler,visible,navigation}) => {
    const dispatch = useDispatch()

    const signOutHandler = () =>{
        auth
        .signOut()
        .then(() =>{

            AsyncStorage.removeItem('srcCount')
            dispatch(signCountAction.setCountScreen(0))
            
            navigation.replace('SignIn')
        })       
    }
  return (
        <Modal animationType = 'none' transparent = {true} visible = {visible}>
            <View style ={{flex : 1,justifyContent : 'center', alignItems : 'center', backgroundColor : 'rgba(0,0,0,0.6)'}}>
                <View style = {{backgroundColor : 'white',padding : 20,width : '90%', borderRadius : 10}}>
                    <Text style={{fontWeight : 'bold',color : colors.lightBlue,textAlign : 'center',fontSize : 20}}>Please Come Back Soon!</Text>
                    <Text style={{marginTop : 8,fontSize : 16,color : 'gray',textAlign : 'center'}}>Are you sure want to exit?</Text>

                    <View style={{marginTop : 20,flexDirection : 'row', justifyContent : 'space-between',width : '100%'}}>
                        <TouchableOpacity onPress={ () => signOutHandler()}  style={{borderRadius : 10,backgroundColor : colors.lightBlue,justifyContent :'center',alignItems : 'center',width  :'45%'}}>
                            <Text style={{color : 'white',fontSize : 16,fontWeight:'bold'}}>Yes</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress = {() => cancelHandler()} style={{borderRadius : 10,backgroundColor : colors.lightBlue,justifyContent :'center',alignItems : 'center',width  :'45%'}}>
                            <Text style={{color : 'white',fontSize : 16,fontWeight:'bold'}}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
  )
}

export default ModalComponent

const styles = StyleSheet.create({})