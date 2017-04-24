import React from 'react'
import { View, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

import contributorStore from './contributorStore'
import SearchView from './SearchView'
import PlaylistView from './PlaylistView'
import { colors, baseStyles } from '../../styles/defaultStyles'

class ContributeView extends React.Component {
  static navigationOptions = {
    header: {
      title: 'Contribute',
      visible: true,
      style: { backgroundColor: colors.barColor },
      titleStyle: { color: colors.barTextColor }
    },
    tabBar: {
      label: 'Contribute',
      icon: ({ tintColor }) => (
        <Icon name="md-disc" style={{ color: tintColor }} size={26} />
      ),
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
        <PlaylistView />
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
