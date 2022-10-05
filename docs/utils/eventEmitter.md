---
group:
  title: utils
  path: /utils
---

# EventEmitter

> 发布订阅事件

## 使用

```ts
import { EventEmitter } from 'zp-component-library';

const EventBus = new EventEmitter();

EventBus.on('name', (value) => {
  console.log(value);
});

EventBus.emit('name', 1);
```
