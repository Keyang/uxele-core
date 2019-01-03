"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Rect = /** @class */ (function () {
    function Rect(left, top, right, bottom) {
        this.left = left;
        this.top = top;
        this.right = right;
        this.bottom = bottom;
        if (this.valid) {
            this.norm();
        }
    }
    Rect.fromJson = function (rectJson) {
        return new Rect(rectJson.left, rectJson.top, rectJson.right, rectJson.bottom);
    };
    Rect.prototype.norm = function () {
        if (this.right < this.left) {
            var tmpV1 = this.right;
            this.right = this.left;
            this.left = tmpV1;
        }
        if (this.top > this.bottom) {
            var tmpV2 = this.top;
            this.top = this.bottom;
            this.bottom = tmpV2;
        }
    };
    Object.defineProperty(Rect.prototype, "valid", {
        get: function () {
            return this.left !== null && this.right !== null && this.top !== null && this.bottom !== null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rect.prototype, "width", {
        get: function () {
            return this.right - this.left;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rect.prototype, "height", {
        get: function () {
            return this.bottom - this.top;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rect.prototype, "centerPoint", {
        get: function () {
            return {
                x: (this.left + this.right) / 2,
                y: (this.top + this.bottom) / 2,
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rect.prototype, "leftTop", {
        get: function () {
            return {
                x: this.left,
                y: this.top
            };
        },
        enumerable: true,
        configurable: true
    });
    Rect.prototype.contains = function (rect) {
        return this.left <= rect.left && this.top <= rect.top && this.right >= rect.right && this.bottom >= rect.bottom;
    };
    Rect.prototype.containsCoords = function (x, y) {
        return x >= this.left && x < this.right && y >= this.top && y < this.bottom;
    };
    Rect.prototype.zoom = function (ratio) {
        return new Rect(this.left * ratio, this.top * ratio, this.right * ratio, this.bottom * ratio);
    };
    Rect.prototype.clone = function () {
        return new Rect(this.left, this.top, this.right, this.bottom);
    };
    Rect.prototype.area = function () {
        return this.width * this.height;
    };
    Rect.prototype.pan = function (x, y) {
        var rtn = this.clone();
        rtn.left += x;
        rtn.right += x;
        rtn.top += y;
        rtn.bottom += y;
        return rtn;
    };
    Rect.prototype.panMutate = function (x, y) {
        this.left += x;
        this.right += x;
        this.top += y;
        this.bottom += y;
    };
    Rect.prototype.combine = function (rect) {
        if (!rect) {
            return this.clone();
        }
        return new Rect(Math.min(this.left, rect.left), Math.min(this.top, rect.top), Math.max(this.right, rect.right), Math.max(this.bottom, rect.bottom));
    };
    /**
     * return a new rect relative to current rect defined by a relative rect (start from 0,0); the result is clamped within current rect
     * @param offset
     */
    Rect.prototype.clampedRelativeRect = function (relative) {
        return this.relativeRect(relative).clampBy(this);
    };
    /**
     * Convert absolute coords to relative coords to another rect
     * @param rect the rect to compare to.
     */
    Rect.prototype.relativeTo = function (rect) {
        return new Rect(this.left - rect.left, this.top - rect.top, this.right - rect.left, this.bottom - rect.top);
    };
    /**
     * Relatively offset rect
     * @param relative
     */
    Rect.prototype.relativeRect = function (relative) {
        return new Rect(this.left + relative.left, this.top + relative.top, this.left + relative.right, this.top + relative.bottom);
    };
    Rect.prototype.clampBy = function (rect) {
        return new Rect(Math.max(rect.left, this.left), Math.max(rect.top, this.top), Math.min(rect.right, this.right), Math.min(rect.bottom, this.bottom));
    };
    Rect.prototype.coordsToCenter = function (coord) {
        var cx = (this.left + this.right) / 2;
        var cy = (this.top + this.bottom) / 2;
        return Math.sqrt(Math.pow((coord.x - cx), 2) + Math.pow((coord.y - cy), 2));
    };
    Rect.prototype.distanceToCoords = function (x, y) {
        if (this.containsCoords(x, y)) {
            return 0;
        }
        this.norm();
        if (x >= this.left && x <= this.right) {
            return Math.min(Math.abs(y - this.top), Math.abs(y - this.bottom));
        }
        if (y >= this.top && y <= this.bottom) {
            return Math.min(Math.abs(x - this.left), Math.abs(x - this.right));
        }
        var dx = Math.min(Math.abs(x - this.left), Math.abs(x - this.right));
        var dy = Math.min(Math.abs(y - this.top), Math.abs(y - this.bottom));
        return Math.round(Math.sqrt(dx * dx + dy * dy));
    };
    Rect.prototype.includeCoordsMutate = function (x, y) {
        this.left = Math.min(this.left, x);
        this.right = Math.max(this.right, x);
        this.top = Math.min(this.top, y);
        this.bottom = Math.max(this.bottom, y);
    };
    Rect.prototype.isOverlapTo = function (t) {
        return this.left < t.right && t.left < this.right && this.top < t.bottom && t.top < this.bottom;
    };
    Rect.prototype.panTo = function (newLeftTop) {
        var offsetX = newLeftTop.x - this.left;
        var offsetY = newLeftTop.y - this.top;
        return this.pan(offsetX, offsetY);
    };
    Rect.prototype.distance = function (rect) {
        var rect1 = this;
        var rect2 = rect;
        var rtn = {
            ll: 0,
            lr: 0,
            rr: 0,
            rl: 0,
            tt: 0,
            tb: 0,
            bb: 0,
            bt: 0,
        };
        for (var key in rtn) {
            if (rtn.hasOwnProperty(key)) {
                rtn[key] = getDistance(rect1, rect2, key);
            }
        }
        var w1 = rect1.width;
        var h1 = rect1.height;
        if (rect1.left >= rect2.right) {
            delete rtn.ll;
        }
        else {
            delete rtn.lr;
        }
        if (rect1.right <= rect2.left) {
            delete rtn.rr;
        }
        else {
            delete rtn.rl;
        }
        var l = rtn.ll || rtn.lr;
        var r = rtn.rr || rtn.rl;
        var dlr = Math.abs(r - l);
        if (Math.round(dlr - w1) === 0) {
            if (l < r) {
                delete rtn.rr;
                delete rtn.rl;
            }
            else {
                delete rtn.lr;
                delete rtn.ll;
            }
        }
        if (rect1.top >= rect2.bottom) {
            delete rtn.tt;
        }
        else {
            delete rtn.tb;
        }
        if (rect1.bottom <= rect2.top) {
            delete rtn.bb;
        }
        else {
            delete rtn.bt;
        }
        var t = rtn.tt || rtn.tb;
        var b = rtn.bb || rtn.bt;
        var dtb = Math.abs(t - b);
        if (Math.round(dtb - h1) === 0) {
            if (t < b) {
                delete rtn.bb;
                delete rtn.bt;
            }
            else {
                delete rtn.tt;
                delete rtn.tb;
            }
        }
        return rtn;
    };
    return Rect;
}());
exports.Rect = Rect;
function getDistance(rect1, rect2, mode) {
    var map = {
        l: "left",
        r: "right",
        t: "top",
        b: "bottom",
    };
    var e1 = map[mode[0]];
    var e2 = map[mode[1]];
    var v1 = rect1[e1];
    var v2 = rect2[e2];
    return Math.abs(v1 - v2);
}
//# sourceMappingURL=/Users/kxiang/work/projects/psdetch/v3-new/uxele-core/src/Rect.js.map