<script setup lang="ts">
import { useGetAuctionById } from '@/api/auctions/useGetAuctionById'
import { useRoute } from 'vue-router'
import AuctionDetails from '@/components/AuctionDetails.vue'
import { onMounted } from 'vue'
import { socket, state } from '@/config/socket.ts'

const route = useRoute()

const { data: auction, isLoading, isError, error } = useGetAuctionById(+route.params.id)

onMounted(() => {
  if (!state.connected) return
  socket.emit('auctions:join', { auction_id: +route.params.id })
})
</script>

<template>
  <section>
    <span v-if="isLoading">Loading...</span>
    <span v-else-if="isError">Error: {{ error?.message }}</span>

    <AuctionDetails v-else-if="auction" :auction="auction.data" />
  </section>
</template>
