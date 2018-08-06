import { ILayer, IPixelLayer, IVectorLayer, ITextLayer, IFolderLayer } from "./types";
export declare function isPixelLayer(layer: ILayer): layer is IPixelLayer;
export declare function isVectorlLayer(layer: ILayer): layer is IVectorLayer;
export declare function isTextLayer(layer: ILayer): layer is ITextLayer;
export declare function isFolderLayer(layer: ILayer): layer is IFolderLayer;
