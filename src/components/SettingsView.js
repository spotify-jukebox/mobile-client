import React from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

import { baseStyles, roundedButton } from '../styles/defaultStyles'

class SettingsView extends React.Component {
  static navigationOptions = {
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
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Welcome')}
            style={styles.button}>
            <Text style={roundedButton.title}>Welcome</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Bottom')}
            style={styles.button}>
            <Text style={roundedButton.title}>Home</Text>
          </TouchableOpacity>
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
    ...roundedButton.button,
    marginTop: 12
  }
})