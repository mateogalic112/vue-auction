<script setup lang="ts">
import { state } from '@/config/socket'

import { useGetCurrentUser } from '@/api/auth/useCurrentUser'
import { useLogout } from '@/api/auth/useLogout'

const { data: currentUser } = useGetCurrentUser()

const { mutate: logout, isPending } = useLogout()
</script>

<template>
  <header>
    <nav class="flex gap-4 items-center">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/login" v-show="!currentUser">Login</RouterLink>
      <Button
        @click="() => logout()"
        v-show="!!currentUser"
        :loading="isPending"
        class="cursor-pointer bg-red-500"
        >Logout</Button
      >

      <small v-if="state.connected">✅</small>
      <small v-else>❌</small>
    </nav>
  </header>
</template>
