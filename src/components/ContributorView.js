import React from 'react'
import { Button, Text, TextInput, View, StyleSheet, Image } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

import { baseStyles } from '../styles/defaultStyles'

class ContributorView extends React.Component {
  static navigationOptions = {
    header: {
      title: 'Add'
    },
    tabBar: {
      label: 'Add',
      icon: ({ tintColor }) => (
        <Ionicons name="ios-home-outline" style={{ color: tintColor }} size={26} />
      )
    }
  }
  constructor() {
    super()
    this.state = { text: 'Useless Placeholder', playlists: []}
    this.addPlaylist = this.addPlaylist.bind(this)
    this.removePlaylist = this.removePlaylist.bind(this)
    this.inspectPlaylist = this.inspectPlaylist.bind(this)
  }
  componentDidMount() {
  }

  addPlaylist(playlistName) {
    this.setState({playlists: [...this.state.playlists, playlistName]})
  }

  removePlaylist(playlistIndex) {
    this.setState({
      playlists: [
        ...this.state.playlists.slice(0, playlistIndex),
        ...this.state.playlists.slice(playlistIndex + 1)
      ]
    })
  }

  inspectPlaylist(i) {
    this.props.navigation.navigate('Playlist', {playlistName: this.state.playlists[i]})
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Join playlist
        </Text>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onSubmitEditing={(event) => this.addPlaylist(event.nativeEvent.text)}
          placeholder={this.state.text}
          returnKeyType={'done'}
        />
        <View>
          {this.state.playlists.map((playlistName, i) => {
            return(
              <View key={i}>
                <Text onPress={() => this.inspectPlaylist(i)}>
                  {playlistName}
                </Text>
                <Button style={styles.button} onPress={() => this.removePlaylist(i)} title="X" />
              </View>
            )
          })}
        </View>
        <Text style={styles.welcome}>
          Add song to playlist
        </Text>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
        />
      </View>
    )
  }
}

export default ContributorView

const styles = StyleSheet.create({
  container: baseStyles.container,
  welcome: baseStyles.welcomeText
})

//TODO: fix stack, unneeded back button on header when have opened welcome screen
