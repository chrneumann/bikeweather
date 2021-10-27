type User = {
  telegramChatId: string;
  city: string | null;
};

type Users = { [index: string]: User };

type Weather = {
  forecast: {
    time: number;
    feelsLike: {
      day: number;
      night: number;
      eve: number;
      morn: number;
    };
    wind: {
      speed: number;
      deg: number;
      gust: number;
    };
    gust: {
      propability: number;
      amount: number;
    };
  }[];
};

interface Store {
  load: (file: string) => Promise<any>;
  store: (file: string, data: any) => Promise<void>;
}

type Config = {
  openWeather: {
    apiKey: string;
  };
  telegram: {
    botApiKey: string;
  };
};

export type { Config, User, Users, Store, Weather };
