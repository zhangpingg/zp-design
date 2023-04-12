---
group:
  title: utils
  path: /utils
---

# EventEmitter

> 发布订阅事件

## 使用

```ts
import { ZpUtils } from 'zp-design';

const { EventEmitter } = ZpUtils;

const EventBus = new EventEmitter();

EventBus.on('name', (value) => {
  console.log(value);
});

EventBus.emit('name', 1);
```
