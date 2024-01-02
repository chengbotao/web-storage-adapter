declare enum StorageType {
    Local = "local",
    Session = "session"
}
declare abstract class WebStorage {
    private storage;
    constructor(storageType: StorageType);
    get length(): number;
    clear(): void;
    key(index: number): string | null;
}

declare class LocalStore extends WebStorage {
    constructor();
}

declare class SessionStore extends WebStorage {
    constructor();
}

export { LocalStore, SessionStore };
