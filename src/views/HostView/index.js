import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'

import { colors, roundedButton } from '../../styles/defaultStyles'

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
  render () {
    return <Player />
  }
}

export default HostView
