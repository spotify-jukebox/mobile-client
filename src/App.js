import React, { Component } from 'react'
import { AppRegistry } from 'react-native'
import { StackNavigator, TabNavigator } from 'react-navigation'

import JoinPlaylistView from './components/WelcomeView'
import ContributeView from './views/ContributeView'
import HostView from './views/HostView'

import { colors } from './styles/defaultStyles'

const MainScreenNavigator = TabNavigator(
  {
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
  JoinPlaylist: { screen: JoinPlaylistView }
},
  {
    mode: 'modal',
    headerMode: 'screen'
  }
)

export default class Spotily extends Component {
  componentDidMount () {
  }
  render () {
    return <Stack />
  }
}

AppRegistry.registerComponent('Spotily', () => Spotily)
