import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { observer } from 'mobx-react'
import Icon from 'react-native-vector-icons/FontAwesome'

import Button from '../../../reusable/button'
import contributorStore from '../contributorStore'
import { colors } from '../../../styles/defaultStyles'

const PlaylistView = observer(({ props }) => {
  console.log(props)
  return (
    <View style={styles.bottombar}>
      <Button style={styles.quitButton}>
        <Icon name="caret-down" size={26} color={colors.darkGrey} />
      </Button>
      <TouchableOpacity style={styles.playlistContainer}>
        <Text style={styles.barText}> { contributorStore.playlistName } </Text>
      </TouchableOpacity>
    </View>
  )
})

const styles = StyleSheet.create({
  bottombar: {
    height: 50,
    backgroundColor: colors.barColor,
    borderTopWidth: 1,
    borderTopColor: colors.lightestGrey,
    paddingVertical: 8,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row'
  },
  playlistContainer: {
    borderWidth: 1,
    borderColor: colors.accentColor,
    borderRadius: 18,
    padding: 4,
  },
  quitButton: {
    padding: 4,
    alignItems: 'center',
    justifyContent: 'center'
  },
  barText: {
    color: colors.accentColor,
    fontSize: 18
  }
})

export default PlaylistView
