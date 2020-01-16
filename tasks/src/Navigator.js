import React from 'react'
import { createAppContainer} from 'react-navigation'
import { createDrawerNavigator } from 'react-navigation-drawer'
import {createStackNavigator} from 'react-navigation-stack'
import Agenda from './screens/Agenda'
import Auth from './screens/Auth'
import commonsStyles from './commonsStyles'
import AuthOrApp from './screens/AuthOrApp'

import Menu from './screens/menu'

const   MenuRoutes = {
    Today: {
        name: 'Today',
        screen: props => 
            <Agenda title='Hoje' daysAhead={0} {...props} />,
        navigationOptions: {
            title: 'Hoje'
        }
    },
    Tomorrow: {
        name: 'Tomorrow',
        screen: props => 
            <Agenda title='Amanhã' daysAhead={1} {...props} />,
        navigationOptions: {
            title: 'Amanhã'
        }
    },
    Week: {
        name: 'Tomorrow',
        screen: props => 
            <Agenda title='Semana' daysAhead={7} {...props} />,
        navigationOptions: {
            title: 'Semana'
        }
    },
    Month: {
        name: 'Month',
        screen: props => 
            <Agenda title='Mês' daysAhead={30} {...props} />,
        navigationOptions: {
            title: 'Mês'
        }
    }
}

const menuConfig = {
    initialRouteName: 'Today',
    contentComponent: Menu,
    contentOptions: {
        labelStyle: {
            fontFamily: commonsStyles.fontFamily,
            fontWeight: 'normal',
            fontSize: 20
        },
        activeLabelStyle: {
            color: '#080'
        }
    }
}

const MenuNavigator = createDrawerNavigator(MenuRoutes, menuConfig)

const MainRoutes = createStackNavigator({
    Loading: {
        name: 'Loading',
        screen: AuthOrApp
    },
    Auth: {
        name: 'Auth',
        screen: Auth,
        navigationOptions: { headerTransparent: true, header: null }
    },
    Home: {
        name: 'Home',
        screen: MenuNavigator,
        navigationOptions: { header: null }
    }
})
 
const MainNavigator = createAppContainer(MainRoutes, {
    initialRouteName: 'Loading'
})
export default MainNavigator  