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
Object.defineProperty(exports, "__esModule", { value: true });
var BasicEvents_1 = require("./BasicEvents");
var BaseTool = /** @class */ (function (_super) {
    __extends(BaseTool, _super);
    function BaseTool(renderer) {
        var _this = _super.call(this) || this;
        _this.renderer = renderer;
        _this.activated = false;
        return _this;
    }
    BaseTool.prototype.activate = function () {
        var _this = this;
        // renderer.clearDrawing();
        this.bindRenderer()
            .then(function () {
            _this.activated = true;
            _this.emit("onActivated");
        });
    };
    BaseTool.prototype.deactivate = function () {
        var _this = this;
        this.unbindRenderer()
            .then(function () {
            _this.activated = false;
            _this.emit("onDeactivated");
        });
    };
    return BaseTool;
}(BasicEvents_1.BasicEvents));
exports.BaseTool = BaseTool;
//# sourceMappingURL=/Users/kxiang/work/projects/psdetch/v3-new/psdetch-core/src/BaseTool.js.map