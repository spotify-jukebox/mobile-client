import React from 'react'
import { Text, TouchableOpacity, View, StyleSheet, ActivityIndicator } from 'react-native'

import { BackendApi } from '../config/ApiConfig'
import playerStore from '../views/HostView/musicplayerStore'
import notificationStore from '../notificationStore'
import { colors, roundedButton, inputStyle, playlistStyle } from './../styles/defaultStyles'

class CreateHostingListView extends React.Component {
  static navigationOptions = {
    header: {
      visible: false
    }
  }
  constructor() {
    super()
    this.state = { playlistName: '', loading: false, error: '' }
    this.setHostingList = this.setHostingList.bind(this)
    this.createHostingList = this.createHostingList.bind(this)
  }
  setHostingList (playlist) {
    playerStore.setHostingList(playlist)
    this.props.navigation.goBack()
  }
  createHostingList () {
    const { deviceToken } = notificationStore
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ device_token: deviceToken, name: 'random name lol' })
    }
    console.log(options)
    this.setState({ loading: true })
    fetch(`${BackendApi.baseUrl}/generate`, options)
      .then(res => res.json())
      .then((json) => {
        console.log(json)
        this.setState({ loading: false, playlistName: json.token })
      })
      .catch((err) => {
        this.setState({ loading: false, playlistName: null, error: 'Could not generate playlist' })
      })
  }
  render () {
    const { loading, playlistName, error } = this.state
    return (
      <View style={styles.container}>
        <View style={styles.welcome}>
          <Text style={styles.welcomeText}>
            {!loading && playlistName
              ? `New playlist was created: ${playlistName}`
              : 'Create a new jukebox for your party?'}
          </Text>
          <ActivityIndicator size="large" animating={loading} />
          <Text>{error}</Text>
        </View>

        <View style={styles.playlistForm}>
          <TouchableOpacity
            onPress={() => !playlistName ? this.createHostingList() : this.setHostingList(playlistName)}
            style={{ ...roundedButton.button, minWidth: 200 }}
          >
            <Text style={roundedButton.title}>{!playlistName ? 'Create' : 'OK'}</Text>
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
    justifyContent: 'center',
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
