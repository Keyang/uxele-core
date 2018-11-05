// import { BasicEvents } from "./BasicEvents";
// import { CoreProvider } from "./provider";
import { IRenderer } from "./types";
// export type BaseToolEvents = "onActivated" | "onDeactivated";

export abstract class BaseTool {
  public abstract name: string;
  public abstract slug: string;
  public abstract cls:string;
  public activated: boolean = false;
  constructor(protected renderer: IRenderer) {
  }
  protected abstract bindRenderer(): Promise<void>;
  protected abstract unbindRenderer(): Promise<void>;
  public activate() {

    // renderer.clearDrawing();
    return this.bindRenderer()
      .then(() => {
        this.activated = true;
      })
  }
  public deactivate() {
    return this.unbindRenderer()
      .then(() => {
        this.activated = false;
      })
  }
}