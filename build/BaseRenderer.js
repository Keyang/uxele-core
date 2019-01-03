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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var types = __importStar(require("./types"));
var BasicEvents_1 = require("./BasicEvents");
var BaseRenderer = /** @class */ (function (_super) {
    __extends(BaseRenderer, _super);
    function BaseRenderer(parent) {
        var _this = _super.call(this) || this;
        _this.parent = parent;
        // protected abstract setCanvasSize(width: number, height: number): void
        _this.zoomLevel = 1;
        setTimeout(function () {
            _this._delegateEvents();
        });
        return _this;
    }
    Object.defineProperty(BaseRenderer.prototype, "renderWidth", {
        get: function () {
            return this.parent.clientWidth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseRenderer.prototype, "renderHeight", {
        get: function () {
            return this.parent.clientHeight;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseRenderer.prototype, "minX", {
        /**
         * The minimum left where user can scroll canvas
         */
        get: function () {
            return -this.renderWidth / 2;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseRenderer.prototype, "minY", {
        /**
         * The minimum top where user can scroll canvas
         */
        get: function () {
            return -this.renderHeight / 2;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseRenderer.prototype, "maxX", {
        /**
         * The max left where user can scroll canvas
         */
        get: function () {
            return this.imgWidth - this.renderWidth / 2;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseRenderer.prototype, "maxY", {
        get: function () {
            return this.imgHeight - this.renderHeight / 2;
        },
        enumerable: true,
        configurable: true
    });
    BaseRenderer.prototype._delegateEvents = function () {
        var _this = this;
        types.rendererEvents.forEach(function (evt) {
            _this.delegateEvents(evt, function (e) {
                _this.emit(evt, e);
            });
        });
    };
    BaseRenderer.prototype.mouseEventToCoords = function (evt) {
        var e = evt.e;
        var container = this.parent.getBoundingClientRect();
        return {
            x: e.clientX - container.left,
            y: e.clientY - container.top
        };
    };
    BaseRenderer.prototype.rendererPointToRealPoint = function (rendererPoint, clamp) {
        if (clamp === void 0) { clamp = true; }
        if (clamp) {
            return {
                x: Math.round(Math.min(Math.max(rendererPoint.x + this.panX(), 0), this.imgWidth) / this.zoom()),
                y: Math.round(Math.min(Math.max(rendererPoint.y + this.panY(), 0), this.imgHeight) / this.zoom())
            };
        }
        else {
            return {
                x: Math.round((rendererPoint.x + this.panX()) / this.zoom()),
                y: Math.round((rendererPoint.y + this.panY()) / this.zoom())
            };
        }
    };
    BaseRenderer.prototype.realPointToRendererPoint = function (realPoint) {
        return {
            x: Math.round(realPoint.x * this.zoom() - this.panX()),
            y: Math.round(realPoint.y * this.zoom() - this.panY()),
        };
    };
    BaseRenderer.prototype.panX = function (pixel) {
        if (pixel !== undefined) {
            var clampPixel = Math.min(Math.max(pixel, this.minX), this.maxX);
            this._panX(clampPixel);
        }
        return this._panX();
    };
    BaseRenderer.prototype.panY = function (pixel) {
        if (pixel !== undefined) {
            var clampPixel = Math.min(Math.max(pixel, this.minY), this.maxY);
            this._panY(clampPixel);
        }
        return this._panY();
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
//# sourceMappingURL=/Users/kxiang/work/projects/psdetch/v3-new/uxele-core/src/BaseRenderer.js.map