<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'

interface Auction {
  id: number
  creator_id: number
  product_id: number
  winner_id: number | null
  start_time: Date
  duration_hours: number
  starting_price: number
  is_cancelled: boolean
  created_at: Date
  updated_at: Date
}

const {
  data: auctions,
  isLoading,
  isError,
  error,
} = useQuery({
  queryKey: ['auctions', 'list'],
  queryFn: () =>
    fetch(`${import.meta.env.VITE_API_URL}/auctions?limit=10`, {
      credentials: 'include',
    }).then(async (res) => {
      if (!res.ok) {
        throw new Error(await res.text())
      }
      const data = await res.json()
      return data as { data: Auction[]; nextCursor: number | null }
    }),
})
</script>

<template>
  <h1>Auctions</h1>

  <span v-if="isLoading">Loading...</span>
  <span v-else-if="isError">Error: {{ error?.message }}</span>
  <ul v-else-if="auctions">
    <template v-for="{ id } in auctions.data" :key="id">
      <li>{{ id }}</li>
    </template>
  </ul>
</template>
