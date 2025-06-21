<script setup lang="ts">
import { useGetAuctionById } from '@/api/auctions/useGetAuctionById'
import { useRoute } from 'vue-router'
import AuctionDetails from '@/components/AuctionDetails.vue'

const route = useRoute()

const { data: auction, isLoading, isError, error } = useGetAuctionById(+route.params.id)
</script>

<template>
  <section>
    <span v-if="isLoading">Loading...</span>
    <span v-else-if="isError">Error: {{ error?.message }}</span>

    <AuctionDetails v-else-if="auction" :auction="auction.data" />
    <span v-else>Not good state to be in buddy....</span>
  </section>
</template>
