/*
 * @Author: Chengbotao
 * @Contact: https://github.com/chengbotao
 */

import { typeOperations, TypeOperation } from "./typeOperationsMap";

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
	addTypeOperation(type: string, operations: TypeOperation) {
		typeOperations.set(type, operations);
	}
	get(key: string) {
		const data = this.storage.getItem(key);
		if (!data || !/^\{.*\}$/.test(data)) return data;

		const { type, value, ...remainingKeys } = JSON.parse(data);
		if (Object.keys(remainingKeys).length === 0 && type) {
			if (typeOperations.has(type)) {
				return typeOperations.get(type)!.deserialize(value);
			} else {
				return value;
			}
		} else {
			return JSON.parse(data);
		}
	}
	set(key: string, value: unknown) {
		let type = Object.prototype.toString
			.call(value)
			.replace(/^\[object (.+)\]$/, "$1");
		if (typeof value === "number") {
			type = isNaN(value) ? "NaN" : "Number";
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
