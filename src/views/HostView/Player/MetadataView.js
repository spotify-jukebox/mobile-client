import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { observer } from 'mobx-react'

import { colors, roundedButton } from '../../../styles/defaultStyles'

const MetadataView = observer(({ metadata }) => (
  <View>
    {metadata ?
      <View>
        <Text>{metadata.trackName}</Text>
        <Text>{metadata.albumName}</Text>
        <Text>{metadata.artistName}</Text>
        <Text>{metadata.trackDuration}</Text>
      </View>
      : <Text>Nothing playing.</Text>
    }
  </View>
))

const styles = StyleSheet.create({
  songName: {
    fontSize: 16
  },
  songArtist: {
    fontSize: 14
  },
  addButton: {
    ...roundedButton.button
  },
  addButtonText: {
    fontSize: 20,
    color: colors.white,
    justifyContent: 'center'
  }
})

export default MetadataView
