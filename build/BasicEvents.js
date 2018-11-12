"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BasicEvents = /** @class */ (function () {
    function BasicEvents() {
        this.regEvents = {};
    }
    BasicEvents.prototype.off = function (evt, handler) {
        if (evt === undefined) {
            this.regEvents = {};
        }
        else {
            if (handler === undefined) {
                delete this.regEvents[evt];
            }
            else {
                if (this.regEvents[evt]) {
                    var idx = this.regEvents[evt].indexOf(handler);
                    this.regEvents[evt].splice(idx, 1);
                }
            }
        }
    };
    BasicEvents.prototype.on = function (evt, handler) {
        if (!this.regEvents[evt]) {
            this.regEvents[evt] = [];
        }
        if (this.regEvents[evt]) {
            this.regEvents[evt].push(handler);
        }
    };
    BasicEvents.prototype.once = function (evt, handler) {
        var _this = this;
        var wrapper = (function (arg) {
            setTimeout(function () {
                _this.off(evt, wrapper);
            });
            handler(arg);
        });
        this.on(evt, wrapper);
    };
    BasicEvents.prototype.emit = function (evt, value) {
        if (this.regEvents[evt]) {
            for (var _i = 0, _a = this.regEvents[evt]; _i < _a.length; _i++) {
                var handler = _a[_i];
                handler(value);
            }
        }
    };
    return BasicEvents;
}());
exports.BasicEvents = BasicEvents;
//# sourceMappingURL=/Users/kxiang/work/projects/psdetch/v3-new/uxele-core/src/BasicEvents.js.map