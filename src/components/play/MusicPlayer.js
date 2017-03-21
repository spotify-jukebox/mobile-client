import React from 'react'
import { ScrollView, View, Text, NativeModules, StyleSheet } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

import Button from '../reusable/button'

import { baseStyles } from '../../styles/defaultStyles'

import mockPlaylist from '../../data/mockPlaylist'

var SpotifyModule = NativeModules.SpotifyAuth

class MusicPlayer extends React.Component {
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

    this.state = {
      message: 'message',
      loggedIn: '',
      playing: false,
      metadata: '',
      playlist: [],
      history: [],
      currentTrack: "",
      metadata: {}
    }
  }
  componentDidMount() {
  }
  componentWillMount() {
    // this.initPlaylist()
  }

  initPlaylist() {
    console.log("Queuing songs...: ", mockPlaylist)
    this.setState({playlist: mockPlaylist, currentTrack: mockPlaylist[0]})
  }

  updatePlaylist(song) {
    this.setState({playlist: [
      ...this.state.playlist,
      song
    ]})
  }

  updateTracks() {
    SpotifyModule.metadata(metadata => {
      console.log(metadata)
      // const previous = metadata.previousTrack.playbackSourceName
      // const current = metadata.currentTrack.playbackSourceName
      // const next = metadata.nextTrack.playbackSourceName
      const current = this.state.playlist[0]
      this.setState({
        // previousTrack: next ? next : "empty",
        currentTrack: current ? current : "",
        // nextTrack: next ? next : "empty"
      })
    })
  }

  nextTrack() {
    const next = this.state.playlist[1]
    return (next) ? next : ""
  }

  previousTrack() {
    const previous = this.state.history[0]
    return (previous) ? previous : ""
  }

  test() {
    SpotifyModule.initialized((res) => {
      console.log('init:', res)
      this.setState({ message: res })
    })
    SpotifyModule.loggedIn((res) => {
      console.log(res)
      this.setState({ loggedIn: res })
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
            this.setState({ playing: true })
            SpotifyModule.metadata(metadata => {
              this.setState({metadata: metadata})
              console.log("updated metadata: ", metadata)
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
          this.setState({
            currentTrack: next,
            playlist: [
              ...this.state.playlist.slice(1)
            ],
            history: [
              this.state.currentTrack,
              ...this.state.history
            ]
          })
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
          this.setState({
            currentTrack: previous,
            playlist: [
              previous,
              ...this.state.playlist
            ],
            history: [
              ...this.state.history.slice(1)
            ]
          })
          this.play(previous)
        } else {
          console.log("No previous tracks")
        }
        // this.updateTracks()
      })
    }
    togglePlayback() {
      const now = this.state.playing
      this.setState({ playing: !now })
      console.log(SpotifyModule.metadata())
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
          this.setState({ message: 'login success' })
        }
      })
    }

    currentSongView = ({metadata}) => {
      console.log("now the metadata is..:", metadata)
      if (metadata && metadata.currentTrack) {
        return (
          <View>
            <Text>Name: {metadata.currentTrack.name}</Text>
            <Text>Artist: {metadata.currentTrack.artistName}</Text>
            <Text>Song duration: {metadata.currentTrack.duration}</Text>
          </View>
        )
      } else {
        return (
          <Text>Waiting for songs</Text>
        )
      }
    }

    render() {
      return (
        <View style={styles.container}>
        <ScrollView>
          <View>
            <Text>Playlist:</Text>
            <Text>{JSON.stringify(this.state.playlist)}</Text>
          </View>
          <View>
            <Text>Current track:</Text>
            <Text>{JSON.stringify(this.state.currentTrack)}</Text>
          </View>
          {this.currentSongView(this.state.metadata)}

          <Button style={styles.button} onPress={this.spotifyLogin} title="Login" />
          <Button style={styles.button} onPress={this.test} title="Test" />
          <Button style={styles.button} onPress={() => this.play(this.state.currentTrack)} title="Play" />
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

  export default MusicPlayer
