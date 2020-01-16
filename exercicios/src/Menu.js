import React, { Component } from 'react'
import { createDrawerNavigator } from 'react-navigation'

import Simples from './componentes/Simples'
import ParImpar from './componentes/ParImpar'
import Contador from './componentes/Contador'
import Plaformas from './componentes/Plataformas'
import ValidarProps from './componentes/ValidarProps'
import Evento from './componentes/Evento'
import { Avo } from './componentes/ComunicacaoDireta'
import { TextoSincronizado } from './componentes/ComunicacaoIndireta'
import ListaFlex from './componentes/ListaFlex'
import {Inverter, MegaSena, Finotti} from './componentes/Multi'
import Flex from './componentes/Flex'

export default createDrawerNavigator({
   
    Flex: {
        screen: Flex
    },

    ListaFlex: {
        screen: ListaFlex,
        navigationOptions: { title: 'Lista (Flex Box)'}
    },

    TextoSincronizado: {
        screen: TextoSincronizado,
        navigationOptions: { title: 'Texto Sincronizado'}
    },

    Avo: {
        screen: () => <Avo nome='Joao' sobrenome='Silva' />
    },

    Evento: {
        screen: Evento
    },

    ValidarProps: {
        screen: () => <ValidarProps ano={18} label='Finotti: ' />
    },

    Plaformas: {
        screen:  Plaformas
    },
    Contador: {
        screen: () => <Contador/>,
        navigationOptions: { title: 'Contador'}
    },
     MegaSena: {
        screen: () => <MegaSena numeros={8} />,
        navigationOptions: { title: 'Mega Sena'}
    },
    Inverter: {
        screen: () => <Inverter texto='React Nativo!' />,
    }, 
    ParImpar: {
        screen: () => <ParImpar numero={30} />,
        navigationOptions: { title: 'Par & Impar'}
    },
    Simples: {
        screen: () => <Simples textoDoFinotti='Eduardo Finotti' />,
    }
}, { drawerWidth: 300 })