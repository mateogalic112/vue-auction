<script setup lang="ts">
import { useGetAuctionById } from '@/api/auctions/useGetAuctionById'
import { useRoute } from 'vue-router'
import AuctionDetails from '@/components/AuctionDetails.vue'

const route = useRoute()

const { data: auction, isLoading, isError, error } = useGetAuctionById(route.params.id)
console.log({ auction })
</script>

<template>
  <section>
    <span v-if="isLoading">Loading...</span>
    <span v-else-if="isError">Error: {{ error?.message }}</span>

    <AuctionDetails v-else :auction="auction.data" />
  </section>
</template>
