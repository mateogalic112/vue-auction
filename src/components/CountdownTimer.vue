<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { addHours } from 'date-fns'
import { TimeUtils } from '@/utils/time'

const props = defineProps<{
  startTime: string
  durationHours: number
}>()

const currentTime = ref(new Date())

const endTime = computed(() => {
  return addHours(new Date(props.startTime), props.durationHours)
})

const timeRemaining = computed(() => {
  const now = currentTime.value.getTime()
  const end = endTime.value.getTime()
  const difference = end - now

  if (difference <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      totalMs: 0,
    }
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24))
  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((difference % (1000 * 60)) / 1000)

  return {
    days,
    hours,
    minutes,
    seconds,
    totalMs: difference,
  }
})

const formatTimeUnit = (value: number): string => {
  return value.toString().padStart(2, '0')
}

let interval: number | null = null

onMounted(() => {
  interval = setInterval(() => {
    currentTime.value = new Date()
  }, TimeUtils.seconds(1))
})

onUnmounted(() => {
  if (interval) {
    clearInterval(interval)
  }
})
</script>

<template>
  <div class="p-3 border-gray-50 rounded-lg border">
    <div v-if="timeRemaining.totalMs <= 0" class="text-center p-2 border border-red-100 rounded-lg">
      <span class="text-red-600 font-bold">AUCTION ENDED</span>
    </div>

    <div v-else class="text-center">
      <div class="text-sm text-gray-500 mb-1">Time Remaining</div>
      <div class="flex gap-2 items-center justify-center">
        <div v-if="timeRemaining.days > 0" class="flex gap-1 items-center">
          <span class="font-bold text-lg">{{ timeRemaining.days }}</span>
          <span class="text-xs text-gray-400">{{ timeRemaining.days === 1 ? 'day' : 'days' }}</span>
        </div>
        <div class="flex gap-1 items-center">
          <span class="font-bold text-lg">{{ formatTimeUnit(timeRemaining.hours) }}</span>
          <span class="text-xs text-gray-400">h</span>
        </div>
        <span class="text-lg font-bold text-gray-400">:</span>
        <div class="flex gap-1 items-center">
          <span class="font-bold text-lg">{{ formatTimeUnit(timeRemaining.minutes) }}</span>
          <span class="text-xs text-gray-400">m</span>
        </div>
        <span class="text-lg font-bold text-gray-400">:</span>
        <div class="flex gap-1 items-center">
          <span class="font-bold text-lg">{{ formatTimeUnit(timeRemaining.seconds) }}</span>
          <span class="text-xs text-gray-400">s</span>
        </div>
      </div>
    </div>
  </div>
</template>
