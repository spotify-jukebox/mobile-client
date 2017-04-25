import React from 'react'
import { ScrollView, View, Text, TouchableOpacity, NativeModules, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Entypo'
import FoundationIcon from 'react-native-vector-icons/Foundation'
import { observer } from 'mobx-react'

import Button from '../../../reusable/button'
import playerStore from '../musicplayerStore'
import MetadataView from './MetadataView'

import { baseStyles, colors } from '../../../styles/defaultStyles'

import mockPlaylist from '../../../data/mockPlaylist'
import { SpotifyWebApi } from '../../../config/ApiConfig'

const SpotifyModule = NativeModules.SpotifyAuth

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
    this.getAlbumArtUrl = this.getAlbumArtUrl.bind(this)
  }

  componentWillMount () {
    SpotifyModule.loggedIn((res) => {
      playerStore.loggedIn = res
    })
    this.updatePlaybackStatus()
  }


  componentWillUnmount () {
    playerStore.spotifyEventEmitter.removeSubscription('audioStreamingDidChangeToTrack')
  }

  parseTrackMetadata (metadata) {
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


  initPlaylist () {
    playerStore.setPlaylist(mockPlaylist)
  }


  getAlbumArtUrl (albumUri) {
    const albumId = albumUri.split(":")[2]
    return fetch(`${SpotifyWebApi.url}/albums/${albumId}`)
      .then(res => res.json())
      .then((json) => {
        console.log("Album art image urls: " + json.images)
        return (json.images.length > 0) ? json.images[0] : {}
      })
      .catch((err) => {
        console.log("Something went wrong getting track info.")
        return {}
      })
  }

  componentDidMount () {
    playerStore.spotifyEventEmitter.addListener("audioStreamingDidChangeToTrack", (data) => {
      console.log("Event audioStreamingDidChangeToTrack received with data: ", data)
      const metadata = this.parseTrackMetadata(data)
      this.getAlbumArtUrl(metadata.albumUri).then((albumArt) => {
        console.log("ALBUM ART URL: ", albumArt.url)
        const metadataWithAlbumArt = { ...metadata, albumArt: albumArt }
        this.updateMetadata(metadataWithAlbumArt)
      })
    })
  }

  queueSong () {
    SpotifyModule.currentTrackIndex((index) => {
      const store = playerStore
      const spliceAmount = (store.splicedSongs > index) ? index : index - store.splicedSongs
      store.splicedSongs = (spliceAmount > index) ? spliceAmount : store.splicedSongs + spliceAmount
      const updatedPlaylist = [...playerStore.playlist.slice(spliceAmount), 'spotify:track:2SpEHTbUuebeLkgs9QB7Ue']
      playerStore.playlist = updatedPlaylist
      this.updatePlaylist(playerStore.playlist.peek())
    })
  }

  nextTrack () {
    const next = playerStore.playlist[1]
    return (next) || ''
  }

  previousTrack () {
    const previous = playerStore.history[0]
    return (previous) || ''
  }

  updatePlaybackStatus () {
    SpotifyModule.isPlaying((res) => {
      playerStore.playing = res
    })
  }

  play (songURIs) {
    const playing = playerStore.playing
    const paused = playerStore.paused
    if (playing && !paused) {
      this.togglePlayback(false)
    } else if (paused) {
      this.togglePlayback(true)
    } else if (playerStore.playlist.length > 0) {
      const options = {
        trackIndex: 0,
        startTime: 0.0
      }
      SpotifyModule.playURIs(
        songURIs,
        options,
        (error) => {
          if (!error) {
            playerStore.playing = true
            // SpotifyModule.metadata((metadata) => {
            //   playerStore.metadata = metadata
            // })
            // this.queueNext()
          } else console.log(error)
        })
    } else {
      console.log('No tracks to play')
    }
  }

  stop () {
    SpotifyModule.stop(() => { console.log('Stopped') })
    playerStore.paused = false
    playerStore.playing = false
  }

  updateMetadata (metadata) {
    playerStore.currentTrack = metadata
  }

  updatePlaylist (songURIs) {
    if (songURIs.length > 0) {
      SpotifyModule.replaceURIs(
        songURIs,
        0,
        (error) => {
          console.log('Something went wrong: ', error)
        }
      )
    }
  }

  queue (songURI) {
    SpotifyModule.queue(
      songURI,
      (error) => {
        if (error) {
          console.log('Something went wrong: ', error)
        }
      }
    )
  }
  skipNext () {
    SpotifyModule.skipNext((res) => {
      this.updatePlaybackStatus()
      const next = this.nextTrack()
      if (next) {
        console.log('next: ', next)
        playerStore.setPlaylist([
          ...playerStore.playlist.slice(1)
        ])
      } else {
        console.log('No songs in queue')
      }
    })
  }

  skipPrevious () {
    SpotifyModule.skipPrevious((res) => {
      this.updatePlaybackStatus()
      const previous = this.previousTrack()
      if (previous) {
        playerStore.playlist = [
          previous,
          ...playerStore.playlist
        ]
        playerStore.history = [
          ...playerStore.history.slice(1)
        ]
      } else {
        console.log('No previous tracks')
      }
      // this.updateTracks()
    })
  }

  togglePlayback (play) {
    playerStore.playing = play
    playerStore.paused = !play
    SpotifyModule.setIsPlaying(play, err => console.log(err))
  }
  spotifyLogin () {
    const options = {
      clientID: 'f276a6769fd44a8c90def02576609c1b',
      redirectURL: 'juke-auth://callback',
      requestedScopes: ['streaming']
    }

    SpotifyModule.setClientID(options.clientID, options.redirectURL, options.requestedScopes, (error) => {
      if (error) {
        console.log(error)
      } else {
        playerStore.loggedIn = true
        console.log('login success')
      }
    })
  }

  render () {
    return (
      <View style={styles.container}>
        {(playerStore.loggedIn) ? (
          <View>
            <Text>Hosting list: {playerStore.hostedPlaylistName}</Text>
            <Text>Upcoming songs: {playerStore.playlist.length}</Text>
            <MetadataView metadata={playerStore.currentTrack} />
            <Button style={styles.button} onPress={this.initPlaylist} title="Init playlist" />
            <Button style={styles.button} onPress={this.queueSong} title="Update" />
            <View style={styles.playerControls}>
              <TouchableOpacity
                onPress={this.stop}
              >
                <Icon name="controller-stop" size={40} color={colors.darkGrey} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.playbutton}
                disabled={!playerStore.playlist}
                onPress={() => this.play(playerStore.playlist.peek())}
              >
                {!playerStore.playing
                  ? <Icon name="controller-play" size={90} />
                  : <FoundationIcon name="pause" size={90} />
                }
              </TouchableOpacity>
              <TouchableOpacity
                onPress={this.skipNext}
              >
                <Icon name="controller-next" size={40} color={colors.darkGrey} />
              </TouchableOpacity>

            </View>
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
    ...baseStyles.container,
    flex: 1,
    justifyContent: 'flex-end'
  },
  playerControls: {
    maxHeight: 140,
    minHeight: 140,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  playbutton: {
    alignItems: 'center',
    width: 100,
    minWidth: 100,
    maxWidth: 100
  },
  button: {
    backgroundColor: colors.testRed
  }
})

export default MusicPlayerView
