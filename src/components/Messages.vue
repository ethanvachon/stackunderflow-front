<template>
  <div class="bg-white py-2 rounding w-80 transition-all" :class="{ 'h-10' : state.expanded == false, 'h-96' : state.expanded == true}">
    <div class="flex justify-between pb-2" @click="state.expanded = !state.expanded">
      <h1 class="font-bold text-md pl-2">
        Messages
      </h1>
      <div class="flex items-center">
        <i class="fas fa-edit pr-4" @click="state.expanded = false, state.write = !state.write"></i>
        <i v-if="state.expanded == false" class="fas fa-chevron-down pr-2"></i>
        <i v-if="state.expanded == true" class="fas fa-chevron-up pr-2"></i>
      </div>
    </div>
    <div v-if="state.expanded == true" class="border-top ovrflw" id="chat">
      <div v-if="state.write == false && state.messaging == false">
        <div @click="state.chatter = chat.user, state.messaging = true, getMessages(chat.user.id)" class="border-top border-bottom py-2 flex items-center" v-for="chat in state.chats" :key="chat.id">
          <img :src="chat.user.picture" class="h-8 mx-2 rounded-full">
          <p class="text-sm">
            {{ chat.user.name }}
          </p>
        </div>
      </div>
      <div v-if="state.write == true && state.messaging == false">
        <div @click="state.chatter = following.user, state.messaging = true, chat()" class="border-top border-bottom py-2 flex items-center" v-for="following in state.followings" :key="following.id">
          <img :src="following.user.picture" class="h-8 mx-2 rounded-full">
          <p class="text-sm">
            {{ following.user.name }}
          </p>
        </div>
      </div>
      <div class="flex flex-col flex-grow" v-if="state.messaging == true">
        <div class="border-bottom flex items-center p-2">
          <i @click="state.messaging = false" class="fas fa-chevron-left"></i>
          <img :src="state.chatter.picture" class="h-6 rounded-full ml-3 mr-2" alt="">
          <p>{{ state.chatter.name }}</p>
        </div>
        <div class="custom-bg px-2 mb-20">
          <div class="p-1 border-bottom break-words" v-for="message in state.messages" :key="message.id">
            <p class="font-bold text-sm">
              {{ message.creator.name }}
            </p>
            <p>{{ message.body }}</p>
          </div>
        </div>
        <div class="pos-rel width">
          <form class="border-top w-100" @submit.prevent="sendMessage()">
            <input type="text" v-model="state.newMessage" class="w-100 p-1 pb-3" placeholder="New message">
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, computed } from 'vue'
import { AppState } from '../AppState'
import { chatsService } from '../services/ChatsService'
import $ from 'jquery'
export default {
  setup() {
    const state = reactive({
      account: computed(() => AppState.account),
      chats: computed(() => AppState.chats),
      followings: computed(() => AppState.following),
      messages: computed(() => AppState.tempMessages),
      expanded: false,
      write: false,
      messaging: false,
      chatter: {},
      newMessage: ''
    })
    return {
      state,
      chat() {
        const newChat = {
          ParticipantOne: state.account.id,
          ParticipantTwo: state.chatter.id
        }
        chatsService.create(newChat)
      },
      async getMessages(id) {
        const chat = state.chats.find(c => c.participantOne === state.account.id && c.participantTwo === id)
        await chatsService.getMessages(chat.id)
        $('#chat').scrollTop($('#chat')[0].scrollHeight)
      },
      sendMessage() {
        const chat = state.chats.find(c => c.participantOne === state.account.id && c.participantTwo === state.chatter.id)
        const message = {
          body: state.newMessage,
          creatorId: state.account.id,
          chatId: chat.id
        }
        state.newMessage = ''
        chatsService.sendMessage(message)
      }
    }
  }
}
</script>

<style scoped>
.rounding {
  border-radius: 5px 5px 0px 0px;
}
.ovrflw {
  overflow-y: scroll;
  height: inherit;
}
.pos-rel {
  position: absolute;
  bottom: 0px
}
.width {
  width: 100%
}
.custom-bg {
  background: #fafafa
}
</style>
