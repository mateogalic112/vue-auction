export interface Auction {
  id: number
  creator_id: number
  product_id: number
  winner_id: number | null
  start_time: string
  duration_hours: number
  starting_price_in_cents: number
  is_cancelled: boolean
  created_at: string
  updated_at: string
}
