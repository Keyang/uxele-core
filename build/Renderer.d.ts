export interface DrawOptions {
    strokeColor?: string;
    strokeDashArray?: string;
    strokeWidth?: number;
    fillColor?: string;
    fillRule?: "nonzero" | "evenodd";
    opacity?: number;
    scaleX?: number;
    scaleY?: number;
    clip?: {
        circle?: DrawCircleOptions;
    };
    left?: number;
    top?: number;
}
export interface DrawCircleOptions extends DrawOptions {
    radius: number;
}
export interface DrawLineOptions extends DrawOptions {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
}
export interface DrawRectOptions extends DrawOptions {
    width: number;
    height: number;
}
export interface DrawTextOptions extends DrawOptions {
    txt: string;
    fontFamily?: string;
    fontSize?: number;
    fontWeight?: string;
    textBackgroundFill?: string;
}
export interface DrawImageOptions extends DrawOptions {
    img: HTMLImageElement;
}
export declare function isDrawImage(opt: DrawOptions): opt is DrawImageOptions;
export declare function isDrawLine(opt: DrawOptions): opt is DrawLineOptions;
export declare function isDrawText(opt: DrawOptions): opt is DrawTextOptions;
export declare function isDrawCircle(opt: DrawOptions): opt is DrawCircleOptions;
export declare function isDrawRect(opt: DrawOptions): opt is DrawRectOptions;
