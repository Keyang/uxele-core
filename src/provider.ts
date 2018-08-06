import { IFileAdapter, IRenderer } from "./types";

export class CoreProvider<T extends IRenderer> {
  private adapters: IFileAdapter[] = [];
  private render?: T;
  public addAdapter(adp: IFileAdapter) {
    this.adapters.push(adp);
  }
  public getAdapters(): IFileAdapter[] {
    return this.adapters;
  }
  public setRenderer(r: T) {
    this.render = r;
  }
  public getRenderer(): T {
    if (this.render) {
      return this.render;
    } else {
      throw (new Error("No renderer was set when calling getRenderer.."));
    }
  }


}