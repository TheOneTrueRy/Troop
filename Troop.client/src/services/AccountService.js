import { AppState } from '../AppState'
import { Account } from '../models/Account.js'
import { Ticket } from "../models/Ticket.js"
import { logger } from '../utils/Logger.js'
import { api } from './AxiosService'

class AccountService {
  async getAccount() {
    try {
      if (AppState.account) {
        return AppState.account
      }
      const res = await api.get('/account')
      AppState.account = new Account(res.data)
      await this.getMyTickets()
      return AppState.account
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???')
      return null
    }
  }

  async getMyTickets() {
    const res = await api.get('account/tickets')
    AppState.myTickets = res.data.map(t => new Ticket(t))
    logger.log('My Tickets:', AppState.myTickets)
  }
}

export const accountService = new AccountService()