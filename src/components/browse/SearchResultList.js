import React from 'react'
import { ListView, View, Text, StyleSheet } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

import { observer } from 'mobx-react'
import { observable, autorun } from 'mobx';

import { colors, baseStyles } from '../../styles/defaultStyles'

const Row = observer(({props}) => {
  const { heading, sub} = props
  return(
    <View style={styles.row}>
      <Text>{heading}</Text>
      <Text>{sub}</Text>
    </View>
  )
})

const SearchResultList = observer(({props}) => {
  const { tracks, trackDataSource } = props
  if (tracks.length > 0) {
    console.log("First track in tracks: ", tracks[0])
    console.log("name: ", tracks[0].name)
  }
  return(
    <ListView
      dataSource={trackDataSource}
      renderRow={(rowData) => <Row props={rowData} />}
    />
  )
})

// {tracks.map((track, i) => {
//   const artists = track.artists
//   const rowProps = {
//     heading: track.name,
//     sub: (artists.length > 1) ? artists[0].name + ", ..." : artists[0].name
//   }
//   console.log("Drawing row for song: ", rowProps.heading)
//   console.log("with artist: ", rowProps.sub)
//   return(
//     <Row key={i} props={rowProps} />
//   )
// })}

const styles = StyleSheet.create({
  row: {
    borderWidth: 1,
    backgroundColor: colors.testRed,
  },
  results: {
    backgroundColor: colors.testRed,
    borderWidth: 2,
    flex: 1
  },
  row: {
    height: 50
  }
})


export default SearchResultList
