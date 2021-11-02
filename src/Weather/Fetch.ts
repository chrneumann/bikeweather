import { Weather } from "~/types";
import axios from "axios";

export default class Fetch {
  apiKey: string;
  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async fetch(city: string): Promise<Weather> {
    const response = await axios.get(
      "https://api.openweathermap.org/data/2.5/weather",
      {
        params: {
          units: "metric",
          q: city,
          // q: "Stockholm",
          appid: this.apiKey,
        },
      }
    );
    const weather = response.data as any;
    const forecast = (
      await axios.get("https://api.openweathermap.org/data/2.5/onecall", {
        params: {
          units: "metric",
          lat: weather.coord.lat,
          lon: weather.coord.lon,
          appid: this.apiKey,
          exclude: "minutely,hourly",
        },
      })
    ).data as any;
    const retForecast = forecast.daily.map((forecast: any) => {
      return {
        time: forecast.dt * 1000,
        feelsLike: forecast.feels_like,
        wind: {
          speed: forecast.wind_speed,
          deg: forecast.wind_deg,
          gust: forecast.wind_gust,
        },
        gust: {
          propability: forecast.pop,
          amount: (forecast.rain || 0) + (forecast.snow || 0),
        },
      };
    });

    return {
      forecast: retForecast,
    };
  }
}
