export const formattedPrice = (rawPrice: number) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'EUR' }).format(
    rawPrice / 100,
  )
}
