"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isDrawImage(opt) {
    return !!opt.img;
}
exports.isDrawImage = isDrawImage;
function isDrawLine(opt) {
    return opt.x1 !== undefined;
}
exports.isDrawLine = isDrawLine;
function isDrawText(opt) {
    return opt.txt !== undefined;
}
exports.isDrawText = isDrawText;
function isDrawCircle(opt) {
    return opt.radius !== undefined;
}
exports.isDrawCircle = isDrawCircle;
function isDrawRect(opt) {
    return opt.width !== undefined;
}
exports.isDrawRect = isDrawRect;
//# sourceMappingURL=/Users/kxiang/work/projects/psdetch/v3-new/uxele-core/src/Renderer.js.map