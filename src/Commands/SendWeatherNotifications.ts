import Users from "../Storage/Users";
import Weather from "../Storage/Weather";
import Telegram from "../Communication/Telegram";

export default class SendWeatherNotifications {
  _users: Users;
  _telegram: Telegram;
  _weather: Weather;
  constructor(users: Users, telegram: Telegram, weather: Weather) {
    this._users = users;
    this._telegram = telegram;
    this._weather = weather;
  }

  async call() {
    const users = await this._users.load();
    Object.keys(users).forEach(async (key) => {
      const user = users[key];
      if (user.city === null) {
        return;
      }
      const weather = await this._weather.load(user.city);
      console.log(
        user.telegramChatId,
        `Right now, it's ${weather.temperature}° C outside in ${user.city}`
      );
      this._telegram
        .getBot()
        .sendMessage(
          user.telegramChatId,
          `Right now, it's ${Math.round(weather.temperature)}° C outside in ${
            user.city
          }`
        );
    });
  }
}
