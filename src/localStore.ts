/*
 * @Author: Chengbotao
 * @Contact: https://github.com/chengbotao
 */
import { WebStorage } from "./storageAdapter";
enum StorageType {
	Local = "local",
	Session = "session",
}
class LocalStore extends WebStorage {
	constructor() {
		super(StorageType.Local);
	}
}

export const localStore = new LocalStore();
