import { Progress } from "./Progress";
import { Rect } from "./Rect";
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
    getPreview(zoom: number): Promise<HTMLImageElement>;
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
}
export interface ILayer {
    name: string;
    rect: Rect;
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
export declare type RendererEventHandler = (e?: IRendererEvent) => void;
export declare type RendererDrawZIndex = "low" | "normal" | "high";
export interface IRenderer {
    renderWidth: number;
    renderHeight: number;
    zoom(level?: number): number;
    panX(pixel?: number): number;
    panY(pixel?: number): number;
    renderPage(page: IPage): Promise<any>;
    on(evt: RendererEvent, handler: RendererEventHandler): void;
    off(evt?: RendererEvent): void;
    once(evt: RendererEvent, handler: RendererEventHandler): void;
    destroy(): void;
    rendererPointToRealPoint(rendererPoint: IPoint): IPoint;
    realPointToRendererPoint(realPoint: IPoint): IPoint;
    realRectToRendererRect(realRect: Rect): Rect;
    rendererRectToRealRect(rendererRect: Rect): Rect;
    getPage(): IPage;
    setBackground(img?: HTMLImageElement): void;
    draw(param: any, zindex?: RendererDrawZIndex): void;
    clearDrawing(param?: any, zindex?: RendererDrawZIndex): void;
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
