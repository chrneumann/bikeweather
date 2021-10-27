import Telegram from "../Communication/Telegram";
import { Dependencies } from "../deps";

const deps: Dependencies = {
  "communication.telegram": (app) => {
    return new Telegram(app("config").telegram.botApiKey);
  },
};

export default deps;
