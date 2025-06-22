export interface ApiResponse<T> {
  data: T
}

export interface PaginatedApiResponse<T> {
  data: T
  nextCursor: number | null
}

export interface HttpError {
  message: string
}
