import type { ApiResponse } from '@/models/Api.model'
import type { User } from '@/models/User.model'
import { useQuery } from '@tanstack/vue-query'
import { authKeys } from './queryKeys'

const getCurrentUser = async () => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/me`, {
    credentials: 'include',
  })
  if (!response.ok) {
    throw new Error('Current user missing')
  }
  const data = await response.json()
  return data as ApiResponse<User>
}

export const useGetCurrentUser = () => {
  return useQuery({
    queryKey: authKeys.me(),
    queryFn: getCurrentUser,
    retry: false,
    select: (response) => response.data,
  })
}
