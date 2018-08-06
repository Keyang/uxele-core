export class Progress<T> {
  subscribe(
    onProgress: (num: number) => void,
    onError: (err?: Error) => void,
    onComplete: (data?: T) => void,
  ) {
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
  }
  toPromise(): Promise<T|undefined> {
    if (this._isFinished) {
      if (this._err) {
        return Promise.reject(this._err);
      } else {
        return Promise.resolve(this._data);
      }
    } else {
      return new Promise((resolve, reject) => {
        this._onComplete = resolve;
        this._onError = reject;
      });
    }
  }
  private _onProgress = (num: number) => { };
  private _onComplete = (data?: T) => { };
  private _onError = (err?: Error) => { };
  private _isFinished = false;
  private _data?: T;
  private _err?: Error;
  progress = (num: number) => {
    if (!this._isFinished) {
      this._onProgress(num);
    }

  }
  error = (err: Error) => {
    if (!this._isFinished) {
      this._err = err;
      this._isFinished = true;
      this._onError(err);
    }

  }
  complete = (data: T) => {
    if (!this._isFinished) {
      this._data = data;
      this._isFinished = true;
      try {
        this._onComplete(data);
      } catch (e) {
        this._err = e;
        this._onError(e);
      }

    }
  }
}
