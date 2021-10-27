import Fetch from "../Weather/Fetch";

import { Dependencies } from "../deps";

const deps: Dependencies = {
  "weather.fetch": (app) => {
    return new Fetch(app("config").openWeather.apiKey);
  },
};

export default deps;
