export class EventEmitter {
  [key: string]: {};
  constructor() {
    this.eventObj = {};
  }
  /** 订阅事件 */
  on(name: string, callback: (val: any) => void): void {
    if (!this.eventObj[name]) {
      this.eventObj[name] = [callback];
    } else {
      this.eventObj[name].push(callback);
    }
  }
  /** 发布事件 */
  emit(name: string, val: any): void {
    this.eventObj[name] && this.eventObj[name].forEach((cb) => cb(val));
  }
  /** 移除订阅事件 */
  removeListener(name: string, callback: (val: any) => void): void {
    if (!this.eventObj[name]) return;
    this.eventObj[name] = this.eventObj[name].filter((cb) => cb != callback);
  }
  /** 移除所有订阅事件 */
  removeAllListener(name: string) {
    delete this.eventObj[name];
  }
  once(name: string, callback: (val: any) => void) {
    // 定义回调函数fn, 执行的时候会触发fn函数
    const fn = (val: any) => {
      callback(val); // fn函数中调用原有的callback
      this.removeListener(name, fn); // 执行一次后，移除fn
    };
    this.on(name, fn);
  }
}
