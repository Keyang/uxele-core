import { IPoint } from "./types";
export interface IRect {
    left: number;
    top: number;
    right: number;
    bottom: number;
}
export interface IRectDistance {
    [key: string]: number;
    ll: number;
    lr: number;
    rr: number;
    rl: number;
    tt: number;
    tb: number;
    bb: number;
    bt: number;
}
export declare class Rect implements IRect {
    left: number;
    top: number;
    right: number;
    bottom: number;
    static fromJson(rectJson: IRect): Rect;
    constructor(left: number, top: number, right: number, bottom: number);
    norm(): void;
    readonly valid: boolean;
    readonly width: number;
    readonly height: number;
    readonly centerPoint: {
        x: number;
        y: number;
    };
    contains(rect: Rect): boolean;
    containsCoords(x: number, y: number): boolean;
    zoom(ratio: number): Rect;
    clone(): Rect;
    area(): number;
    pan(x: number, y: number): Rect;
    panMutate(x: number, y: number): void;
    combine(rect: Rect): Rect;
    /**
     * return a new rect relative to current rect defined by a relative rect (start from 0,0); the result is clamped within current rect
     * @param offset
     */
    clampedRelativeRect(relative: Rect): Rect;
    /**
     * Convert absolute coords to relative coords to another rect
     * @param rect the rect to compare to.
     */
    relativeTo(rect: Rect): Rect;
    /**
     * Relatively offset rect
     * @param relative
     */
    relativeRect(relative: Rect): Rect;
    clampBy(rect: Rect): Rect;
    coordsToCenter(coord: IPoint): number;
    distanceToCoords(x: number, y: number): number;
    includeCoordsMutate(x: number, y: number): void;
    isOverlapTo(t: Rect): boolean;
    distance(rect: Rect): IRectDistance;
}
