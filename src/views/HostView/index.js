import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

import { colors, roundedButton } from '../../styles/defaultStyles'

class HostView extends React.Component {
  static navigationOptions = {
    header: {
      visible: false
    },
    tabBar: {
      label: 'Settings',
      icon: ({ tintColor }) => (
        <Ionicons name="ios-play-outline" style={{ color: tintColor }} size={26} />
      )
    }
  }
  render () {
    return (
      <View style={styles.container}>
        <Text>Moi</Text>
      </View>
    )
  }
}

export default HostView

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
