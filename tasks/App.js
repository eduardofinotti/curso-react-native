
import React, { Component } from 'react';
import { View, Platform, StyleSheet, Text } from 'react-native';
import commonsStyles from './src/commonsStyles'

// import { Container } from './styles';

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!!!</Text>
      </View>
      );
  }
}

const styles = StyleSheet.create({

  container: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },

  welcome: {
    fontFamily: commonsStyles.fontFamily,
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
});