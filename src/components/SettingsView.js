import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

import defaultStyles from '../styles/defaultStyles'

class SettingsView extends React.Component {
  static navigationOptions = {
    tabBar: {
      label: 'Settings',
      icon: ({ tintColor }) => (
        <Ionicons name="ios-cog" style={{color: tintColor}} size={26} />
      )
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          Settings
      </Text>
      </View>
    )
  }
}

export default SettingsView

const styles = StyleSheet.create({
  container: {
    ...defaultStyles.container
  },
  text: {
    ...defaultStyles.welcomeText
  }
})