<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <main class="flex flex-col min-h-dvh bg-gray-400">
    <header>
      <nav class="flex gap-4">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/login">Login</RouterLink>
      </nav>
    </header>

    <RouterView />
  </main>
</template>
