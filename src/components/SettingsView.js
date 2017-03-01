import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

import Button from './reusable/button'

import { baseStyles, roundedButton } from '../styles/defaultStyles'

class SettingsView extends React.Component {
  static navigationOptions = {
    header: {
      title: 'Settings'
    },
    tabBar: {
      label: 'Settings',
      icon: ({ tintColor }) => (
        <Ionicons name="ios-cog" style={{ color: tintColor }} size={26} />
      )
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          Settings
        </Text>
        <View style={styles.buttonContainer}>
          <Button
            title="Welcome"
            style={styles.button}
            onPress={() => this.props.navigation.navigate('Welcome')} />
          <Button
            title="Home"
            style={styles.button}
            onPress={() => this.props.navigation.navigate('Bottom')} />
        </View>
      </View>
    )
  }
}

export default SettingsView

const styles = StyleSheet.create({
  container: {
    ...baseStyles.container
  },
  text: baseStyles.welcomeText,
  buttonContainer: {
    justifyContent: 'center'
  },
  button: {
    marginTop: 12
  }
})