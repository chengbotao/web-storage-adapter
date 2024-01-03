/*
 * @Author: Chengbotao
 * @Contact: https://github.com/chengbotao
 */
import { localStore } from "../src/index";

describe("LocalStore", () => {
	beforeEach(() => {
		localStore.clear();
	});
	test("length", () => {
		localStore.set("test", "test");
		localStore.set("test2", "test2");
		expect(localStore.length).toBe(2);
	});
	test("key", () => {
		localStore.set("test", "test");
		localStore.set("test2", "test2");
		expect(localStore.key(1)).toBe("test2");
	});
	test("remove", () => {
		localStore.set("test", "test");
		localStore.remove("test");
		expect(localStore.get("test")).toEqual(null);
	});
	test("removeItem", () => {
		localStore.set("test", "test");
		localStore.removeItem("test");
		expect(localStore.get("test")).toEqual(null);
	});
	test("set-get", () => {
		localStore.set("test", "test");
		expect(localStore.get("test")).toEqual("test");
	});
	test("setItem-getItem", () => {
		localStore.setItem("test", "test");
		expect(localStore.getItem("test")).toEqual("test");
	});

	test("Map", () => {
		const map = new Map();
		map.set("test", "test");
		map.set("test2", "test2");
		localStore.set("test", map);
		expect(localStore.get("test")).toEqual(map);
		expect(localStore.get("test").has("test2")).toBe(true);
	});
	test("Set", () => {
		const set = new Set();
		set.add("test");
		set.add("test2");
		localStore.set("test", set);
		expect(localStore.get("test").has("test2")).toBe(true);
	});
	test("BigInt", () => {
		const bigInt = BigInt(123456789);
		localStore.set("test", bigInt);
		expect(localStore.get("test")).toEqual(bigInt);
	});
	test("Symbol", () => {
		const symbol = Symbol.for("test");
		localStore.set("test", symbol);
		expect(localStore.get("test")).toEqual(symbol);
	})
	test("PlainObject", () => {
		const obj = {
			test: "test",
			test2: "test2",
			map: new Map([["test", "test"]]),
			null: null,
			undefined: undefined,
			array: [1,2,3]
		}
		localStore.set("test", obj);
		expect(localStore.get("test")).toEqual(obj);
		expect(localStore.get("test").map.has("test")).toBe(true);
		expect(localStore.get("test").array).toEqual([1,2,3]);
		expect(localStore.get("test").null).toEqual(null);
	})
	test("Null", () => {
		const obj = null;
		localStore.set("test", obj);
		expect(localStore.get("test")).toBeNull();
	})
	test("Undefined", () => {
		const obj = undefined;
		localStore.set("test", obj);
		expect(localStore.get("test")).toBeUndefined();
	})
});
