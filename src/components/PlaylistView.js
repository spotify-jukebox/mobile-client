import React from 'react'
import { Button, Text, TextInput, View, StyleSheet, Image } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

import { baseStyles } from '../styles/defaultStyles'

class PlaylistView extends React.Component {
  static navigationOptions = {
    header: {
      title: ({route}) => route.params.playlistName
    }

  }
  constructor() {
    super()
  }
  componentDidMount() {
  }

  render() {
    const { goBack } = this.props.navigation

    return(
      <Button
        title="Go back"
        onPress={() => goBack()}
      />
    )
  }
}

export default PlaylistView

const styles = StyleSheet.create({
  container: baseStyles.container,
  welcome: baseStyles.welcomeText
})

//TODO: fix stack, unneeded back button on header when have opened welcome screen
