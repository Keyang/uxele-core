import { IRenderer } from "./types";
export declare abstract class BaseTool {
    protected renderer: IRenderer;
    abstract name: string;
    abstract slug: string;
    abstract cls: string;
    activated: boolean;
    constructor(renderer: IRenderer);
    protected abstract bindRenderer(): Promise<void>;
    protected abstract unbindRenderer(): Promise<void>;
    activate(): Promise<void>;
    deactivate(): Promise<void>;
}
