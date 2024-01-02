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
			deserialize: (value: symbol) => Symbol.keyFor(value),
			serialize: (value: string) => {
				return JSON.stringify({ type: "Symbol", value: Symbol.for(value) });
			},
		},
	],
	[
		"BigInt",
		{
			deserialize: (value: bigint) => value.toString(),
			serialize: (value: string | number | bigint | boolean) => {
				return JSON.stringify({ type: "BigInt", value: BigInt(value) });
			},
		},
	],
]);
