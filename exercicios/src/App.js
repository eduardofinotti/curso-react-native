import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'

import Simples from './componentes/Simples'
import ParImpar from './componentes/ParImpar'
import {Inverter, MegaSena, Finotti} from './componentes/Multi'

export default class App extends Component {
  render(){
    return (
     <View style={styles.container}>
        <Simples textoDoFinotti='Flexivel!!!'/>
        <ParImpar numero={4}/>
        <Inverter texto='Rect Native!'/>
        <MegaSena numeros={9}/>

        <Finotti />

     </View> 
    )
  }
}

// export default function() {
//   return(
//     <View style={styles.container}>
//         <Text style={styles.f20}>App Função!</Text>
//      </View> 
//   )
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})