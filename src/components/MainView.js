import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

import { baseStyles } from '../styles/defaultStyles'

class MainView extends React.Component {
  static navigationOptions = {
    tabBar: {
      label: 'Home',
      icon: ({ tintColor }) => (
        <Ionicons name="ios-home" style={{ color: tintColor }} size={26} />
      )
    }
  }
  constructor() {
    super()
  }
  componentDidMount() {
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
  container: baseStyles.container,
  welcome: baseStyles.welcomeText
})