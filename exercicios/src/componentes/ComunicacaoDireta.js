import React, { Component } from 'react'
import { Text, TextInput, View, Button, Alert, ToastAndroid, Platform } from 'react-native'

const font = {style: { fontSize: 30 }}

export const Filho = props =>
    <View>
        <Text {...font}> Filho: {props.nome} {props.sobrenome}</Text>
    </View>

export const Pai = props =>
    <View>
        <Text {...font}> Pai: {props.nome} {props.sobrenome}</Text>
        {props.children}
    </View>

export const Avo = props =>
    <View>
        <Text {...font}> Avo: {props.nome} {props.sobrenome}</Text>
        <Pai nome='Eduardo' sobrenome={props.sobrenome}>
            <Filho nome='Ana' />
            <Filho nome='Gui' />
            <Filho nome='Davi' />
        </Pai>
        <Pai {...props} nome='Pedro'>
            <Filho nome='Rebeca' />
            <Filho nome='Renato' />
        </Pai>


    </View>

export default Avo