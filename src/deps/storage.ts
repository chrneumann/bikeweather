import FileStore from "../Storage/FileStore";
import Users from "../Storage/Users";
import Weather from "../Storage/Weather";

import { Dependencies } from "../deps";

const deps: Dependencies = {
  store: () => {
    return new FileStore();
  },
  "store.users": (app) => {
    return new Users(app("store"));
  },
  "store.weather": (app) => {
    return new Weather(app("store"));
  },
};

export default deps;
