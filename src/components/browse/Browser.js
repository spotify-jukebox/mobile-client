import React from 'react'
import { TextInput, ScrollView, View, Text, NativeModules, StyleSheet } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

import { observer } from 'mobx-react'
import { observable, autorun } from 'mobx';

import Button from '../reusable/button'
import SearchResultTable from './SearchResultTable'

import SpotifyWebApi from '../../config/SpotifyWebApi'

import { colors, baseStyles } from '../../styles/defaultStyles'


var SpotifyModule = NativeModules.SpotifyAuth

class BrowserStore {
  @observable searchString = ""
  @observable tracks = {}
  @observable artists = []
}

@observer
class BrowserView extends React.Component {
  static navigationOptions = {
    header: {
      title: 'Play'
    },
    tabBar: {
      label: 'Play',
      icon: ({ tintColor }) => (
        <Ionicons name="ios-musical-notes" style={{ color: tintColor }} size={26} />
      )
    }
  }

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
        console.log("json: ", json)
        store.tracks = json.tracks
      }).catch((err) => console.log("fug error inside: ", err))
    }).catch((err) => console.log("fug error: ", err))
  }

  render() {
    const store = this.props.store
    const trackItems = (store.tracks.items) ? store.tracks.items : []
    console.log("RENDERING RESULTS... tracks: ", trackItems)
    return(
      <View>
        <Text>"hello world m8s"</Text>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onSubmitEditing={(event) => this.search(event.nativeEvent.text)}
          placeholder={store.searchString}
          returnKeyType={'done'}
          />
        <SearchResultTable props={{trackItems}} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    ...baseStyles.container
  },
  button: {
    flex: 0,
    marginTop: 10
  }
})

const browserStore = new BrowserStore()
const Browser = () => <BrowserView store={browserStore} />

export default Browser
