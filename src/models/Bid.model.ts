export interface Bid {
  id: number
  auction_id: number
  user_id: number
  amount: number
  created_at: Date
  updated_at: Date
}

export interface CreateBidPayload {
  auction_id: number
  amount: number
}
