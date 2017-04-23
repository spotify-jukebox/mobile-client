import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

import { colors, roundedButton } from '../../styles/defaultStyles'

import Browser from './Browser'

class ContributeView extends React.Component {
  static navigationOptions = {
    header: {
      visible: false
    },
    tabBar: {
      label: 'Contribute',
      icon: ({ tintColor }) => (
        <Ionicons name="ios-plus" style={{ color: tintColor }} size={26} />
      )
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Browser />
      </View>
    )
  }
}

export default ContributeView

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
