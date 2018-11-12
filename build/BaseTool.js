"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// export type BaseToolEvents = "onActivated" | "onDeactivated";
var BaseTool = /** @class */ (function () {
    function BaseTool(renderer) {
        this.renderer = renderer;
        this.activated = false;
    }
    BaseTool.prototype.activate = function () {
        var _this = this;
        // renderer.clearDrawing();
        return this.bindRenderer()
            .then(function () {
            _this.activated = true;
        });
    };
    BaseTool.prototype.deactivate = function () {
        var _this = this;
        return this.unbindRenderer()
            .then(function () {
            _this.activated = false;
        });
    };
    return BaseTool;
}());
exports.BaseTool = BaseTool;
//# sourceMappingURL=/Users/kxiang/work/projects/psdetch/v3-new/uxele-core/src/BaseTool.js.map