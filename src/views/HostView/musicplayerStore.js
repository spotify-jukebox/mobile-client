import { NativeEventEmitter, NativeModules } from 'react-native'
import { observable, action, computed } from 'mobx'

const SpotifyModule = NativeModules.SpotifyAuth
const SpotifyEventModule = NativeModules.SpotifyEventManager

class MusicPlayerStore {
  @observable loggedIn = false
  @observable playing = false
  @observable paused = false
  @observable playlist = []
  @observable history = []
  @observable currentTrack = {}
  @observable spliced = false
  @observable nextTrack = ''
  @observable spotifyEventEmitter = new NativeEventEmitter(SpotifyEventModule)

  @observable hostedPlaylistName = ''

  @computed get isHosting () {
    return this.hostedPlaylistName !== undefined && this.hostedPlaylistName.length > 0
  }

  @action setHostingList (playlist) {
    console.log('store list set as ' + playlist)
    this.hostedPlaylistName = playlist
  }

  @action addToPlaylist (tracks, i) {
    this.playlist = [...this.playlist.slice(i), ...tracks]
  }

  @action setPlaylist (playlist) {
    console.log(playlist)
    this.playlist = playlist
    // this.currentTrack = playlist[0]
  }

  @action addNewTrack (trackUri) {
    this.playlist.push(trackUri)
    SpotifyModule.currentTrackIndex((index) => {
      SpotifyModule.replaceUris(this.playlist.peek(), index, (error) => {
        console.log('Something went wrong adding a track: ', error)
      })
    })
  }
}

const store = new MusicPlayerStore()
export default store
