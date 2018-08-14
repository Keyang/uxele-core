
export class BasicEvents<T extends string, T1, T2 extends (arg?:T1)=>void>{
  private regEvents: {
    [key in T]?: T2[]
  } = {};
  off(evt?: T | undefined, handler?: T2): void {
    if (evt === undefined) {
      this.regEvents = {};
    } else {
      if (handler === undefined) {
        delete this.regEvents[evt];
      } else {
        if (this.regEvents[evt]) {
          const idx = this.regEvents[evt]!.indexOf(handler);
          this.regEvents[evt]!.splice(idx, 1);
        }
      }
    }
  }
  on(evt: T, handler: T2): void {
    if (!this.regEvents[evt]) {
      this.regEvents[evt] = [];
    }
    if (this.regEvents[evt]) {
      this.regEvents[evt]!.push(handler);
    }
  }
  once(evt: T, handler: T2): void {
    const wrapper = ((arg: T1) => {
      setTimeout(()=>{
        this.off(evt, wrapper);
      });
      handler(arg);
    }) as T2;
    this.on(evt, wrapper);
  }
  emit(evt: T, value?: T1): void {
    if (this.regEvents[evt]) {
      for (const handler of this.regEvents[evt]!) {
        handler(value);
      }
    }
  }
}