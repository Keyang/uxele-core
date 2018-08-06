import { ILayer, IPixelLayer, IVectorLayer, ITextLayer, IFolderLayer } from "./types";

export function isPixelLayer(layer: ILayer): layer is IPixelLayer {
  return (layer as IPixelLayer).getPixelImg !== undefined;
}
export function isVectorlLayer(layer: ILayer): layer is IVectorLayer {
  return (layer as IVectorLayer).getSvgString !== undefined;
}

export function isTextLayer(layer: ILayer): layer is ITextLayer {
  return (layer as ITextLayer).getText !== undefined;
}

export function isFolderLayer(layer: ILayer): layer is IFolderLayer {
  return (layer as IFolderLayer).children !== undefined;
}
