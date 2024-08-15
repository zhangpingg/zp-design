---
group:
  title: utils
  path: /utils
---

# EventEmitter

> 发布订阅事件

## 使用

```tsx
import React, { useEffect, useState } from 'react';
import { ZpUtils } from 'zp-design';
import { Button } from 'antd';

const { EventEmitter } = ZpUtils;

const Demo = () => {
  const EventBus = new EventEmitter();
  const [data, setData] = useState('');

  const emitFn = () => {
    EventBus.emit('closeModal', '发送的数据');
  };
  useEffect(() => {
    EventBus.on('closeModal', (data) => {
      setData(data);
    });
  }, []);

  return (
    <div>
      <Button onClick={emitFn}>发送</Button>
      <p>内容：{data}</p>
    </div>
  );
};
export default Demo;
```
