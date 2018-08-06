import * as types from "./types";
import { Rect } from "./Rect";
import { BasicEvents } from "./BasicEvents";
export declare abstract class BaseRenderer extends BasicEvents<types.RendererEvent, types.IRendererEvent, types.RendererEventHandler> implements types.IRenderer {
    protected ele: HTMLCanvasElement;
    renderWidth: number;
    renderHeight: number;
    abstract clearDrawing(params?: any, zindex?: types.RendererDrawZIndex): void;
    abstract setBackground(img?: HTMLImageElement | undefined): void;
    abstract draw(param: any, zindex?: types.RendererDrawZIndex): void;
    private curPage;
    abstract destroy(): void;
    readonly minX: number;
    readonly minY: number;
    readonly maxX: number;
    readonly maxY: number;
    constructor(ele: HTMLCanvasElement, renderWidth: number, renderHeight: number);
    rendererPointToRealPoint(rendererPoint: types.IPoint): types.IPoint;
    realPointToRendererPoint(realPoint: types.IPoint): types.IPoint;
    getPage(): types.IPage;
    abstract zoom(level?: number): number;
    abstract panX(pixel?: number): number;
    abstract panY(pixel?: number): number;
    renderPage(page: types.IPage): Promise<any>;
    realRectToRendererRect(realRect: Rect): Rect;
    rendererRectToRealRect(rendererRect: Rect): Rect;
}
