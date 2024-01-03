/*
 * @Author: Chengbotao
 * @Contact: https://github.com/chengbotao
 */
interface TypeOperation {
	deserialize(value: unknown): unknown;
	serialize(value: unknown): string;
}
export const typeOperations: Map<string, TypeOperation> = new Map([
	[
		"Map",
		{
			deserialize: (
				value: Iterable<readonly [unknown, unknown]> | null | undefined
			) => new Map(value),
			serialize: (value: Iterable<unknown> | ArrayLike<unknown>) => {
				return JSON.stringify({ type: "Map", value: Array.from(value) });
			},
		},
	],
	[
		"Set",
		{
			deserialize: (
				value: Iterable<readonly [unknown, unknown]> | null | undefined
			) => new Set(value),
			serialize: (value: Iterable<unknown> | ArrayLike<unknown>) => {
				return JSON.stringify({ type: "Set", value: Array.from(value) });
			},
		},
	],
	[
		"Symbol",
		{
			deserialize: (value: string) => Symbol.for(value),
			serialize: (value: symbol) => {
				return JSON.stringify({ type: "Symbol", value: Symbol.keyFor(value) });
			},
		},
	],
	[
		"BigInt",
		{
			deserialize: (value: bigint) => BigInt(value),
			serialize: (value: string | number | bigint | boolean) => {
				return JSON.stringify({ type: "BigInt", value: value.toString() });
			},
		},
	],
]);
