import React from 'react'
import { View, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Entypo'

import contributorStore from './contributorStore'
import SearchView from './SearchView'
import { baseStyles } from '../../styles/defaultStyles'

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
  componentDidMount () {
    console.log('contributorStore:', contributorStore.playlistName)
    if (!contributorStore.hasJoinedPlaylist && !contributorStore.didAskForPlaylistName && this.props.navigation) {
      console.log('should join playlist')
      contributorStore.didAskForPlaylistName = true
      this.props.navigation.navigate('JoinPlaylist')
    }
  }
  render () {
    return (
      <View style={styles.container}>
        <SearchView />
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
