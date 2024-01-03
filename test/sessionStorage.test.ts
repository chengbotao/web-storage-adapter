/*
 * @Author: Chengbotao
 * @Contact: https://github.com/chengbotao
 */
import { sessionStore } from "../src/index";

describe("SessionStore", () => {
	beforeEach(() => {
		sessionStore.clear();
	});
	test("length", () => {
		sessionStore.set("test", "test");
		sessionStore.set("test2", "test2");
		expect(sessionStore.length).toBe(2);
	});
	test("clear", () => {
		sessionStore.set("npm", "botaocheng");
		sessionStore.set("pack", "@manzhixing/web-storage-adapter");
		sessionStore.clear();
		expect(sessionStore.length).toBe(0);
	});
	test("key", () => {
		sessionStore.set("test", "test");
		sessionStore.set("test2", "test2");
		expect(sessionStore.key(0)).toBe("test");
	});
	test("remove", () => {
		sessionStore.set("test", "test");
		sessionStore.set("test2", "test2");
		sessionStore.remove("test");
		expect(sessionStore.length).toBe(1);
		expect(sessionStore.key(0)).toBe("test2");
		expect(sessionStore.get("test")).toEqual(null);
	});
	test("removeItem", () => {
		sessionStore.set("test", "test");
		sessionStore.set("test2", "test2");
		sessionStore.removeItem("test");
		expect(sessionStore.length).toBe(1);
		expect(sessionStore.key(0)).toBe("test2");
		expect(sessionStore.get("test")).toEqual(null);
	});
	test("set-get", () => {
		sessionStore.set("test", "test");
		expect(sessionStore.get("test")).toEqual("test");
	});
	test("setItem-getItem", () => {
		sessionStore.setItem("test", "test");
		expect(sessionStore.getItem("test")).toEqual("test");
	});

	test("Map", () => {
		const map = new Map();
		map.set("test", "test");
		map.set("test2", "test2");
		sessionStore.set("test", map);
		expect(sessionStore.get("test")).toEqual(map);
		expect(sessionStore.get("test").has("test2")).toBe(true);
	});
	test("Set", () => {
		const set = new Set();
		set.add("test");
		set.add("test2");
		sessionStore.set("test", set);
		expect(sessionStore.get("test").has("test2")).toBe(true);
	});
	test("BigInt", () => {
		const bigInt = BigInt(123456789);
		sessionStore.set("test", bigInt);
		expect(sessionStore.get("test")).toEqual(bigInt);
	});
	test("Symbol", () => {
		const symbol = Symbol.for("test");
		sessionStore.set("test", symbol);
		expect(sessionStore.get("test")).toEqual(symbol);
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
		sessionStore.set("test", obj);
		expect(sessionStore.get("test")).toEqual(obj);
		expect(sessionStore.get("test").map.has("test")).toBe(true);
		expect(sessionStore.get("test").array).toEqual([1, 2, 3]);
		expect(sessionStore.get("test").null).toEqual(null);
	});
	test("Null", () => {
		const obj = null;
		sessionStore.set("test", obj);
		expect(sessionStore.get("test")).toBeNull();
	});
	test("NaN", () => {
		const nan = NaN;
		sessionStore.set("test", nan);
		expect(sessionStore.get("test")).toBe(NaN);
	});
	test("Undefined", () => {
		const obj = undefined;
		sessionStore.set("test", obj);
		expect(sessionStore.get("test")).toBeUndefined();
	});
	test("Boolean", () => {
		const bool = true;
		sessionStore.set("test", bool);
		expect(sessionStore.get("test")).toEqual(bool);
	});
});
