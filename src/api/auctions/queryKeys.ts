export const auctionKeys = {
  all: ['auctions'] as const,
  lists: () => [...auctionKeys.all, 'list'] as const,
  list: (limit: number) => [...auctionKeys.lists(), limit] as const,
  details: () => [...auctionKeys.all, 'detail'] as const,
  detail: (id: number) => [...auctionKeys.details(), id] as const,
}
