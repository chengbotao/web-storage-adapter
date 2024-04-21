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
	test("clear", () => {
		localStore.set("npm", "botaocheng");
		localStore.set("pack", "@manzhixing/web-storage-adapter");
		localStore.clear();
		expect(localStore.length).toBe(0);
	});
	test("key", () => {
		localStore.set("test", "test");
		localStore.set("test2", "test2");
		expect(localStore.key(0)).toBe("test");
	});
	test("remove", () => {
		localStore.set("test", "test");
		localStore.set("test2", "test2");
		localStore.remove("test");
		expect(localStore.length).toBe(1);
		expect(localStore.key(0)).toBe("test2");
		expect(localStore.get("test")).toEqual(null);
	});
	test("removeItem", () => {
		localStore.set("test", "test");
		localStore.set("test2", "test2");
		localStore.removeItem("test");
		expect(localStore.length).toBe(1);
		expect(localStore.key(0)).toBe("test2");
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
	});
	test("PlainObject", () => {
		const obj = {
			test: "test",
			test2: "test2",
			map: new Map([["test", "test"]]),
			null: null,
			undefined: undefined,
			array: [1, 2, 3],
		};
		localStore.set("test", obj);
		expect(localStore.get("test")).toEqual(obj);
		expect(localStore.get("test").map.has("test")).toBe(true);
		expect(localStore.get("test").array).toEqual([1, 2, 3]);
		expect(localStore.get("test").null).toEqual(null);
	});
	test("Null", () => {
		const obj = null;
		localStore.set("test", obj);
		expect(localStore.get("test")).toBeNull();
	});
	test("NaN", () => {
		const nan = NaN;
		localStore.set("test", nan);
		expect(localStore.get("test")).toBe(NaN);
	});
	test("Undefined", () => {
		const obj = undefined;
		localStore.set("test", obj);
		expect(localStore.get("test")).toBeUndefined();
	});
	test("Boolean", () => {
		const bool = true;
		localStore.set("test", bool);
		expect(localStore.get("test")).toEqual(bool);
	});
	test("localStorage.setItem--localStore.get", () => {
		localStorage.setItem("test", "test");
		localStorage.setItem("test2", JSON.stringify({ test: "test2" }));
		expect(localStore.get("test")).toEqual("test");
		expect(localStore.get("test2")).toEqual({ test: "test2" });
	})
	test("addTypeOperation", () => {
		// 添加自定义的序列化和反序列化的类型选项
		localStore.addTypeOperation('Date', {
			serialize: (date: Date) => date.toISOString(),
			deserialize: (str: string) => new Date(str),
		});
		// 设置值
		const date = new Date("2024-4-21");
		localStore.set('date', date);
		expect(localStore.get("date")).toEqual("2024-04-20T16:00:00.000Z");
	})
});
