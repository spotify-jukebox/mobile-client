export const colors = {
  black: '#010d06',
  white: '#fff',
  accentColor: '#0be573',
  accentColorDark: '#12cd6b',
  darkGrey: '#363735',
  lightGrey: '#bcbcbc',
  testRed: '#c65553',
}

export const roundedButton = {
  button: {
    backgroundColor: colors.accentColor,
    paddingVertical: 8,
    paddingHorizontal: 30,
    borderRadius: 26,
    alignItems: 'center'
  },
  title: {
    fontSize: 20,
    color: 'white'
  }
}

export const baseStyles = {
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: colors.white
  },
  welcomeText: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: '400',
    color: colors.accentColor,
    margin: 10
  }
}

export const inputStyle = {
  padding: 8,
  height: 40, 
  borderColor: colors.lightGrey, 
  borderWidth: 1,
  borderRadius: 2
}