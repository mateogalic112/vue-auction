import { socket } from '@/config/socket'
import type { Bid } from '@/models/Bid.model'
import { useQueryClient } from '@tanstack/vue-query'
import { bidKeys } from './queryKeys'
import type { ApiResponse } from '@/models/Api.model'

export function useListenBidCreated(auctionId: number) {
  const queryClient = useQueryClient()

  socket.on('bids:created', (data) => {
    const parsedBid = data as { data: Bid }

    queryClient.setQueryData(
      bidKeys.auctionBidList(auctionId),
      (oldData: ApiResponse<Array<Bid>>) => {
        if (oldData.data.find((prev) => prev.id === parsedBid.data.id)) {
          return oldData
        }
        return {
          data: [parsedBid.data, ...oldData.data],
        }
      },
    )
  })
}
