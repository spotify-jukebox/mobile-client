import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

import defaultStyles from '../styles/defaultStyles'

class WelcomeView extends React.Component {
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

export default WelcomeView

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: defaultStyles.black
  },
  welcome: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: '400',
    color: defaultStyles.accentColor,
    margin: 10
  }
})