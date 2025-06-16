<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'

const { productId } = defineProps<{
  productId: number
}>()

interface Product {
  id: number
  owner_id: number
  name: string
  description: string
  image_url: string
  price: number
  created_at: Date
  updated_at: Date
}

const { data: product } = useQuery({
  queryKey: ['products', 'single', productId],
  queryFn: () =>
    fetch(`${import.meta.env.VITE_API_URL}/products/${productId}`, {
      credentials: 'include',
    }).then(async (res) => {
      if (!res.ok) {
        throw new Error(await res.text())
      }
      const data = await res.json()
      return data as { data: Product }
    }),
})
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
