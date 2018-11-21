import * as types from "./types";
import { Rect } from "./Rect";
import { BasicEvents } from "./BasicEvents";

export abstract class BaseRenderer extends BasicEvents<types.RendererEvent, types.IRendererEvent, types.RendererEventHandler> implements types.IRenderer {
  resizeRender(width: number, height: number): void {
    this.setCanvasSize(width, height);
    this.renderWidth = width;
    this.renderHeight = height;
  }
  protected abstract setCanvasSize(width: number, height: number): void
  protected zoomLevel: number = 1;
  abstract clearDrawing(params?: any, zindex?: types.RendererDrawZIndex): void;
  abstract setBackground(img?: HTMLImageElement | undefined): void;
  abstract getBackground(): HTMLImageElement | undefined;
  abstract draw(param: any, zindex?: types.RendererDrawZIndex): void;
  private curPage: types.IPage | undefined;
  abstract destroy(): void;
  get minX(): number {
    return -this.renderWidth / 2;
  }
  get minY(): number {
    return -this.renderHeight / 2;
  }
  get maxX(): number {
    return this.getPage()!.width * this.zoom() - this.renderWidth / 2;
  }
  get maxY(): number {
    return this.getPage()!.height * this.zoom() - this.renderHeight / 2;
  }
  get imgWidth() {
    return this.getPage()!.width * this.zoom();
  }
  get imgHeight() {
    return this.getPage()!.height * this.zoom();
  }
  constructor(
    protected ele: HTMLCanvasElement,
    public renderWidth: number,
    public renderHeight: number,
  ) {
    super();
  }
  mouseEventToCoords(evt: types.IRendererEvent): types.IPoint {
    const e = evt.e as MouseEvent;
    return {
      x: e.offsetX,
      y: e.offsetY
    }
  }
  rendererPointToRealPoint(rendererPoint: types.IPoint, clamp: boolean = true): types.IPoint {
    if (clamp) {
      return {
        x: Math.round(Math.min(Math.max(rendererPoint.x + this.panX(), 0), this.imgWidth) / this.zoom()),
        y: Math.round(Math.min(Math.max(rendererPoint.y + this.panY(), 0), this.imgHeight) / this.zoom())
      };
    } else {
      return {
        x: Math.round((rendererPoint.x + this.panX()) / this.zoom()),
        y: Math.round((rendererPoint.y + this.panY()) / this.zoom())
      }
    }

  }
  realPointToRendererPoint(realPoint: types.IPoint): types.IPoint {
    return {
      x: Math.round(realPoint.x * this.zoom() - this.panX()),
      y: Math.round(realPoint.y * this.zoom() - this.panY()),
    };
  }
  getPage(): types.IPage | undefined {
    return this.curPage;
    // if (this.curPage) {

    // } else {
    //   throw new Error("No page is rendered.");
    // }

  }

  // zoom(level?: number): number {
  //   if (level !== undefined) {
  //     const curX = this.panX();
  //     const curY = this.panY();
  //     const curZoom = this.zoomLevel;
  //     this.zoomLevel = level;
  //     const targetX = curX + this.getPage()!.width * (level - curZoom) / 2;
  //     const targetY = curY + this.getPage()!.height * (level - curZoom) / 2;
  //     this.zoomWithoutPan(level)
  //       .then(() => {
  //         this.panX(targetX);
  //         this.panY(targetY);
  //       })
  //     return level;
  //   } else {
  //     return this.zoomLevel;
  //   }
  // }
  zoom(level?: number): number {
    if (level !== undefined) {
      this.getPage()!.getPreview(level)
        .then((img) => {
          this.setBackground(img);
        })
      this.zoomLevel = level;
      return level
    }
    return this.zoomLevel;
  }
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
