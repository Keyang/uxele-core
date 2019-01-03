import * as types from "./types";
import { Rect } from "./Rect";
import { BasicEvents } from "./BasicEvents";
import { DrawTextOptions, DrawOptions } from "./Renderer";

export abstract class BaseRenderer extends BasicEvents<types.RendererEvent, types.IRendererEvent, types.RendererEventHandler> implements types.IRenderer {

  abstract draw(options: DrawOptions, group?: any): any;
  abstract updateDraw(item:any,options: DrawOptions): any;
  abstract measureText(text: string,options:Partial<DrawTextOptions>): { width: number; height: number; } 
  abstract realPointToPagePoint(realPoint: types.IPoint, page: types.IPage): types.IPoint;
  abstract pagePointToRealPoint(pagePoint: types.IPoint, page: types.IPage): types.IPoint;
  abstract resizeRender(): void
  abstract pageByRealCoords(coords: types.IPoint): types.IPage | null;
  abstract removeDrawableGroup(group: any):void;
  // protected abstract setCanvasSize(width: number, height: number): void
  protected zoomLevel: number = 1;

  protected abstract delegateEvents(event: types.RendererEvent, handler: types.RendererEventHandler): void;
  private curPage: types.IPage | undefined;
  abstract destroy(): void;
  abstract clearDrawing(group?: any): void;
  abstract getDrawableGroup(): any;
  get renderWidth() {
    return this.parent.clientWidth;
  }
  get renderHeight() {
    return this.parent.clientHeight;
  }
  /**
   * The minimum left where user can scroll canvas 
   */
  get minX(): number {
    return -this.renderWidth / 2;
  }
  /**
   * The minimum top where user can scroll canvas 
   */
  get minY(): number {
    return -this.renderHeight / 2;
  }
  /**
   * The max left where user can scroll canvas 
   */
  get maxX(): number {
    return this.imgWidth - this.renderWidth / 2;
  }
  get maxY(): number {
    return this.imgHeight - this.renderHeight / 2;
  }
  /**
   * the width to whole rendered design file (normally design file width * zoom)
   */
  abstract get imgWidth(): number;
  /**
   * the height to whole rendered design file (normally design file height * zoom)
   */
  abstract get imgHeight(): number;
  constructor(
    protected parent: HTMLElement
  ) {
    super();
    setTimeout(() => {
      this._delegateEvents();
    });

  }
  private _delegateEvents() {
    types.rendererEvents.forEach((evt) => {
      this.delegateEvents(evt, (e) => {
        this.emit(evt, e);
      })
    })
  }
  mouseEventToCoords(evt: types.IRendererEvent): types.IPoint {
    const e = evt.e as MouseEvent;
    const container=this.parent.getBoundingClientRect();
    return {
      x: e.clientX-container.left,
      y: e.clientY-container.top
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
  // getPage(): types.IPage | undefined {
  //   return this.curPage;
  //   // if (this.curPage) {

  //   // } else {
  //   //   throw new Error("No page is rendered.");
  //   // }

  // }

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
  abstract zoom(level?: number): number;
  protected abstract _panX(pixel?: number): number;
  protected abstract _panY(pixel?: number): number;
  panX(pixel?: number): number {
    if (pixel !== undefined) {
      const clampPixel = Math.min(Math.max(pixel, this.minX), this.maxX);
      this._panX(clampPixel);
    }
    return this._panX();
  }
  panY(pixel?: number): number {
    if (pixel !== undefined) {
      const clampPixel = Math.min(Math.max(pixel, this.minY), this.maxY);
      this._panY(clampPixel);
    }
    return this._panY();
  }
  abstract renderPages(pages: types.IPage[]): Promise<any>
  realRectToRendererRect(realRect: Rect): Rect {
    return realRect.pan(-this.panX() / this.zoom(), -this.panY() / this.zoom()).zoom(this.zoom());
  }
  rendererRectToRealRect(rendererRect: Rect): Rect {
    return rendererRect.pan(this.panX(), this.panY()).zoom(1 / this.zoom());
  }
}
