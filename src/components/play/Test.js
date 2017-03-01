//You need to import NativeModules to your view
import React from 'react'
import { View, Text, NativeModules, StyleSheet } from 'react-native'

import Button from '../reusable/button'

//Assign our module from NativeModules and assign it to a variable
var SpotifyAuth = NativeModules.SpotifyAuth

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
      playing: false
    }
  }
  componentDidMount() {

  }
  test() {
    SpotifyAuth.initialized((res) => console.log('init:', res))
    SpotifyAuth.loggedIn((res) => this.setState({loggedIn: res}))
  }
  play() {
    SpotifyAuth.play(
      "spotify:track:6HxIUB3fLRS8W3LfYPE8tP",
      0,
      12.0
      , (error) => console.log(error))
  }
  togglePlayback() {
    const now = this.state.playing
    this.setState({playing: !now})
    SpotifyAuth.setIsPlaying(!now, err => console.log(err))
  }
  spotifyLogin() {
    const options = {
      clientID: 'f276a6769fd44a8c90def02576609c1b',
      redirectURL: 'juke-auth://callback',
      requestedScopes: ['streaming']
      //qt^v@??x2>pkbE
    }
    SpotifyAuth.login(options, (error) => {
      console.log('spotify callback')
      console.log(error)
      if (error) {
        console.log(error)
      } else {
        console.log("login success")
        this.setState({message: 'login success'})        
      }
    })
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>{this.state.message}</Text>
        <Text>{this.state.loggedIn}</Text>
        <Button onPress={this.spotifyLogin} title="Login" />
        <Button onPress={this.test} title="Test"/>
        <Button onPress={this.play} title="Play"/>
        <Button onPress={this.togglePlayback} title="Toggle" />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-between'
  }
})

export default Test