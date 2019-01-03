import * as types from "./types";
import { Rect } from "./Rect";
import { BasicEvents } from "./BasicEvents";
import { DrawTextOptions, DrawOptions } from "./Renderer";
export declare abstract class BaseRenderer extends BasicEvents<types.RendererEvent, types.IRendererEvent, types.RendererEventHandler> implements types.IRenderer {
    protected parent: HTMLElement;
    abstract draw(options: DrawOptions, group?: any): any;
    abstract updateDraw(item: any, options: DrawOptions): any;
    abstract measureText(text: string, options: Partial<DrawTextOptions>): {
        width: number;
        height: number;
    };
    abstract realPointToPagePoint(realPoint: types.IPoint, page: types.IPage): types.IPoint;
    abstract pagePointToRealPoint(pagePoint: types.IPoint, page: types.IPage): types.IPoint;
    abstract resizeRender(): void;
    abstract pageByRealCoords(coords: types.IPoint): types.IPage | null;
    abstract removeDrawableGroup(group: any): void;
    protected zoomLevel: number;
    protected abstract delegateEvents(event: types.RendererEvent, handler: types.RendererEventHandler): void;
    private curPage;
    abstract destroy(): void;
    abstract clearDrawing(group?: any): void;
    abstract getDrawableGroup(): any;
    readonly renderWidth: number;
    readonly renderHeight: number;
    /**
     * The minimum left where user can scroll canvas
     */
    readonly minX: number;
    /**
     * The minimum top where user can scroll canvas
     */
    readonly minY: number;
    /**
     * The max left where user can scroll canvas
     */
    readonly maxX: number;
    readonly maxY: number;
    /**
     * the width to whole rendered design file (normally design file width * zoom)
     */
    abstract readonly imgWidth: number;
    /**
     * the height to whole rendered design file (normally design file height * zoom)
     */
    abstract readonly imgHeight: number;
    constructor(parent: HTMLElement);
    private _delegateEvents;
    mouseEventToCoords(evt: types.IRendererEvent): types.IPoint;
    rendererPointToRealPoint(rendererPoint: types.IPoint, clamp?: boolean): types.IPoint;
    realPointToRendererPoint(realPoint: types.IPoint): types.IPoint;
    abstract zoom(level?: number): number;
    protected abstract _panX(pixel?: number): number;
    protected abstract _panY(pixel?: number): number;
    panX(pixel?: number): number;
    panY(pixel?: number): number;
    abstract renderPages(pages: types.IPage[]): Promise<any>;
    realRectToRendererRect(realRect: Rect): Rect;
    rendererRectToRealRect(rendererRect: Rect): Rect;
}
