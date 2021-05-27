import { AppState } from '../AppState'
import { api } from './AxiosService'

class ChatsService {
  async create(newChat) {
    await api.post('api/chats', newChat)
    const res = await api.get('api/profiles/' + AppState.account.id + '/chats')
    AppState.chats = res.data
  }

  async sendMessage(newMessage) {
    await api.post('api/messages', newMessage)
    this.getMessages(newMessage.chatId)
  }

  async getMessages(id) {
    const res = await api.get('api/chats/' + id + '/messages')
    AppState.tempMessages = res.data
  }
}

export const chatsService = new ChatsService()
