import { Store, Weather } from "~/types";

export default class WeatherStore {
  _store: Store;
  constructor(store: Store) {
    this._store = store;
  }

  async load(city: string): Promise<Weather> {
    return (await this._store.load("weather.json"))[city];
  }

  async store(city: string, weather: Weather) {
    let oldWeather = null;
    try {
      oldWeather = await this._store.load("weather.json");
    } catch (error) {
      oldWeather = {};
    }
    oldWeather[city] = weather;
    return this._store.store("weather.json", oldWeather);
  }

  // async store(users : Users)  {
  //     return this._store.store('users.json', users);
  // }
}
