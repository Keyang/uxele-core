import { IFileAdapter, IRenderer } from "./types";
export declare class CoreProvider<T extends IRenderer> {
    private adapters;
    private render?;
    addAdapter(adp: IFileAdapter): void;
    getAdapters(): IFileAdapter[];
    setRenderer(r: T): void;
    getRenderer(): T;
}
