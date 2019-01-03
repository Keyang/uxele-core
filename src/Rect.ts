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
export class Rect implements IRect {
  public static fromJson(rectJson: IRect) {
    return new Rect(rectJson.left, rectJson.top, rectJson.right, rectJson.bottom);
  }
  constructor(
    public left: number,
    public top: number,
    public right: number,
    public bottom: number,
  ) {
    if (this.valid) {
      this.norm();
    }
  }
  public norm() {

    if (this.right < this.left) {
      const tmpV1 = this.right;
      this.right = this.left;
      this.left = tmpV1;
    }
    if (this.top > this.bottom) {
      const tmpV2 = this.top;
      this.top = this.bottom;
      this.bottom = tmpV2;
    }
  }
  get valid() {
    return this.left !== null && this.right !== null && this.top !== null && this.bottom !== null;
  }
  get width() {
    return this.right - this.left;
  }
  get height() {
    return this.bottom - this.top;
  }
  get centerPoint() {
    return {
      x: (this.left + this.right) / 2,
      y: (this.top + this.bottom) / 2,
    };
  }
  get leftTop():IPoint{
    return{
      x:this.left,
      y:this.top
    }
  }
  
  public contains(rect: Rect): boolean {
    return this.left <= rect.left && this.top <= rect.top && this.right >= rect.right && this.bottom >= rect.bottom;
  }
  public containsCoords(x: number, y: number): boolean {
    return x >= this.left && x < this.right && y >= this.top && y < this.bottom;
  }
  public zoom(ratio: number): Rect {
    return new Rect(this.left * ratio, this.top * ratio, this.right * ratio, this.bottom * ratio);
  }
  public clone(): Rect {
    return new Rect(
      this.left,
      this.top,
      this.right,
      this.bottom,
    );
  }
  public area(): number {
    return this.width * this.height;
  }
  public pan(x: number, y: number): Rect {
    const rtn = this.clone();
    rtn.left += x;
    rtn.right += x;
    rtn.top += y;
    rtn.bottom += y;
    return rtn;
  }
  public panMutate(x: number, y: number) {
    this.left += x;
    this.right += x;
    this.top += y;
    this.bottom += y;

  }
  public combine(rect: Rect): Rect {
    if (!rect) {
      return this.clone();
    }
    return new Rect(
      Math.min(this.left, rect.left),
      Math.min(this.top, rect.top),
      Math.max(this.right, rect.right),
      Math.max(this.bottom, rect.bottom),
    );
  }
  /**
   * return a new rect relative to current rect defined by a relative rect (start from 0,0); the result is clamped within current rect
   * @param offset
   */
  public clampedRelativeRect(relative: Rect): Rect {
    return this.relativeRect(relative).clampBy(this);
  }
  /**
   * Convert absolute coords to relative coords to another rect
   * @param rect the rect to compare to.
   */
  public relativeTo(rect: Rect): Rect {
    return new Rect(
      this.left - rect.left,
      this.top - rect.top,
      this.right - rect.left,
      this.bottom - rect.top,
    );
  }
  /**
   * Relatively offset rect
   * @param relative
   */
  public relativeRect(relative: Rect): Rect {
    return new Rect(
      this.left + relative.left,
      this.top + relative.top,
      this.left + relative.right,
      this.top + relative.bottom,
    );
  }
  public clampBy(rect: Rect): Rect {
    return new Rect(
      Math.max(rect.left, this.left),
      Math.max(rect.top, this.top),
      Math.min(rect.right, this.right),
      Math.min(rect.bottom, this.bottom),
    );
  }
  public coordsToCenter(coord: IPoint): number {
    const cx = (this.left + this.right) / 2;
    const cy = (this.top + this.bottom) / 2;
    return Math.sqrt(Math.pow((coord.x - cx), 2) + Math.pow((coord.y - cy), 2));
  }
  public distanceToCoords(x: number, y: number) {
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
    const dx = Math.min(Math.abs(x - this.left), Math.abs(x - this.right));
    const dy = Math.min(Math.abs(y - this.top), Math.abs(y - this.bottom));
    return Math.round(Math.sqrt(dx * dx + dy * dy));
  }
  public includeCoordsMutate(x: number, y: number) {
    this.left = Math.min(this.left, x);
    this.right = Math.max(this.right, x);
    this.top = Math.min(this.top, y);
    this.bottom = Math.max(this.bottom, y);
  }
  public isOverlapTo(t: Rect) {
    return this.left < t.right && t.left < this.right && this.top < t.bottom && t.top < this.bottom;
  }
  public panTo(newLeftTop: IPoint) {
    const offsetX = newLeftTop.x - this.left;
    const offsetY = newLeftTop.y - this.top;
    return this.pan(offsetX, offsetY);
  }
  public distance(rect: Rect) {
    const rect1 = this;
    const rect2 = rect;
    const rtn: IRectDistance = {
      ll: 0,
      lr: 0,
      rr: 0,
      rl: 0,
      tt: 0,
      tb: 0,
      bb: 0,
      bt: 0,
    };

    for (const key in rtn) {
      if (rtn.hasOwnProperty(key)) {
        rtn[key] = getDistance(rect1, rect2, key);
      }

    }
    const w1 = rect1.width;
    const h1 = rect1.height;

    if (rect1.left >= rect2.right) {
      delete rtn.ll;
    } else {
      delete rtn.lr;
    }

    if (rect1.right <= rect2.left) {
      delete rtn.rr;
    } else {
      delete rtn.rl;
    }
    const l = rtn.ll || rtn.lr;
    const r = rtn.rr || rtn.rl;
    const dlr = Math.abs(r - l);
    if (Math.round(dlr - w1) === 0) {
      if (l < r) {
        delete rtn.rr;
        delete rtn.rl;
      } else {
        delete rtn.lr;
        delete rtn.ll;
      }
    }

    if (rect1.top >= rect2.bottom) {
      delete rtn.tt;
    } else {
      delete rtn.tb;
    }

    if (rect1.bottom <= rect2.top) {
      delete rtn.bb;
    } else {
      delete rtn.bt;
    }

    const t = rtn.tt || rtn.tb;
    const b = rtn.bb || rtn.bt;
    const dtb = Math.abs(t - b);
    if (Math.round(dtb - h1) === 0) {
      if (t < b) {
        delete rtn.bb;
        delete rtn.bt;
      } else {
        delete rtn.tt;
        delete rtn.tb;
      }
    }

    return rtn;
  }
}

function getDistance(rect1: IRect, rect2: IRect, mode: string) {
  const map: { [key: string]: string } = {
    l: "left",
    r: "right",
    t: "top",
    b: "bottom",
  };
  const e1 = map[mode[0]];
  const e2 = map[mode[1]];
  const v1 = (rect1 as any)[e1];
  const v2 = (rect2 as any)[e2];
  return Math.abs(v1 - v2);
}
