const colors = {
  black: '#010d06',
  accentColor: '#0be573',
  darkGrey: '#363735'
}

const styles = {
  colors: { ...colors },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  welcomeText: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: '400',
    color: colors.accentColor,
    margin: 10
  }
}

export default styles