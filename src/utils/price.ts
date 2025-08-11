export class PriceUtils {
  static formatPrice(rawPrice: number) {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'EUR' }).format(
      rawPrice / 100,
    )
  }
}
