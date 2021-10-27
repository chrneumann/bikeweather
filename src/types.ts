type User = {
  telegramChatId: string;
  city: string | null;
};

type Users = { [index: string]: User };

type Weather = {
  temperature: number;
};

interface Store {
  load: (file: string) => Promise<any>;
  store: (file: string, data: any) => Promise<void>;
}

type Config = {
  telegram: {
    botApiKey: string;
  };
};

export type { Config, User, Users, Store, Weather };
