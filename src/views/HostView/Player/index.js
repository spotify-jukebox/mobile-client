import React from 'react'
import { ScrollView, View, Text, NativeModules, NativeEventEmitter, StyleSheet } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

import { observer } from 'mobx-react'
import { observable, action, autorun } from 'mobx';

import Button from '../../../reusable/button'
import MetadataView from './MetadataView'

import { baseStyles, colors } from '../../../styles/defaultStyles'

import mockPlaylist from '../../../data/mockPlaylist'

var SpotifyModule = NativeModules.SpotifyAuth
const SpotifyEventModule = NativeModules.SpotifyEventManager


class MusicPlayerStore {
  @observable loggedIn = false
  @observable playing = false
  @observable paused = false
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
    this.stop = this.stop.bind(this)
    this.queueSong = this.queueSong.bind(this)
    this.togglePlayback = this.togglePlayback.bind(this)
    this.updateMetadata = this.updateMetadata.bind(this)
    this.updatePlaylist = this.updatePlaylist.bind(this)
    this.updatePlaybackStatus = this.updatePlaybackStatus.bind(this)
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
      const metadata = this.parseTrackMetadata(data)
      this.updateMetadata(metadata)
    })
  }

  componentWillUnmount() {
    this.props.store.spotifyEventEmitter.removeSubscription("audioStreamingDidChangeToTrack")
  }

  componentWillMount() {
    SpotifyModule.loggedIn((res) => {
      this.props.store.loggedIn = res
    })
    this.updatePlaybackStatus()
  }

  initPlaylist() {
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

  updatePlaybackStatus() {
    SpotifyModule.isPlaying((res) => {
      this.props.store.playing = res
    })
  }

  play(songURIs) {
    const playing = this.props.store.playing
    const paused = this.props.store.paused
    if (playing && !paused) {
      this.togglePlayback(false)
    } else if (paused) {
      this.togglePlayback(true)
    } else if (this.props.store.playlist.length > 0) {
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

    stop() {
      SpotifyModule.stop(() => {console.log("Stopped")})
      this.props.store.paused = false
      this.props.store.playing = false
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
        this.updatePlaybackStatus()
        const next = this.nextTrack()
        if (next) {
          console.log("next: ", next)
          this.props.store.playlist = [
            ...this.props.store.playlist.slice(1)
          ]
        } else {
          console.log("No songs in queue")
        }
      })
    }

    skipPrevious() {
      SpotifyModule.skipPrevious((res) => {
        this.updatePlaybackStatus()
        const previous = this.previousTrack()
        if (previous) {
          this.props.store.playlist = [
            previous,
            ...this.props.store.playlist
          ]
          this.props.store.history = [
            ...this.props.store.history.slice(1)
          ]
        } else {
          console.log("No previous tracks")
        }
        // this.updateTracks()
      })
    }

    togglePlayback(play) {
      this.props.store.playing = play
      this.props.store.paused = !play
      SpotifyModule.setIsPlaying(play, (err) => console.log(err))
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
              <Button style={styles.button} onPress={this.stop} title="Stop" />
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
