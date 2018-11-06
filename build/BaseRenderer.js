"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var BasicEvents_1 = require("./BasicEvents");
var BaseRenderer = /** @class */ (function (_super) {
    __extends(BaseRenderer, _super);
    function BaseRenderer(ele, renderWidth, renderHeight) {
        var _this = _super.call(this) || this;
        _this.ele = ele;
        _this.renderWidth = renderWidth;
        _this.renderHeight = renderHeight;
        return _this;
    }
    Object.defineProperty(BaseRenderer.prototype, "minX", {
        get: function () {
            return -this.renderWidth / 2;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseRenderer.prototype, "minY", {
        get: function () {
            return -this.renderHeight / 2;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseRenderer.prototype, "maxX", {
        get: function () {
            return this.getPage().width * this.zoom() - this.renderWidth / 2;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseRenderer.prototype, "maxY", {
        get: function () {
            return this.getPage().height * this.zoom() - this.renderHeight / 2;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseRenderer.prototype, "imgWidth", {
        get: function () {
            return this.getPage().width * this.zoom();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseRenderer.prototype, "imgHeight", {
        get: function () {
            return this.getPage().height * this.zoom();
        },
        enumerable: true,
        configurable: true
    });
    BaseRenderer.prototype.mouseEventToCoords = function (evt) {
        var e = evt.e;
        return {
            x: e.offsetX,
            y: e.offsetY
        };
    };
    BaseRenderer.prototype.rendererPointToRealPoint = function (rendererPoint) {
        return {
            x: Math.round(Math.min(Math.max(rendererPoint.x + this.panX(), 0), this.imgWidth) / this.zoom()),
            y: Math.round(Math.min(Math.max(rendererPoint.y + this.panY(), 0), this.imgHeight) / this.zoom())
        };
    };
    BaseRenderer.prototype.realPointToRendererPoint = function (realPoint) {
        return {
            x: Math.round(realPoint.x * this.zoom() - this.panX()),
            y: Math.round(realPoint.y * this.zoom() - this.panY()),
        };
    };
    BaseRenderer.prototype.getPage = function () {
        return this.curPage;
        // if (this.curPage) {
        // } else {
        //   throw new Error("No page is rendered.");
        // }
    };
    BaseRenderer.prototype.renderPage = function (page) {
        return __awaiter(this, void 0, void 0, function () {
            var img;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.curPage = page;
                        return [4 /*yield*/, page.getPreview(this.zoom())];
                    case 1:
                        img = _a.sent();
                        this.setBackground(img);
                        return [2 /*return*/];
                }
            });
        });
    };
    BaseRenderer.prototype.realRectToRendererRect = function (realRect) {
        return realRect.pan(-this.panX() / this.zoom(), -this.panY() / this.zoom()).zoom(this.zoom());
    };
    BaseRenderer.prototype.rendererRectToRealRect = function (rendererRect) {
        return rendererRect.pan(this.panX(), this.panY()).zoom(1 / this.zoom());
    };
    return BaseRenderer;
}(BasicEvents_1.BasicEvents));
exports.BaseRenderer = BaseRenderer;
//# sourceMappingURL=/Users/kxiang/work/projects/psdetch/v3-new/psdetch-core/src/BaseRenderer.js.map