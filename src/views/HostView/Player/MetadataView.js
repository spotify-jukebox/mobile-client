import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

import { observer } from 'mobx-react'

import { colors, baseStyles, roundedButton } from '../../../styles/defaultStyles'



const MetadataView = observer(({metadata}) => {
  return(
    <View>
      {Object.keys(metadata).length > 0 ?
        <View>
          <Text>{metadata.trackName}</Text>
          <Text>{metadata.albumName}</Text>
          <Text>{metadata.artistName}</Text>
          <Image
            style={{width: 200, height: 200}}
            source={{uri: metadata.albumArt.url}}
          />
          <Text>{metadata.trackDuration}</Text>
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
  addButtonText: {
    fontSize: 20,
    color: colors.white,
    justifyContent: 'center'
  }
})

export default MetadataView
