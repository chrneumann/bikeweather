import Main from "../Commands/Main";
import PollTelegram from "../Commands/PollTelegram";
import PollWeather from "../Commands/PollWeather";
import SendWeatherNotifications from "../Commands/SendWeatherNotifications";
import { Dependencies } from "../deps";

const deps: Dependencies = {
  "cmd.main": (app) => {
    return new Main();
  },
  "cmd.pollTelegram": (app) => {
    return new PollTelegram(app("store.users"), app("communication.telegram"));
  },
  "cmd.pollWeather": (app) => {
    return new PollWeather();
  },
  "cmd.sendWeatherNotifications": (app) => {
    return new SendWeatherNotifications(
      app("store.users"),
      app("communication.telegram"),
      app("store.weather")
    );
  },
};

export default deps;
