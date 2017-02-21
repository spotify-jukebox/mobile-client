import React, { Component } from 'react'
import { AppRegistry, StyleSheet, Text, View } from 'react-native'

export default class Spotily extends Component {
  constructor() {
    super()
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to Spotily!
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#010d06',
  },
  welcome: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: '400',
    color: '#0be573',
    margin: 10,
  }
})

AppRegistry.registerComponent('Spotily', () => Spotily)
