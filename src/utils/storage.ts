export interface IStorage {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

export default class Storage {
  private storage: IStorage;

  constructor(strg: IStorage) {
    this.storage = strg;
  }

  public get<T>(key: string): T | null {
    try {
      const storageItem = this.storage.getItem(key);

      if (storageItem) {
        return JSON.parse(storageItem);
      }
      return null;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public set(key: string, value: unknown): void {
    try {
      this.storage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  }

  public removeItem(key: string): void {
    try {
      this.storage.removeItem(key);
    } catch (error) {
      console.error(error);
    }
  }
}
