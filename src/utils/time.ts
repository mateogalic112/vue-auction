export class TimeUtils {
  private static readonly MILISECONDS_IN_SECOND = 1000

  static seconds(value: number) {
    return value * TimeUtils.MILISECONDS_IN_SECOND
  }
}
