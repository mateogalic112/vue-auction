<script setup lang="ts">
import { useGetProductById } from '@/api/products/useGetProductById'
import type { Auction } from '@/models/Auction.model.ts'
import { RouterLink } from 'vue-router'
import CountdownTimer from './CountdownTimer.vue'

const props = defineProps<{
  auction: Auction
}>()

const { data: product, isLoading, isError, error } = useGetProductById(props.auction.product_id)
</script>

<template>
  <span v-if="isLoading">Loading...</span>
  <span v-else-if="isError">{{ error?.message }}</span>

  <li
    v-else-if="product"
    class="flex flex-col gap-2 p-2 border border-slate-200 col-span-12 md:col-span-6 lg:col-span-4 bg-slate-400"
  >
    <img :src="product.data.image_url" class="w-32 h-32 object-cover" />
    <h2>{{ product.data.name }}</h2>
    <small>{{ product.data.description }}</small>
    <p class="p-1 border border-red-400 w-fit" v-if="auction.is_cancelled">Cancelled</p>

    <CountdownTimer
      v-if="!props.auction.is_cancelled"
      :startTime="auction.start_time"
      :durationHours="auction.duration_hours"
    />

    <RouterLink
      v-show="!props.auction.is_cancelled"
      class="p-1 border border-slate-700 bg-slate-500 text-white"
      :to="{ name: 'auctionDetails', params: { id: auction.product_id } }"
      >Bid</RouterLink
    >
  </li>
</template>
