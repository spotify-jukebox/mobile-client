import React from 'react'
import { Text, View, StyleSheet, Image } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

import Test from './play/Test'

import { baseStyles } from '../styles/defaultStyles'

class MainView extends React.Component {
  static navigationOptions = {
    header: {
      title: 'Home'
    },
    tabBar: {
      label: 'Home',
      icon: ({ tintColor }) => (
        <Ionicons name="ios-home-outline" style={{ color: tintColor }} size={26} />
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
        <Test />
      </View>
    )
  }
}

export default MainView

const styles = StyleSheet.create({
  container: baseStyles.container,
  welcome: baseStyles.welcomeText
})

//TODO: fix stack, unneeded back button on header when have opened welcome screen