<script setup lang="ts">
import { socket } from '@/config/socket'

defineProps<{
  auctionId: number
}>()

function onSubmit(event: Event) {
  const formData = new FormData(event.target as HTMLFormElement)

  const auction_id = formData.get('auction_id')
  const amount = formData.get('amount')

  socket.emit('bids:create', { amount, auction_id })
}
</script>

<template>
  <form
    @submit.prevent="onSubmit"
    class="flex flex-col gap-2 items-start p-4 border border-gray-100 my-4"
  >
    <input type="hidden" name="auction_id" :value="auctionId" />
    <label>
      Amount:
      <input name="amount" type="number" class="border border-gray-300 rounded-md px-2" />
    </label>

    <button type="submit" class="bg-blue-500 text-white rounded-md p-2 cursor-pointer">
      Place Bid
    </button>
  </form>
</template>
