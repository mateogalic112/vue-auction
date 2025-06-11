<script setup lang="ts">
async function onSubmit(event: Event) {
  const formData = new FormData(event.target as HTMLFormElement)

  const email = formData.get('email')
  const password = formData.get('password')

  const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify({ email, password }),
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error('Failed to login')
  }

  return response.json()
}
</script>

<template>
  <section class="flex justify-center items-center h-screen">
    <form @submit.prevent="onSubmit" class="flex flex-col gap-2 w-92">
      <input type="email" name="email" class="border border-gray-300 rounded-md p-2" />
      <input type="password" name="password" class="border border-gray-300 rounded-md p-2" />
      <button type="submit" class="bg-blue-500 text-white rounded-md p-2 cursor-pointer">
        Login
      </button>
    </form>
  </section>
</template>
