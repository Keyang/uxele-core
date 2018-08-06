"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isPixelLayer(layer) {
    return layer.getPixelImg !== undefined;
}
exports.isPixelLayer = isPixelLayer;
function isVectorlLayer(layer) {
    return layer.getSvgString !== undefined;
}
exports.isVectorlLayer = isVectorlLayer;
function isTextLayer(layer) {
    return layer.getText !== undefined;
}
exports.isTextLayer = isTextLayer;
function isFolderLayer(layer) {
    return layer.children !== undefined;
}
exports.isFolderLayer = isFolderLayer;
//# sourceMappingURL=/Users/kxiang/work/projects/psdetch/v3-new/psdetch-core/src/layer.js.map