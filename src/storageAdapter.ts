/*
 * @Author: Chengbotao
 * @Contact: https://github.com/chengbotao
 */
enum StorageType {
	Local = "local",
	Session = "session",
}
export abstract class WebStorage {
	private storage: Storage;
	constructor(storageType: StorageType) {
		this.storage =
			storageType === StorageType.Local ? localStorage : sessionStorage;
	}
    get length() {
        return this.storage.length;
    }
	clear() {
		this.storage.clear();
	}
	key(index: number) {
		return this.storage.key(index);
	}
}
