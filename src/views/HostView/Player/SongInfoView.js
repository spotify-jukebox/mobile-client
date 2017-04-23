import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { observer } from 'mobx-react'
import Ionicons from 'react-native-vector-icons/Ionicons'

import { colors, baseStyles, roundedButton } from '../../../styles/defaultStyles'



const SongInfoView = observer(({props}) => {
  return(
    <View>
      <Text>Song name</Text>
    </View>
  )
})

const styles = StyleSheet.create({
  songName: {
    fontSize: 16
  },
  songArtist: {
    fontSize: 14
  },
  addButton: {
    ...roundedButton.button
  },
  addButtonText: {
    fontSize: 20,
    color: colors.white,
    justifyContent: 'center'
  }
})


export default SongInfoView
