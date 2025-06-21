<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { socket, state } from '@/config/socket'

socket.off()
</script>

<template>
  <main class="flex flex-col min-h-dvh bg-gray-400">
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
