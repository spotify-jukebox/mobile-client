import React, { Component } from 'react'
import { View, AppRegistry } from 'react-native'
import { StackNavigator, TabNavigator } from 'react-navigation'
import Toast, { DURATION } from 'react-native-easy-toast'
import { autorun } from 'mobx'

import JoinPlaylistView from './views/JoinPlaylistView'
import CreateHostingListView from './views/CreateHostingListView'
import ContributeView from './views/ContributeView'
import HostView from './views/HostView'
import NotificationStore from './notificationStore'

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
    lazyLoad: true,
    tabBarOptions: {
      activeTintColor: colors.accentColorDark,
      activeBackgroundColor: colors.barColor,
      inactiveBackgroundColor: colors.barColor
    }
  }
)

MainScreenNavigator.navigationOptions = {
  title: 'Spotily'
}

const Stack = StackNavigator(
  {
    Bottom: { screen: MainScreenNavigator },
    JoinPlaylist: { screen: JoinPlaylistView },
    CreateHostingList: { screen: CreateHostingListView }
  },
  {
    mode: 'modal',
    headerMode: 'screen'
  }
)

export default class Spotily extends Component {
  constructor() {
    super()
    console.log('trying to register notifications...')
    NotificationStore.register()
    this.toast = this.toast.bind(this)
    const toaster = autorun(() => {
      console.log(NotificationStore.latestNotification)
      this.toast('Song added')
    })
  }
  toast (text) {
    if (this.refs.toast) {
      this.refs.toast.show(text)
    }
  }
  componentDidMount () {
    this.toast('did mount')
  }
  render () {
    return (
      <View style={{ flex: 1 }}>
        <Stack />
        <Toast ref="toast" />
      </View>
    )
  }
}

AppRegistry.registerComponent('Spotily', () => Spotily)
