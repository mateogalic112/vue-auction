import { authKeys } from './queryKeys'
import { useMutation, useQueryClient } from '@tanstack/vue-query'

const logout = async () => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/logout`, {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  if (!response.ok) {
    throw new Error('Failed to logout')
  }
}

export const useLogout = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: logout,
    onSuccess: async () => {
      await queryClient.resetQueries({ queryKey: authKeys.me() })
    },
    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: authKeys.me() })
    },
  })
}
