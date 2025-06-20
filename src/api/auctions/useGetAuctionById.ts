import { useQuery } from '@tanstack/vue-query'
import type { Auction } from '@/models/Auction.model'
import { auctionKeys } from './queryKeys'

const getAuctionByd = async (id: number) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/auctions/${id}`, {
    credentials: 'include',
  })
  if (!response.ok) {
    throw new Error(`Failed to get auction by id: ${id}`)
  }
  const data = await response.json()
  return data as { data: Auction }
}

export const useGetAuctionById = (id: number) => {
  return useQuery({
    queryKey: auctionKeys.detail(id),
    queryFn: () => getAuctionByd(id),
  })
}
