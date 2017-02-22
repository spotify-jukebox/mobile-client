import React from 'react'
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native'

import { colors, roundedButton } from '../styles/defaultStyles'

class WelcomeView extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to Spotily!
        </Text>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Bottom')}
          style={roundedButton.button}>
          <Text style={roundedButton.title}>Start</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default WelcomeView

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.black
  },
  welcome: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: '400',
    color: colors.accentColor,
    margin: 20
  }
})