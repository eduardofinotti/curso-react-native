import React from 'react';
import { ScrollView, Text, StyleSheet, View, AsyncStorage, TouchableOpacity } from 'react-native';
import { Gravatar } from 'react-native-gravatar'
import { DrawerItems } from 'react-navigation-drawer'
import commonsStyles from '../commonsStyles';
import axios from 'axios'
import Icon from 'react-native-vector-icons/FontAwesome'

export default props => {

    const logout = () => {
        delete axios.defaults.headers.common['Authorization']
        AsyncStorage.removeItem('userData')
        props.navigation.navigate('Auth')
    }

    return (
        <ScrollView>
            <View style={StyleSheet.header} >
                    <Text style={styles.title}> Tasks </Text>
                <Gravatar style={styles.avatar} 
                        options={{
                            email: props.navigation.getParam('email'),
                            secure: true}} /> 
                    <View style={styles.userInfo}>
                        <View>
                            <Text style={styles.name}>
                                {props.navigation.getParam('name')}
                            </Text>
                            <Text tyle={styles.email}>
                                {props.navigation.getParam('email')}
                            </Text>
                        </View>
                        
                        <TouchableOpacity onPress={logout}>
                            <View style={styles.logoutIcon}>
                                <Icon name="sign-out" size={30} color='#800' />
                            </View>
                        </TouchableOpacity>

                    </View>
                </View>

            <DrawerItems {...props} />

   </ScrollView>
    )
}
   

const styles = StyleSheet.create({

    header: {
        borderBottomColor: 1,
        borderColor: '#DDD'
    },

    title: {
        backgroundColor : '#FFF',
        color: '#000',
        fontFamily: commonsStyles.fontFamily,
        fontSize: 30,
        paddingTop: 20,
        padding: 10
    },

    avatar: {
        width: 60,
        height: 60,
        borderWidth: 3,
        borderColor: '#AAA',
        borderRadius: 30,
        margin: 10,
    },

    name: {
        fontFamily: commonsStyles.fontFamily,
        color: commonsStyles.colors.mainText,
        fontSize: 20,
        //marginLeft: 10,
    },

    email: {
        fontFamily: commonsStyles.fontFamily,
        color: commonsStyles.colors.subText,
        fontSize: 15,
        marginBottom: 10,
        marginLeft: 10,
    },

    menu: {
        justifyContent: 'center',
        alignItems: 'stretch',
    },

    userInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginLeft: 10,
    },

    logoutIcon: {
        alignItems: 'flex-end',
        justifyContent: 'center',
        marginRight: 20
    },
})
