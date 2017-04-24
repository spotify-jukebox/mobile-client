import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'

import { baseStyles, roundedButton } from '../styles/defaultStyles'

const Button = ({ title, children, style, titleStyle, ...props }) => (
  <TouchableOpacity
    style={style || styles.button}
    {...props}
  >
    {title && <Text style={titleStyle || styles.title}>{title}</Text>}
    {children}
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  button: {
    ...roundedButton.button
  },
  title: {
    ...roundedButton.title
  }
})

export default Button
