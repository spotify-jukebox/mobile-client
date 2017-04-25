import { NativeEventEmitter, NativeModules } from 'react-native'
import { observable, action, autorun, computed } from 'mobx'

const SpotifyEventModule = NativeModules.SpotifyEventManager

class MusicPlayerStore {
  @observable loggedIn = false
  @observable playing = false
  @observable paused = false
  @observable internalPlaylist = []
  @observable history = []
  @observable currentTrack = {}
  @observable spliced = 0
  @observable nextTrack = ''
  @observable spotifyEventEmitter = new NativeEventEmitter(SpotifyEventModule)

  @computed get playlist () {
    return this.internalPlaylist
  }

  @action setPlaylist (playlist) {
    console.log(playlist)
    this.internalPlaylist = playlist
    // this.currentTrack = playlist[0]
  }
}

const store = new MusicPlayerStore()
export default store
