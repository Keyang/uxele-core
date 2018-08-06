import { BasicEvents } from "./BasicEvents";
import { CoreProvider } from "./provider";
import { IRenderer } from "./types";
export type BaseToolEvents = "onActivated" | "onDeactivated";

export abstract class BaseTool<T extends string, 
                              T1, 
                              T2 extends IRenderer> extends BasicEvents<T | BaseToolEvents, T1, (arg?: T1) => void>{
  public abstract name: string;
  public abstract slug: string;
  public activated: boolean = false;
  constructor(protected renderer: T2) {
    super();
  }
  protected abstract bindRenderer(): Promise<void>;
  protected abstract unbindRenderer(): Promise<void>;
  public activate(): void {
   
    // renderer.clearDrawing();
    this.bindRenderer()
      .then(() => {
        this.activated=true;
        this.emit("onActivated");
      })
  }
  public  deactivate(): void{
    this.unbindRenderer()
    .then(()=>{
      this.activated=false;
      this.emit("onDeactivated");
    })
  }
}