import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import {  autorun } from 'mobx'

import playerStore from './musicplayerStore'
import { colors } from '../../styles/defaultStyles'

import Player from './Player'

class HostView extends React.Component {
  static navigationOptions = {
    header: {
      title: 'Host',
      visible: true,
      style: { backgroundColor: colors.barColor },
      titleStyle: { color: colors.barTextColor }
    },
    tabBar: {
      label: 'Host',
      icon: ({ tintColor }) => (
        <Icon name="speaker" style={{ color: tintColor }} size={26} />
      )
    }
  }
  componentDidMount () {
    const promptCreate = autorun(() => {
      if (!playerStore.isHosting && playerStore.loggedIn) {
        // present dialog to create playlist
        console.log('is not hosting')
        this.props.navigation.navigate('CreateHostingList')
      }
    })
  }
  render () {
    return <Player />
  }
}

export default HostView
