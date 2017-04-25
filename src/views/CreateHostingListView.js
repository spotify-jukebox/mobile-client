import React from 'react'
import { Text, TextInput, TouchableOpacity, View, StyleSheet, Button } from 'react-native'

import { colors, roundedButton, inputStyle, playlistStyle } from './../styles/defaultStyles'

class CreateHostingListView extends React.Component {
  static navigationOptions = {
    header: {
      visible: false
    }
  }
  constructor() {
    super()
    this.state = { playlistName: '', loading: false }
    this.setHostingList = this.setHostingList.bind(this)
  }
  setHostingList (input) {
    this.props.navigation.goBack()
  }
  render () {
    const { loading, playlistName } = this.state
    return (
      <View style={styles.container}>
        <View style={styles.welcome}>
          <Text style={styles.welcomeText}>
            {!loading && playlistName && `New playlist was created: ${this.state.playlistName}`}
            Create a new jukebox for your party?
          </Text>

        </View>

        <View style={styles.playlistForm}>
          <TouchableOpacity
            onPress={() => this.setPlaylist(this.state.playlistInput)}
            style={{ ...roundedButton.button }}
          >
            <Text style={roundedButton.title}>Create</Text>
          </TouchableOpacity>
        </View>

      </View>
    )
  }
}

export default CreateHostingListView

const styles = StyleSheet.create({
  playlistForm: {
    padding: 60,
    justifyContent: 'center',
    alignItems: 'center'
  },
  nameInput: {
    ...inputStyle,
    marginBottom: 20
  },
  playlist: {
    ...playlistStyle.container,
    alignSelf: 'center',
    marginVertical: 20
  },
  playlistText: {
    ...playlistStyle.title
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
