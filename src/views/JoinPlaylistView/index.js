import React from 'react'
import { Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native'

import contributorStore from '../ContributeView/contributorStore'
import { colors, roundedButton, inputStyle } from '../../styles/defaultStyles'

class JoinPlaylistView extends React.Component {
  static navigationOptions = {
    header: {
      visible: false
    }
  }
  constructor() {
    super()
    this.state = { playlistInput: '' }
    this.setPlaylist = this.setPlaylist.bind(this)
    this.handleInput = this.handleInput.bind(this)
  }
  handleInput (input) {
    this.setState({ playlistInput: input })
  }
  setPlaylist (input) {
    contributorStore.joinPlaylist(input)
    // this.props.navigation.navigate('Bottom')
    this.props.navigation.goBack()
  }
  render () {
    return (
      <View style={styles.container}>
        <View style={styles.welcome}>
          <Text style={styles.welcomeText}>
            Welcome to Spotily!
            Join a playlist to get started.
          </Text>
        </View>

        <View style={styles.playlistForm}>
          <TextInput
            style={styles.nameInput}
            onChangeText={this.handleInput}
            placeholder="Playlist name"
            returnKeyType={'done'}
          />

          <TouchableOpacity
            onPress={() => this.setPlaylist(this.state.playlistInput)}
            style={roundedButton.button}
          >
            <Text style={roundedButton.title}>Join</Text>
          </TouchableOpacity>
        </View>

      </View>
    )
  }
}

export default JoinPlaylistView

const styles = StyleSheet.create({
  playlistForm: {
    padding: 60
  },
  nameInput: {
    ...inputStyle,
    marginBottom: 20
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    paddingVertical: 200,
    backgroundColor: colors.lightGreen
  },
  welcomeText: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: '400',
    color: colors.accentColor
  }
})
