/// <reference types="../types/@cicciosgamino/openweather-apis" />

import Slimbot from "slimbot";

export default class Telegram {
  _slimbot: any;
  constructor(apiKey: string) {
    this._slimbot = new Slimbot(apiKey);
  }

  getBot(): any {
    return this._slimbot;
  }
}
