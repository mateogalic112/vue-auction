<script setup lang="ts">
import { useGetAuctionBids } from '@/api/bids/useGetAuctionBids'
const props = defineProps<{
  auctionId: number
}>()
const { data: bids, isLoading, isError, error } = useGetAuctionBids(props.auctionId)
</script>

<template>
  <ul>
    <li v-if="isLoading">Loading...</li>
    <li v-else-if="isError">Error: {{ error?.message }}</li>

    <li v-else v-for="(bid, index) in bids.data" :key="bid.id">
      <p
        :class="{
          'text-green-800 font-bold': index === 0, // e.g. highest bid
        }"
      >
        {{
          new Intl.NumberFormat('en-US', { style: 'currency', currency: 'EUR' }).format(
            bid.amount / 100,
          )
        }}
      </p>
    </li>
  </ul>
</template>
