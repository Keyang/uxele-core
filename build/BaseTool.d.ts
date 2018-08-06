import { BasicEvents } from "./BasicEvents";
import { IRenderer } from "./types";
export declare type BaseToolEvents = "onActivated" | "onDeactivated";
export declare abstract class BaseTool<T extends string, T1, T2 extends IRenderer> extends BasicEvents<T | BaseToolEvents, T1, (arg?: T1) => void> {
    protected renderer: T2;
    abstract name: string;
    abstract slug: string;
    activated: boolean;
    constructor(renderer: T2);
    protected abstract bindRenderer(): Promise<void>;
    protected abstract unbindRenderer(): Promise<void>;
    activate(): void;
    deactivate(): void;
}
