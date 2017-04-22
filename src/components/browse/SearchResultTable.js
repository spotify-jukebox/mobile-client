import React from 'react'
import { ScrollView, View, Text, NativeModules, StyleSheet } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

import { observer } from 'mobx-react'
import { observable, autorun } from 'mobx';

import { colors, baseStyles } from '../../styles/defaultStyles'

const Row = observer(({props}) => {
  const { heading, sub} = props
  return(
    <View style={styles.row}>
      <h3>{heading}</h3>
      <p>{sub}</p>
    </View>
  )
})

const SearchResultTable = observer(({props}) => {
  const { trackItems } = props
  console.log("Tracks in table component: ", trackItems)
  return(
    <ScrollView style={styles.results}>
      {trackItems.map((track, i) => {
        const artists = track.artists
        const rowProps = {
          heading: track.name,
          sub: (artists.length > 1) ? artists[0] + ", ..." : artists[0]
        }
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
    flex: 1,
    borderWidth: 2
  },
  row: {
    height: 30
  }
})


export default SearchResultTable
