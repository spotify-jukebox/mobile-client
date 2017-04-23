import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'

import { baseStyles, roundedButton } from '../styles/defaultStyles'

const Button = ({ title, children, style, ...props }) => {
  console.log(title)
  return (
    <TouchableOpacity
      style={[styles.button, style]}
      {...props}
    >
      <Text style={styles.title}>{title}</Text>
      {children}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    ...roundedButton.button
  },
  title: {
    ...roundedButton.title
  }
})

export default Button
