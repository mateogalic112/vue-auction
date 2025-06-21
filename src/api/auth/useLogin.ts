import type { LoginPayload, User } from '@/models/User.model'
import { authKeys } from './queryKeys'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import type { ApiResponse } from '@/models/Api.model'
import { useRouter } from 'vue-router'

const login = async (payload: LoginPayload) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error('Failed to login')
  }

  const user = await response.json()

  return user as ApiResponse<User>
}

export const useLogin = () => {
  const queryClient = useQueryClient()
  const router = useRouter()

  return useMutation({
    mutationFn: (payload: LoginPayload) => login(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: authKeys.me(),
      })
      router.replace({ path: '/' })
    },
  })
}
