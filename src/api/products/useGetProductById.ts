import { useQuery } from '@tanstack/vue-query'
import type { Product } from '@/models/Product.model'
import { productKeys } from './queryKeys'

const getProductByd = async (id: number) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/products/${id}`, {
    credentials: 'include',
  })
  if (!response.ok) {
    throw new Error(`Failed to get product by id: ${id}`)
  }
  const data = await response.json()
  return data as { data: Product }
}

export const useGetProductById = (id: number) => {
  return useQuery({
    queryKey: productKeys.detail(id),
    queryFn: () => getProductByd(id),
  })
}
