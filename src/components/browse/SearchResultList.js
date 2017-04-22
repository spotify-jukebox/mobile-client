import React from 'react'
import { ScrollView, View, Text, StyleSheet } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

import { observer } from 'mobx-react'
import { observable, autorun } from 'mobx';

import { colors, baseStyles } from '../../styles/defaultStyles'

const Row = observer(({props}) => {
  const { heading, sub} = props
  return(
    <View>
      <Text>{heading}</Text>
      <Text>{sub}</Text>
    </View>
  )
})

const SearchResultList = observer(({props}) => {
  const { tracks } = props
  if (tracks.length > 0) {
    console.log("First track in tracks: ", tracks[0])
    console.log("name: ", tracks[0].name)
  }
  return(
    <ScrollView>
      {tracks.map((track, i) => {
        const artists = track.artists
        const rowProps = {
          heading: track.name,
          sub: (artists.length > 1) ? artists[0].name + ", ..." : artists[0].name
        }
        console.log("Drawing row for song: ", rowProps.heading)
        console.log("with artist: ", rowProps.sub)
        return(
          <Row key={i} props={{rowProps}} />
        )
      })}
    </ScrollView>
  )
})

const styles = StyleSheet.create({
  table: {
  },
  results: {
    backgroundColor: colors.testRed,
    borderWidth: 2,
    flex: 1
  },
  row: {
    height: 30
  }
})


export default SearchResultList
