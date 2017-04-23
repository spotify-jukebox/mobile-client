import { observable, computed, action } from 'mobx'

class PreferenceStore {
  @observable playlistId = 'tiger-wolf-dog'

  @computed get hasJoinedPlaylist () {
    return this.playlistId !== undefined && this.playlistId.length > 0
  }

  @action joinPlaylist = (playlistId) => {
    this.playlistId = playlistId
  }
}

export default new PreferenceStore()
