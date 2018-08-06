export declare class BasicEvents<T extends string, T1, T2 extends (arg?: T1) => void> {
    private regEvents;
    off(evt?: T | undefined, handler?: T2): void;
    on(evt: T, handler: T2): void;
    once(evt: T, handler: T2): void;
    emit(evt: T, value?: T1): void;
}
