import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

import defaultStyles from '../styles/defaultStyles'

class MainView extends React.Component {
  static navigationOptions = {
    tabBar: {
      label: 'Home',
      icon: ({ tintColor }) => (
        <Ionicons name="ios-home" style={{color: tintColor}} size={26} />
      )
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Main Screen
        </Text>
      </View>
    )
  }
}

export default MainView

const styles = StyleSheet.create({
  container: {
    ...defaultStyles.container
  },
  welcome: {
    ...defaultStyles.welcomeText
  }
})