import { Rect } from "./Rect";

export interface DrawOptions {
  strokeColor?: string;
  // e.g. "5 5"
  strokeDashArray?: string;
  strokeWidth?: number;
  fillColor?: string;
  fillRule?: "nonzero" | "evenodd";
  opacity?: number;
  scaleX?: number;
  scaleY?: number;
  clip?: {
    circle?: DrawCircleOptions
  }
  left?: number,
  top?: number
}
export interface DrawCircleOptions extends DrawOptions {
  radius: number
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
  txt:string;
  fontFamily?: string;
  fontSize?: number;
  fontWeight?: string;
  textBackgroundFill?: string;
}

export interface DrawImageOptions extends DrawOptions {
  img: HTMLImageElement;
}

export function isDrawImage(opt: DrawOptions): opt is DrawImageOptions {
  return !!(opt as DrawImageOptions).img;
}

export function isDrawLine(opt: DrawOptions): opt is DrawLineOptions {
  return (opt as DrawLineOptions).x1!==undefined;
}

export function isDrawText(opt: DrawOptions): opt is DrawTextOptions {
  return (opt as DrawTextOptions).txt!==undefined;
}

export function isDrawCircle(opt: DrawOptions): opt is DrawCircleOptions {
  return (opt as DrawCircleOptions).radius!==undefined;
}

export function isDrawRect(opt: DrawOptions): opt is DrawRectOptions {
  return (opt as DrawRectOptions).width!==undefined;
}