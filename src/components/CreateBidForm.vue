<script setup lang="ts">
import { socket } from '@/config/socket'

const props = defineProps<{
  auctionId: number
}>()

function onSubmit(event: Event) {
  const formData = new FormData(event.target as HTMLFormElement)

  socket.emit('bids:create_bid', {
    amount_in_cents: formData.get('amount'),
    auction_id: props.auctionId,
  })
}
</script>

<template>
  <form
    @submit.prevent="onSubmit"
    class="flex flex-col gap-2 items-start p-4 border border-gray-100 my-4"
  >
    <label>
      Amount:
      <input name="amount" type="number" class="border border-gray-300 rounded-md px-2" />
    </label>

    <button type="submit" class="bg-blue-500 text-white rounded-md p-2 cursor-pointer">
      Place Bid
    </button>
  </form>
</template>
