/*
 * @Author: Chengbotao
 * @Contact: https://github.com/chengbotao
 */
import { WebStorage } from "./storageAdapter";
enum StorageType {
	Local = "local",
	Session = "session",
}
class SessionStore extends WebStorage {
	constructor() {
		super(StorageType.Session);
	}
}
export const sessionStore = new SessionStore();
