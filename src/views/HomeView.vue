<script setup lang="ts">
import AuctionList from '@/components/AuctionList.vue'
import { useQuery } from '@tanstack/vue-query'

const { data, isLoading, isError, error } = useQuery({
  queryKey: ['auth', 'me'],
  retry: false,
  queryFn: () =>
    fetch(`${import.meta.env.VITE_API_URL}/auth/me`, {
      credentials: 'include',
    }).then(async (res) => {
      if (!res.ok) {
        throw new Error('Not logged ini')
      }
      const data = await res.json()
      return data as { data: { username: string } }
    }),
})
</script>

<template>
  <section>
    <h1>Hello from Vue!</h1>

    <span v-if="isLoading">Loading...</span>
    <span v-else-if="isError">Error: {{ error?.message }}</span>
    <span v-else>Logged in! {{ data?.data.username }}</span>

    <AuctionList />
  </section>
</template>
