import React, { Component } from 'react'
import { AppRegistry, StyleSheet, Text, View } from 'react-native'
import { StackNavigator, TabNavigator } from 'react-navigation'

import MainView from './components/MainView'
import SettingsView from './components/SettingsView'
import WelcomeView from './components/WelcomeView'

import defaultStyles from './styles/defaultStyles'

const MainScreenNavigator = TabNavigator({
  Home: {
    screen: MainView
  },
  Notifications: {
    screen: SettingsView
  }
}, {
    tabBarOptions: {
      activeTintColor: defaultStyles.colors.accentColor
    }
  }
)

MainScreenNavigator.navigationOptions = {
  title: 'Spotily'
}

const Stack = StackNavigator({
  Bottom: { screen: MainScreenNavigator },
  Welcome: { screen: WelcomeView }
})

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