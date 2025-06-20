export const bidKeys = {
  all: ['bids'] as const,
  lists: () => [...bidKeys.all, 'list'] as const,
  list: (limit: number) => [...bidKeys.lists(), limit] as const,
  details: () => [...bidKeys.all, 'detail'] as const,
  detail: (id: number) => [...bidKeys.details(), id] as const,
  auctionBidList: (auctionId: number) => [...bidKeys.lists(), 'auctions', auctionId] as const,
}
