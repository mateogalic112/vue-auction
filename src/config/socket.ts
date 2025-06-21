import { reactive } from 'vue'
import { io } from 'socket.io-client'

export const state = reactive({
  connected: false,
})

export const socket = io('http://localhost:4000', {
  withCredentials: true,
})

socket.on('connect', () => {
  state.connected = true
})
