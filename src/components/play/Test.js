import React from 'react'
import { View, Text, NativeModules, StyleSheet } from 'react-native'

import Button from '../reusable/button'

var SpotifyModule = NativeModules.SpotifyAuth

class Test extends React.Component {
  constructor() {
    super()
    console.log('test component here')
    this.spotifyLogin = this.spotifyLogin.bind(this)
    this.test = this.test.bind(this)
    this.play = this.play.bind(this)
    this.togglePlayback = this.togglePlayback.bind(this)

    this.state = {
      message: 'message',
      loggedIn: '',
      playing: false,
      metadata: ''
    }
  }
  componentDidMount() {

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
  play() {
    SpotifyModule.play(
      "spotify:track:6HxIUB3fLRS8W3LfYPE8tP",
      0,
      12.0
      , (error) => {
        if (!error) {
          this.setState({ playing: true })
          SpotifyModule.metadata(metadata => this.setState(metadata))

        } else console.log(error)
      })
  }
  togglePlayback() {
    const now = this.state.playing
    this.setState({ playing: !now })
    SpotifyModule.setIsPlaying(!now, err => console.log(err))
  }
  spotifyLogin() {
    const options = {
      clientID: process.env.clientID,
      redirectURL: process.env.redirectURL,
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
  render() {
    return (
      <View style={styles.container}>
        <Text>{JSON.stringify(this.state)}</Text>
        <Button style={styles.button} onPress={this.spotifyLogin} title="Login" />
        <Button style={styles.button} onPress={this.test} title="Test" />
        <Button style={styles.button} onPress={this.play} title="Play some random" />
        <Button style={styles.button} onPress={this.togglePlayback} title="Toggle" />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center'
  },
  button: {
    flex: 0,
    marginTop: 10
  }
})

export default Test