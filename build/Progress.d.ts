export declare class Progress<T> {
    subscribe(onProgress: (num: number) => void, onError: (err?: Error) => void, onComplete: (data?: T) => void): void;
    toPromise(): Promise<T | undefined>;
    private _onProgress;
    private _onComplete;
    private _onError;
    private _isFinished;
    private _data?;
    private _err?;
    progress: (num: number) => void;
    error: (err: Error) => void;
    complete: (data: T) => void;
}
