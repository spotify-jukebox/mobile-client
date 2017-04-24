import React from 'react'
import { ListView, View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
import { observer } from 'mobx-react'
import contributorStore from '../contributorStore'
import Icon from 'react-native-vector-icons/Entypo'

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
        disabled={!contributorStore.hasJoinedPlaylist}
      >
        {contributorStore.addingSong === trackUri
          ? <ActivityIndicator size="small" />
          : <Icon
            color={
              contributorStore.hasJoinedPlaylist
                ? colors.accentColor
                : colors.lightestGrey
            }
            name="add-to-list" size={24}
          />
        }
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
      <Text style={{ fontSize: 30, color: colors.lightGrey, textAlign: 'center' }}>
        {contributorStore.didSearch ? 'Nothing found :(' : 'Find songs by artist, song name, etc'}
      </Text>
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
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  songInfo: {
    flex: 2
  },
  songName: {
    fontSize: 18
  },
  songArtist: {
    fontSize: 14,
    color: colors.darkGrey
  },
  addButton: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center'
  }
})


export default SearchResultList
