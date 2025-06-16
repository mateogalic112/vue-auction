import { useQuery } from '@tanstack/vue-query'
import type { Product } from '@/models/Product.model'
import { productKeys } from './queryKeys'

const getProductByd = (id: number) =>
  fetch(`${import.meta.env.VITE_API_URL}/products/${id}`, {
    credentials: 'include',
  }).then(async (res) => {
    if (!res.ok) {
      throw new Error(await res.text())
    }
    const data = await res.json()
    return data as { data: Product }
  })

export const useGetProductById = (id: number) => {
  return useQuery({
    queryKey: productKeys.detail(id),
    queryFn: () => getProductByd(id),
  })
}
