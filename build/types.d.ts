import { Progress } from "./Progress";
import { Rect } from "./Rect";
import { DrawTextOptions, DrawOptions } from "./Renderer";
/**
 * Open a design file and convert it to a project.
 */
export interface IFileAdapter {
    /**
     * List of file extensions to accept.e.g ["psd","psb"]
     */
    acceptExtensions: string[];
    /**
     * The name of the file type that can be opened by this adapter
     */
    fileTypeName: string;
    /**
     * Determin if a file can be decoded with this file adapter
     * @param meta the meta of the file that needs to be matched with this adapter
     */
    checkFileMeta(meta: IFileMeta): boolean;
    /**
     * Decode a file and convert it to a IProject instance.
     * @param designFile
     */
    decodeProject(designFile: IFileBlob): Promise<IProject>;
}
/**
 * Package a project into a file.
 */
export interface IFilePackager<T> {
    packagerName: string;
    encodeProject(project: IProject): Promise<T>;
}
export interface IProject {
    name: string;
    fileMeta: IFileMeta;
    getPages(): Promise<IPage[]>;
}
export interface IFileMeta {
    id?: string;
    name: string;
    mime: string;
}
export interface IFileBlob {
    meta: IFileMeta;
    file: Blob;
}
export interface IFileSource {
    /**
     * Pick one or many files from storage
     */
    pickFiles(): Progress<IFileBlob[]>;
    /**
     * Save a file to storage
     */
    saveFile(f: IFileBlob): Progress<any>;
}
export interface IPage {
    /**
     * id of the page. it is mainly used page reference such as in prototyping.
     */
    id: string;
    /**
     * The name of the page
     */
    name: string;
    /**
     * relative offset of the page to 0,0 of whole design file
     */
    offsetX?: number;
    /**
     * relative offset of the page to 0,0 of whole design file
     */
    offsetY?: number;
    width: number;
    height: number;
    getPreview(): Promise<HTMLImageElement>;
    getLayers(): Promise<ILayer[]>;
}
export interface ILayerStyle {
    fontFamily?: string;
    fontSize?: number;
    color?: string;
    fontWeight?: string;
    fontStyle?: string;
    textDecoration?: string;
    textAlign?: string;
    width?: number;
    height?: number;
    dropShadow?: any;
    fillColor?: string;
}
export interface ILayer {
    name: string;
    /**
     * the position of the layer relative to its page
     */
    rect: Rect;
    page: IPage;
    layerType: LayerType;
    visible: boolean;
    maskBy?: ILayer;
    style?: ILayerStyle;
}
export interface IPixelLayer extends ILayer {
    getPixelImg(): Promise<HTMLCanvasElement>;
}
export interface IVectorLayer extends ILayer {
    getSvgString(): Promise<string>;
}
export interface ITextLayer extends ILayer {
    getText(): Promise<string>;
}
export interface IFolderLayer extends ILayer {
    children(): Promise<ILayer[]>;
    childrenLength: number;
}
export interface ICanvasConfig {
    offset: IPoint;
    zoom: number;
    scale: number;
}
export interface IPoint {
    x: number;
    y: number;
}
export declare type RendererEvent = "mousedown" | "mouseup" | "mousemove" | "click" | "mouseleave";
export declare const rendererEvents: RendererEvent[];
export declare type RendererEventHandler = (e?: IRendererEvent) => void;
export interface IRenderer {
    renderWidth: number;
    renderHeight: number;
    imgWidth: number;
    imgHeight: number;
    zoom(level?: number): number;
    panX(pixel?: number): number;
    panY(pixel?: number): number;
    renderPages(pages: IPage[]): Promise<any>;
    on(evt: RendererEvent, handler: RendererEventHandler): void;
    off(evt?: RendererEvent, handler?: RendererEventHandler): void;
    once(evt: RendererEvent, handler: RendererEventHandler): void;
    destroy(): void;
    /**
     * RendererPoint -- coords that are related to canvas element
     * RealPoint -- coords that are related to current image (design file)
     *
     * As canvas could be smaller or bigger than design file, this function maps a point on canvas to the design file.
     */
    rendererPointToRealPoint(rendererPoint: IPoint, clamp?: boolean): IPoint;
    /**
     * as renderer renders multiple pages, this function converts absolute coords to coords that is related to a page.
     * the result is a coords that is related to left/top of the page
     */
    realPointToPagePoint(realPoint: IPoint, page: IPage): IPoint;
    /**
     * see above.. just opposite operation
     */
    pagePointToRealPoint(pagePoint: IPoint, page: IPage): IPoint;
    realPointToRendererPoint(realPoint: IPoint): IPoint;
    realRectToRendererRect(realRect: Rect): Rect;
    rendererRectToRealRect(rendererRect: Rect): Rect;
    draw(options: DrawOptions, group?: any): any;
    updateDraw(item: any, options: DrawOptions): any;
    /**
     * Create a group on renderer. A group can be used to group a bunch of draws.
     */
    getDrawableGroup(): any;
    measureText(text: string, options: Partial<DrawTextOptions>): {
        width: number;
        height: number;
    };
    removeDrawableGroup(group: any): void;
    clearDrawing(group?: any): void;
    mouseEventToCoords(evt: IRendererEvent): IPoint;
    resizeRender(): void;
    /**
     * retrieve page by coords
     * @param coords coords that are relative to rendered image (design file)
     * */
    pageByRealCoords(coords: IPoint): IPage | null;
}
export interface IDrawRectParam {
    color: string;
    width: number;
    fillColor?: string;
}
export interface IRendererEvent {
    e: Event;
    target?: any;
}
export declare enum LayerType {
    folder = "folder",
    pixel = "pixel",
    vector = "vector",
    text = "text"
}
export interface IExporter {
    name: string;
    iconCls: string;
    exportBlob(blob: Blob, name: string): Promise<any>;
}
