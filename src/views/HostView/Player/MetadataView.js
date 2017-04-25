import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native'
import { observer } from 'mobx-react'

import { colors, roundedButton } from '../../../styles/defaultStyles'

const { width } = Dimensions.get('window')

const MetadataView = observer(({ metadata }) => {
  return (
    <View>
      {Object.keys(metadata).length > 0 ?
        <View style={{ alignItems: 'center' }}>
          <Image
            style={styles.albumArt}
            source={{ uri: metadata.albumArt.url }}
          />
          <Text>{metadata.trackName}</Text>
          <Text>{metadata.albumName}</Text>
          <Text>{metadata.artistName}</Text>
          <Text>{Math.floor(metadata.trackDuration / 60.0)}</Text>
        </View>
        : <Text>Nothing playing.</Text>
      }
    </View>
  )
})

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
  albumArt: {
    height: width,
    width
  },
  addButtonText: {
    fontSize: 20,
    color: colors.white,
    justifyContent: 'center'
  }
})

export default MetadataView
