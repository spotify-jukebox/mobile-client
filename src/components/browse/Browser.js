import React from 'react'
import { TextInput, ListView, View, Text, NativeModules, StyleSheet } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

import { observer } from 'mobx-react'
import { observable, computed } from 'mobx';

import Button from '../reusable/button'
import SearchResultList from './SearchResultList'

import SpotifyWebApi from '../../config/SpotifyWebApi'

import { colors, baseStyles } from '../../styles/defaultStyles'


var SpotifyModule = NativeModules.SpotifyAuth

class BrowserStore {
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

  componentDidMount() {
    //this.initPlaylist()
  }

  componentWillMount() {
    // this.initPlaylist()
  }

  search(query) {
    console.log("Search initiated, query: ", query)
    const store = this.props.store
    const apiUrl = SpotifyWebApi.url
    const requestUrl = apiUrl + "/search?q=" + query + "&type=track"
    fetch(requestUrl).then((res) => {
      res.json().then((json) => {
        console.log("json, first track: ", json.tracks.items[0].name)
        store.tracks.replace(json.tracks.items)
      }).catch((err) => console.log("fug error inside: ", err))
    }).catch((err) => console.log("fug error: ", err))
  }

  render() {
    const store = this.props.store
    console.log("RENDERING RESULTS... number of tracks: ", store.tracks.length)
    return(
      <View>
        <Text>"Search"</Text>
        <TextInput
          style={{height: 30, borderColor: 'gray', borderWidth: 1}}
          onSubmitEditing={(event) => this.search(event.nativeEvent.text)}
          placeholder={store.searchString}
          returnKeyType={'done'}
          />
        <SearchResultList props={{tracks: store.tracks, trackDataSource: store.trackDataSource}} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    ...baseStyles.container
  },
  input: {
    flex: 1
  },
  search: {
    flex: 1,
    borderColor: 'gray',
    borderWidth: 1
  },
  results: {
    flex: 4
  }
})

const browserStore = new BrowserStore()
const Browser = () => <BrowserView store={browserStore} />

export default Browser
