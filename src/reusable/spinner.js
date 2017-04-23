import React from 'react'
import { StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

import { baseStyles, colors } from '../styles/defaultStyles'

const Spinner = ({ style, ...props }) => (
  <Icon name="ion-load-c" size={30} />
)

export default Spinner
