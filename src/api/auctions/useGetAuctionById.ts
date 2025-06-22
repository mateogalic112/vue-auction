import { useQuery } from '@tanstack/vue-query'
import type { Auction } from '@/models/Auction.model'
import { auctionKeys } from './queryKeys'
import type { ApiResponse } from '@/models/Api.model'

const getAuctionById = async (id: number) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/auctions/${id}`, {
    credentials: 'include',
  })
  if (!response.ok) {
    throw new Error(`Failed to get auction by id: ${id}`)
  }
  const data = await response.json()
  return data as ApiResponse<Auction>
}

export const useGetAuctionById = (id: number) => {
  return useQuery({
    queryKey: auctionKeys.detail(id),
    queryFn: () => getAuctionById(id),
    select: (response) => response.data,
  })
}
