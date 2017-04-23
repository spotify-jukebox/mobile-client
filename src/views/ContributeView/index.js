import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Entypo'

import { colors, roundedButton, baseStyles } from '../../styles/defaultStyles'

import Browser from './Browser'

class ContributeView extends React.Component {
  static navigationOptions = {
    header: {
      title: 'Contribute',
      visible: true
    },
    tabBar: {
      label: 'Contribute',
      icon: ({ tintColor }) => (
        <Icon name="plus" style={{ color: tintColor }} size={26} />
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
    ...baseStyles.container
  }
})
