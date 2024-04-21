interface TypeOperation {
    deserialize(value: unknown): unknown;
    serialize(value: unknown): string;
}

declare enum StorageType {
    Local = "local",
    Session = "session"
}
declare abstract class WebStorage {
    private storage;
    constructor(storageType: StorageType);
    addTypeOperation(type: string, operations: TypeOperation): void;
    get(key: string): any;
    set(key: string, value: unknown): void;
    remove(key: string): void;
    clear(): void;
    key(index: number): string | null;
    get length(): number;
    get getItem(): (key: string) => any;
    get setItem(): (key: string, value: unknown) => void;
    get removeItem(): (key: string) => void;
}

declare class LocalStore extends WebStorage {
    constructor();
}
declare const localStore: LocalStore;

declare class SessionStore extends WebStorage {
    constructor();
}
declare const sessionStore: SessionStore;

export { localStore, sessionStore };
