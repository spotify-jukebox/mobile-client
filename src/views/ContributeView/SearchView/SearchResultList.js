import React from 'react'
import { ListView, View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { observer } from 'mobx-react'
import Ionicons from 'react-native-vector-icons/Ionicons'

import { colors, baseStyles, roundedButton } from '../../../styles/defaultStyles'

const Row = observer(({ rowData, sendSongToQueue }) => {
  const { heading, sub, trackUri } = rowData
  return (
    <View style={styles.row}>
      <View style={styles.songInfo}>
        <Text style={styles.songName} ellipsizeMode={'tail'} numberOfLines={1}>{heading}</Text>
        <Text style={styles.songArtist}>{sub}</Text>
      </View>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => sendSongToQueue(trackUri)}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  )
})

const SearchResultList = observer(({ tracks, trackDataSource, sendSongToQueue }) =>
  tracks && tracks.length > 0
    ? <ListView
      dataSource={trackDataSource}
      renderRow={rowData => <Row rowData={rowData} sendSongToQueue={sendSongToQueue} />}
    />
    : <View style={styles.emptyList}>
      <Text style={{ fontSize: 30, color: colors.lightGrey }}>Nothing found :(</Text>
    </View>
)

const styles = StyleSheet.create({
  listView: {
    padding: 4
  },
  emptyList: {
    ...baseStyles.centered
  },
  row: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomColor: colors.lightGrey,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  songInfo: {
    flex: 2
  },
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


export default SearchResultList
