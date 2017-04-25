import React from 'react'
import { PushNotificationIOS, AsyncStorage } from 'react-native'
import { observable, computed, action } from 'mobx'

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

  @action handleNotification (notification) {
    this.notifications.push(notification)
    this.latestNotification = notification
  }

  notificationCallback (notification) {
    console.log('got notification')
    console.log(notification)
    this.handleNotification(notification)
  }

  setListeners () {
    console.log('registering listeners')
    PushNotificationIOS.addEventListener('register', this.registerCallback)
    PushNotificationIOS.addEventListener('registrationError', this.callback)
    PushNotificationIOS.addEventListener('notification', this.callback)
    PushNotificationIOS.addEventListener('localNotification', this.callback)
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
          console.log(value)
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
