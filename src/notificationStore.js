import React from 'react'
import { PushNotificationIOS, AsyncStorage } from 'react-native'
import { observable, computed, action } from 'mobx'
import musicPlayerStore from './views/HostView/musicplayerStore'

const storageID = 'SpotilyJukeboxStorage'

class NotificationStore {
  @observable test = 'tiger-wolf-dog'
  @observable deviceToken = ''
  @observable latestNotification = undefined
  @observable notifications = []

  @computed get data () {
    return { token: this.deviceToken, list: this.notifications }
  }

  callback = stuff => console.log(stuff)

  registerCallback (token) {
    console.log('registerCallback: ' + token)
    if (token) {
      this.deviceToken = token
      AsyncStorage.setItem(`${storageID}:token`, token)
        .then((res) => {
          console.log(res)
        })
        .catch(error => console.log(error))
    }
  }

  @computed get hasToken () {
    return this.deviceToken !== undefined && this.deviceToken.length > 0
  }

  notificationCallback (notification) {
    console.log('got notification')
    const { _data: data } = notification
    console.log(data)
    this.notifications.push(data)
    if (data.track_url) {
      musicPlayerStore.addNewTrack(data.track_url)
    }
    this.latestNotification = data
  }

  setListeners () {
    console.log('registering listeners')
    PushNotificationIOS.addEventListener('register', this.registerCallback.bind(this))
    PushNotificationIOS.addEventListener('registrationError', this.callback.bind(this))
    PushNotificationIOS.addEventListener('notification', this.notificationCallback.bind(this))
    PushNotificationIOS.addEventListener('localNotification', this.callback.bind(this))
    console.log('done registering listeners')
  }

  @action register () {
    this.setListeners()
    console.log('store register')
    AsyncStorage.getItem(`${storageID}:token`)
      .then((value) => {
        console.log('token is: ' + value)
        if (value !== null) {
          // We have data!!
          this.deviceToken = value
        } else {
          console.log('require request permission')
          PushNotificationIOS.requestPermissions()
        }
      })
      .catch((error) => {
        console.log('asyncstorage', error)
        PushNotificationIOS.requestPermissions()
      })
  }


}

const store = new NotificationStore()

export default store
