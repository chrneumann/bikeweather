import { Users, Store } from "~/types";

export default class UsersStore {
  _store: Store;
  constructor(store: Store) {
    this._store = store;
  }

  async load(): Promise<Users> {
    return this._store.load("users.json");
  }

  async store(users: Users) {
    return this._store.store("users.json", users);
  }
}
