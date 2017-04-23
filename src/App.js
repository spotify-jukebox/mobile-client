import React, { Component } from 'react'
import { AppRegistry, StyleSheet, Text, View } from 'react-native'
import { StackNavigator, TabNavigator } from 'react-navigation'

import WelcomeView from './components/WelcomeView'
import ContributeView from './views/ContributeView'
import HostView from './views/HostView'

import { colors } from './styles/defaultStyles'

const MainScreenNavigator = TabNavigator({
  Contribute: {
    screen: ContributeView
  },
  Host: {
    screen: HostView
  }
}, {
    tabBarOptions: {
      activeTintColor: colors.accentColor
    }
  }
)

MainScreenNavigator.navigationOptions = {
  title: 'Spotily'
}

const Stack = StackNavigator({
  Bottom: { screen: MainScreenNavigator },
  Welcome: { screen: WelcomeView }

},
  {
    mode: 'modal',
    headerMode: 'none'
  }
)

export default class Spotily extends Component {
  constructor() {
    super()
  }
  componentDidMount() {
  }
  render() {
    return <Stack />
  }
}

AppRegistry.registerComponent('Spotily', () => Spotily)
