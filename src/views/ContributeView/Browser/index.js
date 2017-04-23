import React from 'react'
import { TextInput, ListView, View, Text, NativeModules, StyleSheet, ActivityIndicator } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

import { observer } from 'mobx-react'
import { observable, computed } from 'mobx';

import Button from '../../../reusable/button'
import SearchResultList from './SearchResultList'

import { SpotifyWebApi } from '../../../config/ApiConfig'

import { colors, baseStyles, inputStyle } from '../../../styles/defaultStyles'


var SpotifyModule = NativeModules.SpotifyAuth

class BrowserStore {
  @observable loading = false
  @observable searchString = ""
  @observable tracks = [{name: "keijo", "artists": [{name: "keijoke"}]}]
  @observable artists = []

  trackDs = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })

  @computed get trackDataSource() {
    return this.trackDs.cloneWithRows(this.tracks.map((track) => {
      const artists = track.artists
      return {
        heading: track.name,
        sub: (artists.length > 1) ? artists[0].name + ", ..." : artists[0].name
      }
    }))
  }
}

@observer
class BrowserView extends React.Component {
  constructor() {
    super()
    this.search = this.search.bind(this)
  }
  search(query) {
    const { store } = this.props
    const apiUrl = SpotifyWebApi.url
    const requestUrl = apiUrl + "/search?q=" + query + "&type=track"
    store.loading = true
    fetch(requestUrl)
      .then(res => res.json())
      .then(json => {
        store.tracks.replace(json.tracks.items)
        store.loading = false
      })
      .catch(err => console.log("fug error inside: ", err))
  }
  render() {
    const { store } = this.props
    return(
      <View style={styles.container}>
        <View style={styles.header}>
          <TextInput
            style={styles.searchInput}
            onSubmitEditing={(event) => this.search(event.nativeEvent.text)}
            placeholder={store.searchString}
            returnKeyType={'done'}
            />
        </View>
        { store.loading
          ? <View style={styles.centered}>
            <ActivityIndicator size="large" color={colors.accentColor} />
          </View>
          : <SearchResultList props={{tracks: store.tracks, trackDataSource: store.trackDataSource}} />
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
    borderBottomColor: colors.lightGrey,
    borderBottomWidth: 1,
    backgroundColor: colors.white
  },
  searchInput: {
    ...inputStyle
  }
})

const browserStore = new BrowserStore()
const Browser = () => <BrowserView store={browserStore} />

export default Browser
