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
  @observable message = 'message'
  @observable loggedIn = ''
  @observable playing = false
  @observable metadata = {}
  @observable playlist = []
  @observable history = []
  @observable currentTrack = ""
}

@observer
class MusicPlayerView extends React.Component {
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
    console.log('test component here')
    this.spotifyLogin = this.spotifyLogin.bind(this)
    this.test = this.test.bind(this)
    this.play = this.play.bind(this)
    this.togglePlayback = this.togglePlayback.bind(this)
    this.updatePlaylist = this.updatePlaylist.bind(this)
    this.skipNext = this.skipNext.bind(this)
    this.skipPrevious = this.skipPrevious.bind(this)
    this.initPlaylist = this.initPlaylist.bind(this)
    this.updateTracks = this.updateTracks.bind(this)
    this.nextTrack = this.nextTrack.bind(this)
    this.previousTrack = this.previousTrack.bind(this)
    this.currentSongView = this.currentSongView.bind(this)


  }
  componentDidMount() {
    this.initPlaylist()
  }
  componentWillMount() {
    // this.initPlaylist()
  }

  initPlaylist() {
    console.log("Queuing songs...: ", mockPlaylist)
    this.props.store.playlist = mockPlaylist
    this.props.store.currentTrack = mockPlaylist[0]
  }

  updatePlaylist(song) {
    this.props.store.playlist = [
      ...this.props.store.playlist,
      song
    ]
  }

  updateTracks() {
    SpotifyModule.metadata(metadata => {
      console.log("METADATA", metadata)
      // const previous = metadata.previousTrack.playbackSourceName
      // const current = metadata.currentTrack.playbackSourceName
      // const next = metadata.nextTrack.playbackSourceName
      const current = this.props.store.playlist[0]
      this.props.store.currentTrack = current ? current : ""
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

  test() {
    SpotifyModule.initialized((res) => {
      console.log('init:', res)
      this.props.store.message = res
    })
    SpotifyModule.loggedIn((res) => {
      console.log(res)
      this.props.store.loggedIn = res
    })
  }

  play(songURI) {
    // const metadata = SpotifyModule.metadata((res) => {console.log("res: ", res)})
    // const currentTrack = (metadata) ? metadata.currenTrack : null
    // const nextTrack = (metadata) ? metadata.nextTrack : null
    // const trackToPlay = (currentTrack) ? currentTrack : nextTrack
    // SpotifyModule.queue("spotify:track:5I9zIwGB6f0edpjO5oX2b9").then((res) => {
    if (true) {
      console.log("Playing", songURI)
      SpotifyModule.play(
        songURI,
        0,
        12.0
        , (error) => {
          if (!error) {
            this.props.store.playing = true
            SpotifyModule.metadata(metadata => {
              console.log("SETTING METADATA =======", metadata)
              this.props.store.metadata = metadata
            })

          } else console.log(error)
        })
      } else {
        console.log("No tracks to play")
      }
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
          this.play(next)
        } else {
          console.log("No songs in queue")
        }
        // this.updateTracks()
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
            ...this.state.playlist
          ]
          this.props.store.history = [
            ...this.state.history.slice(1)
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
      console.log("playlist: ", this.props.store.playlist)
      console.log("metadata: ", this.props.store.metadata)
      SpotifyModule.setIsPlaying(!now, err => console.log(err))
    }
    spotifyLogin() {
      const options = {
        clientID: 'f276a6769fd44a8c90def02576609c1b',
        redirectURL: 'juke-auth://callback',
        requestedScopes: ['streaming']
      }
      SpotifyModule.login(options, (error) => {
        console.log('spotify callback')
        console.log(error)
        if (error) {
          console.log(error)
        } else {
          console.log("login success")
          this.props.store.message = 'login success'
        }
      })
    }

    currentSongView = (metadata) => {
      console.log("now the metadata is..:", metadata)
      if (metadata && metadata.currentTrack) {
        return (
          <View>
            <Text>
              {JSON.stringify(metadata)}
            </Text>
          </View>
        )
      } else {
        return (
          <Text>Waiting... metadata: {metadata}</Text>
        )
      }
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
              <Text>Current track:</Text>
              <Text>{JSON.stringify(store.currentTrack)}</Text>
            </View>
            {this.currentSongView(store.metadata)}

            <Button style={styles.button} onPress={this.spotifyLogin} title="Login" />
            <Button style={styles.button} onPress={this.test} title="Test" />
            <Button style={styles.button} onPress={() => this.play(store.currentTrack)} title="Play" />
            <Button style={styles.button} onPress={this.skipNext} title="Next" />
            <Button style={styles.button} onPress={this.skipPrevious} title="Previous" />
            <Button style={styles.button} onPress={this.initPlaylist} title="Init playlist" />
            <Button style={styles.button} onPress={this.togglePlayback} title="Toggle" />
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

  const MusicPlayer = () => <MusicPlayerView store={MusicPlayerStore} />

export default MusicPlayer
