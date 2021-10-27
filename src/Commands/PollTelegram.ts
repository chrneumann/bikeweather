import UsersStorage from "../Storage/Users";
import Telegram from "../Communication/Telegram";
import { Users } from "../types";

export default class PollTelegram {
  _telegram: Telegram;
  _users: UsersStorage;

  constructor(users: UsersStorage, telegram: Telegram) {
    this._users = users;
    this._telegram = telegram;
  }

  async call() {
    let users: Users = {};
    try {
      users = await this._users.load();
    } catch {}
    this._telegram.getBot().on("message", (message: any) => {
      const chatId: string = message.chat.id;
      if (!users[chatId]) {
        users[chatId] = { telegramChatId: chatId, city: null };
      }
      users[chatId].city = message.text;
      this._telegram
        .getBot()
        .sendMessage(
          message.chat.id,
          `You will now receive weather updates for the city '${message.text}'`
        );
      this._users.store(users);
    });
    this._telegram.getBot().startPolling();
    // setTimeout(() => {
    //     slimbot.stopPolling();
    // }, 10000);
  }
}
