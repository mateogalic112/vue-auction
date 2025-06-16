<script setup lang="ts">
import { useGetProductById } from '@/api/products/useGetProductById'

const { productId } = defineProps<{
  productId: number
}>()
const { data: product } = useGetProductById(productId)
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
  </li>
</template>
