import commands from "./deps/commands";
import communication from "./deps/communication";
import storage from "./deps/storage";
import weather from "./deps/weather";
import config from "../config.json";
import { Config } from "~/types";

type Dependency = (val?: any) => any;
type Dependencies = { [index: string]: Dependency };

const deps: Dependencies = {
  config: (app) => {
    const ret: Config = config;
    return ret;
  },
  ...weather,
  ...communication,
  ...storage,
  ...commands,
};

export type { Dependencies };
export default deps;
