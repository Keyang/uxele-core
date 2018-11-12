"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Progress = /** @class */ (function () {
    function Progress() {
        var _this = this;
        this._onProgress = function (num) { };
        this._onComplete = function (data) { };
        this._onError = function (err) { };
        this._isFinished = false;
        this.progress = function (num) {
            if (!_this._isFinished) {
                _this._onProgress(num);
            }
        };
        this.error = function (err) {
            if (!_this._isFinished) {
                _this._err = err;
                _this._isFinished = true;
                _this._onError(err);
            }
        };
        this.complete = function (data) {
            if (!_this._isFinished) {
                _this._data = data;
                _this._isFinished = true;
                try {
                    _this._onComplete(data);
                }
                catch (e) {
                    _this._err = e;
                    _this._onError(e);
                }
            }
        };
    }
    Progress.prototype.subscribe = function (onProgress, onError, onComplete) {
        if (onProgress) {
            this._onProgress = onProgress;
        }
        if (onError) {
            this._onError = onError;
        }
        if (onComplete) {
            this._onComplete = onComplete;
        }
        if (this._isFinished) {
            this._onError(this._err);
            this._onComplete(this._data);
        }
    };
    Progress.prototype.toPromise = function () {
        var _this = this;
        if (this._isFinished) {
            if (this._err) {
                return Promise.reject(this._err);
            }
            else {
                return Promise.resolve(this._data);
            }
        }
        else {
            return new Promise(function (resolve, reject) {
                _this._onComplete = resolve;
                _this._onError = reject;
            });
        }
    };
    return Progress;
}());
exports.Progress = Progress;
//# sourceMappingURL=/Users/kxiang/work/projects/psdetch/v3-new/uxele-core/src/Progress.js.map