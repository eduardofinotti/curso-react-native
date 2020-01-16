import React from 'react'
import { View, Button, Alert, ToastAndroid, Platform } from 'react-native'
import Padrao from '../estilo/Padrao'

export default props => {
    const notificar = msg => {
        if (Platform.OS === 'android'){
            ToastAndroid.show(msg, ToastAndroid.LONG)
        } else {
            Alert.alert('Informação', msg)
        }
    }
    return <View style={Padrao.esp}>
            <Button title='Plataforma?'
                onPress={() => notificar('Parabéns!')}></Button>
            </View>
}