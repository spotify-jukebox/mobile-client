import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { observer } from 'mobx-react'
import Carousel from 'react-native-snap-carousel'
import Ionicons from 'react-native-vector-icons/Ionicons'

import { observer } from 'mobx-react'
import { observable, computed, action } from 'mobx'

import { SpotifyWebApi } from '../../../config/ApiConfig'

import { colors, baseStyles, roundedButton } from '../../../styles/defaultStyles'


class InfoViewStore {
  @observable previousTrack = {}
  @observable currentTrack = {}
  @observable nextTrack = {}


  @action updateCurrentTrack = (i, trackUri) => {
    switch (i) {
      case 'previous': this.previousTrack = this.getTrackInfo(trackUri)
      case 'current': this.currentTrack = this.getTrackInfo(trackUri)
      case 'next': this.nextTrack = this.getTrackInfo(trackUri)
    }
  }

  @action getTrackInfo = trackUri => {
    const trackId = trackUri.split(":")[2]
    fetch(`${SpotifyWebApi.url}/tracks/${trackId}`)
    .then(res => res.json())
    .then((json) => {
      console.log("Set track info for song: " + json.name)
      return json
    })
    .catch((err) => {
      console.log("Something went wrong getting track info.")
      return {}
    })
  }
}

const TrackInfoView = observer(({props}) => {
  { track } = props
  return(
    <View>
      <Image
        source={{uri: track.albumImageUri}}
      />
      <Text>{track.name}</Text>
      <Text>{track.artist}</Text>
    </View>
  )
})

class TrackInfo extends React.Component {
  constructor() {
    super()
    
  }

  componentWillMount() {

  }

  render() {
    const store = this.props.store
    <TrackInfoView props={{track: store.currentTrack}} />
  }
}

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

const infoViewStore = new infoViewStore
const TrackInfo = <TrackInfoView store=infoViewStore />

export default TrackInfo
