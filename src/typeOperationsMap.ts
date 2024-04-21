/*
 * @Author: Chengbotao
 * @Contact: https://github.com/chengbotao
 */
export interface TypeOperation {
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
	[
		"NaN",
		{
			deserialize: (value: unknown) => NaN,
			serialize: (value: unknown) => {
				return JSON.stringify({ type: "NaN", value: value });
			},
		},
	],
	[
		"Undefined",
		{
			deserialize: (value: unknown) => undefined,
			serialize: (value: unknown) => {
				return JSON.stringify({ type: "Undefined", value: value });
			},
		},
	],
	[
        "Object",
        {
            deserialize: (value: Record<string, { type: string, value: any }>) => {
                const resultValue: Record<string, unknown> = {};
                value && Object.entries(value).forEach(([key, values]) => {
                    const { type, value } = values;
                    if (type !== "Object" && typeOperations.has(type)) {
                        resultValue[key] = typeOperations.get(type)!.deserialize(value);
                    } else {
                        resultValue[key] = JSON.parse(value);
                    }
                });
                return resultValue;
            },
            serialize: (value: any) => {
                const resultValue: Record<string, unknown> = {};
                value && Object.entries(value).forEach(([key, value]) => {
                    const type = Object.prototype.toString
                        .call(value)
                        .replace(/^\[object (.+)\]$/, "$1");
                    if (type !== "Object" && typeOperations.has(type)) {
                        resultValue[key] = JSON.parse(typeOperations.get(type)!.serialize(value));
                    } else {
                        resultValue[key] = {
                            type,
                            value: JSON.stringify(value),
                        };
                    }
                });
                return JSON.stringify({ type: "Object", value: resultValue });
            },
        },
    ],
]);
