import app from "./app";
app("cmd.main").call();
app("cmd.pollTelegram").call();
app("cmd.pollWeather").call();

const sendWeather = () => {
  app("cmd.sendWeatherNotifications").call();
  setTimeout(sendWeather, 30 * 60 * 1000);
};

sendWeather();
