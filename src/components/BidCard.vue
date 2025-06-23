<script setup lang="ts">
import type { Bid } from '@/models/Bid.model'
import { formattedPrice } from '@/utils/price'

defineProps<{
  bid: Bid
  isHighestBid: boolean
  isLowestBid: boolean
}>()
</script>

<template>
  <li
    :class="{
      'flex items-center justify-between gap-2 p-2': true,
      'text-green-600 font-bold': isHighestBid,
      'border-b border-gray-100': isLowestBid,
    }"
  >
    <p>
      {{ formattedPrice(bid.amount) }}
    </p>

    <small
      ><time>{{
        new Date(bid.created_at).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
        })
      }}</time></small
    >
  </li>
</template>
