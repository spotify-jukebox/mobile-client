const spotifyWebApiBaseUrl = "https://api.spotify.com"
const spotifyWebApiVersion = "v1"
const backendBaseUrl = "https://spotily-api.herokuapp.com"

export const SpotifyWebApi = {
  baseUrl: spotifyWebApiBaseUrl,
  version: spotifyWebApiVersion,
  url: spotifyWebApiBaseUrl + "/" + spotifyWebApiVersion
}

export const BackendApi = {
  baseUrl: backendBaseUrl
}
