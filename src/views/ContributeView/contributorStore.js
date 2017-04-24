import { observable, computed, action } from 'mobx'
import { ListView } from 'react-native'
import { BackendApi } from '../../config/ApiConfig'

class ContributorStore {
  @observable loading = false
  @observable searchString = ''
  @observable tracks = [{ name: 'keijo', artists: [{ name: 'keijoke' }], trackUri: 'spotify:track:5I9zIwGB6f0edpjO5oX2b9' }]
  @observable artists = []
  @observable playlistName = 'tiger-wolf-dog'
  @observable addingSong = false
  @observable didAskForPlaylistName = false

  trackDs = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })

  @computed get hasJoinedPlaylist () {
    return this.playlistName !== undefined && this.playlistName.length > 0
  }

  @action joinPlaylist = (string) => {
    console.log('set playlist as: ', string)
    this.playlistName = string
    this.didAskForPlaylistName = false
  }

  @computed get trackDataSource () {
    return this.trackDs.cloneWithRows(this.tracks.map((track) => {
      const artists = track.artists
      return {
        heading: track.name,
        sub: (artists.length > 1) ? `${artists[0].name}, ...` : artists[0].name,
        trackUri: track.uri
      }
    }))
  }

  @action sendSongToQueue = (trackUri) => {
    this.addingSong = true
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ track_url: trackUri })
    }
    fetch(`${BackendApi.baseUrl}/list/${this.playlistName}`, options)
      .then(() => {
        this.addingSong = false
      })
      .catch((err) => {
        console.log('Failed to add song: ', err)
        this.addingSong = false
      })
  }
}

const store = new ContributorStore()

export default store
