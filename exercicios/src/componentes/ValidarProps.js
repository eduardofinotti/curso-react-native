import React from 'react'
import { Text, View, Button, Alert, ToastAndroid, Platform } from 'react-native'
import PropTypes from 'prop-types'


const ValidarProps = props => 
    <Text style={{fontSize:35}}>
        {props.label}
        {props.ano + 2000}
    </Text>

ValidarProps.defaultProps = {
    label: 'Ano: '
}

ValidarProps.protoTypes = {
    ano: PropTypes.number.isRequired
}

export default ValidarProps