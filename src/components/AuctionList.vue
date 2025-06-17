<script setup lang="ts">
import AuctionCard from '@/components/AuctionCard.vue'
import { useGetAuctions } from '@/api/auctions/useGetAuctions'

const { data: auctions, isLoading, isError, error } = useGetAuctions(10)
</script>

<template>
  <h1>Auctions</h1>

  <span v-if="isLoading">Loading...</span>
  <span v-else-if="isError">Error: {{ error?.message }}</span>

  <ul v-else class="grid grid-cols-12 gap-4">
    <AuctionCard v-for="{ id, product_id } in auctions.data" :key="id" :productId="product_id" />
  </ul>
</template>
