<script setup lang="ts">
import { useGetProductById } from '@/api/products/useGetProductById'
import { Auction } from '@/models/Auction.model.ts'

const props = defineProps<{
  auction: Auction
}>()

const { data: product } = useGetProductById(props.auction.product_id)
</script>

<template>
  <span v-if="!product">Loading...</span>
  <li
    v-else
    class="flex flex-col gap-2 p-2 border border-slate-200 col-span-12 md:col-span-6 lg:col-span-4 bg-slate-400"
  >
    <img :src="product.data.image_url" class="w-32 h-32 object-cover" />
    <h2>{{ product.data.name }}</h2>
    <small>{{ product.data.description }}</small>
    <p class="p-1 border border-red-400 w-fit" v-if="auction.is_cancelled">Cancelled</p>
  </li>
</template>
