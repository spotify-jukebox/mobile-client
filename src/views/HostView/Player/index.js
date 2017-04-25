import React from 'react'
import { ScrollView, View, Text, NativeModules, NativeEventEmitter, StyleSheet } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

import { observer } from 'mobx-react'
import { observable, autorun } from 'mobx';

import Button from '../../../reusable/button'
import MetadataView from './MetadataView'

import { baseStyles, colors } from '../../../styles/defaultStyles'

import mockPlaylist from '../../../data/mockPlaylist'

var SpotifyModule = NativeModules.SpotifyAuth
const SpotifyEventModule = NativeModules.SpotifyEventManager


class MusicPlayerStore {
  @observable loggedIn = false
  @observable playing = false
  @observable metadata = {}
  @observable playlist = []
  @observable history = []
  @observable currentTrack = {}
  @observable spliced = 0
  @observable nextTrack = ""
  @observable spotifyEventEmitter = new NativeEventEmitter(SpotifyEventModule)
}


@observer
class MusicPlayerView extends React.Component {

  constructor() {
    super()
    this.spotifyLogin = this.spotifyLogin.bind(this)
    this.play = this.play.bind(this)
    this.queueSong = this.queueSong.bind(this)
    this.togglePlayback = this.togglePlayback.bind(this)
    this.updateMetadata = this.updateMetadata.bind(this)
    this.updatePlaylist = this.updatePlaylist.bind(this)
    this.skipNext = this.skipNext.bind(this)
    this.skipPrevious = this.skipPrevious.bind(this)
    this.initPlaylist = this.initPlaylist.bind(this)
    this.nextTrack = this.nextTrack.bind(this)
    this.previousTrack = this.previousTrack.bind(this)
    this.parseTrackMetadata = this.parseTrackMetadata.bind(this)
  }

  parseTrackMetadata(metadata) {
    const metadataWithShorterKeys = {
      artistName: metadata.SPTAudioStreamingMetadataArtistName,
      artistUri: metadata.SPTAudioStreamingMetadataArtistURI,
      albumName: metadata.SPTAudioStreamingMetadataAlbumName,
      albumUri: metadata.SPTAudioStreamingMetadataAlbumURI,
      trackName: metadata.SPTAudioStreamingMetadataTrackName,
      trackUri: metadata.SPTAudioStreamingMetadataTrackURI,
      trackDuration: metadata.SPTAudioStreamingMetadataTrackDuration
    }
    return metadataWithShorterKeys
  }

  componentDidMount() {
    this.props.store.spotifyEventEmitter.addListener("audioStreamingDidChangeToTrack", (data) => {
      console.log("Event audioStreamingDidChangeToTrack received with data: ", data)
      this.updateMetadata(this.parseTrackMetadata(data))
    })
  }

  componentWillUnmount() {
    this.props.store.spotifyEventEmitter.removeSubscription("audioStreamingDidChangeToTrack")
  }

  componentWillMount() {
    SpotifyModule.loggedIn((res) => {
      this.loggedIn = res
    })
  }

  initPlaylist() {
    console.log("Queuing songs...: ", mockPlaylist)
    this.props.store.playlist = mockPlaylist
    this.props.store.currentTrack = mockPlaylist[0]
  }

  queueSong() {
    SpotifyModule.currentTrackIndex((index) => {
      const store = this.props.store
      const spliceAmount = (store.splicedSongs > index) ? index : index - store.splicedSongs
      store.splicedSongs = (spliceAmount > index) ? spliceAmount : store.splicedSongs + spliceAmount
      const updatedPlaylist = [...this.props.store.playlist.slice(spliceAmount), "spotify:track:2SpEHTbUuebeLkgs9QB7Ue"]
      this.props.store.playlist = updatedPlaylist
      this.updatePlaylist(this.props.store.playlist.peek())
    })
  }

  nextTrack() {
    const next = this.props.store.playlist[1]
    return (next) ? next : ""
  }

  previousTrack() {
    const previous = this.props.store.history[0]
    return (previous) ? previous : ""
  }

  play(songURIs) {
    if (this.props.store.playlist.length > 0) {
      const options = {
        trackIndex: 0,
        startTime: 0.0
      }
      SpotifyModule.playURIs(
        songURIs,
        options,
        (error) => {
          if (!error) {
            this.props.store.playing = true
            // SpotifyModule.metadata((metadata) => {
            //   this.props.store.metadata = metadata
            // })
            // this.queueNext()
          } else console.log(error)
        })

      } else {
        console.log("No tracks to play")
      }
    }

    updateMetadata(metadata) {
      const store = this.props.store
      store.currentTrack = metadata
    }

    updatePlaylist(songURIs) {
      if (songURIs.length > 0) {
        SpotifyModule.replaceURIs(
          songURIs,
          0,
          (error) => {
            console.log("Something went wrong: ", error)
          }
        )
      }
    }

    queue(songURI) {
      SpotifyModule.queue(
        songURI,
        (error) => {
          if (error) {
            console.log("Something went wrong: ", error)
          }
        }
      )
    }
    skipNext() {
      SpotifyModule.skipNext((res) => {
        const next = this.nextTrack()
        if (next) {
          console.log("next: ", next)
          this.props.store.currentTrack = next
          this.props.store.playlist = [
            ...this.props.store.playlist.slice(1)
          ]
          this.props.store.history = [
            this.props.store.currentTrack,
            ...this.props.store.history
          ]
        } else {
          console.log("No songs in queue")
        }
      })
    }

    skipPrevious() {
      SpotifyModule.skipPrevious((res) => {
        const previous = this.previousTrack()
        if (previous) {
          console.log("previous: ", previous)
          this.props.store.currentTrack = previous
          this.props.store.playlist = [
            previous,
            ...this.props.store.playlist
          ]
          this.props.store.history = [
            ...this.props.store.history.slice(1)
          ]
          this.play(previous)
        } else {
          console.log("No previous tracks")
        }
        // this.updateTracks()
      })
    }

    togglePlayback() {
      const now = this.props.store.playing
      this.props.store.playing = !now
      SpotifyModule.currentTrackIndex((res) => console.log("Current trackindex:", res))
      SpotifyModule.setIsPlaying(!now, (err) => console.log(err))
    }
    spotifyLogin() {
      const options = {
        clientID: 'f276a6769fd44a8c90def02576609c1b',
        redirectURL: 'juke-auth://callback',
        requestedScopes: ['streaming']
      }

      SpotifyModule.setClientID(options.clientID, options.redirectURL, options.requestedScopes, (error) => {
        if (error) {
          console.log(error)
        } else {
          this.props.store.loggedIn = true
          console.log("login success")
        }
      })
    }

    render() {
      const store = this.props.store
      return (
        <View style={styles.container}>
          {(store.loggedIn) ? (
            <View>
              <MetadataView metadata={store.currentTrack} />
              <Button style={styles.button} onPress={() => this.play(store.playlist.peek())} title="Play" />
              <Button style={styles.button} onPress={this.skipNext} title="Next" />
              <Button style={styles.button} onPress={this.skipPrevious} title="Previous" />
              <Button style={styles.button} onPress={this.initPlaylist} title="Init playlist" />
              <Button style={styles.button} onPress={this.togglePlayback} title="Toggle" />
              <Button style={styles.button} onPress={this.queueSong} title="Update" />
            </View>) : (
              <Button style={styles.button} onPress={this.spotifyLogin} title="Login" />
            )
          }
        </View>
      )
    }
  }

  const styles = StyleSheet.create({
    container: {
      ...baseStyles.container
    },
    button: {
      backgroundColor: colors.testRed,
      marginTop: 10,
    }
  })

  const musicStore = new MusicPlayerStore()
  const MusicPlayer = () => <MusicPlayerView store={musicStore} />

export default MusicPlayer
