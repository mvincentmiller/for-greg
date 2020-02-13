//ThingStore.js
import { createContext } from 'react'
import { action, decorate, observable } from 'mobx'

export class UiStore {
  progress = 1
  toast = { display: false, message: '' }

  set = (key, value) => {
    this[key] = value
  }

  pushNotification = async TostMessage => {
    this.set('toast', { display: true, message: TostMessage })
    await new Promise((resolve, reject) => setTimeout(resolve, 5000))
    this.set('toast', { display: false, message: '' })
  }
}

decorate(UiStore, {
  progress: observable,
  pushNotification: action,
  set: action,
})

export default createContext(new UiStore())
