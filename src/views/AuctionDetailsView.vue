<script setup lang="ts">
import { useRoute } from 'vue-router'
import { onMounted, onUnmounted } from 'vue'
import { useGetAuctionById } from '@/api/auctions/useGetAuctionById'
import CreateBidForm from '@/components/CreateBidForm.vue'
import AuctionBids from '@/components/AuctionBids.vue'
import { socket } from '@/config/socket.ts'
import { useQueryClient } from '@tanstack/vue-query'
import { bidKeys } from '@/api/bids/queryKeys'
import { addHours } from 'date-fns'
import { DateUtils } from '@/utils/date'

const route = useRoute()

const auction_id = +route.params.id
const { data: auction, isLoading, isError, error } = useGetAuctionById(auction_id)

const queryClient = useQueryClient()

onMounted(() => {
  queryClient.invalidateQueries({ queryKey: bidKeys.auctionBidList(auction_id) })
  socket.emit('auctions:join_auction', { auction_id })
})

onUnmounted(() => {
  socket.emit('auctions:leave_auction', { auction_id })
})
</script>

<template>
  <section>
    <span v-if="isLoading">Loading...</span>
    <span v-else-if="isError">Error: {{ error?.message }}</span>

    <section v-else-if="auction" class="flex flex-col gap-1">
      <h1>Hello from Auction {{ auction.id }}!</h1>
      <small
        >Start time: <time>{{ DateUtils.formatDate(new Date(auction.start_time)) }}</time></small
      >

      <small
        >End time:
        <time>{{
          DateUtils.formatDate(addHours(new Date(auction.start_time), auction.duration_hours))
        }}</time></small
      >

      <CreateBidForm :auctionId="auction.id" />
      <AuctionBids :auctionId="auction.id" />
    </section>
  </section>
</template>
