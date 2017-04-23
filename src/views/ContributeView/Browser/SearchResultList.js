import React from 'react'
import { ListView, View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { observer } from 'mobx-react'
import Ionicons from 'react-native-vector-icons/Ionicons'

import Spinner from '../../../reusable/spinner'
import { colors, baseStyles, roundedButton } from '../../../styles/defaultStyles'

const Row = observer(({props}) => {
  const { heading, sub, trackUri, sendSongToQueue } = props
  return(
    <View style={styles.row}>
      <View style={styles.songInfo}>
        <Text style={styles.songName}>{heading}</Text>
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

const SearchResultList = observer(({props}) => {
  const { tracks, trackDataSource, sendSongToQueue } = props
  return <ListView
      dataSource={trackDataSource}
      renderRow={(rowData) => <Row props={{...rowData, sendSongToQueue: sendSongToQueue}} />}
    />
})

const styles = StyleSheet.create({
  listView: {
    padding: 4
  },
  row: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomColor: colors.lightGrey,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
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