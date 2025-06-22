<script setup lang="ts">
import { useGetCurrentUser } from '@/api/auth/useCurrentUser'
import AuctionList from '@/components/AuctionList.vue'

const { data: currentUser, isLoading, isError, error } = useGetCurrentUser()
</script>

<template>
  <section>
    <h1>Hello from Vue!</h1>

    <span v-if="isLoading">Loading...</span>
    <span v-else-if="isError">Error: {{ error?.message }}</span>
    <span v-else-if="currentUser">Logged in! {{ currentUser.data.username }}</span>

    <AuctionList />
  </section>
</template>
