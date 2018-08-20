import { ILayer, IPixelLayer, IVectorLayer, ITextLayer, IFolderLayer, IPoint } from "./types";
export declare function isPixelLayer(layer: ILayer): layer is IPixelLayer;
export declare function isVectorlLayer(layer: ILayer): layer is IVectorLayer;
export declare function isTextLayer(layer: ILayer): layer is ITextLayer;
export declare function isFolderLayer(layer: ILayer): layer is IFolderLayer;
/**
 *
 * @param x x coords on design file
 * @param y y coords on design file
 * @param layers
 */
export declare function bestLayerByCoords(coords: IPoint, layers: ILayer[]): Promise<ILayer | undefined>;
