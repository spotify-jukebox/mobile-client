import React, { Component } from 'react'
import { AppRegistry, StyleSheet, Text, View } from 'react-native'
import { StackNavigator, TabNavigator } from 'react-navigation'

import MainView from './components/MainView'
import SettingsView from './components/SettingsView'
import WelcomeView from './components/WelcomeView'
import ContributorView from './components/ContributorView'
import PlaylistView from './components/PlaylistView'
import Test from './components/play/Test'

import { colors } from './styles/defaultStyles'

const MainScreenNavigator = TabNavigator({
  Home: {
    screen: MainView
  },
  Contribute: {
    screen: ContributorView
  },
  Play: {
    screen: Test
  },
  Settings: {
    screen: SettingsView
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
  Welcome: { screen: WelcomeView },
  Playlist: { screen: PlaylistView},

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
