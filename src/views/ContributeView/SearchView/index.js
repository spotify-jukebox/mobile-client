import React from 'react'
import { TextInput, Text, View, StyleSheet, ActivityIndicator } from 'react-native'
import { observer } from 'mobx-react'

import SearchResultList from './SearchResultList'
import preferenceStore from '../../../preferenceStore'
import contributorStore from '../contributorStore'
import { SpotifyWebApi } from '../../../config/ApiConfig'
import { colors, inputStyle } from '../../../styles/defaultStyles'

@observer
class SearchView extends React.Component {
  constructor() {
    super()
    this.search = this.search.bind(this)
  }
  search (query) {
    const apiUrl = SpotifyWebApi.url
    const requestUrl = `${apiUrl}/search?q=${query}&type=track`
    contributorStore.loading = true
    fetch(requestUrl)
      .then(res => res.json())
      .then((json) => {
        contributorStore.loading = false
        contributorStore.tracks.replace(json.tracks.items)
      })
      .catch(err => {
        console.log('fug error inside: ', err)
        contributorStore.loading = false
      })
  }
  render () {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TextInput
            style={styles.searchInput}
            onSubmitEditing={event => this.search(event.nativeEvent.text)}
            placeholder={'Artist, song name...'}
            returnKeyType={'done'}
          />
        </View>
        {contributorStore.loading
          ? <View style={styles.centered}>
            <ActivityIndicator size="large" color={colors.accentColor} />
          </View>
          : <SearchResultList
            tracks={contributorStore.tracks}
            trackDataSource={contributorStore.trackDataSource}
            sendSongToQueue={contributorStore.sendSongToQueue}
          />
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    flex: 1
  },
  header: {
    padding: 10,
    borderBottomColor: colors.lightestGrey,
    borderBottomWidth: 1,
    backgroundColor: colors.barColor
  },
  searchInput: {
    ...inputStyle
  }
})

export default SearchView
