import { useQuery } from '@tanstack/vue-query'
import type { Bid } from '@/models/Bid.model'
import { bidKeys } from './queryKeys'

const getAuctionBids = async (auctionId: number) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/bids/auctions/${auctionId}`, {
    credentials: 'include',
  })
  if (!response.ok) {
    throw new Error(`Failed to get auction bids for auction: ${auctionId}`)
  }
  const data = await response.json()
  return data as { data: Bid[]; nextCursor: number | null }
}

export const useGetAuctionBids = (auctionId: number) => {
  return useQuery({
    queryKey: bidKeys.auctionBidList(auctionId),
    queryFn: () => getAuctionBids(auctionId),
  })
}
