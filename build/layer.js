"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
/**
 *
 * @param x x coords on design file
 * @param y y coords on design file
 * @param layers
 */
function bestLayerByCoords(coords, layers) {
    return __awaiter(this, void 0, void 0, function () {
        var curDist, curLayer, x, y, i, l, res, _a, _b, dist;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    curDist = 0;
                    curLayer = undefined;
                    x = coords.x, y = coords.y;
                    i = layers.length - 1;
                    _c.label = 1;
                case 1:
                    if (!(i >= 0)) return [3 /*break*/, 6];
                    l = layers[i];
                    if (!l.visible) {
                        return [3 /*break*/, 5];
                    }
                    if (!l.rect.containsCoords(x, y)) {
                        return [3 /*break*/, 5];
                    }
                    res = l;
                    if (!isFolderLayer(l)) return [3 /*break*/, 4];
                    if (!(l.childrenLength > 0)) return [3 /*break*/, 4];
                    _a = bestLayerByCoords;
                    _b = [coords];
                    return [4 /*yield*/, l.children()];
                case 2: return [4 /*yield*/, _a.apply(void 0, _b.concat([_c.sent()]))];
                case 3:
                    res = _c.sent();
                    _c.label = 4;
                case 4:
                    if (!res) {
                        return [3 /*break*/, 5];
                    }
                    dist = res.rect.coordsToCenter({ x: x, y: y });
                    if (!curLayer) {
                        curLayer = res;
                        curDist = dist;
                    }
                    else if (curLayer.rect.contains(res.rect)) {
                        curLayer = res;
                        curDist = dist;
                    }
                    else if (res.rect.contains(curLayer.rect)) {
                        return [3 /*break*/, 5];
                    }
                    else if (dist <= curDist) {
                        curLayer = res;
                        curDist = dist;
                    }
                    _c.label = 5;
                case 5:
                    i--;
                    return [3 /*break*/, 1];
                case 6: return [2 /*return*/, curLayer];
            }
        });
    });
}
exports.bestLayerByCoords = bestLayerByCoords;
//# sourceMappingURL=/Users/kxiang/work/projects/psdetch/v3-new/uxele-core/src/layer.js.map