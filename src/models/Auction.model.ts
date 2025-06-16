export interface Auction {
  id: number
  creator_id: number
  product_id: number
  winner_id: number | null
  start_time: Date
  duration_hours: number
  starting_price: number
  is_cancelled: boolean
  created_at: Date
  updated_at: Date
}
