<script setup lang="ts">
import { useRoute } from 'vue-router'
import { onMounted } from 'vue'
import { useGetAuctionById } from '@/api/auctions/useGetAuctionById'
import CreateBidForm from '@/components/CreateBidForm.vue'
import AuctionBids from '@/components/AuctionBids.vue'
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

    <section v-else-if="auction">
      <h1>Hello from Auction Details!</h1>
      <small
        >Start time:
        <time>{{
          new Date(auction.start_time).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })
        }}</time></small
      >

      <CreateBidForm :auctionId="auction.id" />
      <AuctionBids :auctionId="auction.id" />
    </section>
  </section>
</template>
