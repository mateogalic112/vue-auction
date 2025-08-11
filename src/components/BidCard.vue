<script setup lang="ts">
import type { Bid } from '@/models/Bid.model'
import { PriceUtils } from '@/utils/price'
import { DateUtils } from '@/utils/date'

defineProps<{
  bid: Bid
  isHighestBid: boolean
  isLowestBid: boolean
}>()
</script>

<template>
  <li
    class="flex items-center justify-between gap-2 p-2"
    :class="{
      'text-green-600 font-bold': isHighestBid,
      'border-b border-gray-100': isLowestBid,
    }"
  >
    <p>
      {{ PriceUtils.formatPrice(bid.amount_in_cents) }}
    </p>

    <small
      ><time>{{ DateUtils.formatDate(new Date(bid.created_at)) }}</time></small
    >
  </li>
</template>
