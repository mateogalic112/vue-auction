<script setup lang="ts">
import { RouterView } from 'vue-router'
import { socket } from '@/config/socket'
import { onUnmounted } from 'vue'
import type { HttpError } from './models/Api.model'
import { useToast } from 'primevue/usetoast'
import SiteHeader from './components/SiteHeader.vue'

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
    <SiteHeader />

    <RouterView />
  </main>
</template>
