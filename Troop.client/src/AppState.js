import { action, makeAutoObservable } from "mobx"
import { isValidProp } from "./utils/isValidProp.js"


class ObservableAppState {

  user = null
  /** @type {import('./models/Account.js').Account} */
  account = null
  /** @type {import('./models/Event.js').Event[]} */
  events = []
  /** @type {import('./models/Event.js').Event} */
  event = null
  /** @type {import('./models/Ticket.js').Ticket[]} */
  eventTickets = []
  /** @type {import('./models/Ticket.js').Ticket[]} */
  myTickets = []
  /** @type {import('./models/Comment.js').Comment[]} */
  comments = []

  constructor() {
    makeAutoObservable(this)
  }

}

// eslint-disable-next-line no-undef
export const AppState = new Proxy(new ObservableAppState(), {
  get(target, prop) {
    isValidProp(target, prop)
    return target[prop]
  },
  set(target, prop, value) {
    isValidProp(target, prop)
    action(() => {
      target[prop] = value
    })()
    return true
  }
})