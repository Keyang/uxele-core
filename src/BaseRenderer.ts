import * as types from "./types";
import { Rect } from "./Rect";
import { BasicEvents } from "./BasicEvents";

export abstract class BaseRenderer extends BasicEvents<types.RendererEvent, types.IRendererEvent,types.RendererEventHandler> implements types.IRenderer {

  abstract clearDrawing(params?:any, zindex?:types.RendererDrawZIndex): void;
  abstract setBackground(img?: HTMLImageElement | undefined): void;
  abstract draw(param: any, zindex?: types.RendererDrawZIndex): void;
  private curPage: types.IPage | undefined;
  abstract destroy(): void;
  get minX():number{
    return -this.renderWidth / 2;
  }
  get minY():number{
    return -this.renderHeight / 2;
  }
  get maxX():number{
    return this.getPage().width*this.zoom() - this.renderWidth / 2;
  }
  get maxY():number{
    return this.getPage().height*this.zoom() - this.renderHeight / 2;
  }
  constructor(
    protected ele: HTMLCanvasElement,
    public renderWidth: number,
    public renderHeight: number,
  ){
    super();
  }
  rendererPointToRealPoint(rendererPoint: types.IPoint): types.IPoint {
    return {
      x: (rendererPoint.x + this.panX()) / this.zoom(),
      y: (rendererPoint.y + this.panY()) / this.zoom(),
    };
  }
  realPointToRendererPoint(realPoint: types.IPoint): types.IPoint {
    return {
      x: realPoint.x * this.zoom() - this.panX(),
      y: realPoint.y * this.zoom() - this.panY(),
    };
  }
  getPage(): types.IPage {
    if (this.curPage) {
      return this.curPage;
    } else {
      throw new Error("Not page is rendered.");
    }

  }
 
  abstract zoom(level?: number): number;
  abstract panX(pixel?: number): number;
  abstract panY(pixel?: number): number;
  async renderPage(page: types.IPage): Promise<any> {
    this.curPage = page;
    const img = await page.getPreview(this.zoom());
    this.setBackground(img);
  }
  realRectToRendererRect(realRect: Rect): Rect {
    return realRect.pan(-this.panX() / this.zoom(), -this.panY() / this.zoom()).zoom(this.zoom());
  }
  rendererRectToRealRect(rendererRect: Rect): Rect {
    return rendererRect.pan(this.panX(), this.panY()).zoom(1 / this.zoom());
  }
}
