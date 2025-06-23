<script setup lang="ts">
import { useGetAuctionBids } from '@/api/bids/useGetAuctionBids'
import { useListenBidCreated } from '@/api/bids/useListenBidCreated'
import { formattedPrice } from '@/utils/price'
import { onMounted } from 'vue'

const props = defineProps<{
  auctionId: number
}>()

const { data: bids, isLoading, isError, error } = useGetAuctionBids(props.auctionId)

onMounted(() => {
  useListenBidCreated(props.auctionId)
})
</script>

<template>
  <ul class="p-4">
    <li v-if="isLoading">Loading...</li>
    <li v-else-if="isError">Error: {{ error?.message }}</li>

    <TransitionGroup name="list" tag="ul" v-else-if="bids">
      <li v-for="(bid, index) in bids.data" :key="bid.id">
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
    </TransitionGroup>
  </ul>
</template>

<style scoped>
.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
  position: absolute;
}
</style>
