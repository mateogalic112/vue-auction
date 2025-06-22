import type { Auction } from '@/models/Auction.model'
import { useQuery } from '@tanstack/vue-query'
import { auctionKeys } from './queryKeys'
import type { PaginatedApiResponse } from '@/models/Api.model'

const getAuctions = async (limit: number) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/auctions?limit=${limit}`, {
    credentials: 'include',
  })
  if (!response.ok) {
    throw new Error(`Failed to get auctions`)
  }
  const data = await response.json()
  return data as PaginatedApiResponse<Auction[]>
}

export const useGetAuctions = (limit: number) => {
  return useQuery({
    queryKey: auctionKeys.list(limit),
    queryFn: () => getAuctions(limit),
  })
}
