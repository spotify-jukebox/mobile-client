import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { observer } from 'mobx-react'
import Icon from 'react-native-vector-icons/FontAwesome'

import Button from '../../../reusable/button'
import contributorStore from '../contributorStore'
import { colors, playlistStyle } from '../../../styles/defaultStyles'

const PlaylistView = observer(({ onPressPlaylist }) => {
  return (
    <View style={styles.bottombar}>
      <Button style={styles.quitButton}>
        <Icon name="caret-down" size={26} color={colors.darkGrey} />
      </Button>
      <TouchableOpacity
        style={contributorStore.hasJoinedPlaylist ? styles.playlistContainer : styles.joinButton}
        onPress={() => onPressPlaylist()}
      >
        { contributorStore.hasJoinedPlaylist
        ? <Text style={styles.barText}>{ contributorStore.playlistName }</Text>
        : <Text style={styles.joinButtonText}>Join a playlist</Text> }
      </TouchableOpacity>
    </View>
  )
})

const styles = StyleSheet.create({
  bottombar: {
    height: 50,
    backgroundColor: colors.barColor,
    borderTopWidth: 1,
    borderTopColor: colors.lightestGrey,
    paddingVertical: 8,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row'
  },
  playlistContainer: {
    ...playlistStyle.container
  },
  quitButton: {
    padding: 4,
    alignItems: 'center',
    justifyContent: 'center'
  },
  barText: {
    ...playlistStyle.title
  },
  joinButton: {
    padding: 6
  },
  joinButtonText: {
    color: colors.accentColor,
    fontSize: 16
  }
})

export default PlaylistView
