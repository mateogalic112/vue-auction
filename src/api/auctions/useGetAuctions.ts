import type { Auction } from '@/models/Auction.model'
import { useQuery } from '@tanstack/vue-query'
import { auctionKeys } from './queryKeys'

const getAuctions = (limit: number) =>
  fetch(`${import.meta.env.VITE_API_URL}/auctions?limit=${limit}`, {
    credentials: 'include',
  }).then(async (res) => {
    if (!res.ok) {
      throw new Error(await res.text())
    }
    const data = await res.json()
    return data as { data: Auction[]; nextCursor: number | null }
  })

export const useGetAuctions = (limit: number) => {
  return useQuery({
    queryKey: auctionKeys.list(limit),
    queryFn: () => getAuctions(limit),
  })
}
