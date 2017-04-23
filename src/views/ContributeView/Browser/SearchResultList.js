import React from 'react'
import { Button, ListView, View, Text, StyleSheet } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

import { observer } from 'mobx-react'
import { observable, autorun } from 'mobx';

import { colors, baseStyles } from '../../../styles/defaultStyles'

const Row = observer(({props}) => {
  const { heading, sub, trackUri, sendSongToQueue } = props
  return(
    <View style={styles.row}>
      <Text>{heading}</Text>
      <Text>{sub}</Text>
      <Button
        title="Add"
        onPress={() => sendSongToQueue(trackUri)} />
    </View>
  )
})

const SearchResultList = observer(({props}) => {
  const { tracks, trackDataSource, sendSongToQueue } = props
  return(
    <ListView
      dataSource={trackDataSource}
      renderRow={(rowData) => <Row props={{...rowData, sendSongToQueue: sendSongToQueue}} />}
    />
  )
})

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
