import Users from "../Storage/Users";
import Weather from "../Storage/Weather";
import WeatherFetch from "../Weather/Fetch";
import Telegram from "../Communication/Telegram";

export default class SendWeatherNotifications {
  _users: Users;
  _telegram: Telegram;
  _weather: Weather;
  _weatherFetch: WeatherFetch;
  constructor(
    users: Users,
    telegram: Telegram,
    weather: Weather,
    weatherFetch: WeatherFetch
  ) {
    this._users = users;
    this._telegram = telegram;
    this._weather = weather;
    this._weatherFetch = weatherFetch;
  }

  async call() {
    const users = await this._users.load();
    const cities: { [index: string]: string[] } = {};
    Object.keys(users).forEach(async (key) => {
      const user = users[key];
      if (user.city === null) {
        return;
      }
      if (!Array.isArray(cities[user.city])) {
        cities[user.city] = [];
      }
      cities[user.city].push(key);
    });

    Object.keys(cities).forEach(async (city) => {
      // console.log(city);
      let oldWeather = null;
      try {
        oldWeather = await this._weather.load(city);
      } catch (error) {
        console.log(error);
      }
      const newWeather = await this._weatherFetch.fetch(city);
      if (oldWeather === null) {
        this._weather.store(city, newWeather);
        return;
      }
      // console.log(oldWeather.forecast[1], newWeather.forecast[1]);

      const oldForecast = oldWeather.forecast[1];
      const newForecast = newWeather.forecast[1];

      let changes = "";

      Object.keys(oldForecast.feelsLike).forEach((v) => {
        // console.log(v);
        const diff =
          (oldForecast as any).feelsLike[v] - (newForecast as any).feelsLike[v];
        if (Math.abs(diff) >= 3) {
          changes += `🌡️ Its getting ${
            diff > 0 ? "warmer" : "colder"
          } in the ${v}: ${
            (<any>newForecast).feelsLike[v]
          }° C felt temperature predicted tomorrow!\n`;
          (<any>oldForecast).feelsLike[v] = (<any>newForecast).feelsLike[v];
        }
      });

      let diff = oldForecast.wind.speed - newForecast.wind.speed;
      if (Math.abs(diff) >= 3) {
        changes += `🌬️ Its getting ${diff > 0 ? "more" : "less"} windy: ${
          newForecast.wind.speed * 3.6
        } km/h predicted tomorrow!\n`;
        oldForecast.wind.speed = newForecast.wind.speed;
      }

      diff = oldForecast.gust.propability - newForecast.gust.propability;
      if (Math.abs(diff) >= 0.3) {
        changes += `🌧️ Its getting ${
          diff > 0 ? "more" : "less"
        } likely to rain: ${
          newForecast.gust.propability * 100
        }% predicted tomorrow!\n`;
        oldForecast.gust.propability = newForecast.gust.propability;
      }

      if (changes !== "") {
        cities[city].forEach(async (userKey) => {
          const user = users[userKey];
          this._telegram
            .getBot()
            .sendMessage(
              user.telegramChatId,
              `🚲 Bike weather update for ${user.city}:\n` + changes
            );
        });

        oldWeather.forecast[1] = oldForecast;
        this._weather.store(city, oldWeather);
      }
    });
  }
}
