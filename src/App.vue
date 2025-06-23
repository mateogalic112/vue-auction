<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { socket, state } from '@/config/socket'
import { onUnmounted } from 'vue'
import type { HttpError } from './models/Api.model'
import { useToast } from 'primevue/usetoast'

const toast = useToast()

socket.on('bids:error', (error: HttpError) => {
  toast.add({ severity: 'error', summary: 'Error', detail: error.message, life: 3000 })
})

socket.on('auctions:error', (error: HttpError) => {
  toast.add({ severity: 'error', summary: 'Error', detail: error.message, life: 3000 })
})

onUnmounted(() => {
  socket.off()
})
</script>

<template>
  <Toast />
  <main class="flex flex-col min-h-dvh">
    <header>
      <nav class="flex gap-4 items-center">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/login">Login</RouterLink>
        <small v-if="state.connected">✅</small>
        <small v-else>❌</small>
      </nav>
    </header>

    <RouterView />
  </main>
</template>
