import React from 'react'
import { ScrollView, View, Text, NativeModules, StyleSheet } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

import { observer } from 'mobx-react'
import { observable, autorun } from 'mobx';

import Button from '../reusable/button'

import { baseStyles } from '../../styles/defaultStyles'

import mockPlaylist from '../../data/mockPlaylist'

var SpotifyModule = NativeModules.SpotifyAuth

class MusicPlayerStore {
  @observable playing = false
  @observable metadata = {}
  @observable playlist = []
  @observable history = []
  @observable currentTrack = ""
  @observable spliced = 0
  @observable nextTrack = ""
}


@observer
class MusicPlayerView extends React.Component {

  constructor() {
    super()
    this.spotifyLogin = this.spotifyLogin.bind(this)
    this.play = this.play.bind(this)
    this.queueSong = this.queueSong.bind(this)
    this.togglePlayback = this.togglePlayback.bind(this)
    this.updatePlaylist = this.updatePlaylist.bind(this)
    this.skipNext = this.skipNext.bind(this)
    this.skipPrevious = this.skipPrevious.bind(this)
    this.initPlaylist = this.initPlaylist.bind(this)
    this.nextTrack = this.nextTrack.bind(this)
    this.previousTrack = this.previousTrack.bind(this)
  }

  componentDidMount() {
  }

  componentWillMount() {
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
    // const metadata = SpotifyModule.metadata((res) => {console.log("res: ", res)})
    // const currentTrack = (metadata) ? metadata.currenTrack : null
    // const nextTrack = (metadata) ? metadata.nextTrack : null
    // const trackToPlay = (currentTrack) ? currentTrack : nextTrack
    // SpotifyModule.queue("spotify:track:5I9zIwGB6f0edpjO5oX2b9").then((res) => {
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
          // this.play(next)
        console.log(res)
        } else {
          console.log("No songs in queue")
        }
        // this.updateTracks()
      })
    }
    // queueNext() {
    //   const next = this.nextTrack()
    //   console.log("When queueing, next was: ", next)
    //   if (next) {
    //     SpotifyModule.queue(next, (error) => {
    //       this.props.store.nextTrack = next
    //       console.log("error happened: ", error)
    //     })
    //   }
    // }
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
          console.log("login success")
        }
      })
    }




    render() {
      const store = this.props.store
      return (
        <View style={styles.container}>
          <ScrollView>
            <View>
              <Text>Playlist:</Text>
              <Text>{store.playlist}</Text>
            </View>
            <View>
              <Text>Current track: {store.currentTrack}</Text>
              <Text>Next up: {store.nextTrack}</Text>
              <Text>Playing: {(store.playing) ? "true" : "false"}</Text>
            </View>


            <Button style={styles.button} onPress={this.spotifyLogin} title="Login" />
            <Button style={styles.button} onPress={() => this.play(store.playlist.peek())} title="Play" />
            <Button style={styles.button} onPress={this.skipNext} title="Next" />
            <Button style={styles.button} onPress={this.skipPrevious} title="Previous" />
            <Button style={styles.button} onPress={this.initPlaylist} title="Init playlist" />
            <Button style={styles.button} onPress={this.togglePlayback} title="Toggle" />
            <Button style={styles.button} onPress={this.queueSong} title="Update" />
          </ScrollView>
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

  const musicStore = new MusicPlayerStore()
  const MusicPlayer = () => <MusicPlayerView store={musicStore} />

export default MusicPlayer
