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
          >
            <View style={styles.textContainer}>
              <Text style={styles.songName}>{metadata.trackName}</Text>
              <Text style={styles.albumName}>{metadata.albumName}</Text>
              <Text style={styles.songArtist}>{metadata.artistName}</Text>
            </View>
          </Image>
        </View>
        : <Text>Nothing playing.</Text>
      }
    </View>
  )
})

const styles = StyleSheet.create({
  songName: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 2,
    backgroundColor: 'white',
    padding: 4
  },
  albumName: {
    fontSize: 28,
    textAlign: 'center',
    backgroundColor: 'white',
    padding: 4
  },
  songArtist: {
    fontSize: 24,
    textAlign: 'center',
    backgroundColor: 'white',
    padding: 4
  },
  albumArt: {
    height: width,
    width,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textContainer: {
    alignItems: 'center'
  }
})

export default MetadataView
