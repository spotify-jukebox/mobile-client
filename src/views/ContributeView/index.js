import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Entypo'

import { colors, roundedButton } from '../../styles/defaultStyles'

class ContributeView extends React.Component {
  static navigationOptions = {
    header: {
      visible: false
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
        <Text>Contribute</Text>
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
    backgroundColor: colors.white
  },
  welcome: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: '400',
    color: colors.accentColor,
    margin: 20
  }
})