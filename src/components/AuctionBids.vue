<script setup lang="ts">
import { useGetAuctionBids } from '@/api/bids/useGetAuctionBids'
import { formattedPrice } from '@/utils/price'
const props = defineProps<{
  auctionId: number
}>()
const { data: bids, isLoading, isError, error } = useGetAuctionBids(props.auctionId)
</script>

<template>
  <ul class="p-4">
    <li v-if="isLoading">Loading...</li>
    <li v-else-if="isError">Error: {{ error?.message }}</li>

    <li v-else-if="bids" v-for="(bid, index) in bids.data" :key="bid.id">
      <p
        :class="{
          'p-2': true,
          'text-green-800 font-bold': index === 0, // e.g. highest bid
          'border-b border-gray-100': index !== bids.data.length - 1,
        }"
      >
        {{ formattedPrice(bid.amount) }}
      </p>
    </li>
  </ul>
</template>
