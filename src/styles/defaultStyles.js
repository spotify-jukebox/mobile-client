export const colors = {
  black: '#010d06',
  white: '#fff',
  accentColor: '#0be573',
  accentColorDark: '#12cd6b',
  appleGrey: '#f2f2f2',
  barColor: '#f3f3f3',
  barTextColor: 'black',
  lightestGrey: '#e3e3e3',
  lightGreen: '#ccfaea',
  darkGrey: '#363735',
  grey: '#cecece',
  lightGrey: '#bcbcbc',
  testRed: '#c65553'
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

export const playlistStyle = {
  container: {
    borderWidth: 1,
    borderColor: colors.accentColor,
    borderRadius: 18,
    padding: 4,
    paddingHorizontal: 10
  },
  title: {
    color: colors.accentColor,
    fontSize: 18
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
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
}

export const inputStyle = {
  padding: 8,
  height: 40,
  backgroundColor: colors.white,
  borderColor: colors.grey,
  borderWidth: 1,
  borderRadius: 4
}
