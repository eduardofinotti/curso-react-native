
import React, {Component} from 'react'
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native'
import Button from './src/components/Button'
import Display from './src/components/Display'

 const initialState = {
   displayValue: '0',
   cleanDysplay: false,
   operation: null,
   values: [0, 0],
  current: 0
 }

export default class App extends Component {

  state = { ...initialState }

  addDigit = n => {
    //this.setState({ displayValue: n })
    if(n === '.' && this.state.displayValue.includes('.')) {
      return
    }
    const cleanDysplay = this.state.displayValue === '0'
      || this.state.cleanDysplay 
    const currentValue = cleanDysplay ? '' : this.state.displayValue
  }

  clearMemory = n => {
    this.setState({ displayValue: '0' })
  }

  setOperation = operation => {
 
  }

  render(){
    return (
        <View style={styles.container}>
          <Display value={this.state.displayValue} />
          <View style={styles.buttons}> 
            <Button label='AC' triple onClick={this.clearMemory} />
            <Button label='/' operation onClick={() => this.setOperation('/')} />
            <Button label='7' onClick={this.addDigit} />
            <Button label='8' onClick={this.addDigit} />
            <Button label='9' onClick={() => this.addDigit(9)} />
            <Button label='*' operation onClick={this.setOperation} />
            <Button label='4' onClick={() => this.addDigit(4)} />
            <Button label='5' onClick={() => this.addDigit(5)} />
            <Button label='6' onClick={() => this.addDigit(6)} />
            <Button label='-' operation onClick={() => this.setOperation('-')} />
            <Button label='1' onClick={this.addDigit} />
            <Button label='2' onClick={() => this.addDigit(2)} />
            <Button label='3' onClick={() => this.addDigit(3)} />
            <Button label='+' operation onClick={() => this.setOperation('+')} />
            <Button label='0' double onClick={() => this.addDigit(0)} />
            <Button label='.' onClick={() => this.addDigit('.')} />
            <Button label='=' operation onClick={() => this.setOperation('=')} />

          </View>
        </View>
    );
  } 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  buttons: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
})