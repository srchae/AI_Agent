/**
 * DateTool : 오늘 날짜 설정 및 조회
 */
export class DateTool {
  private today: string;

  constructor() {
    this.today = new Date().toISOString().split("T")[0];
  }

  // getToday() : 현재 날짜 반환
  getToday(): string {
    return this.today;
  }

  // setToday() :현재 날짜를 사용자 입력 날짜로 세팅
  setToday(input: {
    /**
     * date format : "YYYY-MM-DD"
     */
    date: string;
  }) {
    this.today = input.date;
  }
}

/**
 * WeatherTool : 오늘의 날씨 조회
 */
export class WeatherTool {
  private weather: Record<string, string>;

  constructor() {
    this.weather = {
      "2028": "snowy",
      "2027": "rainy",
      "2026": "sunny",
      "2025": "cloudy",
      "2024": "rainy",
    };
  }

  getTodayWeather(input: {
    /**
     * date format : "YYYY-MM-DD"
     */
    today: string;
  }): string {
    const year = input.today.split("-")[0];
    return this.weather[year];
  }
}
