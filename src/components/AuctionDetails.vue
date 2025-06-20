<script setup lang="ts">
import AuctionBids from '@/components/AuctionBids.vue'
defineProps<{
  auction: Auction
}>()
</script>

<template>
  <section>
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

    <AuctionBids :auctionId="auction.id" />
  </section>
</template>
