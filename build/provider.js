"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CoreProvider = /** @class */ (function () {
    function CoreProvider() {
        this.adapters = [];
    }
    CoreProvider.prototype.addAdapter = function (adp) {
        this.adapters.push(adp);
    };
    CoreProvider.prototype.getAdapters = function () {
        return this.adapters;
    };
    CoreProvider.prototype.setRenderer = function (r) {
        this.render = r;
    };
    CoreProvider.prototype.getRenderer = function () {
        if (this.render) {
            return this.render;
        }
        else {
            throw (new Error("No renderer was set when calling getRenderer.."));
        }
    };
    return CoreProvider;
}());
exports.CoreProvider = CoreProvider;
//# sourceMappingURL=/Users/kxiang/work/projects/psdetch/v3-new/psdetch-core/src/provider.js.map