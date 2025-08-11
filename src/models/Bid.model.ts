export interface Bid {
  id: number
  auction_id: number
  user_id: number
  amount_in_cents: number
  created_at: string
  updated_at: string
}

export interface CreateBidPayload {
  auction_id: number
  amount_in_cents: number
}
