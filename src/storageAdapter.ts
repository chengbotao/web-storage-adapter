/*
 * @Author: Chengbotao
 * @Contact: https://github.com/chengbotao
 */

import { typeOperations } from "./typeOperationsMap";

// https://developer.mozilla.org/zh-CN/docs/Web/API/Storage

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
	get(key: string) {
		const data = JSON.parse(this.storage.getItem(key)!);
		if (data) {
			const { type, value } = data;
			if (typeOperations.has(type)) {
				return typeOperations.get(type)!.deserialize(value);
			} else {
				return value;
			}
		} else {
			return data;
		}
	}
	set(key: string, value: unknown) {
		let type = Object.prototype.toString
			.call(value)
			.replace(/^\[object (.+)\]$/, "$1");
		if (type === "Number") {
			type = isNaN(value as number) ? "NaN" : "Number";
		}
		if (typeOperations.has(type)) {
			value = typeOperations.get(type)!.serialize(value);
		} else {
			value = JSON.stringify({ type, value });
		}
		this.storage.setItem(key, value as string);
	}
	remove(key: string) {
		this.storage.removeItem(key);
	}
	clear() {
		this.storage.clear();
	}
	key(index: number) {
		return this.storage.key(index);
	}
	get length() {
		return this.storage.length;
	}
	get getItem() {
		return this.get;
	}
	get setItem() {
		return this.set;
	}
	get removeItem() {
		return this.remove;
	}
}
