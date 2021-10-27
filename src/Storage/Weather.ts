/// <reference types="../types/@cicciosgamino/openweather-apis" />
import { AsyncWeather } from "@cicciosgamino/openweather-apis";

import { Store, Weather } from "~/types";

export default class WeatherStore {
  _store: Store;
  constructor(store: Store) {
    this._store = store;
  }

  async load(city: string): Promise<Weather> {
    const apiKey = "4199b6fb4a162371725b9a06c92306e7";
    const weather = await new AsyncWeather();
    weather.setLang("de");
    weather.setCity(city);
    weather.setUnits("metric");
    weather.setApiKey(apiKey);
    const allWeather = await weather.getAllWeather();
    console.log(allWeather);

    return {
      temperature: allWeather.main.temp,
    };
  }

  // async store(users : Users)  {
  //     return this._store.store('users.json', users);
  // }
}
